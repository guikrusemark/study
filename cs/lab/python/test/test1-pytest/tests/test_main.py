from app.main import add
from pytest import CaptureFixture
from typing import Any


def test_add_positive():
    assert add(1, 2) == 3


def test_add_negative():
    assert add(-5, 2) == -3


def test_add_zero():
    assert add(0, 0) == 0


def test_main_execution(capsys: CaptureFixture[Any]):
    from app.main import main

    main()

    captured = capsys.readouterr()
    assert captured.out.strip() == "Hello from test1-pytest!"
