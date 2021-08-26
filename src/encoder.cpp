#include "encoder.h"

#include <jxl/enc_file.h>
#include <jxl/enc_external_image.h>
#include <avif/avif.h>

#include <iostream>

std::unique_ptr<IEncoder> create_encoder(const uintptr_t data, const size_t size, jxl::CodecInOut* io, jxl::ThreadPoolInternal* pool)
{
    const auto* data_buffer = reinterpret_cast<const uint8_t*>(data);

    jxl::Codec input_codec;
    if (jxl::SetFromBytes(jxl::Span<const uint8_t>(data_buffer, size), io, pool, &input_codec))
        return std::make_unique<JXLEncoder>();

    const auto avif_data = avifROData{data_buffer, size};
    if (avifPeekCompatibleFileType(&avif_data))
    {
        uint32_t avif_size;
        uint32_t width;
        uint32_t height;
        auto avif_image = decode_avif(data_buffer, size, avif_size, width, height);

        if (avif_image)
            return std::make_unique<JXLExternalEncoder>(std::move(avif_image), avif_size, width, height);
    }
    return nullptr;
}

bool JXLEncoder::encode(const jxl::CompressParams& params, jxl::CodecInOut* io, jxl::PaddedBytes* compressed, jxl::ThreadPool* pool) const
{
    jxl::PassesEncoderState passes_encoder_state;
    return jxl::EncodeFile(params, io, &passes_encoder_state, compressed, nullptr, pool);
}

JXLExternalEncoder::JXLExternalEncoder(decode_data data, uint32_t size, uint32_t width, uint32_t height)
: m_data(std::move(data))
, m_size(size)
, m_width(width)
, m_height(height)
{
}

bool JXLExternalEncoder::encode(const jxl::CompressParams& params, jxl::CodecInOut* io, jxl::PaddedBytes* compressed, jxl::ThreadPool* pool) const
{
    io->metadata.m.SetAlphaBits(avif_depth);
    io->metadata.m.bit_depth.bits_per_sample = avif_depth;
    if (io->metadata.size.Set(m_width, m_height)) 
    {
        jxl::ImageBundle* main = &io->Main();
        if (jxl::ConvertFromExternal(
            jxl::Span<const uint8_t>(reinterpret_cast<const uint8_t*>(m_data.get()), m_size), m_width,
            m_height, jxl::ColorEncoding::SRGB(false), true,
            false, avif_depth, JXL_LITTLE_ENDIAN,
            false, pool, main))
        {
            jxl::PassesEncoderState passes_encoder_state;
            return jxl::EncodeFile(params, io, &passes_encoder_state, compressed, nullptr, pool);
        }
    }
    return false;
}