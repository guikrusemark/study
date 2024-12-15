from .game import Game


class User:
    def __init__(self, id_user: int, name: str, email: str, password: str, active: bool = True):
        self.__id_user: int = id_user
        self.__name: str = name
        self.__email: str = email
        self.__password: str = password
        self.games: list[Game] = [Game('Super Mario Bros', 'Platformer', 'A plumber rescues a princess.', 5),
                                  Game('God of War', 'Action-Adventure', 'A Spartan warrior slays gods.', 9),
                                  Game('The Last of Us', 'Survival Horror', 'A post-apocalyptic survival game.', 9)
                                  ]

    @property
    def name(self) -> str:
        return self.__name

    @name.setter
    def name(self, name):
        self.__name = name


    def check_credentials(self, password: str) -> bool:
        return self.__password == password
