#pragma once

#include <memory>

#include <extras/codec.h>
#include <jxl/base/thread_pool_internal.h>
#include <jxl/codec_in_out.h>
#include <jxl/enc_cache.h>

class IEncoder;

std::unique_ptr<IEncoder> create_encoder();

class IEncoder
{
public:
    IEncoder() = default;
    virtual ~IEncoder() = default;

    IEncoder(const IEncoder&) = delete;
    IEncoder& operator=(const IEncoder&) = delete;

    virtual bool encode(const jxl::CompressParams& params, 
                        const jxl::CodecInOut* io, 
                        jxl::PaddedBytes* compressed, 
                        jxl::ThreadPool* pool) const = 0;
};

class JXLEncoder final : public IEncoder
{
public:
    JXLEncoder() = default;

    virtual bool encode(const jxl::CompressParams& params, 
                        const jxl::CodecInOut* io, 
                        jxl::PaddedBytes* compressed, 
                        jxl::ThreadPool* pool) const final;
};