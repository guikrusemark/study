cmake_minimum_required(VERSION 3.16)
project(sorting LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(sorting
    src/main.cpp
    src/bubble.cpp
    src/insertion.cpp
    src/selection.cpp
)
