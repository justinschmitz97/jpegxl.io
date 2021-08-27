#include <emscripten/bind.h>
#include <emscripten/val.h>

#include <limits.h>
#include <string.h>

#include <sstream>
#include <string>
#include <vector>

#include "encoder.h"
#include "params.h"

using namespace emscripten;

val jxlCompress(const uintptr_t data, const size_t size, const CompressOptions& options)
{
    jxl::ThreadPoolInternal pool;
    jxl::CodecInOut io;
    const auto encoder = create_encoder(data, size, &io, &pool);

    if (!encoder)
        return val::null();

    jxl::PaddedBytes compressed;
    jxl::CompressParams params;

    if (!parse_options(options, params, io))
        return val::null();
    
    if (!encoder->encode(params, &io, &compressed, &pool))
        return val::null();

    const auto Uint8ClampedArray = val::global("Uint8ClampedArray");
    return Uint8ClampedArray.new_(typed_memory_view(compressed.size(), compressed.data()));
}

EMSCRIPTEN_BINDINGS(JPEGXL)
{
    function("jxlCompress", &jxlCompress);

    enum_<jxl::SpeedTier>("SpeedTier")
        .value("Tortoise", jxl::SpeedTier::kTortoise)
        .value("Kitten", jxl::SpeedTier::kKitten)
        .value("Squirrel", jxl::SpeedTier::kSquirrel)
        .value("Wombat", jxl::SpeedTier::kWombat)
        .value("Hare", jxl::SpeedTier::kHare)
        .value("Cheetah", jxl::SpeedTier::kCheetah)
        .value("Falcon", jxl::SpeedTier::kFalcon)
        .value("Thunder", jxl::SpeedTier::kThunder)
        .value("Lightning", jxl::SpeedTier::kLightning);
    
    enum_<jxl::ColorTransform>("ColorTransform")
        .value("XYB", jxl::ColorTransform::kXYB)
        .value("None", jxl::ColorTransform::kNone)
        .value("YCbCr", jxl::ColorTransform::kYCbCr);

    value_object<CompressOptions>("CompressOptions")
        .field("epf", &CompressOptions::epf)
        .field("colorspace", &CompressOptions::colorspace)
        .field("quality", &CompressOptions::quality)
        .field("progressive", &CompressOptions::progressive)
        .field("override_bitdepth", &CompressOptions::override_bitdepth)
        .field("resampling", &CompressOptions::resampling)
        .field("effort", &CompressOptions::effort)
        .field("colortransform", &CompressOptions::colortransform);

    function("createOptions", &create_options);
}