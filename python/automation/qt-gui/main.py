import sys
import os
from PyQt5.QtGui import QGuiApplication
from PyQt5.QQmlApplicationEngine import QQmlApplicationEngine
from PyQt5.QtQuick import QQuickWindow


QQuickWindow.setSceneGraphBackend('software')
app = QGuiApplication(sys.argv)
engine = QQmlApplicationEngine()
engine.quit.connect(app.quit)
engine.load('./UI/main.qml')
sys.exit(app.exec())