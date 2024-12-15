from typing import List
from media import Media
from movie import Movie
from series import Series
from playlist import Playlist

if __name__ == "__main__":
    medias: List[Media] = [Movie("The Matrix", "Wachowski Brothers", "Warner Bros", 1999, 8.7, "123456789", 136),
                           Series("Breaking Bad", "Vince Gilligan", "AMC", 2008, 9.5, "987654321", 5),
                           Movie("Avengers: Endgame", "Anthony Russo", "Marvel Studios", 2019, 8.4, "123456789", 181),
                           Series("The Office", "Greg Daniels", "NBC", 2005, 8.9, "987654321", 9),
                           Movie("The Dark Knight", "Christopher Nolan", "Warner Bros", 2008, 9.0, "123456789", 152),
                           Series("game.py of Thrones", "David Benioff", "HBO", 2011, 9.3, "987654321", 8),
                           Movie("Interstellar", "Christopher Nolan", "Warner Bros", 2014, 8.6, "123456789", 169),
                           Series("The Walking Dead", "Frank Darabont", "AMC", 2010, 8.2, "987654321", 10),
                           Movie("Inception", "Christopher Nolan", "Warner Bros", 2010, 8.8, "123456789", 148),
                           Series("The Big Bang Theory", "Chuck Lorre", "CBS", 2007, 8.1, "987654321", 12),
                           Movie("The Lord of the Rings", "Peter Jackson", "New Line Cinema", 2003, 8.9, "123456789", 201)]

    playlist = Playlist("My Playlist 1", repeat=True, shuffle=True)
    playlist.medias = medias
    playlist.play()
