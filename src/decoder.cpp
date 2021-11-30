#include "decoder.h"

#include <avif/avif.h>
#include <webp/decode.h>
#include <webp/demux.h>

#include <iostream>

decode_data decode_avif(const uint8_t* avif_image, const size_t size, uint32_t& avif_size, uint32_t& width, uint32_t& height)
{
    auto* image = avifImageCreateEmpty();
    auto* decoder = avifDecoderCreate();
    decode_data pixels = nullptr;

    const auto decode_status = avifDecoderReadMemory(decoder, image, avif_image, size);
    avifDecoderDestroy(decoder);

    if (decode_status == AVIF_RESULT_OK)
    {
        avifRGBImage rgb;
        avifRGBImageSetDefaults(&rgb, image); 
        rgb.depth = depth;  

        avifRGBImageAllocatePixels(&rgb);

        if (avifImageYUVToRGB(image, &rgb) == AVIF_RESULT_OK)
        {
            width = rgb.width;
            height = rgb.height;
            avif_size = rgb.rowBytes * rgb.height;

            pixels.reset(rgb.pixels);
            rgb.pixels = nullptr;
        }
        avifRGBImageFreePixels(&rgb);
    }
    avifImageDestroy(image);
    return pixels;
}

decode_data decode_webp(const uint8_t* webp_image, const size_t size, uint32_t& webp_size, uint32_t& width, uint32_t& height)
{
    int iwidth, iheight;
    auto image = decode_data{WebPDecodeRGBA(webp_image, size, &iwidth, &iheight)};
    
    width = static_cast<uint32_t>(iwidth);
    height = static_cast<uint32_t>(iheight);
    webp_size = width * height * 4;
    
    return image;
}