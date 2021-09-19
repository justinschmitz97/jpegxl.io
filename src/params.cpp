#include "params.h"

bool parse_options(const CompressOptions& options, jxl::CompressParams& params, jxl::CodecInOut& io)
{
    params.colorspace = options.colorspace;
    params.color_transform = options.colortransform;
    params.resampling = options.resampling;

    if (options.faster_decoding < 0 || options.faster_decoding > 4)
        return false;

    params.decoding_speed_tier = options.faster_decoding;

    if (options.quality < 7 || options.quality == 100) 
    {
        if (options.quality < 100) 
            params.modular_mode = true;
        params.quality_pair.first = params.quality_pair.second =
            std::min(35 + (options.quality - 7) * 3.0f, 100.0f);
    }

    if (options.effort < 1 || options.effort > 9)
        return false;

    const auto speed_tier_number = 10 - options.effort;
    params.speed_tier = jxl::SpeedTier(speed_tier_number);

    if (options.progressive)
    {
        params.qprogressive_mode = true;
        params.responsive = 1;
    }

    if (options.override_bitdepth > 32)
        return false;
    if (options.override_bitdepth != 0)
    {
        if (options.override_bitdepth == 32)
            io.metadata.m.SetFloat32Samples();
        else
            io.metadata.m.SetUintSamples(options.override_bitdepth);
    }
    
    if (options.epf > 3)
        return false;
    params.epf = options.epf;

    return true;
}

CompressOptions create_options()
{
    return {};
}