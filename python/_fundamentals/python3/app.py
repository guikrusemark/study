from client import Client
from account import Account

client1: Client = Client("John", "123.456.789-00", [Account(1, 1000.0), Account(2, 2000.0), Account(3, 3000.0)])
client1.address = "123 Main Street"

client1.accounts[0].transfer(100.0, client1.accounts[1])

if __name__ == "__main__":
    print(client1)
    Account.limit = 3000.0
    print(Account.limit)
    client1.accounts[0].limit = 5000.0
    print(client1.accounts[0].limit)
    print(Account.limit)
