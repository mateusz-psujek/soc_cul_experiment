 
# script generating visual stimuli for 'drawing marbles' task measuring susceptibility to ratio bias

# preliminaries ----------
from psychopy import data, visual, event, gui, core
import numpy as np
import random, os
import pandas as pd

# define window
win = visual.Window(
    fullscr = True,
    monitor = 'testMonitor',
    units = "deg", 
    color = (1,1,1),
    allowGUI = True)

# define stopwatch 
stopwatch = core.Clock()


# defining the functions ----------
def marbles(n_marbles = 20, n_black = 2, n_row = 10, total_width = 6, position_x = 0, position_y = 0, spacing = 0.1):
    
    radius = (total_width - n_row * 0.1) / n_row
    fills = np.array(["black", "white"])
    fills = np.repeat(fills, [n_black, n_marbles - n_black], axis=0)
    random.shuffle(fills)
    
    position_x = [position_x + (2*radius + spacing)*i for i in range(0, n_row)] * int(n_marbles / n_row)
    position_y = [position_y + (2*radius + spacing) * (i // n_row) for i in range(0, n_marbles)]
    
    for i in range(0, n_marbles):
        circle = visual.Circle(
            win,
            units = 'deg'
            pos = (position_x[i], position_y[i]),
            radius = radius,
            lineWidth = 1.5,
            lineColor = 'black',
            fillColor = fills[i],
            )
        circle.draw()

marbles()
core.wait(4)
core.quit()