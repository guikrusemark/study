# tests/test_smoke.py
def test_smoke_imports():
    import flask  # pyright: ignore[reportUnusedImport] # noqa: F401
    import sqlalchemy  # pyright: ignore[reportUnusedImport] # noqa: F401

    assert True
