import os
import sys

from PyQt5 import QtWidgets, QtCore
from pyqtgraph import PlotWidget, plot
import pyqtgraph as pg


class MainWindow(QtWidgets.QMainWindow):

    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)

        self.graphWidget = pg.PlotWidget()
        self.graphWidget.setTitle("Temp over Time")
        self.graphWidget.setStyleSheet("QGraphicsTextItem { color:green;}")
        self.setCentralWidget(self.graphWidget)

        hour = [1,2,3,4,5,6,7,8,9,10]
        temperature = [30, 32, 34, 32, 33, 31, 29, 32, 35, 45]

        self.graphWidget.setBackground('w')
        self.graphWidget.setFontColor = (0,0,0)

        pen = pg.mkPen(color=(0,0,255), width=2,style=QtCore.Qt.DashLine)

        
        self.graphWidget.plot(hour,        \
                              temperature, \
                              pen=pen,     \
                              symbol='+',  \
                              symbolSize=30)

def main():
    app = QtWidgets.QApplication(sys.argv)
    qssfile="./styles.css"
    with open(qssfile,"r") as fh:
        app.setStyleSheet(fh.read())
    app.setStyleSheet("QGraphicsTextItem { color:green;}")
    window = MainWindow()
    #window.setStyleSheet("border:5px solid blue; padding:10px;")

    window.show()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

