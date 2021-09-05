#pragma once

#include <jxl/enc_params.h>
#include <jxl/frame_header.h>
#include <jxl/codec_in_out.h>

struct CompressOptions
{
    int epf = -1;
    int colorspace = -1;
    float quality;
    bool progressive = false;
    size_t override_bitdepth = 0; 
    size_t resampling = 1; 
    int effort;
    jxl::ColorTransform colortransform = jxl::ColorTransform::kXYB;
};

bool parse_options(const CompressOptions& options, jxl::CompressParams& params, jxl::CodecInOut& io);

CompressOptions create_options();