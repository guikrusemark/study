from typing import List, Tuple
import array as arr
import numpy as np

from bank.account import Account
from bank.checking import Checking
from bank.savings import Savings

persons: List[Tuple[str, int]] = [("John", 10), ("Mary", 23), ("Bob", 15), ("Mosh", 23), ("Mary", 43),
                                  ("Krusemark", 46), ("Carlos", 57), ("Mariah", 82), ("Bobby", 39), ("Guilherme", 11)]

# print(persons)
# print("\n")
persons.sort(key=lambda person: person[0])

# Sums all ages one year
persons_plus_1_year: List[Tuple[str, int]] = [(person[0], person[1] + 1) for person in persons]
# print(persons_plus_1_year)
# print("\n")

# Filter by age above 20
persons_above_20: List[Tuple[str, int]] = [person for person in persons if person[1] > 20]
# print(persons_above_20)
# print("\n")

# Arrays of array type and Numpy array type
array_of_integers: arr.ArrayType = arr.array('i', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
# print(f"Array of type {type(array_of_integers)}:\n{array_of_integers}")
# print("\n")

# Use numpy to convert array to numpy array
numpy_array_of_integers: np.ndarray = np.array((1, 2, 3, 4, 5, 6, 7, 8, 9, 10))
# print(f"Array of type {type(numpy_array_of_integers)}:\n{numpy_array_of_integers}")

# Using abstract methods and overloading
accounts: List[Account] = [Checking(1, 100), Savings(2, 200), Checking(3, 300)]
for account in accounts:
    print(account)

for account, amount in zip(accounts, [50, 100, 150]):
    account.deposit(amount)
    print(account)
