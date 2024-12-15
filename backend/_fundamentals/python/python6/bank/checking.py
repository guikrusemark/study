from bank.account import Account


class Checking(Account):
    def __init__(self, account_number: int, balance: float):
        super().__init__(account_number, balance)

    def deposit(self, amount: float):
        self._balance += amount

    def withdraw(self, amount: float):
        self._balance -= amount

    def __str__(self):
        return f"Checking account {self._account_number} has a balance of {self._balance}"

    def __repr__(self):
        return f"Checking({self._account_number}, {self._balance})"
