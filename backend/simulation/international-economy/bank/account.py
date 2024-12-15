from functools import total_ordering


@total_ordering  # this decorator will automatically implement the __eq__ and __lt__ methods
class Account():
    def __init__(self, account_number: int, balance: float):
        self._account_number: int = account_number
        self._balance: float = balance

    def deposit(self, amount: float):
        pass

    def withdraw(self, amount: float):
        pass

    def __str__(self):
        pass

    def __eq__(self, other: 'Account') -> bool:
        return self._account_number == other._account_number and type(self) == type(other)

    def __lt__(self, other: 'Account') -> bool:
        if self._balance == other._balance:
            return self._account_number < other._account_number
        return self._balance < other._balance
