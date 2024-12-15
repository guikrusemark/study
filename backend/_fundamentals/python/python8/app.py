from validate_docbr import CPF
import requests

res = requests.get('https://viacep.com.br/ws/01001000/json/')
address_data = res.json()

if __name__ == '__main__':
    print(address_data['cep'])