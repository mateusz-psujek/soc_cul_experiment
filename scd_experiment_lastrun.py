#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2023.1.2),
    on lipiec 05, 2023, at 14:11
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

# --- Import packages ---
from psychopy import locale_setup
from psychopy import prefs
from psychopy import plugins
plugins.activatePlugins()
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

import psychopy.iohub as io
from psychopy.hardware import keyboard

# Run 'Before Experiment' code from code_begin
import random

cond_id = random.randint(0,1)

if cond_id == 0:
    who = "You"
    whose = "Your"
elif cond_id == 1:
    who = "Your group"
    whose = "Your group's"

cond_id = str(cond_id)

total_score = 1054



def marbles(n_marbles = 20, n_black = 2, n_row = 10, total_width = 6, position_x = 0, position_y = 0, spacing = 0.1):
    
    radius = (total_width - n_row * 0.1) / n_row
    fills = np.array(["black", "white"])
    fills = np.repeat(fills, [n_black, n_marbles - n_black], axis=0)
    random.shuffle(fills)
    
    position_x = [position_x + (2*radius + spacing)*i for i in range(0, n_row)] * int(n_marbles / n_row)
    position_y = [position_y + (2*radius + spacing) * (i // n_row) for i in range(0, n_marbles)]
    circles = [] 
    for i in range(0, n_marbles):
        circle = visual.ShapeStim(
            win=win, 
            name='circle',
            units='deg', 
            size=(radius, radius),
            vertices='circle',
            ori=0.0, 
            pos=(positions_x[i], positions_y[i]),
            anchor='center',
            lineWidth=1.0,
            colorSpace='rgb',
            lineColor='black',
            fillColor=fills[i],
            opacity=None,
            depth=-1.0,
            interpolate=True
            )
        circles.append(circle)
    return circles


# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)
# Store info about the experiment session
psychopyVersion = '2023.1.2'
expName = 'scd_experiment'  # from the Builder filename that created this script
expInfo = {
    'participant': '1',
}
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath='C:\\sync\\experiment_social_cultural_exam\\scd_experiment\\scd_experiment_lastrun.py',
    savePickle=True, saveWideText=True,
    dataFileName=filename)
# save a log file for detail verbose info
logFile = logging.LogFile(filename+'.log', level=logging.EXP)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation

# --- Setup the Window ---
win = visual.Window(
    size=[1920, 1080], fullscr=True, screen=0, 
    winType='pyglet', allowStencil=False,
    monitor='testMonitor', color=[1.0, 1.0, 1.0], colorSpace='rgb',
    backgroundImage='', backgroundFit='none',
    blendMode='avg', useFBO=True, 
    units='height')
win.mouseVisible = False
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess
# --- Setup input devices ---
ioConfig = {}

# Setup iohub keyboard
ioConfig['Keyboard'] = dict(use_keymap='psychopy')

ioSession = '1'
if 'session' in expInfo:
    ioSession = str(expInfo['session'])
ioServer = io.launchHubServer(window=win, **ioConfig)
eyetracker = None

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard(backend='iohub')

# --- Initialize components for Routine "consent" ---
text_consent = visual.TextStim(win=win, name='text_consent',
    text="Hi! \nYou are about to take part in an experiment I made as a part of an exam at my Bachelor's programme. Before you decide to participate, it is important that you understand what this will involve. Please read the following information carefully, and contact me if you have any questions (email: au693018@uni.au.dk).\n\nYou will be asked to perform a few cognitive tasks and to provide some of your personal information (e.g. gender, age, nationality). The tasks don't seem to involve any risk beyond potential boredom or tiredness.  The collected data will be anonymised. Data collection takes place through Pavlovia.org which is GDPR compliant. I will also store a copy of the data locally on my laptop. The data will only be used to write a mock scientific research paper for a university exam, and will not be shared with any third parties. I will delete the data after having passed the course. You are welcome to withdraw your consent at any time during the experiment by clicking the 'escape' key. All collected data will be deleted in such a case, and won't be used in the exam. After the experiment is finished, but before 02.06.2023, you can still withdraw your consent to use your data, if you provide me with the exact date and time you took part in the experiment, as I won't be able to identify your data otherwise. \n\n\nPress the 'y' key if you consent to take part in the experiment and to your data being stored for the purposes of this project;\nPress the 'escape' key to leave (click 'esc' twice if you're in fullscreen mode)",
    font='Open Sans',
    pos=(0, 0), height=0.03, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
key_consent = keyboard.Keyboard()

# --- Initialize components for Routine "ratio_bias_task" ---
key_resp_ratio_bias_task = keyboard.Keyboard()
key_confirm_ratio_bias_task = keyboard.Keyboard()

# --- Initialize components for Routine "welcome" ---
# Run 'Begin Experiment' code from code_begin
participantN = '0'
text_welcome = visual.TextStim(win=win, name='text_welcome',
    text='',
    font='Open Sans',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
key_welcome = keyboard.Keyboard()

# --- Initialize components for Routine "investment_instructions" ---
text_invest_instructions = visual.TextStim(win=win, name='text_invest_instructions',
    text='',
    font='Open Sans',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
key_invest_instruction = keyboard.Keyboard()

# --- Initialize components for Routine "investment_task" ---
score_counter_invest = visual.TextStim(win=win, name='score_counter_invest',
    text='',
    font='Open Sans',
    pos=(0.6, 0.45), height=0.04, wrapWidth=None, ori=0.0, 
    color='crimson', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
text_invest = visual.TextStim(win=win, name='text_invest',
    text='You have a chance of 2/3 (67%) to lose the amount you bet and a chance of 1/3(33%)  to win two and a half times the amount you bet. \n\nPlease indicate how much you want to bet by clicking on the slider below? (Maximum 100 points)',
    font='Open Sans',
    pos=(0, 0.2), height=0.04, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);
slider_invest = visual.Slider(win=win, name='slider_invest',
    startValue=None, size=(1.0, 0.04), pos=(0, -0.2), units=win.units,
    labels=['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'], ticks=(5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105), granularity=1.0,
    style='rating', styleTweaks=('triangleMarker',), opacity=None,
    labelColor='black', markerColor='black', lineColor='black', colorSpace='rgb',
    font='Open Sans', labelHeight=0.04,
    flip=False, ori=0.0, depth=-3, readOnly=False)
text_invest_confirm = visual.TextStim(win=win, name='text_invest_confirm',
    text="(Press 'y' to confirm)",
    font='Open Sans',
    pos=(-0, -0.4), height=0.04, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-4.0);
key_invest_confirm = keyboard.Keyboard()

# --- Initialize components for Routine "investment_feedback" ---
text_invest_feedback = visual.TextStim(win=win, name='text_invest_feedback',
    text='',
    font='Open Sans',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
key_invest_feedback = keyboard.Keyboard()

# --- Initialize components for Routine "belief_bias_instructions" ---
text_instructions_belief_bias = visual.TextStim(win=win, name='text_instructions_belief_bias',
    text="You are going to receive a series of eight problems. You must decide whether the stated conclusion follows logically form the premises or not."+ "\n" +"It is important that you suppose all of the premises are true and limit yourself only to the information contained in these premises."+ "\n\n"+ whose + " score will be updated after you solve all eight problems." + "\n\n" + "(Press 'space' to continue)",
    font='Open Sans',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
key_instructions_belief_bias = keyboard.Keyboard()

# --- Initialize components for Routine "belief_bias_task" ---
score_counter_syllogism = visual.TextStim(win=win, name='score_counter_syllogism',
    text='',
    font='Open Sans',
    pos=(0.6, 0.45), height=0.04, wrapWidth=None, ori=0.0, 
    color='crimson', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
text_syllogism = visual.TextStim(win=win, name='text_syllogism',
    text='',
    font='Open Sans',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);
key_syllogism = keyboard.Keyboard()

# --- Initialize components for Routine "belief_bias_feedback" ---
text_syllogism_feedback = visual.TextStim(win=win, name='text_syllogism_feedback',
    text='',
    font='Open Sans',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
key_syllogism_feedback = keyboard.Keyboard()

# --- Initialize components for Routine "debriefing_or_farewell" ---
text_debrief = visual.TextStim(win=win, name='text_debrief',
    text="Before we finish, I need to inform you about the deception used in this experiment. The groups you were assigned to (or other participants were assigned to if your score was individual) weren't real and their scores were set by the experimenter, and independent of other people's real performance. Additionally, scoring on the syllogism task was independent of your real performance. \nIf you wish to revoke your consent to store and use your data in this project, please click 'escape'. Both the data on your performance and your background will be then deleted from the dataset and won't be used in the exam.\n\nI'm sorry for any inconvenience, and thank you for your time!\n\nOtherwise, press 'space' to continue.",
    font='Open Sans',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
key_debrief = keyboard.Keyboard()

# --- Initialize components for Routine "bye_bye" ---
text_bye_bye = visual.TextStim(win=win, name='text_bye_bye',
    text="Thank you for participating once again, and have a lovely day!:)\n\n(Press 'space' to finish the experiment and save the data)",
    font='Open Sans',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0.0, 
    color='black', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
key_resp = keyboard.Keyboard()

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.Clock()  # to track time remaining of each (possibly non-slip) routine 

# --- Prepare to start Routine "consent" ---
continueRoutine = True
# update component parameters for each repeat
key_consent.keys = []
key_consent.rt = []
_key_consent_allKeys = []
# keep track of which components have finished
consentComponents = [text_consent, key_consent]
for thisComponent in consentComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "consent" ---
routineForceEnded = not continueRoutine
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *text_consent* updates
    
    # if text_consent is starting this frame...
    if text_consent.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        text_consent.frameNStart = frameN  # exact frame index
        text_consent.tStart = t  # local t and not account for scr refresh
        text_consent.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(text_consent, 'tStartRefresh')  # time at next scr refresh
        # update status
        text_consent.status = STARTED
        text_consent.setAutoDraw(True)
    
    # if text_consent is active this frame...
    if text_consent.status == STARTED:
        # update params
        pass
    
    # *key_consent* updates
    waitOnFlip = False
    
    # if key_consent is starting this frame...
    if key_consent.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_consent.frameNStart = frameN  # exact frame index
        key_consent.tStart = t  # local t and not account for scr refresh
        key_consent.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_consent, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'key_consent.started')
        # update status
        key_consent.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_consent.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_consent.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_consent.status == STARTED and not waitOnFlip:
        theseKeys = key_consent.getKeys(keyList=['y',], waitRelease=False)
        _key_consent_allKeys.extend(theseKeys)
        if len(_key_consent_allKeys):
            key_consent.keys = _key_consent_allKeys[-1].name  # just the last key pressed
            key_consent.rt = _key_consent_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
        if eyetracker:
            eyetracker.setConnectionState(False)
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in consentComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "consent" ---
for thisComponent in consentComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# check responses
if key_consent.keys in ['', [], None]:  # No response was made
    key_consent.keys = None
thisExp.addData('key_consent.keys',key_consent.keys)
if key_consent.keys != None:  # we had a response
    thisExp.addData('key_consent.rt', key_consent.rt)
thisExp.nextEntry()
# the Routine "consent" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# --- Prepare to start Routine "ratio_bias_task" ---
continueRoutine = True
# update component parameters for each repeat
# Run 'Begin Routine' code from code
circles_left = marbles(n_marbles = 20, n_black = 2, n_row = 10, total_width = 6, position_x = -9, position_y = 0, spacing = 0.1)
circles_right = marbles(n_marbles = 20, n_black = 2, n_row = 10, total_width = 6, position_x = 6, position_y = 0, spacing = 0.1)

for circle in circles_left:
    circle.setAutoDraw(True)

for circle in circles_right:
    circle.setAutoDraw(True)
key_resp_ratio_bias_task.keys = []
key_resp_ratio_bias_task.rt = []
_key_resp_ratio_bias_task_allKeys = []
key_confirm_ratio_bias_task.keys = []
key_confirm_ratio_bias_task.rt = []
_key_confirm_ratio_bias_task_allKeys = []
# keep track of which components have finished
ratio_bias_taskComponents = [key_resp_ratio_bias_task, key_confirm_ratio_bias_task]
for thisComponent in ratio_bias_taskComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "ratio_bias_task" ---
routineForceEnded = not continueRoutine
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *key_resp_ratio_bias_task* updates
    waitOnFlip = False
    
    # if key_resp_ratio_bias_task is starting this frame...
    if key_resp_ratio_bias_task.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_resp_ratio_bias_task.frameNStart = frameN  # exact frame index
        key_resp_ratio_bias_task.tStart = t  # local t and not account for scr refresh
        key_resp_ratio_bias_task.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_resp_ratio_bias_task, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'key_resp_ratio_bias_task.started')
        # update status
        key_resp_ratio_bias_task.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_resp_ratio_bias_task.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_resp_ratio_bias_task.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_resp_ratio_bias_task.status == STARTED and not waitOnFlip:
        theseKeys = key_resp_ratio_bias_task.getKeys(keyList=['left','right','r','l'], waitRelease=False)
        _key_resp_ratio_bias_task_allKeys.extend(theseKeys)
        if len(_key_resp_ratio_bias_task_allKeys):
            key_resp_ratio_bias_task.keys = _key_resp_ratio_bias_task_allKeys[-1].name  # just the last key pressed
            key_resp_ratio_bias_task.rt = _key_resp_ratio_bias_task_allKeys[-1].rt
    
    # *key_confirm_ratio_bias_task* updates
    waitOnFlip = False
    
    # if key_confirm_ratio_bias_task is starting this frame...
    if key_confirm_ratio_bias_task.status == NOT_STARTED and key_resp_ratio_bias_task.keys:
        # keep track of start time/frame for later
        key_confirm_ratio_bias_task.frameNStart = frameN  # exact frame index
        key_confirm_ratio_bias_task.tStart = t  # local t and not account for scr refresh
        key_confirm_ratio_bias_task.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_confirm_ratio_bias_task, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'key_confirm_ratio_bias_task.started')
        # update status
        key_confirm_ratio_bias_task.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_confirm_ratio_bias_task.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_confirm_ratio_bias_task.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_confirm_ratio_bias_task.status == STARTED and not waitOnFlip:
        theseKeys = key_confirm_ratio_bias_task.getKeys(keyList=['y',], waitRelease=False)
        _key_confirm_ratio_bias_task_allKeys.extend(theseKeys)
        if len(_key_confirm_ratio_bias_task_allKeys):
            key_confirm_ratio_bias_task.keys = _key_confirm_ratio_bias_task_allKeys[-1].name  # just the last key pressed
            key_confirm_ratio_bias_task.rt = _key_confirm_ratio_bias_task_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
        if eyetracker:
            eyetracker.setConnectionState(False)
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in ratio_bias_taskComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "ratio_bias_task" ---
for thisComponent in ratio_bias_taskComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# Run 'End Routine' code from code
for circle in circles_left:
    circle.setAutoDraw(False)

for circle in circles_right:
    circle.setAutoDraw(False)
# check responses
if key_resp_ratio_bias_task.keys in ['', [], None]:  # No response was made
    key_resp_ratio_bias_task.keys = None
thisExp.addData('key_resp_ratio_bias_task.keys',key_resp_ratio_bias_task.keys)
if key_resp_ratio_bias_task.keys != None:  # we had a response
    thisExp.addData('key_resp_ratio_bias_task.rt', key_resp_ratio_bias_task.rt)
thisExp.nextEntry()
# check responses
if key_confirm_ratio_bias_task.keys in ['', [], None]:  # No response was made
    key_confirm_ratio_bias_task.keys = None
thisExp.addData('key_confirm_ratio_bias_task.keys',key_confirm_ratio_bias_task.keys)
if key_confirm_ratio_bias_task.keys != None:  # we had a response
    thisExp.addData('key_confirm_ratio_bias_task.rt', key_confirm_ratio_bias_task.rt)
thisExp.nextEntry()
# the Routine "ratio_bias_task" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
loop_condition_spec = data.TrialHandler(nReps=1.0, method='random', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('loops_spec/condition_spec.csv', selection=cond_id),
    seed=None, name='loop_condition_spec')
thisExp.addLoop(loop_condition_spec)  # add the loop to the experiment
thisLoop_condition_spec = loop_condition_spec.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisLoop_condition_spec.rgb)
if thisLoop_condition_spec != None:
    for paramName in thisLoop_condition_spec:
        exec('{} = thisLoop_condition_spec[paramName]'.format(paramName))

for thisLoop_condition_spec in loop_condition_spec:
    currentLoop = loop_condition_spec
    # abbreviate parameter names if possible (e.g. rgb = thisLoop_condition_spec.rgb)
    if thisLoop_condition_spec != None:
        for paramName in thisLoop_condition_spec:
            exec('{} = thisLoop_condition_spec[paramName]'.format(paramName))
    
    # --- Prepare to start Routine "welcome" ---
    continueRoutine = True
    # update component parameters for each repeat
    text_welcome.setText(msg_welcome)
    key_welcome.keys = []
    key_welcome.rt = []
    _key_welcome_allKeys = []
    # keep track of which components have finished
    welcomeComponents = [text_welcome, key_welcome]
    for thisComponent in welcomeComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "welcome" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *text_welcome* updates
        
        # if text_welcome is starting this frame...
        if text_welcome.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            text_welcome.frameNStart = frameN  # exact frame index
            text_welcome.tStart = t  # local t and not account for scr refresh
            text_welcome.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(text_welcome, 'tStartRefresh')  # time at next scr refresh
            # update status
            text_welcome.status = STARTED
            text_welcome.setAutoDraw(True)
        
        # if text_welcome is active this frame...
        if text_welcome.status == STARTED:
            # update params
            pass
        
        # *key_welcome* updates
        waitOnFlip = False
        
        # if key_welcome is starting this frame...
        if key_welcome.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            key_welcome.frameNStart = frameN  # exact frame index
            key_welcome.tStart = t  # local t and not account for scr refresh
            key_welcome.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(key_welcome, 'tStartRefresh')  # time at next scr refresh
            # update status
            key_welcome.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(key_welcome.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(key_welcome.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if key_welcome.status == STARTED and not waitOnFlip:
            theseKeys = key_welcome.getKeys(keyList=['space'], waitRelease=False)
            _key_welcome_allKeys.extend(theseKeys)
            if len(_key_welcome_allKeys):
                key_welcome.keys = _key_welcome_allKeys[-1].name  # just the last key pressed
                key_welcome.rt = _key_welcome_allKeys[-1].rt
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
            if eyetracker:
                eyetracker.setConnectionState(False)
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in welcomeComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "welcome" ---
    for thisComponent in welcomeComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # check responses
    if key_welcome.keys in ['', [], None]:  # No response was made
        key_welcome.keys = None
    loop_condition_spec.addData('key_welcome.keys',key_welcome.keys)
    if key_welcome.keys != None:  # we had a response
        loop_condition_spec.addData('key_welcome.rt', key_welcome.rt)
    # the Routine "welcome" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    loop_randomise_task_order = data.TrialHandler(nReps=1.0, method='random', 
        extraInfo=expInfo, originPath=-1,
        trialList=data.importConditions('loops_spec/task_order.csv'),
        seed=None, name='loop_randomise_task_order')
    thisExp.addLoop(loop_randomise_task_order)  # add the loop to the experiment
    thisLoop_randomise_task_order = loop_randomise_task_order.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisLoop_randomise_task_order.rgb)
    if thisLoop_randomise_task_order != None:
        for paramName in thisLoop_randomise_task_order:
            exec('{} = thisLoop_randomise_task_order[paramName]'.format(paramName))
    
    for thisLoop_randomise_task_order in loop_randomise_task_order:
        currentLoop = loop_randomise_task_order
        # abbreviate parameter names if possible (e.g. rgb = thisLoop_randomise_task_order.rgb)
        if thisLoop_randomise_task_order != None:
            for paramName in thisLoop_randomise_task_order:
                exec('{} = thisLoop_randomise_task_order[paramName]'.format(paramName))
        
        # set up handler to look after randomisation of conditions etc
        loop_invest_instructions = data.TrialHandler(nReps=task1, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='loop_invest_instructions')
        thisExp.addLoop(loop_invest_instructions)  # add the loop to the experiment
        thisLoop_invest_instruction = loop_invest_instructions.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisLoop_invest_instruction.rgb)
        if thisLoop_invest_instruction != None:
            for paramName in thisLoop_invest_instruction:
                exec('{} = thisLoop_invest_instruction[paramName]'.format(paramName))
        
        for thisLoop_invest_instruction in loop_invest_instructions:
            currentLoop = loop_invest_instructions
            # abbreviate parameter names if possible (e.g. rgb = thisLoop_invest_instruction.rgb)
            if thisLoop_invest_instruction != None:
                for paramName in thisLoop_invest_instruction:
                    exec('{} = thisLoop_invest_instruction[paramName]'.format(paramName))
            
            # --- Prepare to start Routine "investment_instructions" ---
            continueRoutine = True
            # update component parameters for each repeat
            text_invest_instructions.setText(msg_invest_instructions)
            key_invest_instruction.keys = []
            key_invest_instruction.rt = []
            _key_invest_instruction_allKeys = []
            # keep track of which components have finished
            investment_instructionsComponents = [text_invest_instructions, key_invest_instruction]
            for thisComponent in investment_instructionsComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "investment_instructions" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *text_invest_instructions* updates
                
                # if text_invest_instructions is starting this frame...
                if text_invest_instructions.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    text_invest_instructions.frameNStart = frameN  # exact frame index
                    text_invest_instructions.tStart = t  # local t and not account for scr refresh
                    text_invest_instructions.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(text_invest_instructions, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    text_invest_instructions.status = STARTED
                    text_invest_instructions.setAutoDraw(True)
                
                # if text_invest_instructions is active this frame...
                if text_invest_instructions.status == STARTED:
                    # update params
                    pass
                
                # *key_invest_instruction* updates
                waitOnFlip = False
                
                # if key_invest_instruction is starting this frame...
                if key_invest_instruction.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    key_invest_instruction.frameNStart = frameN  # exact frame index
                    key_invest_instruction.tStart = t  # local t and not account for scr refresh
                    key_invest_instruction.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(key_invest_instruction, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'key_invest_instruction.started')
                    # update status
                    key_invest_instruction.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(key_invest_instruction.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(key_invest_instruction.clearEvents, eventType='keyboard')  # clear events on next screen flip
                if key_invest_instruction.status == STARTED and not waitOnFlip:
                    theseKeys = key_invest_instruction.getKeys(keyList=['space',], waitRelease=False)
                    _key_invest_instruction_allKeys.extend(theseKeys)
                    if len(_key_invest_instruction_allKeys):
                        key_invest_instruction.keys = _key_invest_instruction_allKeys[-1].name  # just the last key pressed
                        key_invest_instruction.rt = _key_invest_instruction_allKeys[-1].rt
                        # a response ends the routine
                        continueRoutine = False
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                    if eyetracker:
                        eyetracker.setConnectionState(False)
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in investment_instructionsComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "investment_instructions" ---
            for thisComponent in investment_instructionsComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # check responses
            if key_invest_instruction.keys in ['', [], None]:  # No response was made
                key_invest_instruction.keys = None
            loop_invest_instructions.addData('key_invest_instruction.keys',key_invest_instruction.keys)
            if key_invest_instruction.keys != None:  # we had a response
                loop_invest_instructions.addData('key_invest_instruction.rt', key_invest_instruction.rt)
            # the Routine "investment_instructions" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
        # completed task1 repeats of 'loop_invest_instructions'
        
        
        # set up handler to look after randomisation of conditions etc
        loop_investment = data.TrialHandler(nReps=task1 * 3, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='loop_investment')
        thisExp.addLoop(loop_investment)  # add the loop to the experiment
        thisLoop_investment = loop_investment.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisLoop_investment.rgb)
        if thisLoop_investment != None:
            for paramName in thisLoop_investment:
                exec('{} = thisLoop_investment[paramName]'.format(paramName))
        
        for thisLoop_investment in loop_investment:
            currentLoop = loop_investment
            # abbreviate parameter names if possible (e.g. rgb = thisLoop_investment.rgb)
            if thisLoop_investment != None:
                for paramName in thisLoop_investment:
                    exec('{} = thisLoop_investment[paramName]'.format(paramName))
            
            # --- Prepare to start Routine "investment_task" ---
            continueRoutine = True
            # update component parameters for each repeat
            # Run 'Begin Routine' code from code_score_counter_invest
            msg_score_counter = whose + " total score: " + str(total_score)
            score_counter_invest.setText(msg_score_counter)
            slider_invest.reset()
            key_invest_confirm.keys = []
            key_invest_confirm.rt = []
            _key_invest_confirm_allKeys = []
            # keep track of which components have finished
            investment_taskComponents = [score_counter_invest, text_invest, slider_invest, text_invest_confirm, key_invest_confirm]
            for thisComponent in investment_taskComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "investment_task" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *score_counter_invest* updates
                
                # if score_counter_invest is starting this frame...
                if score_counter_invest.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    score_counter_invest.frameNStart = frameN  # exact frame index
                    score_counter_invest.tStart = t  # local t and not account for scr refresh
                    score_counter_invest.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(score_counter_invest, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    score_counter_invest.status = STARTED
                    score_counter_invest.setAutoDraw(True)
                
                # if score_counter_invest is active this frame...
                if score_counter_invest.status == STARTED:
                    # update params
                    pass
                
                # *text_invest* updates
                
                # if text_invest is starting this frame...
                if text_invest.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    text_invest.frameNStart = frameN  # exact frame index
                    text_invest.tStart = t  # local t and not account for scr refresh
                    text_invest.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(text_invest, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    text_invest.status = STARTED
                    text_invest.setAutoDraw(True)
                
                # if text_invest is active this frame...
                if text_invest.status == STARTED:
                    # update params
                    pass
                
                # *slider_invest* updates
                
                # if slider_invest is starting this frame...
                if slider_invest.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    slider_invest.frameNStart = frameN  # exact frame index
                    slider_invest.tStart = t  # local t and not account for scr refresh
                    slider_invest.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(slider_invest, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'slider_invest.started')
                    # update status
                    slider_invest.status = STARTED
                    slider_invest.setAutoDraw(True)
                
                # if slider_invest is active this frame...
                if slider_invest.status == STARTED:
                    # update params
                    pass
                
                # *text_invest_confirm* updates
                
                # if text_invest_confirm is starting this frame...
                if text_invest_confirm.status == NOT_STARTED and slider_invest.rating:
                    # keep track of start time/frame for later
                    text_invest_confirm.frameNStart = frameN  # exact frame index
                    text_invest_confirm.tStart = t  # local t and not account for scr refresh
                    text_invest_confirm.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(text_invest_confirm, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    text_invest_confirm.status = STARTED
                    text_invest_confirm.setAutoDraw(True)
                
                # if text_invest_confirm is active this frame...
                if text_invest_confirm.status == STARTED:
                    # update params
                    pass
                
                # *key_invest_confirm* updates
                waitOnFlip = False
                
                # if key_invest_confirm is starting this frame...
                if key_invest_confirm.status == NOT_STARTED and slider_invest.rating:
                    # keep track of start time/frame for later
                    key_invest_confirm.frameNStart = frameN  # exact frame index
                    key_invest_confirm.tStart = t  # local t and not account for scr refresh
                    key_invest_confirm.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(key_invest_confirm, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'key_invest_confirm.started')
                    # update status
                    key_invest_confirm.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(key_invest_confirm.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(key_invest_confirm.clearEvents, eventType='keyboard')  # clear events on next screen flip
                if key_invest_confirm.status == STARTED and not waitOnFlip:
                    theseKeys = key_invest_confirm.getKeys(keyList=['y',], waitRelease=False)
                    _key_invest_confirm_allKeys.extend(theseKeys)
                    if len(_key_invest_confirm_allKeys):
                        key_invest_confirm.keys = _key_invest_confirm_allKeys[-1].name  # just the last key pressed
                        key_invest_confirm.rt = _key_invest_confirm_allKeys[-1].rt
                        # a response ends the routine
                        continueRoutine = False
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                    if eyetracker:
                        eyetracker.setConnectionState(False)
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in investment_taskComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "investment_task" ---
            for thisComponent in investment_taskComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            loop_investment.addData('slider_invest.response', slider_invest.getRating())
            loop_investment.addData('slider_invest.rt', slider_invest.getRT())
            # check responses
            if key_invest_confirm.keys in ['', [], None]:  # No response was made
                key_invest_confirm.keys = None
            loop_investment.addData('key_invest_confirm.keys',key_invest_confirm.keys)
            if key_invest_confirm.keys != None:  # we had a response
                loop_investment.addData('key_invest_confirm.rt', key_invest_confirm.rt)
            # the Routine "investment_task" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
            
            # --- Prepare to start Routine "investment_feedback" ---
            continueRoutine = True
            # update component parameters for each repeat
            # Run 'Begin Routine' code from code_invest_feedback
            # psychopy seems to have a bug: when a slider begins with a 0, I can't select it. Because of that i made the slider from 5 to 105 and now have to subtract 5 to get the real value the participant wanted to invest
            invest_amount = slider_invest.rating - 5
            invest_success = random.randint(1,3)
            
            if invest_success == 3: 
                round_score = 2.5 * invest_amount
                msg_invest_feedback = "Congratulations! " + who + " won " + str(round_score) + ". "
            else:
                round_score = - invest_amount
                msg_invest_feedback = "Unfortunately the money was lost." + who + " lost " + str( - round_score) + ". "
            
            total_score = total_score + round_score
            
            msg_invest_feedback = msg_invest_feedback + "\n" + "\n" + whose + " total score is now: " + str(total_score) + ". " + "\n\n" + "(Press 'space' to continue)"
            text_invest_feedback.setText(msg_invest_feedback)
            key_invest_feedback.keys = []
            key_invest_feedback.rt = []
            _key_invest_feedback_allKeys = []
            # keep track of which components have finished
            investment_feedbackComponents = [text_invest_feedback, key_invest_feedback]
            for thisComponent in investment_feedbackComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "investment_feedback" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *text_invest_feedback* updates
                
                # if text_invest_feedback is starting this frame...
                if text_invest_feedback.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    text_invest_feedback.frameNStart = frameN  # exact frame index
                    text_invest_feedback.tStart = t  # local t and not account for scr refresh
                    text_invest_feedback.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(text_invest_feedback, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    text_invest_feedback.status = STARTED
                    text_invest_feedback.setAutoDraw(True)
                
                # if text_invest_feedback is active this frame...
                if text_invest_feedback.status == STARTED:
                    # update params
                    pass
                
                # *key_invest_feedback* updates
                waitOnFlip = False
                
                # if key_invest_feedback is starting this frame...
                if key_invest_feedback.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    key_invest_feedback.frameNStart = frameN  # exact frame index
                    key_invest_feedback.tStart = t  # local t and not account for scr refresh
                    key_invest_feedback.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(key_invest_feedback, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'key_invest_feedback.started')
                    # update status
                    key_invest_feedback.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(key_invest_feedback.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(key_invest_feedback.clearEvents, eventType='keyboard')  # clear events on next screen flip
                if key_invest_feedback.status == STARTED and not waitOnFlip:
                    theseKeys = key_invest_feedback.getKeys(keyList=['space',], waitRelease=False)
                    _key_invest_feedback_allKeys.extend(theseKeys)
                    if len(_key_invest_feedback_allKeys):
                        key_invest_feedback.keys = _key_invest_feedback_allKeys[-1].name  # just the last key pressed
                        key_invest_feedback.rt = _key_invest_feedback_allKeys[-1].rt
                        # a response ends the routine
                        continueRoutine = False
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                    if eyetracker:
                        eyetracker.setConnectionState(False)
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in investment_feedbackComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "investment_feedback" ---
            for thisComponent in investment_feedbackComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # Run 'End Routine' code from code_invest_feedback
            thisExp.addData('total_score', total_score)
            thisExp.addData('round_score', round_score)
            
            # just to be able to see if all worked fine while looking at the csv alone
            thisExp.addData('invest_success', invest_success)
            # check responses
            if key_invest_feedback.keys in ['', [], None]:  # No response was made
                key_invest_feedback.keys = None
            loop_investment.addData('key_invest_feedback.keys',key_invest_feedback.keys)
            if key_invest_feedback.keys != None:  # we had a response
                loop_investment.addData('key_invest_feedback.rt', key_invest_feedback.rt)
            # the Routine "investment_feedback" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
            thisExp.nextEntry()
            
        # completed task1 * 3 repeats of 'loop_investment'
        
        
        # set up handler to look after randomisation of conditions etc
        loop_beleif_bias_instructions = data.TrialHandler(nReps=task2, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='loop_beleif_bias_instructions')
        thisExp.addLoop(loop_beleif_bias_instructions)  # add the loop to the experiment
        thisLoop_beleif_bias_instruction = loop_beleif_bias_instructions.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisLoop_beleif_bias_instruction.rgb)
        if thisLoop_beleif_bias_instruction != None:
            for paramName in thisLoop_beleif_bias_instruction:
                exec('{} = thisLoop_beleif_bias_instruction[paramName]'.format(paramName))
        
        for thisLoop_beleif_bias_instruction in loop_beleif_bias_instructions:
            currentLoop = loop_beleif_bias_instructions
            # abbreviate parameter names if possible (e.g. rgb = thisLoop_beleif_bias_instruction.rgb)
            if thisLoop_beleif_bias_instruction != None:
                for paramName in thisLoop_beleif_bias_instruction:
                    exec('{} = thisLoop_beleif_bias_instruction[paramName]'.format(paramName))
            
            # --- Prepare to start Routine "belief_bias_instructions" ---
            continueRoutine = True
            # update component parameters for each repeat
            key_instructions_belief_bias.keys = []
            key_instructions_belief_bias.rt = []
            _key_instructions_belief_bias_allKeys = []
            # keep track of which components have finished
            belief_bias_instructionsComponents = [text_instructions_belief_bias, key_instructions_belief_bias]
            for thisComponent in belief_bias_instructionsComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "belief_bias_instructions" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *text_instructions_belief_bias* updates
                
                # if text_instructions_belief_bias is starting this frame...
                if text_instructions_belief_bias.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    text_instructions_belief_bias.frameNStart = frameN  # exact frame index
                    text_instructions_belief_bias.tStart = t  # local t and not account for scr refresh
                    text_instructions_belief_bias.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(text_instructions_belief_bias, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    text_instructions_belief_bias.status = STARTED
                    text_instructions_belief_bias.setAutoDraw(True)
                
                # if text_instructions_belief_bias is active this frame...
                if text_instructions_belief_bias.status == STARTED:
                    # update params
                    pass
                
                # *key_instructions_belief_bias* updates
                waitOnFlip = False
                
                # if key_instructions_belief_bias is starting this frame...
                if key_instructions_belief_bias.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    key_instructions_belief_bias.frameNStart = frameN  # exact frame index
                    key_instructions_belief_bias.tStart = t  # local t and not account for scr refresh
                    key_instructions_belief_bias.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(key_instructions_belief_bias, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'key_instructions_belief_bias.started')
                    # update status
                    key_instructions_belief_bias.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(key_instructions_belief_bias.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(key_instructions_belief_bias.clearEvents, eventType='keyboard')  # clear events on next screen flip
                if key_instructions_belief_bias.status == STARTED and not waitOnFlip:
                    theseKeys = key_instructions_belief_bias.getKeys(keyList=['space',], waitRelease=False)
                    _key_instructions_belief_bias_allKeys.extend(theseKeys)
                    if len(_key_instructions_belief_bias_allKeys):
                        key_instructions_belief_bias.keys = _key_instructions_belief_bias_allKeys[-1].name  # just the last key pressed
                        key_instructions_belief_bias.rt = _key_instructions_belief_bias_allKeys[-1].rt
                        # a response ends the routine
                        continueRoutine = False
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                    if eyetracker:
                        eyetracker.setConnectionState(False)
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in belief_bias_instructionsComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "belief_bias_instructions" ---
            for thisComponent in belief_bias_instructionsComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # check responses
            if key_instructions_belief_bias.keys in ['', [], None]:  # No response was made
                key_instructions_belief_bias.keys = None
            loop_beleif_bias_instructions.addData('key_instructions_belief_bias.keys',key_instructions_belief_bias.keys)
            if key_instructions_belief_bias.keys != None:  # we had a response
                loop_beleif_bias_instructions.addData('key_instructions_belief_bias.rt', key_instructions_belief_bias.rt)
            # the Routine "belief_bias_instructions" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
        # completed task2 repeats of 'loop_beleif_bias_instructions'
        
        
        # set up handler to look after randomisation of conditions etc
        loop_belief_bias = data.TrialHandler(nReps=task2, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=data.importConditions('loops_spec/belief_bias.csv'),
            seed=None, name='loop_belief_bias')
        thisExp.addLoop(loop_belief_bias)  # add the loop to the experiment
        thisLoop_belief_bia = loop_belief_bias.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisLoop_belief_bia.rgb)
        if thisLoop_belief_bia != None:
            for paramName in thisLoop_belief_bia:
                exec('{} = thisLoop_belief_bia[paramName]'.format(paramName))
        
        for thisLoop_belief_bia in loop_belief_bias:
            currentLoop = loop_belief_bias
            # abbreviate parameter names if possible (e.g. rgb = thisLoop_belief_bia.rgb)
            if thisLoop_belief_bia != None:
                for paramName in thisLoop_belief_bia:
                    exec('{} = thisLoop_belief_bia[paramName]'.format(paramName))
            
            # --- Prepare to start Routine "belief_bias_task" ---
            continueRoutine = True
            # update component parameters for each repeat
            # Run 'Begin Routine' code from code_score_counter_belief_bias
            msg_score_counter = whose + " total score: " + str(total_score)
            score_counter_syllogism.setText(msg_score_counter)
            text_syllogism.setText(syllogism)
            key_syllogism.keys = []
            key_syllogism.rt = []
            _key_syllogism_allKeys = []
            # keep track of which components have finished
            belief_bias_taskComponents = [score_counter_syllogism, text_syllogism, key_syllogism]
            for thisComponent in belief_bias_taskComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "belief_bias_task" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *score_counter_syllogism* updates
                
                # if score_counter_syllogism is starting this frame...
                if score_counter_syllogism.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    score_counter_syllogism.frameNStart = frameN  # exact frame index
                    score_counter_syllogism.tStart = t  # local t and not account for scr refresh
                    score_counter_syllogism.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(score_counter_syllogism, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    score_counter_syllogism.status = STARTED
                    score_counter_syllogism.setAutoDraw(True)
                
                # if score_counter_syllogism is active this frame...
                if score_counter_syllogism.status == STARTED:
                    # update params
                    pass
                
                # *text_syllogism* updates
                
                # if text_syllogism is starting this frame...
                if text_syllogism.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    text_syllogism.frameNStart = frameN  # exact frame index
                    text_syllogism.tStart = t  # local t and not account for scr refresh
                    text_syllogism.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(text_syllogism, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    text_syllogism.status = STARTED
                    text_syllogism.setAutoDraw(True)
                
                # if text_syllogism is active this frame...
                if text_syllogism.status == STARTED:
                    # update params
                    pass
                
                # *key_syllogism* updates
                waitOnFlip = False
                
                # if key_syllogism is starting this frame...
                if key_syllogism.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    key_syllogism.frameNStart = frameN  # exact frame index
                    key_syllogism.tStart = t  # local t and not account for scr refresh
                    key_syllogism.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(key_syllogism, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'key_syllogism.started')
                    # update status
                    key_syllogism.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(key_syllogism.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(key_syllogism.clearEvents, eventType='keyboard')  # clear events on next screen flip
                if key_syllogism.status == STARTED and not waitOnFlip:
                    theseKeys = key_syllogism.getKeys(keyList=['y', 'n'], waitRelease=False)
                    _key_syllogism_allKeys.extend(theseKeys)
                    if len(_key_syllogism_allKeys):
                        key_syllogism.keys = _key_syllogism_allKeys[-1].name  # just the last key pressed
                        key_syllogism.rt = _key_syllogism_allKeys[-1].rt
                        # was this correct?
                        if (key_syllogism.keys == str(syllogism_correct_ans)) or (key_syllogism.keys == syllogism_correct_ans):
                            key_syllogism.corr = 1
                        else:
                            key_syllogism.corr = 0
                        # a response ends the routine
                        continueRoutine = False
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                    if eyetracker:
                        eyetracker.setConnectionState(False)
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in belief_bias_taskComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "belief_bias_task" ---
            for thisComponent in belief_bias_taskComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # check responses
            if key_syllogism.keys in ['', [], None]:  # No response was made
                key_syllogism.keys = None
                # was no response the correct answer?!
                if str(syllogism_correct_ans).lower() == 'none':
                   key_syllogism.corr = 1;  # correct non-response
                else:
                   key_syllogism.corr = 0;  # failed to respond (incorrectly)
            # store data for loop_belief_bias (TrialHandler)
            loop_belief_bias.addData('key_syllogism.keys',key_syllogism.keys)
            loop_belief_bias.addData('key_syllogism.corr', key_syllogism.corr)
            if key_syllogism.keys != None:  # we had a response
                loop_belief_bias.addData('key_syllogism.rt', key_syllogism.rt)
            # the Routine "belief_bias_task" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
            thisExp.nextEntry()
            
        # completed task2 repeats of 'loop_belief_bias'
        
        
        # set up handler to look after randomisation of conditions etc
        loop_belief_bias_feedback = data.TrialHandler(nReps=task2, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='loop_belief_bias_feedback')
        thisExp.addLoop(loop_belief_bias_feedback)  # add the loop to the experiment
        thisLoop_belief_bias_feedback = loop_belief_bias_feedback.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisLoop_belief_bias_feedback.rgb)
        if thisLoop_belief_bias_feedback != None:
            for paramName in thisLoop_belief_bias_feedback:
                exec('{} = thisLoop_belief_bias_feedback[paramName]'.format(paramName))
        
        for thisLoop_belief_bias_feedback in loop_belief_bias_feedback:
            currentLoop = loop_belief_bias_feedback
            # abbreviate parameter names if possible (e.g. rgb = thisLoop_belief_bias_feedback.rgb)
            if thisLoop_belief_bias_feedback != None:
                for paramName in thisLoop_belief_bias_feedback:
                    exec('{} = thisLoop_belief_bias_feedback[paramName]'.format(paramName))
            
            # --- Prepare to start Routine "belief_bias_feedback" ---
            continueRoutine = True
            # update component parameters for each repeat
            # Run 'Begin Routine' code from code_syllogisms_feedback
            # i decided to set the score for the syllogism task constant to reduce the influence of individual performance on subsequent tasks
            syllogisms_score = 360
            total_score = total_score + syllogisms_score
            
            msg_belief_bias_feedback = "Congratulations! " + who + " gained " + str(syllogisms_score)+ ". " + "\n" + "\n" + whose + " total score is now: " + str(total_score) + ". " + "\n\n" + "(Press 'space' to continue)"
            text_syllogism_feedback.setText(msg_belief_bias_feedback)
            key_syllogism_feedback.keys = []
            key_syllogism_feedback.rt = []
            _key_syllogism_feedback_allKeys = []
            # keep track of which components have finished
            belief_bias_feedbackComponents = [text_syllogism_feedback, key_syllogism_feedback]
            for thisComponent in belief_bias_feedbackComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "belief_bias_feedback" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *text_syllogism_feedback* updates
                
                # if text_syllogism_feedback is starting this frame...
                if text_syllogism_feedback.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    text_syllogism_feedback.frameNStart = frameN  # exact frame index
                    text_syllogism_feedback.tStart = t  # local t and not account for scr refresh
                    text_syllogism_feedback.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(text_syllogism_feedback, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    text_syllogism_feedback.status = STARTED
                    text_syllogism_feedback.setAutoDraw(True)
                
                # if text_syllogism_feedback is active this frame...
                if text_syllogism_feedback.status == STARTED:
                    # update params
                    pass
                
                # *key_syllogism_feedback* updates
                waitOnFlip = False
                
                # if key_syllogism_feedback is starting this frame...
                if key_syllogism_feedback.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    key_syllogism_feedback.frameNStart = frameN  # exact frame index
                    key_syllogism_feedback.tStart = t  # local t and not account for scr refresh
                    key_syllogism_feedback.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(key_syllogism_feedback, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'key_syllogism_feedback.started')
                    # update status
                    key_syllogism_feedback.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(key_syllogism_feedback.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(key_syllogism_feedback.clearEvents, eventType='keyboard')  # clear events on next screen flip
                if key_syllogism_feedback.status == STARTED and not waitOnFlip:
                    theseKeys = key_syllogism_feedback.getKeys(keyList=['space'], waitRelease=False)
                    _key_syllogism_feedback_allKeys.extend(theseKeys)
                    if len(_key_syllogism_feedback_allKeys):
                        key_syllogism_feedback.keys = _key_syllogism_feedback_allKeys[-1].name  # just the last key pressed
                        key_syllogism_feedback.rt = _key_syllogism_feedback_allKeys[-1].rt
                        # a response ends the routine
                        continueRoutine = False
                
                # check for quit (typically the Esc key)
                if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                    core.quit()
                    if eyetracker:
                        eyetracker.setConnectionState(False)
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in belief_bias_feedbackComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "belief_bias_feedback" ---
            for thisComponent in belief_bias_feedbackComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # check responses
            if key_syllogism_feedback.keys in ['', [], None]:  # No response was made
                key_syllogism_feedback.keys = None
            loop_belief_bias_feedback.addData('key_syllogism_feedback.keys',key_syllogism_feedback.keys)
            if key_syllogism_feedback.keys != None:  # we had a response
                loop_belief_bias_feedback.addData('key_syllogism_feedback.rt', key_syllogism_feedback.rt)
            # the Routine "belief_bias_feedback" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
        # completed task2 repeats of 'loop_belief_bias_feedback'
        
    # completed 1.0 repeats of 'loop_randomise_task_order'
    
# completed 1.0 repeats of 'loop_condition_spec'


# --- Prepare to start Routine "debriefing_or_farewell" ---
continueRoutine = True
# update component parameters for each repeat
key_debrief.keys = []
key_debrief.rt = []
_key_debrief_allKeys = []
# keep track of which components have finished
debriefing_or_farewellComponents = [text_debrief, key_debrief]
for thisComponent in debriefing_or_farewellComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "debriefing_or_farewell" ---
routineForceEnded = not continueRoutine
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *text_debrief* updates
    
    # if text_debrief is starting this frame...
    if text_debrief.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        text_debrief.frameNStart = frameN  # exact frame index
        text_debrief.tStart = t  # local t and not account for scr refresh
        text_debrief.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(text_debrief, 'tStartRefresh')  # time at next scr refresh
        # update status
        text_debrief.status = STARTED
        text_debrief.setAutoDraw(True)
    
    # if text_debrief is active this frame...
    if text_debrief.status == STARTED:
        # update params
        pass
    
    # *key_debrief* updates
    waitOnFlip = False
    
    # if key_debrief is starting this frame...
    if key_debrief.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_debrief.frameNStart = frameN  # exact frame index
        key_debrief.tStart = t  # local t and not account for scr refresh
        key_debrief.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_debrief, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'key_debrief.started')
        # update status
        key_debrief.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_debrief.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_debrief.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_debrief.status == STARTED and not waitOnFlip:
        theseKeys = key_debrief.getKeys(keyList=['space'], waitRelease=False)
        _key_debrief_allKeys.extend(theseKeys)
        if len(_key_debrief_allKeys):
            key_debrief.keys = _key_debrief_allKeys[-1].name  # just the last key pressed
            key_debrief.rt = _key_debrief_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
        if eyetracker:
            eyetracker.setConnectionState(False)
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in debriefing_or_farewellComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "debriefing_or_farewell" ---
for thisComponent in debriefing_or_farewellComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# check responses
if key_debrief.keys in ['', [], None]:  # No response was made
    key_debrief.keys = None
thisExp.addData('key_debrief.keys',key_debrief.keys)
if key_debrief.keys != None:  # we had a response
    thisExp.addData('key_debrief.rt', key_debrief.rt)
thisExp.nextEntry()
# the Routine "debriefing_or_farewell" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# --- Prepare to start Routine "bye_bye" ---
continueRoutine = True
# update component parameters for each repeat
key_resp.keys = []
key_resp.rt = []
_key_resp_allKeys = []
# keep track of which components have finished
bye_byeComponents = [text_bye_bye, key_resp]
for thisComponent in bye_byeComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "bye_bye" ---
routineForceEnded = not continueRoutine
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *text_bye_bye* updates
    
    # if text_bye_bye is starting this frame...
    if text_bye_bye.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        text_bye_bye.frameNStart = frameN  # exact frame index
        text_bye_bye.tStart = t  # local t and not account for scr refresh
        text_bye_bye.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(text_bye_bye, 'tStartRefresh')  # time at next scr refresh
        # update status
        text_bye_bye.status = STARTED
        text_bye_bye.setAutoDraw(True)
    
    # if text_bye_bye is active this frame...
    if text_bye_bye.status == STARTED:
        # update params
        pass
    
    # *key_resp* updates
    waitOnFlip = False
    
    # if key_resp is starting this frame...
    if key_resp.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_resp.frameNStart = frameN  # exact frame index
        key_resp.tStart = t  # local t and not account for scr refresh
        key_resp.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_resp, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'key_resp.started')
        # update status
        key_resp.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_resp.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_resp.status == STARTED and not waitOnFlip:
        theseKeys = key_resp.getKeys(keyList=['space',], waitRelease=False)
        _key_resp_allKeys.extend(theseKeys)
        if len(_key_resp_allKeys):
            key_resp.keys = _key_resp_allKeys[-1].name  # just the last key pressed
            key_resp.rt = _key_resp_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
        if eyetracker:
            eyetracker.setConnectionState(False)
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in bye_byeComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "bye_bye" ---
for thisComponent in bye_byeComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# check responses
if key_resp.keys in ['', [], None]:  # No response was made
    key_resp.keys = None
thisExp.addData('key_resp.keys',key_resp.keys)
if key_resp.keys != None:  # we had a response
    thisExp.addData('key_resp.rt', key_resp.rt)
thisExp.nextEntry()
# the Routine "bye_bye" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# --- End experiment ---
# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='comma')
thisExp.saveAsPickle(filename)
logging.flush()
# make sure everything is closed down
if eyetracker:
    eyetracker.setConnectionState(False)
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
