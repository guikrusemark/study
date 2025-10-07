"""Application configuration."""
from typing import Final


class Config:
    """Base configuration."""
    
    SQLALCHEMY_DATABASE_URI: Final[str] = "sqlite:///app.db"
    SQLALCHEMY_TRACK_MODIFICATIONS: Final[bool] = False
    REDIS_HOST: Final[str] = "localhost"
    REDIS_PORT: Final[int] = 6379
    REDIS_DB: Final[int] = 0
    CACHE_TTL: Final[int] = 300  # 5 minutes


class DevelopmentConfig(Config):
    """Development configuration."""
    
    DEBUG: Final[bool] = True


class TestingConfig(Config):
    """Testing configuration."""
    
    TESTING: Final[bool] = True
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///:memory:"


class ProductionConfig(Config):
    """Production configuration."""
    
    DEBUG: Final[bool] = False


config_by_name: dict[str, type[Config]] = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
}
