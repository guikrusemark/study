import threading
import random
from typing import List
from media import Media


class Playlist:
    def __init__(self, name: str, repeat: bool = False, shuffle: bool = False):
        self.__name: str = name
        self.__medias: List[Media] = []
        self.__repeat: bool = repeat
        self.__shuffle: bool = shuffle

    def __getitem__(self, item) -> Media:
        return self.__medias[item]

    def __len__(self) -> int:
        return len(self.__medias)

    @property
    def name(self) -> str:
        return self.__name

    @property
    def medias(self) -> List[Media]:
        return self.__medias

    @medias.setter
    def medias(self, medias: List[Media]) -> None:
        self.__medias = medias
        if self.__shuffle:
            random.shuffle(self.__medias)

    @property
    def repeat(self) -> bool:
        return self.__repeat

    @repeat.setter
    def repeat(self, repeat: bool) -> None:
        self.__repeat = repeat

    @property
    def shuffle(self) -> bool:
        return self.__shuffle

    @shuffle.setter
    def shuffle(self, shuffle: bool) -> None:
        self.__shuffle = shuffle
        if self.__shuffle:
            random.shuffle(self.__medias)

    def add_media(self, media: Media) -> None:
        self.__medias.append(media)

    def remove_last_media(self, media: Media) -> None:
        self.__medias.remove(media)

    def show_last_media(self) -> Media:
        return self.__medias[0] if self.__medias else None

    def play(self) -> None:
        if self.__medias:
            event = threading.Event()
            if self.__repeat:
                while True:
                    for media in self.__medias:
                        event.wait(3)
                        print(f'\n\nIs playing {self.__name} playlist')
                        print(f'Is on repeat: {self.__repeat}')
                        print(f'Is on shuffle: {self.__shuffle}')
                        print(media)
            else:
                for media in self.__medias:
                    event.wait(3)
                    print(f'Is playing {self.__name} playlist')
                    print(f'Is on repeat: {self.__repeat}')
                    print(f'Is on shuffle: {self.__shuffle}')
                    print(media)
