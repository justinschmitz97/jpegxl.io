#include "encoder.h"

#include <jxl/enc_file.h>

std::unique_ptr<IEncoder> create_encoder()
{
    return std::make_unique<JXLEncoder>();
}

bool JXLEncoder::encode(const jxl::CompressParams& params, const jxl::CodecInOut* io, jxl::PaddedBytes* compressed, jxl::ThreadPool* pool) const
{
    jxl::PassesEncoderState passes_encoder_state;
    return jxl::EncodeFile(params, io, &passes_encoder_state, compressed, nullptr, pool);
}