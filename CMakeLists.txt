cmake_minimum_required(VERSION 3.16)

set(JPEGXL_PATH "../jpeg-xl/lib/include" CACHE STRING "Path to JPEG-XL lib")

project(wjpegxl)

set(CMAKE_C_COMPILER "emcc")
set(CMAKE_CXX_COMPILER "em++")

add_executable(wjpegxl 
    src/bind.cpp
    src/encoder.cpp
    src/decoder.cpp
    src/compression_params.cpp
)

target_include_directories(wjpegxl PUBLIC ${JPEGXL_PATH} "../jpeg-xl/lib" "/home/antonov548/jpeg-xl" "/home/antonov548/jpeg-xl/third_party/highway" "/home/antonov548/libavif-0.9.0/include" "/home/antonov548/libwebp-1.2.1")
target_link_directories(wjpegxl PRIVATE libs/ /home/antonov548/zlib/build/ /home/antonov548/jpeg-9c/.libs/ /home/antonov548/giflib-5.1.9/)
target_link_libraries(wjpegxl jxl jxl_threads hwy skcms jxl_extras-static lodepng jpeg sjpeg z gif avif yuv gav1 webp)
target_compile_definitions(wjpegxl PUBLIC -DJPEGXL_ENABLE_JPEG=1 -DJPEGXL_ENABLE_SJPEG=1 -DJPEGXL_ENABLE_GIF=1)
set_target_properties(wjpegxl PROPERTIES LINK_FLAGS "--bind -s ALLOW_MEMORY_GROWTH=1 -s WASM=1 -s EXIT_RUNTIME=0 -s INVOKE_RUN=0 -s MODULARIZE=1 -s EXPORT_NAME=JXL -flto -O3")