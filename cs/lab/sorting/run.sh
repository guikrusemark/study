#!/bin/bash

# This script automates the build and run process.
# It first builds the project using CMake, then executes the compiled program.

# Exit immediately if a command exits with a non-zero status.
set -e

# Define the build directory
BUILD_DIR="build"
BUILD_TYPE="${1:-Debug}"   # default Debug, pass Release to script

mkdir -p "$BUILD_DIR"

if [ "$2" = "rebuild" ]; then
    echo "Removing and recreating $BUILD_DIR for clean build..."
    rm -rf "$BUILD_DIR"
    mkdir -p "$BUILD_DIR"
fi

# Configure the project with CMake if the build directory doesn't exist
if [ ! -f "$BUILD_DIR/CMakeCache.txt" ]; then
    echo "--- Configuring project (type: $BUILD_TYPE) ---"
    cmake -S . -B "$BUILD_DIR" -DCMAKE_BUILD_TYPE="$BUILD_TYPE"
fi

# Build the project using the compile task defined in your tasks.json
echo ""
echo "--- Building project... ---"
echo ""
cmake --build "$BUILD_DIR"

# Run the executable
echo ""
echo "--- Running executable... ---"
"./$BUILD_DIR/sorting"
