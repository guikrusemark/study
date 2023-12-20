from abc import ABCMeta, abstractmethod # Abstract Base Class


class Media(metaclass=ABCMeta): # Inherits from Abstract Base Class ABC
    def __init__(self, title: str, author: str, publisher: str, year: int, rating: float, isbn: str):
        self._title = title
        self._author = author
        self._publisher = publisher
        self._year = year
        self._rating = rating
        self._isbn = isbn
        self._like_count = 0

    @property
    def title(self) -> str:
        return self._title

    @property
    def author(self) -> str:
        return self._author

    @property
    def publisher(self) -> str:
        return self._publisher

    @property
    def year(self) -> int:
        return self._year

    @property
    def rating(self) -> float:
        return self._rating

    @rating.setter
    def rating(self, rating: float) -> None:
        self._rating = rating

    @property
    def isbn(self) -> str:
        return self._isbn

    @property
    def like_count(self) -> int:
        return self._like_count

    def like(self) -> None:
        self._like_count += 1

    @abstractmethod
    def __str__(self) -> str: # Abstract method
        pass
