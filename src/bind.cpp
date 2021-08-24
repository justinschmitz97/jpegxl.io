#include <emscripten/bind.h>
#include <emscripten/val.h>

#include <iostream>

#include <limits.h>
#include <string.h>

#include <sstream>
#include <string>
#include <vector>

#include "encoder.h"

using namespace emscripten;

val jxlCompress(const uintptr_t i_data, const size_t i_size)
{
  const auto* data = reinterpret_cast<const uint8_t*>(i_data);

  jxl::ThreadPoolInternal pool;
  jxl::PaddedBytes compressed;
  jxl::CodecInOut io;
  jxl::Codec input_codec;
  if (!jxl::SetFromBytes(jxl::Span<const uint8_t>(data, i_size), &io, &pool, &input_codec))
    return val::null();

  const auto encoder = create_encoder();

  jxl::CompressParams params;
  jxl::PassesEncoderState passes_encoder_state;
  if (!encoder->encode(params, &io, &compressed, &pool))
    return val::null();

  const auto Uint8ClampedArray = val::global("Uint8ClampedArray");
  return Uint8ClampedArray.new_(typed_memory_view(compressed.size(), compressed.data()));
}

EMSCRIPTEN_BINDINGS(JPEGXL)
{
  function("jxlCompress", &jxlCompress);
}