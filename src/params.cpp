#include "params.h"

//quality

bool parse_options(const CompressOptions& options, jxl::CompressParams& params, jxl::CodecInOut& io)
{
    params.colorspace = options.colorspace;
    params.color_transform = options.colortransform;
    params.resampling = options.resampling;

    const auto valid_speed_tier = jxl::ParseSpeedTier(options.effort, &params.speed_tier);
    if (!valid_speed_tier && !options.effort.empty())
        return false;

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