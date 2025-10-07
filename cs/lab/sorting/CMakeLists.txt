cmake_minimum_required(VERSION 3.16)
project(sorting LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(sorting
    src/main.cpp
    src/sorting.cpp
)
