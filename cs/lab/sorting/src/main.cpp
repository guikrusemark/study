#include <algorithm>
#include <cassert>
#include <array>
#include <iostream>
#include <string>
#include <vector>

#include "sorting.hpp"

/**
 * @brief Prints the contents of a vector of integers.
 *
 * @param name The name of the vector to be printed.
 * @param arr The vector to be printed.
 */
void print_vector(const std::string &name, const std::vector<int> &arr) {
  std::cout << "\n";
  std::cout << name << ": \n >> [ ";
  for (size_t i = 0; i < arr.size(); ++i) {
    std::cout << arr[i];
    if (i < arr.size() - 1) {
      std::cout << ", ";
    }
  }
  std::cout << " ]\n";
}

/**
 * @brief Main function to test the sorting algorithms.
 *
 * @return int The exit code.
 */
int main() {
    //------------------------------------------------------------------------
    // Sample data

    std::vector<int> nums = {5,  45, 23, 5,  6,  10, 20, 22, 17,
                             14, 12, 7,  3,  8,  4,  11, 0,  13,
                             -1, -5, 15, 19, 21, 18, 2,  9,  1};

    print_vector("Original", nums);
    //------------------------------------------------------------------------

    //------------------------------------------------------------------------
    // Test each algorithm and guard that the output is sorted

    struct Algorithm {
        const char *name;
        void (*sort)(std::vector<int> &);
    };

    const std::array<Algorithm, 3> algorithms{{
        {"Bubble", bubble_sort},
        {"Insertion", insertion_sort},
        {"Selection", selection_sort},
    }};

    for (const auto &algorithm : algorithms) {
        std::vector<int> sorted = nums;
        algorithm.sort(sorted);
        assert(std::is_sorted(sorted.begin(), sorted.end()));
        print_vector(algorithm.name, sorted);
    }
    //------------------------------------------------------------------------

    return 0;
}
