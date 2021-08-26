#pragma once

#include <memory>

#include <extras/codec.h>
#include <jxl/base/thread_pool_internal.h>
#include <jxl/codec_in_out.h>
#include <jxl/enc_cache.h>

#include "decoder.h"

class IEncoder;

std::unique_ptr<IEncoder> create_encoder(const uintptr_t data, const size_t size, jxl::CodecInOut* io, jxl::ThreadPoolInternal* pool);

class IEncoder
{
public:
    IEncoder() = default;
    virtual ~IEncoder() = default;

    IEncoder(const IEncoder&) = delete;
    IEncoder& operator=(const IEncoder&) = delete;

    virtual bool encode(const jxl::CompressParams& params, 
                        jxl::CodecInOut* io, 
                        jxl::PaddedBytes* compressed, 
                        jxl::ThreadPool* pool) const = 0;
};

class JXLEncoder final : public IEncoder
{
public:
    JXLEncoder() = default;

    virtual bool encode(const jxl::CompressParams& params, 
                        jxl::CodecInOut* io, 
                        jxl::PaddedBytes* compressed, 
                        jxl::ThreadPool* pool) const final;
};

class JXLAvifExternalEncoder final : public IEncoder
{
public:
    JXLAvifExternalEncoder(decode_data data, uint32_t size, uint32_t width, uint32_t height);

    virtual bool encode(const jxl::CompressParams& params, 
                        jxl::CodecInOut* io, 
                        jxl::PaddedBytes* compressed, 
                        jxl::ThreadPool* pool) const final;

private:
    const decode_data m_data;
    const uint32_t m_size;
    const uint32_t m_width;
    const uint32_t m_height;
};