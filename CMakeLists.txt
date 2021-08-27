cmake_minimum_required(VERSION 3.16)

set(JPEGXL_PATH "../jpeg-xl/lib/include" CACHE STRING "Path to JPEG-XL lib")

project(wjpegxl)

set(CMAKE_C_COMPILER "emcc")
set(CMAKE_CXX_COMPILER "em++")

add_executable(wjpegxl 
    src/bind.cpp
    src/encoder.cpp
    src/decoder.cpp
    src/params.cpp
)

target_include_directories(wjpegxl PUBLIC ${JPEGXL_PATH} "../jpeg-xl/lib" "/home/antonov548/jpeg-xl" "/home/antonov548/jpeg-xl/third_party/highway" "/home/antonov548/libavif-0.9.0/include" "/home/antonov548/libwebp-1.2.1")
target_link_directories(wjpegxl PRIVATE libs/ /home/antonov548/zlib/build/ /home/antonov548/jpeg-9c/.libs/ /home/antonov548/giflib-5.1.9/)
target_link_libraries(wjpegxl jxl jxl_threads hwy skcms jxl_extras-static lodepng jpeg sjpeg z gif avif yuv gav1 webp)
target_compile_definitions(wjpegxl PUBLIC -DJPEGXL_ENABLE_JPEG=1 -DJPEGXL_ENABLE_SJPEG=1 -DJPEGXL_ENABLE_GIF=1)
set_target_properties(wjpegxl PROPERTIES LINK_FLAGS "--bind -s ALLOW_MEMORY_GROWTH=1 -s WASM=1 -s EXIT_RUNTIME=0 -s INVOKE_RUN=0 -s MODULARIZE=1 -s FETCH=1 -s EXPORT_NAME=JXL -flto -O3 -ASSERTION=1 -g")

# add_executable(wjpegxl-tests 
#     test/bind.cpp
#     src/tests/jxl_test.cpp
#     src/tests/bit_reader_test.cpp
#     src/tests/bits_test.cpp
#     src/tests/decode_test.cpp
#     src/tests/encode_test.cpp
#     src/tests/data_parallel_test.cpp
#     src/tests/thread_parallel_runner_test.cpp
#     src/tests/image_ops_test.cpp
#     src/tests/codec_test.cpp
# )

# target_compile_options(wjpegxl-tests PUBLIC -DJPEGXL_ENABLE_SKCMS=1 -DJPEGXL_BUNDLE_SKCMS=1)
# target_compile_definitions(wjpegxl-tests PUBLIC -DTEST_DATA_PATH="testdata" -DJPEGXL_ENABLE_EXR=1 -DJPEGXL_ENABLE_JPEG=1 -DJPEGXL_ENABLE_SJPEG=1)
# target_include_directories(wjpegxl-tests  PUBLIC ${JPEGXL_PATH} "/home/antonov548/jpeg-xl" "/home/antonov548/jpeg-xl/third_party/googletest/googletest/include" "/home/antonov548/jpeg-xl/third_party/googletest/googlemock/include" "/home/antonov548/jpeg-xl/third_party/highway" "/home/antonov548/jpeg-xl/build/lib/include")
# target_link_directories(wjpegxl-tests PRIVATE libs/ /home/antonov548/zlib/build/ /home/antonov548/jpeg-9c/.libs/ /home/antonov548/openexr-3.1.1/build/_deps/imath-build/src/Imath/ /home/antonov548/openexr-3.1.1/src/lib/OpenEXR/build/ /home/antonov548/openexr-3.1.1/build/src/lib/OpenEXRCore/ /home/antonov548/openexr-3.1.1/build/src/lib/Iex/ /home/antonov548/openexr-3.1.1/build/src/lib/IlmThread/ /home/antonov548/jpeg-xl/build/tools/ /home/antonov548/jpeg-xl/build/tools/box/)
# target_link_libraries(wjpegxl-tests jxl jxl_threads hwy skcms lcms2 gtest gmock gtest_main gmock_main jxl_testlib-static jxl_profiler jxl_extras-static lodepng brotlienc-static brotlidec-static brotlicommon-static jpeg sjpeg OpenEXR OpenEXRCore-3_1 Imath-3_1 Iex-3_1 IlmThread-3_1 z djxltool box)
# set_target_properties(wjpegxl-tests PROPERTIES LINK_FLAGS "--bind -s ALLOW_MEMORY_GROWTH=1 -s MEMORY_GROWTH_GEOMETRIC_STEP=1 -s WASM=1 -s EXIT_RUNTIME=0 -s INVOKE_RUN=0 -s MODULARIZE=1 -s FETCH=1 -s EXPORT_NAME=JXLTests -flto -O3 --embed-file testdata")
