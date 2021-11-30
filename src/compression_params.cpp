#include "compression_params.h"

bool parse_options(const CompressOptions &options, jxl::CompressParams &params, jxl::CodecInOut &io)
{
    params.colorspace = options.colorspace;
    params.color_transform = options.colortransform;
    params.resampling = options.resampling;

    if (options.faster_decoding < 0 || options.faster_decoding > 4)
        return false;

    params.decoding_speed_tier = options.faster_decoding;

    if (options.quality_mode == QualityMode::Quality)
    {
        if (options.quality < 0.f || options.quality > 100.f)
            return false;

        if (options.quality < 7.f || options.quality == 100.f)
        {
            params.modular_mode = true;
            params.quality_pair.first = params.quality_pair.second =
                std::min(35 + (options.quality - 7.f) * 3.0f, 100.0f);
        }
        else
        {
            params.modular_mode = false;
            if (options.quality >= 30.f)
                params.butteraugli_distance = 0.1f + (100.f - options.quality) * 0.09f;
            else
                params.butteraugli_distance = 6.4f + pow(2.5f, (30.f - options.quality) / 5.0f) / 6.25f;
        }
    }
    else if (options.quality_mode == QualityMode::Distance)
    {
        if (options.distance < 0.f || options.distance > 25.0f)
            return false;

        params.butteraugli_distance = options.distance;
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