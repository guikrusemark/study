#include <iostream>
#include <vector>

#include "sorting.hpp"

int main() {
    //------------------------------------------------------------------------
    // Sample data

    std::vector<int> nums = {5,  45, 23, 5,  6,  10, 20, 22, 17,
                             14, 12, 7,  3,  8,  4,  11, 0,  13,
                             -1, -5, 15, 19, 21, 18, 2,  9,  1};

    std::cout << "\n";
    std::cout << "Original: \n >> [ ";
    for (int n : nums) std::cout << n << ", ";
    std::cout << " ]\n";
    //------------------------------------------------------------------------

    //------------------------------------------------------------------------
    // Test each algorithm

    std::vector<int> bubble = nums;
    std::vector<int> insertion = nums;
    std::vector<int> selection = nums;

    bubble_sort(bubble);
    insertion_sort(insertion);
    selection_sort(selection);
    //------------------------------------------------------------------------

    //------------------------------------------------------------------------
    // Display results

    std::cout << "Bubble: \n >> [ ";
    for (int n : bubble) std::cout << n << ", ";
    std::cout << " ]\n";

    std::cout << "Insertion: \n >> [ ";
    for (int n : insertion) std::cout << n << ", ";
    std::cout << " ]\n";

    std::cout << "Selection: \n >> [ ";
    for (int n : selection) std::cout << n << ", ";
    std::cout << " ]\n";
    //------------------------------------------------------------------------

    return 0;
}
