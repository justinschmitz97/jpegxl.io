#include "decoder.h"

#include <avif/avif.h>

#include <iostream>

decode_data decode_avif(const uint8_t* avif_image, const size_t size, uint32_t& avif_size, uint32_t& width, uint32_t& height)
{
    avifImage* image = avifImageCreateEmpty();
    avifDecoder* decoder = avifDecoderCreate();
    decode_data pixels = nullptr;

    const auto decode_status = avifDecoderReadMemory(decoder, image, avif_image, size);
    avifDecoderDestroy(decoder);

    if (decode_status == AVIF_RESULT_OK)
    {
        avifRGBImage rgb;
        avifRGBImageSetDefaults(&rgb, image); 
        rgb.depth = avif_depth;  

        avifRGBImageAllocatePixels(&rgb);

        if (avifImageYUVToRGB(image, &rgb) == AVIF_RESULT_OK)
        {
            width = rgb.width;
            height = rgb.height;
            avif_size = rgb.rowBytes * rgb.height;

            pixels = std::make_unique<uint8_t[]>(avif_size);

            for (uint32_t i = 0; i < avif_size; ++i)
                pixels[i] = rgb.pixels[i];
        }
        avifRGBImageFreePixels(&rgb);
    }
    avifImageDestroy(image);

    return pixels;
}