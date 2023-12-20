from typing import List
from account import Account


class Client:
    __name: str
    __cpf: str
    __address: str = "Address not registered"
    __accounts: List[Account] = []

    def __init__(self, name: str, cpf: str, accounts: List[Account]):
        self.__name: str = name
        self.__cpf: str = cpf
        self.__accounts: List[Account] = accounts

    @property
    def accounts(self) -> List[Account]:
        return self.__accounts

    @property
    def address(self) -> str:
        return self.__address

    @address.setter
    def address(self, address: str) -> None:
        self.__address: str = address

    @staticmethod
    def get_type_client() -> str:
        return "Physical Client"

    def __str__(self) -> str:
        str_print: str = f"Name: {self.__name}\nCPF: {self.__cpf}\nAddress: {self.__address}\nAccounts: "
        for account in self.__accounts:
            str_print += f"\n{account}"
        return str_print
