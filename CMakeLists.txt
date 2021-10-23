cmake_minimum_required(VERSION 3.16)

set(JPEGXL_PATH "" CACHE STRING "Path to JPEG-XL folder")
if("${JPEGXL_PATH}" STREQUAL "")
    message(FATAL_ERROR "Should specify path to JPEG-XL folder with JPEGXL_PATH option")
endif()

set(AVIF_PATH "" CACHE STRING "Path to AVIF 0.9.0 folder")
if("${AVIF_PATH}" STREQUAL "")
    message(FATAL_ERROR "Should specify path to AVIF 0.9.0 folder with AVIF_PATH option")
endif()

set(WEBP_PATH "" CACHE STRING "Path to WEBP 1.2.1 folder")
if("${WEBP_PATH}" STREQUAL "")
    message(FATAL_ERROR "Should specify path to WEBP 1.2.1 folder with WEBP_PATH option")
endif()

project(wjpegxl)

set(CMAKE_C_COMPILER "emcc")
set(CMAKE_CXX_COMPILER "em++")

add_executable(wjpegxl 
    src/bind.cpp
    src/encoder.cpp
    src/decoder.cpp
    src/compression_params.cpp
)

target_include_directories(wjpegxl PUBLIC ${JPEGXL_PATH} "${AVIF_PATH}include" "${WEBP_PATH}src" "${JPEGXL_PATH}lib" "${JPEGXL_PATH}lib/include" "${JPEGXL_PATH}third_party/highway")
target_link_directories(wjpegxl PRIVATE libs/)
target_link_libraries(wjpegxl jxl jxl_threads hwy skcms jxl_extras-static lodepng jpeg sjpeg z gif avif yuv gav1 webp)
target_compile_definitions(wjpegxl PUBLIC -DJPEGXL_ENABLE_JPEG=1 -DJPEGXL_ENABLE_SJPEG=1 -DJPEGXL_ENABLE_GIF=1)
set_target_properties(wjpegxl PROPERTIES LINK_FLAGS "--bind -s ALLOW_MEMORY_GROWTH=1 -s WASM=1 -s EXIT_RUNTIME=0 -s INVOKE_RUN=0 -s MODULARIZE=1 -s EXPORT_NAME=JXL -flto -O3")