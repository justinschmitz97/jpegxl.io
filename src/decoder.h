#pragma once

#include <memory>
#include <vector>
#include <stdint.h>

using decode_data = std::unique_ptr<uint8_t[]>;

constexpr uint32_t depth = 8;

decode_data decode_avif(const uint8_t* avif_image, const size_t size, uint32_t& avif_size, uint32_t& width, uint32_t& height);

decode_data decode_webp(const uint8_t* webp_image, const size_t size, uint32_t& webp_size, uint32_t& width, uint32_t& height);