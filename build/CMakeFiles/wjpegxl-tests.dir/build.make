# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.16

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/antonov548/jpeg-xl-wasm

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/antonov548/jpeg-xl-wasm/build

# Include any dependencies generated for this target.
include CMakeFiles/wjpegxl-tests.dir/depend.make

# Include the progress variables for this target.
include CMakeFiles/wjpegxl-tests.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/wjpegxl-tests.dir/flags.make

CMakeFiles/wjpegxl-tests.dir/test/bind.cpp.o: CMakeFiles/wjpegxl-tests.dir/flags.make
CMakeFiles/wjpegxl-tests.dir/test/bind.cpp.o: ../test/bind.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/antonov548/jpeg-xl-wasm/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/wjpegxl-tests.dir/test/bind.cpp.o"
	em++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/wjpegxl-tests.dir/test/bind.cpp.o -c /home/antonov548/jpeg-xl-wasm/test/bind.cpp

CMakeFiles/wjpegxl-tests.dir/test/bind.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/wjpegxl-tests.dir/test/bind.cpp.i"
	em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/antonov548/jpeg-xl-wasm/test/bind.cpp > CMakeFiles/wjpegxl-tests.dir/test/bind.cpp.i

CMakeFiles/wjpegxl-tests.dir/test/bind.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/wjpegxl-tests.dir/test/bind.cpp.s"
	em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/antonov548/jpeg-xl-wasm/test/bind.cpp -o CMakeFiles/wjpegxl-tests.dir/test/bind.cpp.s

CMakeFiles/wjpegxl-tests.dir/src/tests/jxl_test.cpp.o: CMakeFiles/wjpegxl-tests.dir/flags.make
CMakeFiles/wjpegxl-tests.dir/src/tests/jxl_test.cpp.o: ../src/tests/jxl_test.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/antonov548/jpeg-xl-wasm/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object CMakeFiles/wjpegxl-tests.dir/src/tests/jxl_test.cpp.o"
	em++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/wjpegxl-tests.dir/src/tests/jxl_test.cpp.o -c /home/antonov548/jpeg-xl-wasm/src/tests/jxl_test.cpp

CMakeFiles/wjpegxl-tests.dir/src/tests/jxl_test.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/wjpegxl-tests.dir/src/tests/jxl_test.cpp.i"
	em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/antonov548/jpeg-xl-wasm/src/tests/jxl_test.cpp > CMakeFiles/wjpegxl-tests.dir/src/tests/jxl_test.cpp.i

CMakeFiles/wjpegxl-tests.dir/src/tests/jxl_test.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/wjpegxl-tests.dir/src/tests/jxl_test.cpp.s"
	em++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/antonov548/jpeg-xl-wasm/src/tests/jxl_test.cpp -o CMakeFiles/wjpegxl-tests.dir/src/tests/jxl_test.cpp.s

# Object files for target wjpegxl-tests
wjpegxl__tests_OBJECTS = \
"CMakeFiles/wjpegxl-tests.dir/test/bind.cpp.o" \
"CMakeFiles/wjpegxl-tests.dir/src/tests/jxl_test.cpp.o"

# External object files for target wjpegxl-tests
wjpegxl__tests_EXTERNAL_OBJECTS =

wjpegxl-tests: CMakeFiles/wjpegxl-tests.dir/test/bind.cpp.o
wjpegxl-tests: CMakeFiles/wjpegxl-tests.dir/src/tests/jxl_test.cpp.o
wjpegxl-tests: CMakeFiles/wjpegxl-tests.dir/build.make
wjpegxl-tests: CMakeFiles/wjpegxl-tests.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/antonov548/jpeg-xl-wasm/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Linking CXX executable wjpegxl-tests"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/wjpegxl-tests.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/wjpegxl-tests.dir/build: wjpegxl-tests

.PHONY : CMakeFiles/wjpegxl-tests.dir/build

CMakeFiles/wjpegxl-tests.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/wjpegxl-tests.dir/cmake_clean.cmake
.PHONY : CMakeFiles/wjpegxl-tests.dir/clean

CMakeFiles/wjpegxl-tests.dir/depend:
	cd /home/antonov548/jpeg-xl-wasm/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/antonov548/jpeg-xl-wasm /home/antonov548/jpeg-xl-wasm /home/antonov548/jpeg-xl-wasm/build /home/antonov548/jpeg-xl-wasm/build /home/antonov548/jpeg-xl-wasm/build/CMakeFiles/wjpegxl-tests.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/wjpegxl-tests.dir/depend

