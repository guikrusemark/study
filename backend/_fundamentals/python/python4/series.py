from media import Media


class Series(Media):
    def __init__(self, title: str, author: str, publisher: str, year: int, rating: float, isbn: str, n_seasons: int):
        super().__init__(title, author, publisher, year, rating, isbn)
        self._n_seasons = n_seasons

    @property
    def n_seasons(self) -> int:
        return self._n_seasons

    def __str__(self) -> str:
        return f"{self._title} - {self._n_seasons} Seasons - First premiered in {self._year} - "\
                f"Likes: {self._like_count}"

    def __repr__(self) -> str:
        return f"Series('{self._title}', '{self._author}', '{self._publisher}', {self._year}, {self._rating}, " \
                f"'{self._isbn}', {self._n_seasons})"