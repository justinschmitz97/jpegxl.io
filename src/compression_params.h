#pragma once

#include <jxl/enc_params.h>
#include <jxl/frame_header.h>
#include <jxl/codec_in_out.h>

enum class QualityMode 
{
    Quality,
    Distance
};

struct CompressOptions
{
    int epf = -1;
    int colorspace = -1;
    float quality;
    float distance;
    bool progressive = false;
    size_t override_bitdepth = 0; 
    size_t resampling = 1; 
    int effort;
    size_t faster_decoding = 0;
    jxl::ColorTransform colortransform = jxl::ColorTransform::kXYB;
    QualityMode quality_mode;
};

bool parse_options(const CompressOptions& options, jxl::CompressParams& params, jxl::CodecInOut& io);

CompressOptions create_options();