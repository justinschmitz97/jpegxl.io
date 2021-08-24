// Copyright (c) the JPEG XL Project Authors. All rights reserved.
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

#include "lib/extras/codec.h"

#include <stddef.h>
#include <stdio.h>

#include <algorithm>
#include <random>
#include <utility>
#include <vector>

#include "gtest/gtest.h"
#include "lib/extras/codec_pgx.h"
#include "lib/extras/codec_pnm.h"
#include "lib/jxl/base/thread_pool_internal.h"
#include "lib/jxl/color_management.h"
#include "lib/jxl/image.h"
#include "lib/jxl/image_bundle.h"
#include "lib/jxl/image_test_utils.h"
#include "lib/jxl/luminance.h"
#include "lib/jxl/testdata.h"

namespace jxl {
namespace {

CodecInOut CreateTestImage(const size_t xsize, const size_t ysize,
                           const bool is_gray, const bool add_alpha,
                           const size_t bits_per_sample,
                           const ColorEncoding& c_native) {
  Image3F image(xsize, ysize);
  std::mt19937_64 rng(129);
  std::uniform_real_distribution<float> dist(0.0f, 1.0f);
  if (is_gray) {
    for (size_t y = 0; y < ysize; ++y) {
      float* JXL_RESTRICT row0 = image.PlaneRow(0, y);
      float* JXL_RESTRICT row1 = image.PlaneRow(1, y);
      float* JXL_RESTRICT row2 = image.PlaneRow(2, y);
      for (size_t x = 0; x < xsize; ++x) {
        row0[x] = row1[x] = row2[x] = dist(rng);
      }
    }
  } else {
    RandomFillImage(&image, 1.0f);
  }
  CodecInOut io;

  if (bits_per_sample == 32) {
    io.metadata.m.SetFloat32Samples();
  } else {
    io.metadata.m.SetUintSamples(bits_per_sample);
  }
  io.metadata.m.color_encoding = c_native;
  io.SetFromImage(std::move(image), c_native);
  if (add_alpha) {
    ImageF alpha(xsize, ysize);
    RandomFillImage(&alpha, 1.f);
    io.metadata.m.SetAlphaBits(bits_per_sample <= 8 ? 8 : 16);
    io.Main().SetAlpha(std::move(alpha), /*alpha_is_premultiplied=*/false);
  }
  return io;
}

// Ensures reading a newly written file leads to the same image pixels.
void TestRoundTrip(Codec codec, const size_t xsize, const size_t ysize,
                   const bool is_gray, const bool add_alpha,
                   const size_t bits_per_sample, ThreadPool* pool) {
  // JPEG encoding is not lossless.
  if (codec == Codec::kJPG) return;
  if (codec == Codec::kPNM && add_alpha) return;
  // Our EXR codec always uses 16-bit premultiplied alpha, does not support
  // grayscale, and somehow does not have sufficient precision for this test.
  if (codec == Codec::kEXR) return;
  printf("Codec %s bps:%zu gr:%d al:%d\n",
         ExtensionFromCodec(codec, is_gray, bits_per_sample).c_str(),
         bits_per_sample, is_gray, add_alpha);

  ColorEncoding c_native;
  c_native.SetColorSpace(is_gray ? ColorSpace::kGray : ColorSpace::kRGB);
  // Note: this must not be wider than c_external, otherwise gamut clipping
  // will cause large round-trip errors.
  c_native.primaries = Primaries::kP3;
  c_native.tf.SetTransferFunction(TransferFunction::kLinear);
  JXL_CHECK(c_native.CreateICC());

  // Generally store same color space to reduce round trip errors..
  ColorEncoding c_external = c_native;
  // .. unless we have enough precision for some transforms.
  if (bits_per_sample >= 16) {
    c_external.white_point = WhitePoint::kE;
    c_external.primaries = Primaries::k2100;
    c_external.tf.SetTransferFunction(TransferFunction::kSRGB);
  }
  JXL_CHECK(c_external.CreateICC());

  const CodecInOut io = CreateTestImage(xsize, ysize, is_gray, add_alpha,
                                        bits_per_sample, c_native);
  const ImageBundle& ib1 = io.Main();

  PaddedBytes encoded;
  JXL_CHECK(Encode(io, codec, c_external, bits_per_sample, &encoded, pool));

  CodecInOut io2;
  io2.target_nits = io.metadata.m.IntensityTarget();
  // Only for PNM because PNG will warn about ignoring them.
  if (codec == Codec::kPNM) {
    io2.dec_hints.Add("color_space", Description(c_external));
  }
  JXL_CHECK(SetFromBytes(Span<const uint8_t>(encoded), &io2, pool));
  ImageBundle& ib2 = io2.Main();

  EXPECT_EQ(Description(c_external),
            Description(io2.metadata.m.color_encoding));

  // See c_external above - for low bits_per_sample the encoded space is
  // already the same.
  if (bits_per_sample < 16) {
    EXPECT_EQ(Description(ib1.c_current()), Description(ib2.c_current()));
  }

  if (add_alpha) {
    EXPECT_TRUE(SamePixels(ib1.alpha(), *ib2.alpha()));
  }

  JXL_CHECK(ib2.TransformTo(ib1.c_current(), pool));

  double max_l1, max_rel;
  // Round-trip tolerances must be higher than in external_image_test because
  // codecs do not support unbounded ranges.
#if JPEGXL_ENABLE_SKCMS
  if (bits_per_sample <= 12) {
    max_l1 = 0.5;
    max_rel = 6E-3;
  } else {
    max_l1 = 1E-3;
    max_rel = 5E-4;
  }
#else  // JPEGXL_ENABLE_SKCMS
  if (bits_per_sample <= 12) {
    max_l1 = 0.5;
    max_rel = 6E-3;
  } else if (bits_per_sample == 16) {
    max_l1 = 3E-3;
    max_rel = 1E-4;
  } else {
#ifdef __ARM_ARCH
    // pow() implementation in arm is a bit less precise than in x86 and
    // therefore we need a bigger error margin in this case.
    max_l1 = 1E-7;
    max_rel = 1E-4;
#else
    max_l1 = 1E-7;
    max_rel = 1E-5;
#endif
  }
#endif  // JPEGXL_ENABLE_SKCMS

  VerifyRelativeError(ib1.color(), *ib2.color(), max_l1, max_rel);
}

CodecInOut DecodeRoundtrip(const std::string& pathname, Codec expected_codec,
                           ThreadPool* pool,
                           const DecoderHints& dec_hints = DecoderHints()) {
  CodecInOut io;
  io.dec_hints = dec_hints;
  const PaddedBytes orig = ReadTestData(pathname);
  JXL_CHECK(SetFromBytes(Span<const uint8_t>(orig), &io, pool));
  const ImageBundle& ib1 = io.Main();

  // Encode/Decode again to make sure Encode carries through all metadata.
  PaddedBytes encoded;
  JXL_CHECK(Encode(io, expected_codec, io.metadata.m.color_encoding,
                   io.metadata.m.bit_depth.bits_per_sample, &encoded, pool));

  CodecInOut io2;
  io2.dec_hints = dec_hints;
  JXL_CHECK(SetFromBytes(Span<const uint8_t>(encoded), &io2, pool));
  const ImageBundle& ib2 = io2.Main();
  EXPECT_EQ(Description(ib1.metadata()->color_encoding),
            Description(ib2.metadata()->color_encoding));
  EXPECT_EQ(Description(ib1.c_current()), Description(ib2.c_current()));

  size_t bits_per_sample = io2.metadata.m.bit_depth.bits_per_sample;

  // "Same" pixels?
  double max_l1 = bits_per_sample <= 12 ? 1.3 : 2E-3;
  double max_rel = bits_per_sample <= 12 ? 6E-3 : 1E-4;
  if (ib1.metadata()->color_encoding.IsGray()) {
    max_rel *= 2.0;
  } else if (ib1.metadata()->color_encoding.primaries != Primaries::kSRGB) {
    // Need more tolerance for large gamuts (anything but sRGB)
    max_l1 *= 1.5;
    max_rel *= 3.0;
  }
  VerifyRelativeError(ib1.color(), ib2.color(), max_l1, max_rel);

  // Simulate the encoder removing profile and decoder restoring it.
  if (!ib2.metadata()->color_encoding.WantICC()) {
    io2.metadata.m.color_encoding.InternalRemoveICC();
    EXPECT_TRUE(io2.metadata.m.color_encoding.CreateICC());
  }

  return io2;
}

void VerifyWideGamutMetadata(const std::string& relative_pathname,
                             const Primaries primaries, ThreadPool* pool) {
  const CodecInOut io = DecodeRoundtrip(relative_pathname, Codec::kPNG, pool);

  EXPECT_EQ(8, io.metadata.m.bit_depth.bits_per_sample);
  EXPECT_FALSE(io.metadata.m.bit_depth.floating_point_sample);
  EXPECT_EQ(0, io.metadata.m.bit_depth.exponent_bits_per_sample);

  const ColorEncoding& c_original = io.metadata.m.color_encoding;
  EXPECT_FALSE(c_original.ICC().empty());
  EXPECT_EQ(RenderingIntent::kAbsolute, c_original.rendering_intent);
  EXPECT_EQ(ColorSpace::kRGB, c_original.GetColorSpace());
  EXPECT_EQ(WhitePoint::kD65, c_original.white_point);
  EXPECT_EQ(primaries, c_original.primaries);
}

TEST(CodecTest, TestPNM) { TestCodecPNM(); }
TEST(CodecTest, TestPGX) { TestCodecPGX(); }

}  // namespace
}  // namespace jxl
