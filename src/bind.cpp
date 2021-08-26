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

val jxlCompress(const uintptr_t data, const size_t size)
{

  jxl::ThreadPoolInternal pool;
  jxl::CodecInOut io;
  const auto encoder = create_encoder(data, size, &io, &pool);

  if (!encoder)
    return val::null();

  jxl::PaddedBytes compressed;
  jxl::CompressParams params;
  if (!encoder->encode(params, &io, &compressed, &pool))
    return val::null();

  const auto Uint8ClampedArray = val::global("Uint8ClampedArray");
  return Uint8ClampedArray.new_(typed_memory_view(compressed.size(), compressed.data()));
}

EMSCRIPTEN_BINDINGS(JPEGXL)
{
  function("jxlCompress", &jxlCompress);
}