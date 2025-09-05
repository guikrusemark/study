# sorting — Simple Sorting Algorithms in C++

A tiny, beginner-friendly C++ project that implements classic sorting algorithms (Bubble, Insertion, Selection) with a clean, modular structure. It’s designed to be easy to build and run **in Ubuntu WSL on Windows 11** (but works on any Linux/macOS with a C++ compiler and CMake).

---

## ✅ What you’ll learn / do

* Understand how each simple sorting algorithm works.
* Compare their behavior on the same input.
* Build a multi-file C++ project with **CMake**.
* Compile & run from the **terminal** (and optionally from **VS Code**).

---

## 📁 Project structure

```
sorting/
├── .vscode/                 # (Optional) VS Code configs for WSL, build, debug
│   ├── c_cpp_properties.json
│   ├── launch.json
│   └── tasks.json
├── CMakeLists.txt           # Build script
└── src/
    ├── main.cpp             # Entry point (runs demos/tests)
    ├── sorting.hpp          # Declarations for all algorithms
    ├── bubble.cpp           # Bubble Sort
    ├── insertion.cpp        # Insertion Sort
    └── selection.cpp        # Selection Sort
```

---

## 🧠 Algorithms included

| Algorithm      | Best Case      | Average | Worst | Stable? | In-place? |
| -------------- | -------------- | ------- | ----- | ------: | --------: |
| Bubble Sort    | O(n²) / O(n)\* | O(n²)   | O(n²) |     Yes |       Yes |
| Insertion Sort | O(n)           | O(n²)   | O(n²) |     Yes |       Yes |
| Selection Sort | O(n²)          | O(n²)   | O(n²) |      No |       Yes |

\*With the classic early-exit optimization (not included in the most naive form).

---

## 🛠 Prerequisites

### On Ubuntu (including **WSL** on Windows 11)

Open the **Ubuntu** terminal:

```bash
sudo apt update
sudo apt install -y build-essential gdb cmake
```

This installs:

* `g++` (C++ compiler), `make` (build tool)
* `gdb` (debugger)
* `cmake` (cross-platform build system)

> If you’re on macOS, use Homebrew: `brew install cmake gcc`.

---

## 🚀 Quick start (terminal only)

> **Works the same in WSL and native Linux/macOS.**

```bash
# 1) go to the project folder
cd ~/sorting

# 2) create a separate build directory (best practice with CMake)
mkdir -p build && cd build

# 3) generate build files
cmake ..

# 4) compile
cmake --build .      # or: make

# 5) run the program
./sorting
```

You should see output like:

```
Original: 5 2 9 1 5 6
Bubble:   1 2 5 5 6 9
Insertion:1 2 5 5 6 9
Selection:1 2 5 5 6 9
```

---

## 💡 Alternative: one-liner builds

From the project root:

```bash
cmake -S . -B build && cmake --build build && ./build/sorting
```

---

## 🧪 Try your own data

Edit `src/main.cpp` and change the initial vector:

```cpp
std::vector<int> nums = {42, -3, 7, 7, 0, 18};
```

Rebuild & run:

```bash
cmake --build build && ./build/sorting
```

---

## ➕ Add a new algorithm (step-by-step)

1. **Create files** in `src/`
   Example: `merge.cpp` and add a prototype in `sorting.hpp`:

```cpp
// sorting.hpp
#pragma once
#include <vector>

void bubble_sort(std::vector<int>&);
void insertion_sort(std::vector<int>&);
void selection_sort(std::vector<int>&);

// new:
void merge_sort(std::vector<int>&);
```

2. **Implement** in `src/merge.cpp`:

```cpp
#include "sorting.hpp"
// ... your merge sort implementation ...
```

3. **Tell CMake** to compile it: open `CMakeLists.txt` and add the file:

```cmake
add_executable(sorting
    src/main.cpp
    src/bubble.cpp
    src/insertion.cpp
    src/selection.cpp
    src/merge.cpp          # <-- add new file here
)
```

4. **Call it** from `src/main.cpp`, rebuild & run.

---

## 🧰 VS Code (optional but nice)

1. Install **Visual Studio Code** on Windows.
2. Install the extension **Remote - WSL** (Microsoft).
3. Open a WSL window: `Ctrl+Shift+P` → “Remote-WSL: New Window”.
4. Open your folder inside WSL (e.g., `/home/you/sorting`).
5. Press:

   * **`Ctrl+Shift+B`** to build (if you use the provided `.vscode/tasks.json`).
   * **`F5`** to debug (uses `gdb`, breakpoints, etc.).

> If you don’t want the VS Code config files, you can ignore the `.vscode/` folder completely; they’re optional helpers.

---

## 🧯 Troubleshooting

* **`cmake: command not found`**
  Install CMake: `sudo apt install -y cmake`

* **`g++: command not found`**
  Install build tools: `sudo apt install -y build-essential`

* **`permission denied` when running `./sorting`**
  Ensure you’re in `build/` and the file is executable:
  `ls -l` should show `-rwx… sorting`. If not: `chmod +x sorting`.

* **Output looks wrong**
  Add `-g` and `-O0` flags temporarily by editing `CMakeLists.txt` (for easier debugging):

  ```cmake
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O0 -g")
  ```

  Reconfigure & rebuild:

  ```bash
  rm -rf build && cmake -S . -B build && cmake --build build
  ```

* **WSL can’t find files / path issues**
  Work *inside* the Linux filesystem, e.g., under `/home/<you>/sorting`, not on `C:` paths.

---

## 🧪 (Optional) Build without CMake (small demos only)

From project root:

```bash
g++ -std=c++20 -O2 -g -I./src \
    src/main.cpp src/bubble.cpp src/insertion.cpp src/selection.cpp \
    -o sorting && ./sorting
```

> This is fine for tiny projects, but **CMake** scales better as your project grows.

---

## 🔍 Code style & tips (optional)

* Enable warnings: add `-Wall -Wextra -Wpedantic` to your compile flags.
* Use `clang-format` for consistent formatting:
  `sudo apt install -y clang-format` → `clang-format -i src/*.cpp src/*.hpp`

---

## 📄 License

MIT (or any license you prefer). Create a `LICENSE` file if you plan to publish.

---

## 🤝 Contributing

* Keep algorithms in separate `.cpp` files and declare them in `sorting.hpp`.
* Add the new `.cpp` to `CMakeLists.txt`.
* Keep `main.cpp` small and focused on demonstrating/benchmarking algorithms.

---

## 🧭 Roadmap (nice-to-have)

* Add **Merge Sort**, **Quick Sort**, **Heap Sort**.
* Add a tiny **benchmark** mode to compare runtimes for various `n`.
* Add unit tests (e.g., with a minimal custom harness or a testing framework).

---

## 📌 Recap — TL;DR “for dummies”

```bash
# Install tools (WSL Ubuntu)
sudo apt update
sudo apt install -y build-essential gdb cmake

# Build & run
cd ~/sorting
mkdir -p build && cd build
cmake ..
cmake --build .
./sorting
```

That’s it—happy sorting!
