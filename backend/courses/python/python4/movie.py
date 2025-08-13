from media import Media


class Movie(Media):
    def __init__(self, title: str, author: str, publisher: str, year: int, rating: float, isbn: str, duration: int):
        super().__init__(title, author, publisher, year, rating, isbn)
        self._duration = duration

    @property
    def duration(self) -> int:
        return self._duration

    def __str__(self) -> str:
        return f"{self._title} - IMDB rating: {self._rating} - First premiered in {self._year} - " \
               f"Likes: {self._like_count}"

    def __repr__(self) -> str:
        return f"Movie('{self._title}', '{self._author}', '{self._publisher}', {self._year}, {self._rating}, " \
               f"'{self._isbn}', {self._duration})"