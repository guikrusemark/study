#include "sorting.hpp"
#include <algorithm>

void bubble_sort(std::vector<int> &arr) {
    for (size_t i = 0; i < arr.size(); i++) {
        for (size_t j = 0; j + 1 < arr.size(); j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}
