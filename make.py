#!/usr/bin/env python

import os.path
from shinypants import *


MakeSet(Config(
    os.path.join(os.path.abspath(os.path.dirname(__file__)),
                 'shiny.pants'))).make()
