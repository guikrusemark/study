"""Flask application factory."""

from typing import Any

from flask import Flask

from src.config import config_by_name, Config
from src.models import db
from src.cache import create_cache, RedisCache
from src.dal import UserDAL, PersonDAL
from src.routes import init_routes


def create_app(config_name: str = "development") -> Flask:
    """Create and configure Flask application.

    Args:
        config_name: Configuration name (development, testing, production).

    Returns:
        Configured Flask application.
    """
    app: Flask = Flask(__name__)

    # Load configuration
    config_class: type[Config] = config_by_name.get(
        config_name, config_by_name["development"]
    )
    app.config.from_object(config_class)
    config: Config = config_class()

    # Initialize database
    db.init_app(app)

    with app.app_context():
        db.create_all()

    # Initialize cache
    cache: RedisCache[Any] = create_cache(config)

    # Initialize DALs
    user_dal: UserDAL = UserDAL(cache)
    person_dal: PersonDAL = PersonDAL(cache)

    # Initialize routes
    init_routes(app, user_dal, person_dal)

    @app.route("/")
    def index() -> dict[str, str]:
        """Root endpoint."""
        return {"message": "Flask API with Users and Persons CRUD"}

    @app.route("/health")
    def health() -> dict[str, str]:
        """Health check endpoint."""
        return {"status": "healthy"}

    return app


if __name__ == "__main__":
    app: Flask = create_app()
    app.run(debug=True, host="0.0.0.0", port=5000)
