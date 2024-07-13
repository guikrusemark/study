import sys
from models.user import User

def create_db():
    pass

if(__name__ == "__main__"):
    print(User(name=sys.argv[1], fullname=sys.argv[2]).__repr__)
