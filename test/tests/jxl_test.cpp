// Copyright (c) the JPEG XL Project Authors. All rights reserved.
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

#include <stdint.h>
#include <stdio.h>

#include <array>
#include <string>
#include <utility>
#include <vector>

#include "gtest/gtest.h"
#include "lib/extras/codec.h"
#include "lib/extras/codec_jpg.h"
#include "lib/jxl/aux_out.h"
#include "lib/jxl/base/compiler_specific.h"
#include "lib/jxl/base/data_parallel.h"
#include "lib/jxl/base/override.h"
#include "lib/jxl/base/padded_bytes.h"
#include "lib/jxl/base/thread_pool_internal.h"
#include "lib/jxl/codec_in_out.h"
#include "lib/jxl/color_encoding_internal.h"
#include "lib/jxl/color_management.h"
#include "lib/jxl/dec_file.h"
#include "lib/jxl/dec_params.h"
#include "lib/jxl/enc_butteraugli_comparator.h"
#include "lib/jxl/enc_cache.h"
#include "lib/jxl/enc_file.h"
#include "lib/jxl/enc_params.h"
#include "lib/jxl/image.h"
#include "lib/jxl/image_bundle.h"
#include "lib/jxl/image_ops.h"
#include "lib/jxl/image_test_utils.h"
#include "lib/jxl/jpeg/enc_jpeg_data.h"
#include "lib/jxl/modular/options.h"
#include "lib/jxl/test_utils.h"
#include "lib/jxl/testdata.h"
#include "tools/box/box.h"

namespace jxl {
namespace {
using test::Roundtrip;

#define JXL_TEST_NL 0  // Disabled in code

void CreateImage1x1(CodecInOut* io) {
  Image3F image(1, 1);
  ZeroFillImage(&image);
  io->metadata.m.SetUintSamples(8);
  io->metadata.m.color_encoding = ColorEncoding::SRGB();
  io->SetFromImage(std::move(image), io->metadata.m.color_encoding);
}

TEST(JxlTest, HeaderSize) {
  CodecInOut io;
  CreateImage1x1(&io);

  CompressParams cparams;
  cparams.butteraugli_distance = 1.5;
  DecompressParams dparams;
  ThreadPool* pool = nullptr;

  {
    CodecInOut io2;
    AuxOut aux_out;
    Roundtrip(&io, cparams, dparams, pool, &io2, &aux_out);
    EXPECT_LE(aux_out.layers[kLayerHeader].total_bits, 34);
  }

  {
    CodecInOut io2;
    io.metadata.m.SetAlphaBits(8);
    ImageF alpha(1, 1);
    alpha.Row(0)[0] = 1;
    io.Main().SetAlpha(std::move(alpha), /*alpha_is_premultiplied=*/false);
    AuxOut aux_out;
    Roundtrip(&io, cparams, dparams, pool, &io2, &aux_out);
    EXPECT_LE(aux_out.layers[kLayerHeader].total_bits, 57);
  }
}


TEST(JxlTest, RoundtripSinglePixel) {
  CodecInOut io;
  CreateImage1x1(&io);

  CompressParams cparams;
  cparams.butteraugli_distance = 1.0;
  DecompressParams dparams;
  ThreadPool* pool = nullptr;
  CodecInOut io2;
  Roundtrip(&io, cparams, dparams, pool, &io2);
}

// Changing serialized signature causes Decode to fail.
#ifndef JXL_CRASH_ON_ERROR
TEST(JxlTest, RoundtripMarker) {
  CodecInOut io;
  CreateImage1x1(&io);

  CompressParams cparams;
  cparams.butteraugli_distance = 1.0;
  DecompressParams dparams;
  AuxOut* aux_out = nullptr;
  ThreadPool* pool = nullptr;

  PassesEncoderState enc_state;
  for (size_t i = 0; i < 2; ++i) {
    PaddedBytes compressed;
    EXPECT_TRUE(
        EncodeFile(cparams, &io, &enc_state, &compressed, aux_out, pool));
    compressed[i] ^= 0xFF;
    CodecInOut io2;
    EXPECT_FALSE(DecodeFile(dparams, compressed, &io2, pool));
  }
}
#endif

TEST(JxlTest, RoundtripSmallPatchesAlpha) {
  ThreadPool* pool = nullptr;
  CodecInOut io;
  io.metadata.m.color_encoding = ColorEncoding::LinearSRGB();
  Image3F black_with_small_lines(256, 256);
  ImageF alpha(black_with_small_lines.xsize(), black_with_small_lines.ysize());
  ZeroFillImage(&black_with_small_lines);
  // This pattern should be picked up by the patch detection heuristics.
  for (size_t y = 0; y < black_with_small_lines.ysize(); y++) {
    float* JXL_RESTRICT row = black_with_small_lines.PlaneRow(1, y);
    for (size_t x = 0; x < black_with_small_lines.xsize(); x++) {
      if (x % 4 == 0 && (y / 32) % 4 == 0) row[x] = 127.0f;
    }
  }
  io.metadata.m.SetAlphaBits(8);
  io.SetFromImage(std::move(black_with_small_lines),
                  ColorEncoding::LinearSRGB());
  FillImage(1.0f, &alpha);
  io.Main().SetAlpha(std::move(alpha), /*alpha_is_premultiplied=*/false);

  CompressParams cparams;
  cparams.speed_tier = SpeedTier::kSquirrel;
  cparams.butteraugli_distance = 0.1f;
  DecompressParams dparams;

  CodecInOut io2;
  EXPECT_LE(Roundtrip(&io, cparams, dparams, pool, &io2), 2000);
  EXPECT_LE(ButteraugliDistance(io, io2, cparams.ba_params,
                                /*distmap=*/nullptr, pool),
            0.5f);
}

TEST(JxlTest, RoundtripSmallPatches) {
  ThreadPool* pool = nullptr;
  CodecInOut io;
  io.metadata.m.color_encoding = ColorEncoding::LinearSRGB();
  Image3F black_with_small_lines(256, 256);
  ZeroFillImage(&black_with_small_lines);
  // This pattern should be picked up by the patch detection heuristics.
  for (size_t y = 0; y < black_with_small_lines.ysize(); y++) {
    float* JXL_RESTRICT row = black_with_small_lines.PlaneRow(1, y);
    for (size_t x = 0; x < black_with_small_lines.xsize(); x++) {
      if (x % 4 == 0 && (y / 32) % 4 == 0) row[x] = 127.0f;
    }
  }
  io.SetFromImage(std::move(black_with_small_lines),
                  ColorEncoding::LinearSRGB());

  CompressParams cparams;
  cparams.speed_tier = SpeedTier::kSquirrel;
  cparams.butteraugli_distance = 0.1f;
  DecompressParams dparams;

  CodecInOut io2;
  EXPECT_LE(Roundtrip(&io, cparams, dparams, pool, &io2), 2000);
  EXPECT_LE(ButteraugliDistance(io, io2, cparams.ba_params,
                                /*distmap=*/nullptr, pool),
            0.5f);
}

// Test header encoding of original bits per sample
TEST(JxlTest, RoundtripImageBundleOriginalBits) {
  ThreadPool* pool = nullptr;

  // Image does not matter, only io.metadata.m and io2.metadata.m are tested.
  Image3F image(1, 1);
  ZeroFillImage(&image);
  CodecInOut io;
  io.metadata.m.color_encoding = ColorEncoding::LinearSRGB();
  io.SetFromImage(std::move(image), ColorEncoding::LinearSRGB());

  CompressParams cparams;
  DecompressParams dparams;

  // Test unsigned integers from 1 to 32 bits
  for (uint32_t bit_depth = 1; bit_depth <= 32; bit_depth++) {
    if (bit_depth == 32) {
      // TODO(lode): allow testing 32, however the code below ends up in
      // enc_modular which does not support 32. We only want to test the header
      // encoding though, so try without modular.
      break;
    }

    io.metadata.m.SetUintSamples(bit_depth);
    CodecInOut io2;
    Roundtrip(&io, cparams, dparams, pool, &io2);

    EXPECT_EQ(bit_depth, io2.metadata.m.bit_depth.bits_per_sample);
    EXPECT_FALSE(io2.metadata.m.bit_depth.floating_point_sample);
    EXPECT_EQ(0, io2.metadata.m.bit_depth.exponent_bits_per_sample);
    EXPECT_EQ(0, io2.metadata.m.GetAlphaBits());
  }

  // Test various existing and non-existing floating point formats
  for (uint32_t bit_depth = 8; bit_depth <= 32; bit_depth++) {
    if (bit_depth != 32) {
      // TODO: test other float types once they work
      break;
    }

    uint32_t exponent_bit_depth;
    if (bit_depth < 10) {
      exponent_bit_depth = 2;
    } else if (bit_depth < 12) {
      exponent_bit_depth = 3;
    } else if (bit_depth < 16) {
      exponent_bit_depth = 4;
    } else if (bit_depth < 20) {
      exponent_bit_depth = 5;
    } else if (bit_depth < 24) {
      exponent_bit_depth = 6;
    } else if (bit_depth < 28) {
      exponent_bit_depth = 7;
    } else {
      exponent_bit_depth = 8;
    }

    io.metadata.m.bit_depth.bits_per_sample = bit_depth;
    io.metadata.m.bit_depth.floating_point_sample = true;
    io.metadata.m.bit_depth.exponent_bits_per_sample = exponent_bit_depth;

    CodecInOut io2;
    Roundtrip(&io, cparams, dparams, pool, &io2);

    EXPECT_EQ(bit_depth, io2.metadata.m.bit_depth.bits_per_sample);
    EXPECT_TRUE(io2.metadata.m.bit_depth.floating_point_sample);
    EXPECT_EQ(exponent_bit_depth,
              io2.metadata.m.bit_depth.exponent_bits_per_sample);
    EXPECT_EQ(0, io2.metadata.m.GetAlphaBits());
  }
}

TEST(JxlTest, RoundtripAlpha16) {
  ThreadPoolInternal pool(4);

  size_t xsize = 1200, ysize = 160;
  Image3F color(xsize, ysize);
  ImageF alpha(xsize, ysize);
  // Generate 16-bit pattern that uses various colors and alpha values.
  for (size_t y = 0; y < ysize; y++) {
    for (size_t x = 0; x < xsize; x++) {
      color.PlaneRow(0, y)[x] = (y * 65535 / ysize) * (1.0f / 65535);
      color.PlaneRow(1, y)[x] = (x * 65535 / xsize) * (1.0f / 65535);
      color.PlaneRow(2, y)[x] =
          ((y + x) * 65535 / (xsize + ysize)) * (1.0f / 65535);
      alpha.Row(y)[x] = (x * 65535 / xsize) * (1.0f / 65535);
    }
  }
  const bool is_gray = false;
  CodecInOut io;
  io.metadata.m.SetUintSamples(16);
  io.metadata.m.SetAlphaBits(16);
  io.metadata.m.color_encoding = ColorEncoding::SRGB(is_gray);
  io.SetFromImage(std::move(color), io.metadata.m.color_encoding);
  io.Main().SetAlpha(std::move(alpha), /*alpha_is_premultiplied=*/false);

  // The image is wider than 512 pixels to ensure multiple groups are tested.

  ASSERT_NE(io.xsize(), 0);
  ASSERT_TRUE(io.metadata.m.HasAlpha());
  ASSERT_TRUE(io.Main().HasAlpha());

  CompressParams cparams;
  cparams.butteraugli_distance = 0.5;
  // Prevent the test to be too slow, does not affect alpha
  cparams.speed_tier = SpeedTier::kSquirrel;
  DecompressParams dparams;

  io.metadata.m.SetUintSamples(16);
  EXPECT_TRUE(io.metadata.m.color_encoding.tf.IsSRGB());
  PassesEncoderState enc_state;
  AuxOut* aux_out = nullptr;
  PaddedBytes compressed;
  EXPECT_TRUE(
      EncodeFile(cparams, &io, &enc_state, &compressed, aux_out, &pool));
  CodecInOut io2;
  EXPECT_TRUE(DecodeFile(dparams, compressed, &io2, &pool));

  EXPECT_TRUE(SamePixels(*io.Main().alpha(), *io2.Main().alpha()));
}

namespace {
CompressParams CParamsForLossless() {
  CompressParams cparams;
  cparams.modular_mode = true;
  cparams.color_transform = jxl::ColorTransform::kNone;
  cparams.quality_pair = {100, 100};
  cparams.options.predictor = {Predictor::Weighted};
  return cparams;
}
}  // namespace

TEST(JxlTest, RoundtripLossless16Alpha) {
  ThreadPool* pool = nullptr;

  size_t xsize = 1200, ysize = 160;
  Image3F color(xsize, ysize);
  ImageF alpha(xsize, ysize);
  // Generate 16-bit pattern that uses various colors and alpha values.
  for (size_t y = 0; y < ysize; y++) {
    for (size_t x = 0; x < xsize; x++) {
      color.PlaneRow(0, y)[x] = (y * 65535 / ysize) * (1.0f / 65535);
      color.PlaneRow(1, y)[x] = (x * 65535 / xsize) * (1.0f / 65535);
      color.PlaneRow(2, y)[x] =
          ((y + x) * 65535 / (xsize + ysize)) * (1.0f / 65535);
      alpha.Row(y)[x] = (x * 65535 / xsize) * (1.0f / 65535);
    }
  }
  const bool is_gray = false;
  CodecInOut io;
  io.metadata.m.SetUintSamples(16);
  io.metadata.m.SetAlphaBits(16);
  io.metadata.m.color_encoding = ColorEncoding::SRGB(is_gray);
  io.SetFromImage(std::move(color), io.metadata.m.color_encoding);
  io.Main().SetAlpha(std::move(alpha), /*alpha_is_premultiplied=*/false);

  EXPECT_EQ(16, io.metadata.m.GetAlphaBits());
  EXPECT_EQ(16, io.metadata.m.bit_depth.bits_per_sample);
  EXPECT_FALSE(io.metadata.m.bit_depth.floating_point_sample);
  EXPECT_EQ(0, io.metadata.m.bit_depth.exponent_bits_per_sample);

  CompressParams cparams = CParamsForLossless();
  DecompressParams dparams;

  CodecInOut io2;
  EXPECT_LE(Roundtrip(&io, cparams, dparams, pool, &io2), 7100);
  // If this test fails with a very close to 0.0 but not exactly 0.0 butteraugli
  // distance, then there is likely a floating point issue, that could be
  // happening either in io or io2. The values of io are generated by
  // external_image.cc, and those in io2 by the jxl decoder. If they use
  // slightly different floating point operations (say, one does "i / 257.0f"
  // while the other does "i * (1.0f / 257)" they will get slightly different
  // values. To fix, ensure both sides do the following formula for converting
  // integer range 0-65535 to Image3F floating point range 0.0f-255.0f:
  // "i * (1.0f / 257)".
  // Note that this precision issue is not a problem in practice if the values
  // are equal when rounded to 16-bit int, but currently full exact precision is
  // tested.
  EXPECT_EQ(0.0, ButteraugliDistance(io, io2, cparams.ba_params,
                                     /*distmap=*/nullptr, pool));
  EXPECT_TRUE(SamePixels(*io.Main().alpha(), *io2.Main().alpha()));
  EXPECT_EQ(16, io2.metadata.m.GetAlphaBits());
  EXPECT_EQ(16, io2.metadata.m.bit_depth.bits_per_sample);
  EXPECT_FALSE(io2.metadata.m.bit_depth.floating_point_sample);
  EXPECT_EQ(0, io2.metadata.m.bit_depth.exponent_bits_per_sample);
}

TEST(JxlTest, RoundtripLossless16AlphaNotMisdetectedAs8Bit) {
  ThreadPool* pool = nullptr;

  size_t xsize = 128, ysize = 128;
  Image3F color(xsize, ysize);
  ImageF alpha(xsize, ysize);
  // All 16-bit values, both color and alpha, of this image are below 64.
  // This allows testing if a code path wrongly concludes it's an 8-bit instead
  // of 16-bit image (or even 6-bit).
  for (size_t y = 0; y < ysize; y++) {
    for (size_t x = 0; x < xsize; x++) {
      color.PlaneRow(0, y)[x] = (y * 64 / ysize) * (1.0f / 65535);
      color.PlaneRow(1, y)[x] = (x * 64 / xsize) * (1.0f / 65535);
      color.PlaneRow(2, y)[x] =
          ((y + x) * 64 / (xsize + ysize)) * (1.0f / 65535);
      alpha.Row(y)[x] = (64 * x / xsize) * (1.0f / 65535);
    }
  }
  const bool is_gray = false;
  CodecInOut io;
  io.metadata.m.SetUintSamples(16);
  io.metadata.m.SetAlphaBits(16);
  io.metadata.m.color_encoding = ColorEncoding::SRGB(is_gray);
  io.SetFromImage(std::move(color), io.metadata.m.color_encoding);
  io.Main().SetAlpha(std::move(alpha), /*alpha_is_premultiplied=*/false);

  EXPECT_EQ(16, io.metadata.m.GetAlphaBits());
  EXPECT_EQ(16, io.metadata.m.bit_depth.bits_per_sample);
  EXPECT_FALSE(io.metadata.m.bit_depth.floating_point_sample);
  EXPECT_EQ(0, io.metadata.m.bit_depth.exponent_bits_per_sample);

  CompressParams cparams = CParamsForLossless();
  DecompressParams dparams;

  CodecInOut io2;
  EXPECT_LE(Roundtrip(&io, cparams, dparams, pool, &io2), 3100);
  EXPECT_EQ(16, io2.metadata.m.GetAlphaBits());
  EXPECT_EQ(16, io2.metadata.m.bit_depth.bits_per_sample);
  EXPECT_FALSE(io2.metadata.m.bit_depth.floating_point_sample);
  EXPECT_EQ(0, io2.metadata.m.bit_depth.exponent_bits_per_sample);
  // If fails, see note about floating point in RoundtripLossless8.
  EXPECT_EQ(0.0, ButteraugliDistance(io, io2, cparams.ba_params,
                                     /*distmap=*/nullptr, pool));
  EXPECT_TRUE(SamePixels(*io.Main().alpha(), *io2.Main().alpha()));
}

TEST(JxlTest, RoundtripUnalignedD2) {
  ThreadPool* pool = nullptr;
  const PaddedBytes orig =
      ReadTestData("wesaturate/500px/u76c0g_bliznaca_srgb8.png");
  CodecInOut io;
  ASSERT_TRUE(SetFromBytes(Span<const uint8_t>(orig), &io, pool));
  io.ShrinkTo(io.xsize() / 12, io.ysize() / 7);

  CompressParams cparams;
  cparams.butteraugli_distance = 2.0;
  DecompressParams dparams;

  CodecInOut io2;
  EXPECT_LE(Roundtrip(&io, cparams, dparams, pool, &io2), 700);
  EXPECT_LE(ButteraugliDistance(io, io2, cparams.ba_params,
                                /*distmap=*/nullptr, pool),
            3.2);
}

namespace {

jxl::Status DecompressJxlToJPEGForTest(
    const jpegxl::tools::JpegXlContainer& container, jxl::ThreadPool* pool,
    jxl::PaddedBytes* output) {
  output->clear();
  jxl::Span<const uint8_t> compressed(container.codestream,
                                      container.codestream_size);

  JXL_RETURN_IF_ERROR(compressed.size() >= 2);

  // JXL case
  // Decode to DCT when possible and generate a JPG file.
  jxl::CodecInOut io;
  jxl::DecompressParams params;
  params.keep_dct = true;
  if (!jpegxl::tools::DecodeJpegXlToJpeg(params, container, &io, pool)) {
    return JXL_FAILURE("Failed to decode JXL to JPEG");
  }
  io.jpeg_quality = 95;
  if (!EncodeImageJPG(&io, jxl::JpegEncoder::kLibJpeg, io.jpeg_quality,
                      jxl::YCbCrChromaSubsampling(), pool, output,
                      jxl::DecodeTarget::kQuantizedCoeffs)) {
    return JXL_FAILURE("Failed to generate JPEG");
  }
  return true;
}

}  // namespace

size_t RoundtripJpeg(const PaddedBytes& jpeg_in, ThreadPool* pool) {
  CodecInOut io;
  io.dec_target = jxl::DecodeTarget::kQuantizedCoeffs;
  EXPECT_TRUE(SetFromBytes(Span<const uint8_t>(jpeg_in), &io, pool));
  CompressParams cparams;
  cparams.color_transform = jxl::ColorTransform::kYCbCr;

  PassesEncoderState passes_enc_state;
  PaddedBytes compressed, codestream;

  EXPECT_TRUE(EncodeFile(cparams, &io, &passes_enc_state, &codestream,
                         /*aux_out=*/nullptr, pool));
  jpegxl::tools::JpegXlContainer enc_container;
  enc_container.codestream = codestream.data();
  enc_container.codestream_size = codestream.size();
  jpeg::JPEGData data_in = *io.Main().jpeg_data;
  jxl::PaddedBytes jpeg_data;
  EXPECT_TRUE(EncodeJPEGData(data_in, &jpeg_data));
  enc_container.jpeg_reconstruction = jpeg_data.data();
  enc_container.jpeg_reconstruction_size = jpeg_data.size();
  EXPECT_TRUE(EncodeJpegXlContainerOneShot(enc_container, &compressed));

  jpegxl::tools::JpegXlContainer container;
  EXPECT_TRUE(DecodeJpegXlContainerOneShot(compressed.data(), compressed.size(),
                                           &container));
  PaddedBytes out;
  EXPECT_TRUE(DecompressJxlToJPEGForTest(container, pool, &out));
  EXPECT_EQ(out.size(), jpeg_in.size());
  size_t failures = 0;
  for (size_t i = 0; i < std::min(out.size(), jpeg_in.size()); i++) {
    if (out[i] != jpeg_in[i]) {
      EXPECT_EQ(out[i], jpeg_in[i])
          << "byte mismatch " << i << " " << out[i] << " != " << jpeg_in[i];
      if (++failures > 4) {
        return compressed.size();
      }
    }
  }
  return compressed.size();
}

TEST(JxlTest, JXL_TRANSCODE_JPEG_TEST(RoundtripJpegRecompression444)) {
  ThreadPoolInternal pool(8);
  const PaddedBytes orig =
      ReadTestData("imagecompression.info/flower_foveon.png.im_q85_444.jpg");
  // JPEG size is 326'916 bytes.
  EXPECT_LE(RoundtripJpeg(orig, &pool), 256000);
}

TEST(JxlTest, JXL_TRANSCODE_JPEG_TEST(RoundtripJpegRecompressionToPixels)) {
  ThreadPoolInternal pool(8);
  const PaddedBytes orig =
      ReadTestData("imagecompression.info/flower_foveon.png.im_q85_444.jpg");
  CodecInOut io;
  io.dec_target = jxl::DecodeTarget::kQuantizedCoeffs;
  ASSERT_TRUE(SetFromBytes(Span<const uint8_t>(orig), &io, &pool));

  CodecInOut io2;
  ASSERT_TRUE(SetFromBytes(Span<const uint8_t>(orig), &io2, &pool));

  CompressParams cparams;
  cparams.color_transform = jxl::ColorTransform::kYCbCr;

  DecompressParams dparams;

  CodecInOut io3;
  Roundtrip(&io, cparams, dparams, &pool, &io3);

  // TODO(eustas): investigate, why SJPEG and JpegRecompression pixels are
  // different.
  EXPECT_GE(1.8, ButteraugliDistance(io2, io3, cparams.ba_params,
                                     /*distmap=*/nullptr, &pool));
}

TEST(JxlTest, JXL_TRANSCODE_JPEG_TEST(RoundtripJpegRecompressionGray)) {
  ThreadPoolInternal pool(8);
  const PaddedBytes orig =
      ReadTestData("imagecompression.info/flower_foveon.png.im_q85_gray.jpg");
  // JPEG size is 167'025 bytes.
  EXPECT_LE(RoundtripJpeg(orig, &pool), 140000);
}

TEST(JxlTest, JXL_TRANSCODE_JPEG_TEST(RoundtripJpegRecompression420)) {
  ThreadPoolInternal pool(8);
  const PaddedBytes orig =
      ReadTestData("imagecompression.info/flower_foveon.png.im_q85_420.jpg");
  // JPEG size is 226'018 bytes.
  EXPECT_LE(RoundtripJpeg(orig, &pool), 181050);
}

TEST(JxlTest,
     JXL_TRANSCODE_JPEG_TEST(RoundtripJpegRecompression_luma_subsample)) {
  ThreadPoolInternal pool(8);
  const PaddedBytes orig = ReadTestData(
      "imagecompression.info/flower_foveon.png.im_q85_luma_subsample.jpg");
  // JPEG size is 216'069 bytes.
  EXPECT_LE(RoundtripJpeg(orig, &pool), 181000);
}

TEST(JxlTest, JXL_TRANSCODE_JPEG_TEST(RoundtripJpegRecompression444_12)) {
  // 444 JPEG that has an interesting sampling-factor (1x2, 1x2, 1x2).
  ThreadPoolInternal pool(8);
  const PaddedBytes orig = ReadTestData(
      "imagecompression.info/flower_foveon.png.im_q85_444_1x2.jpg");
  // JPEG size is 329'942 bytes.
  EXPECT_LE(RoundtripJpeg(orig, &pool), 256000);
}

TEST(JxlTest, JXL_TRANSCODE_JPEG_TEST(RoundtripJpegRecompression422)) {
  ThreadPoolInternal pool(8);
  const PaddedBytes orig =
      ReadTestData("imagecompression.info/flower_foveon.png.im_q85_422.jpg");
  // JPEG size is 265'590 bytes.
  EXPECT_LE(RoundtripJpeg(orig, &pool), 209000);
}

TEST(JxlTest, JXL_TRANSCODE_JPEG_TEST(RoundtripJpegRecompression440)) {
  ThreadPoolInternal pool(8);
  const PaddedBytes orig =
      ReadTestData("imagecompression.info/flower_foveon.png.im_q85_440.jpg");
  // JPEG size is 262'249 bytes.
  EXPECT_LE(RoundtripJpeg(orig, &pool), 209000);
}

TEST(JxlTest, JXL_TRANSCODE_JPEG_TEST(RoundtripJpegRecompression_asymmetric)) {
  // 2x vertical downsample of one chroma channel, 2x horizontal downsample of
  // the other.
  ThreadPoolInternal pool(8);
  const PaddedBytes orig = ReadTestData(
      "imagecompression.info/flower_foveon.png.im_q85_asymmetric.jpg");
  // JPEG size is 262'249 bytes.
  EXPECT_LE(RoundtripJpeg(orig, &pool), 209000);
}

TEST(JxlTest, JXL_TRANSCODE_JPEG_TEST(RoundtripJpegRecompression420Progr)) {
  ThreadPoolInternal pool(8);
  const PaddedBytes orig = ReadTestData(
      "imagecompression.info/flower_foveon.png.im_q85_420_progr.jpg");
  EXPECT_LE(RoundtripJpeg(orig, &pool), 181000);
}

TEST(JxlTest,
     JXL_TRANSCODE_JPEG_TEST(RoundtripJpegRecompressionToPixels420Mul16)) {
  ThreadPoolInternal pool(8);
  const PaddedBytes orig =
      ReadTestData("imagecompression.info/flower_foveon_cropped.jpg");

  for (auto c  : orig)
  {
    std::cout << (int)c;
  }
  std::cout << std::endl;

  CodecInOut io;
  io.dec_target = jxl::DecodeTarget::kQuantizedCoeffs;
  ASSERT_TRUE(SetFromBytes(Span<const uint8_t>(orig), &io, &pool));

  CodecInOut io2;
  ASSERT_TRUE(SetFromBytes(Span<const uint8_t>(orig), &io2, &pool));

  CompressParams cparams;
  cparams.color_transform = jxl::ColorTransform::kYCbCr;

  DecompressParams dparams;

  CodecInOut io3;
  Roundtrip(&io, cparams, dparams, &pool, &io3);

  EXPECT_GE(1.5, ButteraugliDistance(io2, io3, cparams.ba_params,
                                     /*distmap=*/nullptr, &pool));
}

}  // namespace
}  // namespace jxl
