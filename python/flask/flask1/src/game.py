class Game:
    def __init__(self, name: str, category: str, description: str, rating: float = 0):
        self.__name: str = name
        self.__category: str = category
        self.__description: str = description
        self.__rating: float = rating

    @property
    def name(self) -> str:
        return self.__name

    @name.setter
    def name(self, name: str):
        self.__name = name

    @property
    def category(self) -> str:
        return self.__category

    @category.setter
    def category(self, category: str):
        self.__category = category

    @property
    def description(self) -> str:
        return self.__description

    @description.setter
    def description(self, description: str):
        self.__description = description

    @property
    def rating(self) -> float:
        return self.__rating

    @rating.setter
    def rating(self, rating: float):
        self.__rating = rating

    def __str__(self) -> str:
        return f'Game: {self.name} - {self.description}'
