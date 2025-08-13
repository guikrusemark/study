from app.config.db import SessionLocal
from app.model.user import get_users


if __name__ == "__main__":
    db = SessionLocal()

    users = get_users(db)

    for user in users:
        print(user.to_dict())
