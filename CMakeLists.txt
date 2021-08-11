cmake_minimum_required(VERSION 3.16)

set(JPEGXL_PATH "../jpeg-xl/lib/include" CACHE STRING "Path to JPEG-XL lib")

project(wjpegxl)

set(CMAKE_C_COMPILER "emcc")
set(CMAKE_CXX_COMPILER "em++")

set(CMAKE_CXX_STANDARD 17)

add_executable(wjpegxl 
    src/bind.cpp
)

target_include_directories(wjpegxl PUBLIC ${JPEGXL_PATH})
target_link_directories(wjpegxl PRIVATE libs/)
target_link_libraries(wjpegxl jxl jxl_dec jxl_threads hwy skcms)
set_target_properties(wjpegxl PROPERTIES LINK_FLAGS "--bind -s ALLOW_MEMORY_GROWTH=1 -s MEMORY_GROWTH_GEOMETRIC_STEP=1 -s WASM=1 -s EXIT_RUNTIME=0 -s INVOKE_RUN=0 -s MODULARIZE=1 -s FETCH=1 -s EXPORT_NAME=JXL -flto -O3")

add_executable(wjpegxl-tests 
    test/bind.cpp
    #src/tests/jxl_test.cpp
)

target_compile_definitions(wjpegxl-tests PUBLIC -DTEST_DATA_PATH="/home/antonov548/jpeg-xl/third_party/testdata")
target_include_directories(wjpegxl-tests  PUBLIC ${JPEGXL_PATH} "/home/antonov548/jpeg-xl" "/home/antonov548/jpeg-xl/third_party/googletest/googletest/include" "/home/antonov548/jpeg-xl/third_party/googletest/googlemock/include" "/home/antonov548/jpeg-xl/third_party/highway")
target_link_directories(wjpegxl-tests PRIVATE libs/)
target_link_libraries(wjpegxl-tests jxl jxl_dec jxl_threads hwy skcms gtest gmock gtest_main gmock_main jxl_testlib-static jxl_profiler jxl_extras-static lodepng)
set_target_properties(wjpegxl-tests PROPERTIES LINK_FLAGS "--bind -s ALLOW_MEMORY_GROWTH=1 -s MEMORY_GROWTH_GEOMETRIC_STEP=1 -s WASM=1 -s EXIT_RUNTIME=0 -s INVOKE_RUN=0 -s MODULARIZE=1 -s FETCH=1 -s EXPORT_NAME=JXLTests -flto -O3")
