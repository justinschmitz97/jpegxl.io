#include <emscripten/bind.h>
#include <iostream>

#include <cmath>

using namespace emscripten;

int _test()
{
    auto a = std::signbit(10.);
    return 2;
}

EMSCRIPTEN_BINDINGS(JPEGXL)
{
    emscripten::function("test", &_test);
}