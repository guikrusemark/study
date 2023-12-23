import requests
from bs4 import BeautifulSoup


def main():
    url = "https://www.vetsmart.com.br/cg/produto/lista"
    response = requests.get(url)

    soup = BeautifulSoup(response.content, "html.parser")

    print(soup.prettify())


if __name__ == "__main__":
    main()
