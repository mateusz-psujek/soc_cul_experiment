/*********************** 
 * Scd_Experiment Test *
 ***********************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2023.1.2.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'scd_experiment';  // from the Builder filename that created this script
let expInfo = {
    'participant': '(leave blank)',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from code_begin
// defining a function useful in the investment / lottery task

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// defining a function for the ratio bias task

var radius;
var n_white;
var red;
var white;
var fills;
var positions_x_row;
var positions_x;
var positions_y;
var circles;
function marbles(n_marbles = 20, n_red = 2, n_row = 10, total_width = 6, position_x = 0, position_y = 0, spacing = 0.01) {
    radius = (total_width - n_row * spacing) / (n_row * 2);
    n_white = Math.round((n_marbles - n_red));
    red = new Array(n_red).fill("red");
    white = new Array(n_white).fill("white");
    fills = red.concat(white);
    util.shuffle(fills);
    
    positions_x_row = [ ];
    for (let i = 0; i < n_row; i++) {
      positions_x_row = positions_x_row.concat(position_x);
      position_x = position_x + 2*radius + spacing;
      position_x = Math.round(position_x*1000)/1000;
}
    positions_x = new Array(n_marbles / n_row).fill(positions_x_row).flat();
    
    
    positions_y = [ ];
    var i_y; //curent value(for each marble) of y
    for (let i = 0; i < n_marbles; i++) {
        i_y = position_y - (2*radius + spacing) * Math.floor(i / n_row);
        positions_y = positions_y.concat(i_y);
}
    
    circles = [ ];
    var circle;
    for (let i = 0; i < n_marbles; i++) {
    circle = new visual.Polygon({
        win: psychoJS.window, 
        name: 'circle', 
        units : 'height', 
        edges: 100, 
        size:[2*radius, 2*radius],
        ori: 0.0, 
        pos: [positions_x[i], positions_y[i]],
        anchor: 'center',
        lineWidth: 1.0, 
        colorSpace: 'rgb',
        lineColor: new util.Color('black'),
        fillColor: new util.Color(fills[i]),
        opacity: undefined, 
        depth: -1, 
        interpolate: true,
    });
    
    circles = circles.concat(circle);
    }

    return circles;
}


// I need to declare these here bc otherwise it bugs
position_x_large = 0;
position_x_small = 0;
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([1.0, 1.0, 1.0]),
  units: 'height',
  waitBlanking: true
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(consentRoutineBegin());
flowScheduler.add(consentRoutineEachFrame());
flowScheduler.add(consentRoutineEnd());
flowScheduler.add(welcomeRoutineBegin());
flowScheduler.add(welcomeRoutineEachFrame());
flowScheduler.add(welcomeRoutineEnd());
const loop_randomise_task_orderLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop_randomise_task_orderLoopBegin(loop_randomise_task_orderLoopScheduler));
flowScheduler.add(loop_randomise_task_orderLoopScheduler);
flowScheduler.add(loop_randomise_task_orderLoopEnd);
flowScheduler.add(survey_demographicsRoutineBegin());
flowScheduler.add(survey_demographicsRoutineEachFrame());
flowScheduler.add(survey_demographicsRoutineEnd());
flowScheduler.add(debriefing_or_farewellRoutineBegin());
flowScheduler.add(debriefing_or_farewellRoutineEachFrame());
flowScheduler.add(debriefing_or_farewellRoutineEnd());
flowScheduler.add(feedbackRoutineBegin());
flowScheduler.add(feedbackRoutineEachFrame());
flowScheduler.add(feedbackRoutineEnd());
flowScheduler.add(bye_byeRoutineBegin());
flowScheduler.add(bye_byeRoutineEachFrame());
flowScheduler.add(bye_byeRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // libraries:
    {'surveyLibrary': true},
    // resources:
    {'name': 'loops_spec/task_order.csv', 'path': 'loops_spec/task_order.csv'},
    {'name': 'loops_spec/ratio_bias_order.csv', 'path': 'loops_spec/ratio_bias_order.csv'},
    {'name': 'loops_spec/belief_bias.csv', 'path': 'loops_spec/belief_bias.csv'},
    {'surveyId': 'afe5bbb0-9f7b-409a-a5b5-f8f9dfcaa894'},
    {'surveyId': '0f39242f-2312-451c-b7ca-14536cb886bd'},
    {'name': 'loops_spec/belief_bias.csv', 'path': 'loops_spec/belief_bias.csv'},
    {'name': 'loops_spec/task_order.csv', 'path': 'loops_spec/task_order.csv'},
    {'name': 'loops_spec/condition_spec.csv', 'path': 'loops_spec/condition_spec.csv'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2023.1.2';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);


  return Scheduler.Event.NEXT;
}


var consentClock;
var participantN;
var counterbal;
var cond_id;
var msg_welcome_individual;
var msg_welcome_group;
var msg_invest_instructions_individual;
var msg_invest_instructions_group;
var msg_debrief_group;
var msg_debrief_individual;
var who;
var whose;
var sss;
var msg_welcome;
var msg_invest_instructions;
var msg_debrief;
var msg_win_belief_bias_instructions;
var msg_lose_belief_bias_instructions;
var total_score;
var text_consent;
var key_consent;
var welcomeClock;
var text_welcome;
var key_welcome;
var ratio_bias_instructions_positiveClock;
var text_ratio_bias_instructions;
var key_ratio_bias_instructions;
var ratio_bias_taskClock;
var score_counter_ratio_bias;
var text_ratio_bias;
var caption_large_ratio_bias;
var caption_small_ratio_bias;
var resp_ratio_bias_task;
var ratio_bias_feedbackClock;
var text_ratio_bias_feedback;
var key_ratio_bias_feedback;
var ratio_bias_instructions_negativeClock;
var text_ratio_bias_instructions_lose;
var key_ratio_bias_instructions_lose;
var investment_instructionsClock;
var text_invest_instructions;
var key_invest_instruction;
var investment_taskClock;
var score_counter_invest;
var text_invest;
var slider_invest;
var text_invest_confirm;
var key_invest_confirm;
var investment_feedbackClock;
var text_invest_feedback;
var key_invest_feedback;
var belief_bias_instructionsClock;
var text_instructions_belief_bias;
var key_instructions_belief_bias;
var belief_bias_taskClock;
var score_counter_syllogism;
var text_syllogism;
var key_syllogism;
var belief_bias_feedbackClock;
var text_syllogism_feedback;
var key_syllogism_feedback;
var debriefing_or_farewellClock;
var text_debrief;
var key_debrief;
var bye_byeClock;
var text_bye_bye;
var key_resp;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "consent"
  consentClock = new util.Clock();
  // Run 'Begin Experiment' code from code_begin
  // just keeping a participant counter to see how the counterbalancing works, and why not
  // increase the value on the shelf by 1
  psychoJS.shelf.addIntegerValue({key: ['participant_counter'], delta: 1})
  // fetch the current value on the shelf
  participantN = await psychoJS.shelf.getIntegerValue({key: ['participant_counter'], defaultVlaue: 0})
  // https://www.psychopy.org/online/shelf.html#interacting-with-integer-records
  
  psychoJS.experiment.addData("participant_counter", participantN);
  
  // draw a condition randomly using pavlovia shelf feature
  counterbal = await psychoJS.shelf.counterBalanceSelect({key: ['soc_cul_conditions']})
  cond_id = counterbal.group;
  
  
  msg_welcome_individual = `Welcome to the experiment!
  
  Your initial score is 1054 points. 
  In a minute, you'll be asked to perform different tasks. The goal is to get as many points as possible. 
  
  If, at any point, you need to leave the experiment before it's finished, press the 'escape' key. Be aware that your data will be removed if you do that.
  Otherwise, press 'space' to move forward.
  
  Good luck!`;
  
  
  
  msg_welcome_group = `Welcome to the experiment!
  
  You have been randomly assigned to group number 4 and are now this group's 3rd and last member.
  Members of your group have collectively gathered 1054 points. This is your current group score. 
  In a minute, you'll be asked to perform different tasks. The goal is to get as many points for your team as possible.
  
  If, at any point, you need to leave the experiment before it's finished, press the 'escape' key. Be aware that your data will be removed if you do that.
  
  Otherwise, press 'space' to move forward.
  
  Good luck!`;
  
  
  
  msg_invest_instructions_individual = `This part of the experiement consists of 3 succesive rounds. In each round you will start with your current total score. You must decide how many points (but maximally 100 points) you wish to take out of your current score and bet in the following lottery:
  
  You have a chance of 2/3 (67%) to lose the amount you bet and a chance of 1/3 (33%) to win 2.5 times the amount you bet. 
  
  (Press 'space' to move to the first round)`;
  
  
  
  msg_invest_instructions_group = `This part of the experiement consists of 3 succesive rounds (for each group member, so 9 in total for your entire group). In each round you will start with your current total score. You must decide how many points (but maximally 100 points) you wish to take out of your current score and bet in the following lottery:
  
  You have a chance of 2/3 (67%) to lose the amount you bet and a chance of 1/3 (33%) to win 2.5 times the amount you bet. 
  
  (Press 'space' to move to the first round)`;
  
  
  
  
  msg_debrief_group = "Before we finish, I need to inform you about the deception used in this experiment. At the beginning of the experiment, you were told you had been assigned to a group, and that your initial score was a result of the performance of other group members. This group was not real, and the intial score was set in advance by the experimenter, regardless of anyone else's real performance.";
  msg_debrief_individual = "Before we finish, I need to inform you about the deception used in this experiment. While you solved the tasks as an individual, some people were told they have been assigned to a group, and that their initial score was a result of other people performance. This group was not real, and the intial score was set in advance, regardless of anyone else real performance.";
  
  
  
  
  if (cond_id == '0') {
      who = "You";
      whose = "Your";
      sss = "";
      msg_welcome = msg_welcome_individual;
      msg_invest_instructions = msg_invest_instructions_individual;
      msg_debrief = msg_debrief_individual;
  } else {
      if (cond_id == '1') {
          who = "Your group";
          whose = "Your group's";
          sss = "s";
          msg_welcome = msg_welcome_group;
          msg_invest_instructions = msg_invest_instructions_group;
          msg_debrief = msg_debrief_group;
      }
  }
  
  msg_win_belief_bias_instructions = "In this task, you will be presented with different trays of red and white marbles. Each round one marble is drawn at random from one of the trays (imagine the marbles are mixed up and you are to pick one without looking). If the marble you draw is red " + who.toLowerCase() + " WIN" + sss.toUpperCase() + " 100 points. Your task is to choose which tray you want to draw from." + "\n\n" + "(Press 'space' to continue)";
  msg_lose_belief_bias_instructions = "In this task, you will be presented with different trays of red and white marbles. Each round one marble is drawn at random from one of the trays (imagine the marbles are mixed up and you are to pick one without looking). If the marble you draw is red " + who.toLowerCase() + " LOSE" + sss.toUpperCase() + " 100 points. Your task is to choose which tray you want to draw from." + "\n\n" + "(Press 'space' to continue)";
  
  
  
  total_score = 1054;
  
  psychoJS.experiment.addData("who", who);
  text_consent = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_consent',
    text: "Hi! \nYou are about to take part in an experiment I made as a part of an exam at my Bachelor's programme. Before you decide to participate, it is important that you understand what it will involve. Please read the following information carefully, and contact me if you have any questions (email: au693018@uni.au.dk).\n\nTo take part in this experiment you must be at least 18 years old. You will be asked to perform a few cognitive tasks and to provide some of your personal information (e.g. gender, age, education). The tasks don't seem to involve any risk beyond potential boredom or tiredness.  The collected data will be anonymised. Data collection takes place through Pavlovia.org which is GDPR compliant. I will also store a copy of the data locally on my laptop. The data will only be used to write a mock scientific research paper for a university exam. I will delete the data after having passed the course. You are welcome to withdraw your consent at any time during the experiment by clicking the 'escape' key. All collected data will be deleted in such a case, and won't be used in the exam. After the experiment is finished, but before 01.08.2023, you can still withdraw your consent to use your data, if you provide me with the exact date and time you took part in the experiment, as I won't be able to identify your data otherwise. \n\n\nPress the 'y' key if you are above 18, and you consent to take part in the experiment;\nPress the 'escape' key to leave (click 'esc' twice if you're in fullscreen mode)",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_consent = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "welcome"
  welcomeClock = new util.Clock();
  text_welcome = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_welcome',
    text: msg_welcome,
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_welcome = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "ratio_bias_instructions_positive"
  ratio_bias_instructions_positiveClock = new util.Clock();
  text_ratio_bias_instructions = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_ratio_bias_instructions',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_ratio_bias_instructions = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "ratio_bias_task"
  ratio_bias_taskClock = new util.Clock();
  score_counter_ratio_bias = new visual.TextStim({
    win: psychoJS.window,
    name: 'score_counter_ratio_bias',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.6, 0.45], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('crimson'),  opacity: undefined,
    depth: -1.0 
  });
  
  text_ratio_bias = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_ratio_bias',
    text: "Press the 'f' key to choose the tray on the left.\nPress the 'j' key to choose the tray on the right.",
    font: 'Open Sans',
    units: 'height', 
    pos: [0, 0.34], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -2.0 
  });
  
  caption_large_ratio_bias = new visual.TextStim({
    win: psychoJS.window,
    name: 'caption_large_ratio_bias',
    text: '',
    font: 'Open Sans',
    units: 'height', 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -3.0 
  });
  
  caption_small_ratio_bias = new visual.TextStim({
    win: psychoJS.window,
    name: 'caption_small_ratio_bias',
    text: '( 9 white and 1 red marbles)',
    font: 'Open Sans',
    units: 'height', 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -4.0 
  });
  
  resp_ratio_bias_task = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "ratio_bias_feedback"
  ratio_bias_feedbackClock = new util.Clock();
  text_ratio_bias_feedback = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_ratio_bias_feedback',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_ratio_bias_feedback = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "ratio_bias_instructions_negative"
  ratio_bias_instructions_negativeClock = new util.Clock();
  text_ratio_bias_instructions_lose = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_ratio_bias_instructions_lose',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_ratio_bias_instructions_lose = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "investment_instructions"
  investment_instructionsClock = new util.Clock();
  text_invest_instructions = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_invest_instructions',
    text: msg_invest_instructions,
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_invest_instruction = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "investment_task"
  investment_taskClock = new util.Clock();
  score_counter_invest = new visual.TextStim({
    win: psychoJS.window,
    name: 'score_counter_invest',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.6, 0.45], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('crimson'),  opacity: undefined,
    depth: -1.0 
  });
  
  text_invest = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_invest',
    text: 'You have a chance of 2/3 (67%) to lose the amount you bet and a chance of 1/3(33%)  to win 2.5 times the amount you bet. \n\nPlease indicate how much you want to bet by clicking on the slider below? (Maximum 100 points)',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.2], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -2.0 
  });
  
  slider_invest = new visual.Slider({
    win: psychoJS.window, name: 'slider_invest',
    startValue: undefined,
    size: [1.0, 0.04], pos: [0, (- 0.2)], ori: 0.0, units: psychoJS.window.units,
    labels: ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"], fontSize: 0.04, ticks: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],
    granularity: 1.0, style: ["RATING", "TRIANGLE_MARKER"],
    color: new util.Color('black'), markerColor: new util.Color('black'), lineColor: new util.Color('black'), 
    opacity: undefined, fontFamily: 'Open Sans', bold: true, italic: false, depth: -3, 
    flip: false,
  });
  
  text_invest_confirm = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_invest_confirm',
    text: "(Press 'y' to confirm)",
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0), (- 0.4)], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -4.0 
  });
  
  key_invest_confirm = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "investment_feedback"
  investment_feedbackClock = new util.Clock();
  text_invest_feedback = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_invest_feedback',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_invest_feedback = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "belief_bias_instructions"
  belief_bias_instructionsClock = new util.Clock();
  text_instructions_belief_bias = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_instructions_belief_bias',
    text: ((((((("You are going to receive a series of eight problems. You must decide whether the stated conclusion follows logically from the premises or not." + "\n") + "It is important that you suppose all of the premises are true and limit yourself only to the information contained in these premises.") + "\n\n") + whose) + " score will be updated after you solve all eight problems.") + "\n\n") + "(Press 'space' to continue)"),
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_instructions_belief_bias = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "belief_bias_task"
  belief_bias_taskClock = new util.Clock();
  score_counter_syllogism = new visual.TextStim({
    win: psychoJS.window,
    name: 'score_counter_syllogism',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.6, 0.45], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('crimson'),  opacity: undefined,
    depth: -1.0 
  });
  
  text_syllogism = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_syllogism',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -2.0 
  });
  
  key_syllogism = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "belief_bias_feedback"
  belief_bias_feedbackClock = new util.Clock();
  text_syllogism_feedback = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_syllogism_feedback',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_syllogism_feedback = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "debriefing_or_farewell"
  debriefing_or_farewellClock = new util.Clock();
  text_debrief = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_debrief',
    text: (((((((((msg_debrief + "This was done to create a sense of group membership. The experiment was about understanding group membership's impact on the performance on the experimental tasks.") + "\n") + "Additionally, all of the participants received the same score for the syllogism task (360 points) regardless of the proportion of correct asnwers.") + "\n") + "If you wish to revoke your consent to store and use your data in this project, please click 'escape'. Both the data on your performance and your background information will be then deleted from the dataset and won't be used in the exam.") + "\n\n") + "I'm sorry for any inconvenience, and thank you for your time!") + "\n") + "Otherwise, press 'space' to continue."),
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_debrief = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "bye_bye"
  bye_byeClock = new util.Clock();
  text_bye_bye = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_bye_bye',
    text: "Thank you for participating once again, and have a lovely day!:)\n\n\n\n(Press 'space' to finish the experiment and save the data)",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var _key_consent_allKeys;
var consentComponents;
function consentRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'consent' ---
    t = 0;
    consentClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_consent.keys = undefined;
    key_consent.rt = undefined;
    _key_consent_allKeys = [];
    // keep track of which components have finished
    consentComponents = [];
    consentComponents.push(text_consent);
    consentComponents.push(key_consent);
    
    for (const thisComponent of consentComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function consentRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'consent' ---
    // get current time
    t = consentClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_consent* updates
    if (t >= 0.0 && text_consent.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_consent.tStart = t;  // (not accounting for frame time here)
      text_consent.frameNStart = frameN;  // exact frame index
      
      text_consent.setAutoDraw(true);
    }

    
    // *key_consent* updates
    if (t >= 0.0 && key_consent.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_consent.tStart = t;  // (not accounting for frame time here)
      key_consent.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_consent.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_consent.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_consent.clearEvents(); });
    }

    if (key_consent.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_consent.getKeys({keyList: ['y'], waitRelease: false});
      _key_consent_allKeys = _key_consent_allKeys.concat(theseKeys);
      if (_key_consent_allKeys.length > 0) {
        key_consent.keys = _key_consent_allKeys[_key_consent_allKeys.length - 1].name;  // just the last key pressed
        key_consent.rt = _key_consent_allKeys[_key_consent_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of consentComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function consentRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'consent' ---
    for (const thisComponent of consentComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_consent.corr, level);
    }
    psychoJS.experiment.addData('key_consent.keys', key_consent.keys);
    if (typeof key_consent.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_consent.rt', key_consent.rt);
        routineTimer.reset();
        }
    
    key_consent.stop();
    // the Routine "consent" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_welcome_allKeys;
var welcomeComponents;
function welcomeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'welcome' ---
    t = 0;
    welcomeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_welcome.keys = undefined;
    key_welcome.rt = undefined;
    _key_welcome_allKeys = [];
    // keep track of which components have finished
    welcomeComponents = [];
    welcomeComponents.push(text_welcome);
    welcomeComponents.push(key_welcome);
    
    for (const thisComponent of welcomeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function welcomeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'welcome' ---
    // get current time
    t = welcomeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_welcome* updates
    if (t >= 0.0 && text_welcome.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_welcome.tStart = t;  // (not accounting for frame time here)
      text_welcome.frameNStart = frameN;  // exact frame index
      
      text_welcome.setAutoDraw(true);
    }

    
    // *key_welcome* updates
    if (t >= 0.0 && key_welcome.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_welcome.tStart = t;  // (not accounting for frame time here)
      key_welcome.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_welcome.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_welcome.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_welcome.clearEvents(); });
    }

    if (key_welcome.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_welcome.getKeys({keyList: ['space'], waitRelease: false});
      _key_welcome_allKeys = _key_welcome_allKeys.concat(theseKeys);
      if (_key_welcome_allKeys.length > 0) {
        key_welcome.keys = _key_welcome_allKeys[_key_welcome_allKeys.length - 1].name;  // just the last key pressed
        key_welcome.rt = _key_welcome_allKeys[_key_welcome_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of welcomeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function welcomeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'welcome' ---
    for (const thisComponent of welcomeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_welcome.corr, level);
    }
    psychoJS.experiment.addData('key_welcome.keys', key_welcome.keys);
    if (typeof key_welcome.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_welcome.rt', key_welcome.rt);
        routineTimer.reset();
        }
    
    key_welcome.stop();
    // the Routine "welcome" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var loop_randomise_task_order;
function loop_randomise_task_orderLoopBegin(loop_randomise_task_orderLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_randomise_task_order = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'loops_spec/task_order.csv',
      seed: undefined, name: 'loop_randomise_task_order'
    });
    psychoJS.experiment.addLoop(loop_randomise_task_order); // add the loop to the experiment
    currentLoop = loop_randomise_task_order;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisLoop_randomise_task_order of loop_randomise_task_order) {
      snapshot = loop_randomise_task_order.getSnapshot();
      loop_randomise_task_orderLoopScheduler.add(importConditions(snapshot));
      const loop_randomise_ratio_biasLoopScheduler = new Scheduler(psychoJS);
      loop_randomise_task_orderLoopScheduler.add(loop_randomise_ratio_biasLoopBegin(loop_randomise_ratio_biasLoopScheduler, snapshot));
      loop_randomise_task_orderLoopScheduler.add(loop_randomise_ratio_biasLoopScheduler);
      loop_randomise_task_orderLoopScheduler.add(loop_randomise_ratio_biasLoopEnd);
      const loop_invest_instructionsLoopScheduler = new Scheduler(psychoJS);
      loop_randomise_task_orderLoopScheduler.add(loop_invest_instructionsLoopBegin(loop_invest_instructionsLoopScheduler, snapshot));
      loop_randomise_task_orderLoopScheduler.add(loop_invest_instructionsLoopScheduler);
      loop_randomise_task_orderLoopScheduler.add(loop_invest_instructionsLoopEnd);
      const loop_investmentLoopScheduler = new Scheduler(psychoJS);
      loop_randomise_task_orderLoopScheduler.add(loop_investmentLoopBegin(loop_investmentLoopScheduler, snapshot));
      loop_randomise_task_orderLoopScheduler.add(loop_investmentLoopScheduler);
      loop_randomise_task_orderLoopScheduler.add(loop_investmentLoopEnd);
      const loop_beleif_bias_instructionsLoopScheduler = new Scheduler(psychoJS);
      loop_randomise_task_orderLoopScheduler.add(loop_beleif_bias_instructionsLoopBegin(loop_beleif_bias_instructionsLoopScheduler, snapshot));
      loop_randomise_task_orderLoopScheduler.add(loop_beleif_bias_instructionsLoopScheduler);
      loop_randomise_task_orderLoopScheduler.add(loop_beleif_bias_instructionsLoopEnd);
      const loop_belief_biasLoopScheduler = new Scheduler(psychoJS);
      loop_randomise_task_orderLoopScheduler.add(loop_belief_biasLoopBegin(loop_belief_biasLoopScheduler, snapshot));
      loop_randomise_task_orderLoopScheduler.add(loop_belief_biasLoopScheduler);
      loop_randomise_task_orderLoopScheduler.add(loop_belief_biasLoopEnd);
      const loop_belief_bias_feedbackLoopScheduler = new Scheduler(psychoJS);
      loop_randomise_task_orderLoopScheduler.add(loop_belief_bias_feedbackLoopBegin(loop_belief_bias_feedbackLoopScheduler, snapshot));
      loop_randomise_task_orderLoopScheduler.add(loop_belief_bias_feedbackLoopScheduler);
      loop_randomise_task_orderLoopScheduler.add(loop_belief_bias_feedbackLoopEnd);
      loop_randomise_task_orderLoopScheduler.add(loop_randomise_task_orderLoopEndIteration(loop_randomise_task_orderLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var loop_randomise_ratio_bias;
function loop_randomise_ratio_biasLoopBegin(loop_randomise_ratio_biasLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_randomise_ratio_bias = new TrialHandler({
      psychoJS: psychoJS,
      nReps: n_ratio_bias, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'loops_spec/ratio_bias_order.csv',
      seed: undefined, name: 'loop_randomise_ratio_bias'
    });
    psychoJS.experiment.addLoop(loop_randomise_ratio_bias); // add the loop to the experiment
    currentLoop = loop_randomise_ratio_bias;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisLoop_randomise_ratio_bia of loop_randomise_ratio_bias) {
      snapshot = loop_randomise_ratio_bias.getSnapshot();
      loop_randomise_ratio_biasLoopScheduler.add(importConditions(snapshot));
      const trialsLoopScheduler = new Scheduler(psychoJS);
      loop_randomise_ratio_biasLoopScheduler.add(trialsLoopBegin(trialsLoopScheduler, snapshot));
      loop_randomise_ratio_biasLoopScheduler.add(trialsLoopScheduler);
      loop_randomise_ratio_biasLoopScheduler.add(trialsLoopEnd);
      const trials_2LoopScheduler = new Scheduler(psychoJS);
      loop_randomise_ratio_biasLoopScheduler.add(trials_2LoopBegin(trials_2LoopScheduler, snapshot));
      loop_randomise_ratio_biasLoopScheduler.add(trials_2LoopScheduler);
      loop_randomise_ratio_biasLoopScheduler.add(trials_2LoopEnd);
      const trials_3LoopScheduler = new Scheduler(psychoJS);
      loop_randomise_ratio_biasLoopScheduler.add(trials_3LoopBegin(trials_3LoopScheduler, snapshot));
      loop_randomise_ratio_biasLoopScheduler.add(trials_3LoopScheduler);
      loop_randomise_ratio_biasLoopScheduler.add(trials_3LoopEnd);
      const loop_ratio_bias_negativeLoopScheduler = new Scheduler(psychoJS);
      loop_randomise_ratio_biasLoopScheduler.add(loop_ratio_bias_negativeLoopBegin(loop_ratio_bias_negativeLoopScheduler, snapshot));
      loop_randomise_ratio_biasLoopScheduler.add(loop_ratio_bias_negativeLoopScheduler);
      loop_randomise_ratio_biasLoopScheduler.add(loop_ratio_bias_negativeLoopEnd);
      loop_randomise_ratio_biasLoopScheduler.add(loop_randomise_ratio_biasLoopEndIteration(loop_randomise_ratio_biasLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var trials;
function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: win_frame, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial of trials) {
      snapshot = trials.getSnapshot();
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(ratio_bias_instructions_positiveRoutineBegin(snapshot));
      trialsLoopScheduler.add(ratio_bias_instructions_positiveRoutineEachFrame());
      trialsLoopScheduler.add(ratio_bias_instructions_positiveRoutineEnd(snapshot));
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var trials_2;
function trials_2LoopBegin(trials_2LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials_2 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: win_frame * 6, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trials_2'
    });
    psychoJS.experiment.addLoop(trials_2); // add the loop to the experiment
    currentLoop = trials_2;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial_2 of trials_2) {
      snapshot = trials_2.getSnapshot();
      trials_2LoopScheduler.add(importConditions(snapshot));
      trials_2LoopScheduler.add(ratio_bias_taskRoutineBegin(snapshot));
      trials_2LoopScheduler.add(ratio_bias_taskRoutineEachFrame());
      trials_2LoopScheduler.add(ratio_bias_taskRoutineEnd(snapshot));
      trials_2LoopScheduler.add(ratio_bias_feedbackRoutineBegin(snapshot));
      trials_2LoopScheduler.add(ratio_bias_feedbackRoutineEachFrame());
      trials_2LoopScheduler.add(ratio_bias_feedbackRoutineEnd(snapshot));
      trials_2LoopScheduler.add(trials_2LoopEndIteration(trials_2LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trials_2LoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials_2);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trials_2LoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var trials_3;
function trials_3LoopBegin(trials_3LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials_3 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: lose_frame, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trials_3'
    });
    psychoJS.experiment.addLoop(trials_3); // add the loop to the experiment
    currentLoop = trials_3;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial_3 of trials_3) {
      snapshot = trials_3.getSnapshot();
      trials_3LoopScheduler.add(importConditions(snapshot));
      trials_3LoopScheduler.add(ratio_bias_instructions_negativeRoutineBegin(snapshot));
      trials_3LoopScheduler.add(ratio_bias_instructions_negativeRoutineEachFrame());
      trials_3LoopScheduler.add(ratio_bias_instructions_negativeRoutineEnd(snapshot));
      trials_3LoopScheduler.add(trials_3LoopEndIteration(trials_3LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trials_3LoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials_3);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trials_3LoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var loop_ratio_bias_negative;
function loop_ratio_bias_negativeLoopBegin(loop_ratio_bias_negativeLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_ratio_bias_negative = new TrialHandler({
      psychoJS: psychoJS,
      nReps: lose_frame * 6, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop_ratio_bias_negative'
    });
    psychoJS.experiment.addLoop(loop_ratio_bias_negative); // add the loop to the experiment
    currentLoop = loop_ratio_bias_negative;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisLoop_ratio_bias_negative of loop_ratio_bias_negative) {
      snapshot = loop_ratio_bias_negative.getSnapshot();
      loop_ratio_bias_negativeLoopScheduler.add(importConditions(snapshot));
      loop_ratio_bias_negativeLoopScheduler.add(ratio_bias_taskRoutineBegin(snapshot));
      loop_ratio_bias_negativeLoopScheduler.add(ratio_bias_taskRoutineEachFrame());
      loop_ratio_bias_negativeLoopScheduler.add(ratio_bias_taskRoutineEnd(snapshot));
      loop_ratio_bias_negativeLoopScheduler.add(ratio_bias_feedbackRoutineBegin(snapshot));
      loop_ratio_bias_negativeLoopScheduler.add(ratio_bias_feedbackRoutineEachFrame());
      loop_ratio_bias_negativeLoopScheduler.add(ratio_bias_feedbackRoutineEnd(snapshot));
      loop_ratio_bias_negativeLoopScheduler.add(loop_ratio_bias_negativeLoopEndIteration(loop_ratio_bias_negativeLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function loop_ratio_bias_negativeLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(loop_ratio_bias_negative);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function loop_ratio_bias_negativeLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function loop_randomise_ratio_biasLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(loop_randomise_ratio_bias);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function loop_randomise_ratio_biasLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var loop_invest_instructions;
function loop_invest_instructionsLoopBegin(loop_invest_instructionsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_invest_instructions = new TrialHandler({
      psychoJS: psychoJS,
      nReps: n_invest_task, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop_invest_instructions'
    });
    psychoJS.experiment.addLoop(loop_invest_instructions); // add the loop to the experiment
    currentLoop = loop_invest_instructions;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisLoop_invest_instruction of loop_invest_instructions) {
      snapshot = loop_invest_instructions.getSnapshot();
      loop_invest_instructionsLoopScheduler.add(importConditions(snapshot));
      loop_invest_instructionsLoopScheduler.add(investment_instructionsRoutineBegin(snapshot));
      loop_invest_instructionsLoopScheduler.add(investment_instructionsRoutineEachFrame());
      loop_invest_instructionsLoopScheduler.add(investment_instructionsRoutineEnd(snapshot));
      loop_invest_instructionsLoopScheduler.add(loop_invest_instructionsLoopEndIteration(loop_invest_instructionsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function loop_invest_instructionsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(loop_invest_instructions);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function loop_invest_instructionsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var loop_investment;
function loop_investmentLoopBegin(loop_investmentLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_investment = new TrialHandler({
      psychoJS: psychoJS,
      nReps: n_invest_task * 3, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop_investment'
    });
    psychoJS.experiment.addLoop(loop_investment); // add the loop to the experiment
    currentLoop = loop_investment;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisLoop_investment of loop_investment) {
      snapshot = loop_investment.getSnapshot();
      loop_investmentLoopScheduler.add(importConditions(snapshot));
      loop_investmentLoopScheduler.add(investment_taskRoutineBegin(snapshot));
      loop_investmentLoopScheduler.add(investment_taskRoutineEachFrame());
      loop_investmentLoopScheduler.add(investment_taskRoutineEnd(snapshot));
      loop_investmentLoopScheduler.add(investment_feedbackRoutineBegin(snapshot));
      loop_investmentLoopScheduler.add(investment_feedbackRoutineEachFrame());
      loop_investmentLoopScheduler.add(investment_feedbackRoutineEnd(snapshot));
      loop_investmentLoopScheduler.add(loop_investmentLoopEndIteration(loop_investmentLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function loop_investmentLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(loop_investment);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function loop_investmentLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var loop_beleif_bias_instructions;
function loop_beleif_bias_instructionsLoopBegin(loop_beleif_bias_instructionsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_beleif_bias_instructions = new TrialHandler({
      psychoJS: psychoJS,
      nReps: n_belief_bias, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop_beleif_bias_instructions'
    });
    psychoJS.experiment.addLoop(loop_beleif_bias_instructions); // add the loop to the experiment
    currentLoop = loop_beleif_bias_instructions;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisLoop_beleif_bias_instruction of loop_beleif_bias_instructions) {
      snapshot = loop_beleif_bias_instructions.getSnapshot();
      loop_beleif_bias_instructionsLoopScheduler.add(importConditions(snapshot));
      loop_beleif_bias_instructionsLoopScheduler.add(belief_bias_instructionsRoutineBegin(snapshot));
      loop_beleif_bias_instructionsLoopScheduler.add(belief_bias_instructionsRoutineEachFrame());
      loop_beleif_bias_instructionsLoopScheduler.add(belief_bias_instructionsRoutineEnd(snapshot));
      loop_beleif_bias_instructionsLoopScheduler.add(loop_beleif_bias_instructionsLoopEndIteration(loop_beleif_bias_instructionsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function loop_beleif_bias_instructionsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(loop_beleif_bias_instructions);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function loop_beleif_bias_instructionsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var loop_belief_bias;
function loop_belief_biasLoopBegin(loop_belief_biasLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_belief_bias = new TrialHandler({
      psychoJS: psychoJS,
      nReps: n_belief_bias, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'loops_spec/belief_bias.csv',
      seed: undefined, name: 'loop_belief_bias'
    });
    psychoJS.experiment.addLoop(loop_belief_bias); // add the loop to the experiment
    currentLoop = loop_belief_bias;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisLoop_belief_bia of loop_belief_bias) {
      snapshot = loop_belief_bias.getSnapshot();
      loop_belief_biasLoopScheduler.add(importConditions(snapshot));
      loop_belief_biasLoopScheduler.add(belief_bias_taskRoutineBegin(snapshot));
      loop_belief_biasLoopScheduler.add(belief_bias_taskRoutineEachFrame());
      loop_belief_biasLoopScheduler.add(belief_bias_taskRoutineEnd(snapshot));
      loop_belief_biasLoopScheduler.add(loop_belief_biasLoopEndIteration(loop_belief_biasLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function loop_belief_biasLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(loop_belief_bias);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function loop_belief_biasLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var loop_belief_bias_feedback;
function loop_belief_bias_feedbackLoopBegin(loop_belief_bias_feedbackLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_belief_bias_feedback = new TrialHandler({
      psychoJS: psychoJS,
      nReps: n_belief_bias, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop_belief_bias_feedback'
    });
    psychoJS.experiment.addLoop(loop_belief_bias_feedback); // add the loop to the experiment
    currentLoop = loop_belief_bias_feedback;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisLoop_belief_bias_feedback of loop_belief_bias_feedback) {
      snapshot = loop_belief_bias_feedback.getSnapshot();
      loop_belief_bias_feedbackLoopScheduler.add(importConditions(snapshot));
      loop_belief_bias_feedbackLoopScheduler.add(belief_bias_feedbackRoutineBegin(snapshot));
      loop_belief_bias_feedbackLoopScheduler.add(belief_bias_feedbackRoutineEachFrame());
      loop_belief_bias_feedbackLoopScheduler.add(belief_bias_feedbackRoutineEnd(snapshot));
      loop_belief_bias_feedbackLoopScheduler.add(loop_belief_bias_feedbackLoopEndIteration(loop_belief_bias_feedbackLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function loop_belief_bias_feedbackLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(loop_belief_bias_feedback);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function loop_belief_bias_feedbackLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function loop_randomise_task_orderLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(loop_randomise_task_order);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function loop_randomise_task_orderLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var _key_ratio_bias_instructions_allKeys;
var ratio_bias_instructions_positiveComponents;
function ratio_bias_instructions_positiveRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'ratio_bias_instructions_positive' ---
    t = 0;
    ratio_bias_instructions_positiveClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_ratio_bias_instructions.setText(msg_win_belief_bias_instructions);
    key_ratio_bias_instructions.keys = undefined;
    key_ratio_bias_instructions.rt = undefined;
    _key_ratio_bias_instructions_allKeys = [];
    // keep track of which components have finished
    ratio_bias_instructions_positiveComponents = [];
    ratio_bias_instructions_positiveComponents.push(text_ratio_bias_instructions);
    ratio_bias_instructions_positiveComponents.push(key_ratio_bias_instructions);
    
    for (const thisComponent of ratio_bias_instructions_positiveComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ratio_bias_instructions_positiveRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'ratio_bias_instructions_positive' ---
    // get current time
    t = ratio_bias_instructions_positiveClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_ratio_bias_instructions* updates
    if (t >= 0.0 && text_ratio_bias_instructions.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_ratio_bias_instructions.tStart = t;  // (not accounting for frame time here)
      text_ratio_bias_instructions.frameNStart = frameN;  // exact frame index
      
      text_ratio_bias_instructions.setAutoDraw(true);
    }

    
    // *key_ratio_bias_instructions* updates
    if (t >= 0.0 && key_ratio_bias_instructions.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_ratio_bias_instructions.tStart = t;  // (not accounting for frame time here)
      key_ratio_bias_instructions.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_ratio_bias_instructions.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_ratio_bias_instructions.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_ratio_bias_instructions.clearEvents(); });
    }

    if (key_ratio_bias_instructions.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_ratio_bias_instructions.getKeys({keyList: ['space'], waitRelease: false});
      _key_ratio_bias_instructions_allKeys = _key_ratio_bias_instructions_allKeys.concat(theseKeys);
      if (_key_ratio_bias_instructions_allKeys.length > 0) {
        key_ratio_bias_instructions.keys = _key_ratio_bias_instructions_allKeys[_key_ratio_bias_instructions_allKeys.length - 1].name;  // just the last key pressed
        key_ratio_bias_instructions.rt = _key_ratio_bias_instructions_allKeys[_key_ratio_bias_instructions_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ratio_bias_instructions_positiveComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var n_red_large;
function ratio_bias_instructions_positiveRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'ratio_bias_instructions_positive' ---
    for (const thisComponent of ratio_bias_instructions_positiveComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    n_red_large = [10,9,8,7,6,5];
    n_red_large = util.shuffle(n_red_large);
    
    // for testing the code:  n_red_large = new Array(10).fill([10,9,8,7,6,5]).flat();
    
    
    msg_lose_belief_bias_instructions = `For the next rounds, you will be asked to perform the same task (to chose a tray of marbles to draw from). This time however, drawing a red marble will mean LOSING 100 points instead of gaining them.
    Good luck!
    
    (Press 'space' to continue)`;
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_ratio_bias_instructions.corr, level);
    }
    psychoJS.experiment.addData('key_ratio_bias_instructions.keys', key_ratio_bias_instructions.keys);
    if (typeof key_ratio_bias_instructions.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_ratio_bias_instructions.rt', key_ratio_bias_instructions.rt);
        routineTimer.reset();
        }
    
    key_ratio_bias_instructions.stop();
    // the Routine "ratio_bias_instructions_positive" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var trail_n_red;
var tray_width;
var left_or_right;
var position_x_small;
var position_x_large;
var position_x_small_caption;
var position_x_large_caption;
var tray_small;
var tray_large;
var caption_large;
var msg_score_counter;
var _resp_ratio_bias_task_allKeys;
var ratio_bias_taskComponents;
function ratio_bias_taskRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'ratio_bias_task' ---
    t = 0;
    ratio_bias_taskClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_ratio_bias_task
    trail_n_red = n_red_large.pop();
    
    tray_width = 0.45;
    
    // drawing which one will be on the right and which one the left
    left_or_right = [-0.8, 0.40];
    left_or_right = util.shuffle(left_or_right);
    position_x_small = left_or_right[0];
    position_x_large = left_or_right[1];
    
    position_x_small_caption = position_x_small + (tray_width / 2);
    position_x_large_caption = position_x_large + (tray_width / 2);
    
    // defining the trays
    tray_small = marbles(10,1,10,tray_width,position_x_small,0.15,0.003);
    tray_large = marbles(100,trail_n_red,10,tray_width,position_x_large,0.15,0.003);
    
    
    for (var circle, _pj_c = 0, _pj_a = tray_small, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        circle = _pj_a[_pj_c];
        circle.setAutoDraw(true);
    }
    for (var circle, _pj_c = 0, _pj_a = tray_large, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        circle = _pj_a[_pj_c];
        circle.setAutoDraw(true);
    }
    
    caption_large = "( " + (100 - trail_n_red).toString() + " white and " + trail_n_red.toString() + " red marbles)";
    
    msg_score_counter = ((whose + " total score: ") + total_score.toString());
    score_counter_ratio_bias.setText(msg_score_counter);
    caption_large_ratio_bias.setPos([position_x_large_caption, (- 0.35)]);
    caption_large_ratio_bias.setText(caption_large);
    caption_small_ratio_bias.setPos([position_x_small_caption, (- 0.35)]);
    resp_ratio_bias_task.keys = undefined;
    resp_ratio_bias_task.rt = undefined;
    _resp_ratio_bias_task_allKeys = [];
    // keep track of which components have finished
    ratio_bias_taskComponents = [];
    ratio_bias_taskComponents.push(score_counter_ratio_bias);
    ratio_bias_taskComponents.push(text_ratio_bias);
    ratio_bias_taskComponents.push(caption_large_ratio_bias);
    ratio_bias_taskComponents.push(caption_small_ratio_bias);
    ratio_bias_taskComponents.push(resp_ratio_bias_task);
    
    for (const thisComponent of ratio_bias_taskComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ratio_bias_taskRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'ratio_bias_task' ---
    // get current time
    t = ratio_bias_taskClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *score_counter_ratio_bias* updates
    if (t >= 0.0 && score_counter_ratio_bias.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_counter_ratio_bias.tStart = t;  // (not accounting for frame time here)
      score_counter_ratio_bias.frameNStart = frameN;  // exact frame index
      
      score_counter_ratio_bias.setAutoDraw(true);
    }

    
    // *text_ratio_bias* updates
    if (t >= 0.0 && text_ratio_bias.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_ratio_bias.tStart = t;  // (not accounting for frame time here)
      text_ratio_bias.frameNStart = frameN;  // exact frame index
      
      text_ratio_bias.setAutoDraw(true);
    }

    
    // *caption_large_ratio_bias* updates
    if (t >= 0.0 && caption_large_ratio_bias.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      caption_large_ratio_bias.tStart = t;  // (not accounting for frame time here)
      caption_large_ratio_bias.frameNStart = frameN;  // exact frame index
      
      caption_large_ratio_bias.setAutoDraw(true);
    }

    
    // *caption_small_ratio_bias* updates
    if (t >= 0.0 && caption_small_ratio_bias.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      caption_small_ratio_bias.tStart = t;  // (not accounting for frame time here)
      caption_small_ratio_bias.frameNStart = frameN;  // exact frame index
      
      caption_small_ratio_bias.setAutoDraw(true);
    }

    
    // *resp_ratio_bias_task* updates
    if (t >= 0.0 && resp_ratio_bias_task.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      resp_ratio_bias_task.tStart = t;  // (not accounting for frame time here)
      resp_ratio_bias_task.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { resp_ratio_bias_task.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { resp_ratio_bias_task.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { resp_ratio_bias_task.clearEvents(); });
    }

    if (resp_ratio_bias_task.status === PsychoJS.Status.STARTED) {
      let theseKeys = resp_ratio_bias_task.getKeys({keyList: ['f', 'j'], waitRelease: false});
      _resp_ratio_bias_task_allKeys = _resp_ratio_bias_task_allKeys.concat(theseKeys);
      if (_resp_ratio_bias_task_allKeys.length > 0) {
        resp_ratio_bias_task.keys = _resp_ratio_bias_task_allKeys[_resp_ratio_bias_task_allKeys.length - 1].name;  // just the last key pressed
        resp_ratio_bias_task.rt = _resp_ratio_bias_task_allKeys[_resp_ratio_bias_task_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ratio_bias_taskComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ratio_bias_taskRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'ratio_bias_task' ---
    for (const thisComponent of ratio_bias_taskComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Run 'End Routine' code from code_ratio_bias_task
    for (var circle, _pj_c = 0, _pj_a = tray_small, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        circle = _pj_a[_pj_c];
        circle.setAutoDraw(false);
    }
    for (var circle, _pj_c = 0, _pj_a = tray_large, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        circle = _pj_a[_pj_c];
        circle.setAutoDraw(false);
    }
    
    psychoJS.experiment.addData("position_x_large", position_x_large);
    psychoJS.experiment.addData("position_x_small", position_x_small);
    psychoJS.experiment.addData("trail_n_red", trail_n_red);
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(resp_ratio_bias_task.corr, level);
    }
    psychoJS.experiment.addData('resp_ratio_bias_task.keys', resp_ratio_bias_task.keys);
    if (typeof resp_ratio_bias_task.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('resp_ratio_bias_task.rt', resp_ratio_bias_task.rt);
        routineTimer.reset();
        }
    
    resp_ratio_bias_task.stop();
    // the Routine "ratio_bias_task" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var hit_large_tray;
var key_clicked;
var chance;
var marbles_draw;
var msg_feedback_ratio_bias;
var _key_ratio_bias_feedback_allKeys;
var ratio_bias_feedbackComponents;
function ratio_bias_feedbackRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'ratio_bias_feedback' ---
    t = 0;
    ratio_bias_feedbackClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    let hit_large_tray;
    if (position_x_large < 0) {
        hit_large_tray = 'f';
        } else { 
        hit_large_tray = 'j';
    }
    
    key_clicked = resp_ratio_bias_task.keys[-1];
    
    let chance; 
    if (hit_large_tray == key_clicked) {
        chance = trial_n_black;
        } else {
            chance = 10; 
    }
    
    marbles_draw = randomInteger(1, 100);
    
    //check
    console.log(marbles_draw);
    
    let msg_feedback_ratio_bias;
    if (marbles_draw <= chance) {
        if (win_frame == 1) {
            total_score += 100;
            msg_feedback_ratio_bias = "You have drawn a red marble!" + "\n" + who + " win" + sss + " 100 points!" + "\n" + whose + " score is now " + total_score.toString()+"." + "\n\n" + "(Press 'space' to continue)";
        } 
        if (lose_frame == 1) {
            total_score += -100;
            msg_feedback_ratio_bias = "Unfortunately, you have drawn a red marble." + "\n" + who + ' lose' + sss + " 100 points." + "\n" + whose + " score is now " + total_score.toString()+"." + "\n\n" + "(Press 'space' to continue)";
        }
    } 
    if (marbles_draw > chance) {
            msg_feedback_ratio_bias = "You have drawn a white marble. Nothing happens." + "\n" + whose + " score is " + total_score.toString()+"." + "\n\n" + "(Press 'space' to continue)";
    }
    text_ratio_bias_feedback.setText(msg_feedback_ratio_bias);
    key_ratio_bias_feedback.keys = undefined;
    key_ratio_bias_feedback.rt = undefined;
    _key_ratio_bias_feedback_allKeys = [];
    // keep track of which components have finished
    ratio_bias_feedbackComponents = [];
    ratio_bias_feedbackComponents.push(text_ratio_bias_feedback);
    ratio_bias_feedbackComponents.push(key_ratio_bias_feedback);
    
    for (const thisComponent of ratio_bias_feedbackComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ratio_bias_feedbackRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'ratio_bias_feedback' ---
    // get current time
    t = ratio_bias_feedbackClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_ratio_bias_feedback* updates
    if (t >= 0.0 && text_ratio_bias_feedback.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_ratio_bias_feedback.tStart = t;  // (not accounting for frame time here)
      text_ratio_bias_feedback.frameNStart = frameN;  // exact frame index
      
      text_ratio_bias_feedback.setAutoDraw(true);
    }

    
    // *key_ratio_bias_feedback* updates
    if (t >= 0.0 && key_ratio_bias_feedback.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_ratio_bias_feedback.tStart = t;  // (not accounting for frame time here)
      key_ratio_bias_feedback.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_ratio_bias_feedback.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_ratio_bias_feedback.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_ratio_bias_feedback.clearEvents(); });
    }

    if (key_ratio_bias_feedback.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_ratio_bias_feedback.getKeys({keyList: ['space'], waitRelease: false});
      _key_ratio_bias_feedback_allKeys = _key_ratio_bias_feedback_allKeys.concat(theseKeys);
      if (_key_ratio_bias_feedback_allKeys.length > 0) {
        key_ratio_bias_feedback.keys = _key_ratio_bias_feedback_allKeys[_key_ratio_bias_feedback_allKeys.length - 1].name;  // just the last key pressed
        key_ratio_bias_feedback.rt = _key_ratio_bias_feedback_allKeys[_key_ratio_bias_feedback_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ratio_bias_feedbackComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ratio_bias_feedbackRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'ratio_bias_feedback' ---
    for (const thisComponent of ratio_bias_feedbackComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData("marbles_draw", marbles_draw);
    psychoJS.experiment.addData("total_score", total_score);
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_ratio_bias_feedback.corr, level);
    }
    psychoJS.experiment.addData('key_ratio_bias_feedback.keys', key_ratio_bias_feedback.keys);
    if (typeof key_ratio_bias_feedback.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_ratio_bias_feedback.rt', key_ratio_bias_feedback.rt);
        routineTimer.reset();
        }
    
    key_ratio_bias_feedback.stop();
    // the Routine "ratio_bias_feedback" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_ratio_bias_instructions_lose_allKeys;
var ratio_bias_instructions_negativeComponents;
function ratio_bias_instructions_negativeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'ratio_bias_instructions_negative' ---
    t = 0;
    ratio_bias_instructions_negativeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_ratio_bias_instructions_lose.setText(msg_lose_belief_bias_instructions);
    key_ratio_bias_instructions_lose.keys = undefined;
    key_ratio_bias_instructions_lose.rt = undefined;
    _key_ratio_bias_instructions_lose_allKeys = [];
    // keep track of which components have finished
    ratio_bias_instructions_negativeComponents = [];
    ratio_bias_instructions_negativeComponents.push(text_ratio_bias_instructions_lose);
    ratio_bias_instructions_negativeComponents.push(key_ratio_bias_instructions_lose);
    
    for (const thisComponent of ratio_bias_instructions_negativeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ratio_bias_instructions_negativeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'ratio_bias_instructions_negative' ---
    // get current time
    t = ratio_bias_instructions_negativeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_ratio_bias_instructions_lose* updates
    if (t >= 0.0 && text_ratio_bias_instructions_lose.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_ratio_bias_instructions_lose.tStart = t;  // (not accounting for frame time here)
      text_ratio_bias_instructions_lose.frameNStart = frameN;  // exact frame index
      
      text_ratio_bias_instructions_lose.setAutoDraw(true);
    }

    
    // *key_ratio_bias_instructions_lose* updates
    if (t >= 0.0 && key_ratio_bias_instructions_lose.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_ratio_bias_instructions_lose.tStart = t;  // (not accounting for frame time here)
      key_ratio_bias_instructions_lose.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_ratio_bias_instructions_lose.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_ratio_bias_instructions_lose.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_ratio_bias_instructions_lose.clearEvents(); });
    }

    if (key_ratio_bias_instructions_lose.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_ratio_bias_instructions_lose.getKeys({keyList: ['space'], waitRelease: false});
      _key_ratio_bias_instructions_lose_allKeys = _key_ratio_bias_instructions_lose_allKeys.concat(theseKeys);
      if (_key_ratio_bias_instructions_lose_allKeys.length > 0) {
        key_ratio_bias_instructions_lose.keys = _key_ratio_bias_instructions_lose_allKeys[_key_ratio_bias_instructions_lose_allKeys.length - 1].name;  // just the last key pressed
        key_ratio_bias_instructions_lose.rt = _key_ratio_bias_instructions_lose_allKeys[_key_ratio_bias_instructions_lose_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ratio_bias_instructions_negativeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ratio_bias_instructions_negativeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'ratio_bias_instructions_negative' ---
    for (const thisComponent of ratio_bias_instructions_negativeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    n_red_large = [10,9,8,7,6,5];
    n_red_large = util.shuffle(n_red_large);
    
    
    
    msg_win_belief_bias_instructions = `For the next rounds, you will be asked to perform the same task (to chose a tray of marbles to draw from). This time however, drawing a red marble will mean WINNING 100 points instead of losing them.
    Good luck!
    
    (Press 'space' to continue)`;
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_ratio_bias_instructions_lose.corr, level);
    }
    psychoJS.experiment.addData('key_ratio_bias_instructions_lose.keys', key_ratio_bias_instructions_lose.keys);
    if (typeof key_ratio_bias_instructions_lose.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_ratio_bias_instructions_lose.rt', key_ratio_bias_instructions_lose.rt);
        routineTimer.reset();
        }
    
    key_ratio_bias_instructions_lose.stop();
    // the Routine "ratio_bias_instructions_negative" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_invest_instruction_allKeys;
var investment_instructionsComponents;
function investment_instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'investment_instructions' ---
    t = 0;
    investment_instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_invest_instruction.keys = undefined;
    key_invest_instruction.rt = undefined;
    _key_invest_instruction_allKeys = [];
    // keep track of which components have finished
    investment_instructionsComponents = [];
    investment_instructionsComponents.push(text_invest_instructions);
    investment_instructionsComponents.push(key_invest_instruction);
    
    for (const thisComponent of investment_instructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function investment_instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'investment_instructions' ---
    // get current time
    t = investment_instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_invest_instructions* updates
    if (t >= 0.0 && text_invest_instructions.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_invest_instructions.tStart = t;  // (not accounting for frame time here)
      text_invest_instructions.frameNStart = frameN;  // exact frame index
      
      text_invest_instructions.setAutoDraw(true);
    }

    
    // *key_invest_instruction* updates
    if (t >= 0.0 && key_invest_instruction.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_invest_instruction.tStart = t;  // (not accounting for frame time here)
      key_invest_instruction.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_invest_instruction.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_invest_instruction.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_invest_instruction.clearEvents(); });
    }

    if (key_invest_instruction.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_invest_instruction.getKeys({keyList: ['space'], waitRelease: false});
      _key_invest_instruction_allKeys = _key_invest_instruction_allKeys.concat(theseKeys);
      if (_key_invest_instruction_allKeys.length > 0) {
        key_invest_instruction.keys = _key_invest_instruction_allKeys[_key_invest_instruction_allKeys.length - 1].name;  // just the last key pressed
        key_invest_instruction.rt = _key_invest_instruction_allKeys[_key_invest_instruction_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of investment_instructionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function investment_instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'investment_instructions' ---
    for (const thisComponent of investment_instructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_invest_instruction.corr, level);
    }
    psychoJS.experiment.addData('key_invest_instruction.keys', key_invest_instruction.keys);
    if (typeof key_invest_instruction.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_invest_instruction.rt', key_invest_instruction.rt);
        routineTimer.reset();
        }
    
    key_invest_instruction.stop();
    // the Routine "investment_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_invest_confirm_allKeys;
var investment_taskComponents;
function investment_taskRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'investment_task' ---
    t = 0;
    investment_taskClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_score_counter_invest
    msg_score_counter = ((whose + " total score: ") + total_score.toString());
    score_counter_invest.setText(msg_score_counter);
    slider_invest.reset()
    key_invest_confirm.keys = undefined;
    key_invest_confirm.rt = undefined;
    _key_invest_confirm_allKeys = [];
    // keep track of which components have finished
    investment_taskComponents = [];
    investment_taskComponents.push(score_counter_invest);
    investment_taskComponents.push(text_invest);
    investment_taskComponents.push(slider_invest);
    investment_taskComponents.push(text_invest_confirm);
    investment_taskComponents.push(key_invest_confirm);
    
    for (const thisComponent of investment_taskComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function investment_taskRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'investment_task' ---
    // get current time
    t = investment_taskClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *score_counter_invest* updates
    if (t >= 0.0 && score_counter_invest.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_counter_invest.tStart = t;  // (not accounting for frame time here)
      score_counter_invest.frameNStart = frameN;  // exact frame index
      
      score_counter_invest.setAutoDraw(true);
    }

    
    // *text_invest* updates
    if (t >= 0.0 && text_invest.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_invest.tStart = t;  // (not accounting for frame time here)
      text_invest.frameNStart = frameN;  // exact frame index
      
      text_invest.setAutoDraw(true);
    }

    
    // *slider_invest* updates
    if (t >= 0.0 && slider_invest.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slider_invest.tStart = t;  // (not accounting for frame time here)
      slider_invest.frameNStart = frameN;  // exact frame index
      
      slider_invest.setAutoDraw(true);
    }

    
    // *text_invest_confirm* updates
    if ((slider_invest.rating) && text_invest_confirm.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_invest_confirm.tStart = t;  // (not accounting for frame time here)
      text_invest_confirm.frameNStart = frameN;  // exact frame index
      
      text_invest_confirm.setAutoDraw(true);
    }

    
    // *key_invest_confirm* updates
    if ((slider_invest.rating) && key_invest_confirm.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_invest_confirm.tStart = t;  // (not accounting for frame time here)
      key_invest_confirm.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_invest_confirm.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_invest_confirm.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_invest_confirm.clearEvents(); });
    }

    if (key_invest_confirm.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_invest_confirm.getKeys({keyList: ['y'], waitRelease: false});
      _key_invest_confirm_allKeys = _key_invest_confirm_allKeys.concat(theseKeys);
      if (_key_invest_confirm_allKeys.length > 0) {
        key_invest_confirm.keys = _key_invest_confirm_allKeys[_key_invest_confirm_allKeys.length - 1].name;  // just the last key pressed
        key_invest_confirm.rt = _key_invest_confirm_allKeys[_key_invest_confirm_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of investment_taskComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function investment_taskRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'investment_task' ---
    for (const thisComponent of investment_taskComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('slider_invest.response', slider_invest.getRating());
    psychoJS.experiment.addData('slider_invest.rt', slider_invest.getRT());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_invest_confirm.corr, level);
    }
    psychoJS.experiment.addData('key_invest_confirm.keys', key_invest_confirm.keys);
    if (typeof key_invest_confirm.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_invest_confirm.rt', key_invest_confirm.rt);
        routineTimer.reset();
        }
    
    key_invest_confirm.stop();
    // the Routine "investment_task" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var invest_amount;
var invest_success;
var round_score;
var msg_invest_feedback;
var _key_invest_feedback_allKeys;
var investment_feedbackComponents;
function investment_feedbackRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'investment_feedback' ---
    t = 0;
    investment_feedbackClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_invest_feedback
    invest_amount = (slider_invest.rating - 5);
    invest_success = randomInteger(1, 3);
    if ((invest_success === 3)) {
        round_score = (2.5 * invest_amount);
        msg_invest_feedback = (((("Congratulations! " + who) + " won ") + round_score.toString()) + ". ");
    } else {
        round_score = (- invest_amount);
        msg_invest_feedback = (((("Unfortunately the money was lost." + who) + " lost ") + (-round_score).toString()) + ". ");
    }
    
    total_score = (total_score + round_score);
    
    msg_invest_feedback = ((((((((msg_invest_feedback + "\n") + "\n") + whose) + " total score is now: ") + total_score.toString()) + ". ") + "\n\n") + "(Press 'space' to continue)");
    
    text_invest_feedback.setText(msg_invest_feedback);
    key_invest_feedback.keys = undefined;
    key_invest_feedback.rt = undefined;
    _key_invest_feedback_allKeys = [];
    // keep track of which components have finished
    investment_feedbackComponents = [];
    investment_feedbackComponents.push(text_invest_feedback);
    investment_feedbackComponents.push(key_invest_feedback);
    
    for (const thisComponent of investment_feedbackComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function investment_feedbackRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'investment_feedback' ---
    // get current time
    t = investment_feedbackClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_invest_feedback* updates
    if (t >= 0.0 && text_invest_feedback.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_invest_feedback.tStart = t;  // (not accounting for frame time here)
      text_invest_feedback.frameNStart = frameN;  // exact frame index
      
      text_invest_feedback.setAutoDraw(true);
    }

    
    // *key_invest_feedback* updates
    if (t >= 0.0 && key_invest_feedback.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_invest_feedback.tStart = t;  // (not accounting for frame time here)
      key_invest_feedback.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_invest_feedback.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_invest_feedback.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_invest_feedback.clearEvents(); });
    }

    if (key_invest_feedback.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_invest_feedback.getKeys({keyList: ['space'], waitRelease: false});
      _key_invest_feedback_allKeys = _key_invest_feedback_allKeys.concat(theseKeys);
      if (_key_invest_feedback_allKeys.length > 0) {
        key_invest_feedback.keys = _key_invest_feedback_allKeys[_key_invest_feedback_allKeys.length - 1].name;  // just the last key pressed
        key_invest_feedback.rt = _key_invest_feedback_allKeys[_key_invest_feedback_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of investment_feedbackComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function investment_feedbackRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'investment_feedback' ---
    for (const thisComponent of investment_feedbackComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Run 'End Routine' code from code_invest_feedback
    psychoJS.experiment.addData("total_score", total_score);
    psychoJS.experiment.addData("round_score", round_score);
    psychoJS.experiment.addData("invest_success", invest_success);
    
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_invest_feedback.corr, level);
    }
    psychoJS.experiment.addData('key_invest_feedback.keys', key_invest_feedback.keys);
    if (typeof key_invest_feedback.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_invest_feedback.rt', key_invest_feedback.rt);
        routineTimer.reset();
        }
    
    key_invest_feedback.stop();
    // the Routine "investment_feedback" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_instructions_belief_bias_allKeys;
var belief_bias_instructionsComponents;
function belief_bias_instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'belief_bias_instructions' ---
    t = 0;
    belief_bias_instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_instructions_belief_bias.keys = undefined;
    key_instructions_belief_bias.rt = undefined;
    _key_instructions_belief_bias_allKeys = [];
    // keep track of which components have finished
    belief_bias_instructionsComponents = [];
    belief_bias_instructionsComponents.push(text_instructions_belief_bias);
    belief_bias_instructionsComponents.push(key_instructions_belief_bias);
    
    for (const thisComponent of belief_bias_instructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function belief_bias_instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'belief_bias_instructions' ---
    // get current time
    t = belief_bias_instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_instructions_belief_bias* updates
    if (t >= 0.0 && text_instructions_belief_bias.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_instructions_belief_bias.tStart = t;  // (not accounting for frame time here)
      text_instructions_belief_bias.frameNStart = frameN;  // exact frame index
      
      text_instructions_belief_bias.setAutoDraw(true);
    }

    
    // *key_instructions_belief_bias* updates
    if (t >= 0.0 && key_instructions_belief_bias.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_instructions_belief_bias.tStart = t;  // (not accounting for frame time here)
      key_instructions_belief_bias.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_instructions_belief_bias.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_instructions_belief_bias.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_instructions_belief_bias.clearEvents(); });
    }

    if (key_instructions_belief_bias.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_instructions_belief_bias.getKeys({keyList: ['space'], waitRelease: false});
      _key_instructions_belief_bias_allKeys = _key_instructions_belief_bias_allKeys.concat(theseKeys);
      if (_key_instructions_belief_bias_allKeys.length > 0) {
        key_instructions_belief_bias.keys = _key_instructions_belief_bias_allKeys[_key_instructions_belief_bias_allKeys.length - 1].name;  // just the last key pressed
        key_instructions_belief_bias.rt = _key_instructions_belief_bias_allKeys[_key_instructions_belief_bias_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of belief_bias_instructionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function belief_bias_instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'belief_bias_instructions' ---
    for (const thisComponent of belief_bias_instructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_instructions_belief_bias.corr, level);
    }
    psychoJS.experiment.addData('key_instructions_belief_bias.keys', key_instructions_belief_bias.keys);
    if (typeof key_instructions_belief_bias.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_instructions_belief_bias.rt', key_instructions_belief_bias.rt);
        routineTimer.reset();
        }
    
    key_instructions_belief_bias.stop();
    // the Routine "belief_bias_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_syllogism_allKeys;
var belief_bias_taskComponents;
function belief_bias_taskRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'belief_bias_task' ---
    t = 0;
    belief_bias_taskClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_score_counter_belief_bias
    msg_score_counter = ((whose + " total score: ") + total_score.toString());
    
    score_counter_syllogism.setText(msg_score_counter);
    text_syllogism.setText(syllogism);
    key_syllogism.keys = undefined;
    key_syllogism.rt = undefined;
    _key_syllogism_allKeys = [];
    // keep track of which components have finished
    belief_bias_taskComponents = [];
    belief_bias_taskComponents.push(score_counter_syllogism);
    belief_bias_taskComponents.push(text_syllogism);
    belief_bias_taskComponents.push(key_syllogism);
    
    for (const thisComponent of belief_bias_taskComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function belief_bias_taskRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'belief_bias_task' ---
    // get current time
    t = belief_bias_taskClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *score_counter_syllogism* updates
    if (t >= 0.0 && score_counter_syllogism.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_counter_syllogism.tStart = t;  // (not accounting for frame time here)
      score_counter_syllogism.frameNStart = frameN;  // exact frame index
      
      score_counter_syllogism.setAutoDraw(true);
    }

    
    // *text_syllogism* updates
    if (t >= 0.0 && text_syllogism.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_syllogism.tStart = t;  // (not accounting for frame time here)
      text_syllogism.frameNStart = frameN;  // exact frame index
      
      text_syllogism.setAutoDraw(true);
    }

    
    // *key_syllogism* updates
    if (t >= 0.0 && key_syllogism.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_syllogism.tStart = t;  // (not accounting for frame time here)
      key_syllogism.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_syllogism.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_syllogism.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_syllogism.clearEvents(); });
    }

    if (key_syllogism.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_syllogism.getKeys({keyList: ['y', 'n'], waitRelease: false});
      _key_syllogism_allKeys = _key_syllogism_allKeys.concat(theseKeys);
      if (_key_syllogism_allKeys.length > 0) {
        key_syllogism.keys = _key_syllogism_allKeys[_key_syllogism_allKeys.length - 1].name;  // just the last key pressed
        key_syllogism.rt = _key_syllogism_allKeys[_key_syllogism_allKeys.length - 1].rt;
        // was this correct?
        if (key_syllogism.keys == syllogism_correct_ans) {
            key_syllogism.corr = 1;
        } else {
            key_syllogism.corr = 0;
        }
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of belief_bias_taskComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function belief_bias_taskRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'belief_bias_task' ---
    for (const thisComponent of belief_bias_taskComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // was no response the correct answer?!
    if (key_syllogism.keys === undefined) {
      if (['None','none',undefined].includes(syllogism_correct_ans)) {
         key_syllogism.corr = 1;  // correct non-response
      } else {
         key_syllogism.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_syllogism.corr, level);
    }
    psychoJS.experiment.addData('key_syllogism.keys', key_syllogism.keys);
    psychoJS.experiment.addData('key_syllogism.corr', key_syllogism.corr);
    if (typeof key_syllogism.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_syllogism.rt', key_syllogism.rt);
        routineTimer.reset();
        }
    
    key_syllogism.stop();
    // the Routine "belief_bias_task" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var syllogisms_score;
var msg_belief_bias_feedback;
var _key_syllogism_feedback_allKeys;
var belief_bias_feedbackComponents;
function belief_bias_feedbackRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'belief_bias_feedback' ---
    t = 0;
    belief_bias_feedbackClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_syllogisms_feedback
    syllogisms_score = 360;
    total_score = (total_score + syllogisms_score);
    msg_belief_bias_feedback = (((((((((((("Congratulations! " + who) + " gained ") + syllogisms_score.toString()) + ". ") + "\n") + "\n") + whose) + " total score is now: ") + total_score.toString()) + ". ") + "\n\n") + "(Press 'space' to continue)");
    
    text_syllogism_feedback.setText(msg_belief_bias_feedback);
    key_syllogism_feedback.keys = undefined;
    key_syllogism_feedback.rt = undefined;
    _key_syllogism_feedback_allKeys = [];
    // keep track of which components have finished
    belief_bias_feedbackComponents = [];
    belief_bias_feedbackComponents.push(text_syllogism_feedback);
    belief_bias_feedbackComponents.push(key_syllogism_feedback);
    
    for (const thisComponent of belief_bias_feedbackComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function belief_bias_feedbackRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'belief_bias_feedback' ---
    // get current time
    t = belief_bias_feedbackClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_syllogism_feedback* updates
    if (t >= 0.0 && text_syllogism_feedback.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_syllogism_feedback.tStart = t;  // (not accounting for frame time here)
      text_syllogism_feedback.frameNStart = frameN;  // exact frame index
      
      text_syllogism_feedback.setAutoDraw(true);
    }

    
    // *key_syllogism_feedback* updates
    if (t >= 0.0 && key_syllogism_feedback.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_syllogism_feedback.tStart = t;  // (not accounting for frame time here)
      key_syllogism_feedback.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_syllogism_feedback.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_syllogism_feedback.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_syllogism_feedback.clearEvents(); });
    }

    if (key_syllogism_feedback.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_syllogism_feedback.getKeys({keyList: ['space'], waitRelease: false});
      _key_syllogism_feedback_allKeys = _key_syllogism_feedback_allKeys.concat(theseKeys);
      if (_key_syllogism_feedback_allKeys.length > 0) {
        key_syllogism_feedback.keys = _key_syllogism_feedback_allKeys[_key_syllogism_feedback_allKeys.length - 1].name;  // just the last key pressed
        key_syllogism_feedback.rt = _key_syllogism_feedback_allKeys[_key_syllogism_feedback_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of belief_bias_feedbackComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function belief_bias_feedbackRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'belief_bias_feedback' ---
    for (const thisComponent of belief_bias_feedbackComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData("total_score", total_score);
    
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_syllogism_feedback.corr, level);
    }
    psychoJS.experiment.addData('key_syllogism_feedback.keys', key_syllogism_feedback.keys);
    if (typeof key_syllogism_feedback.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_syllogism_feedback.rt', key_syllogism_feedback.rt);
        routineTimer.reset();
        }
    
    key_syllogism_feedback.stop();
    // the Routine "belief_bias_feedback" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var survey_demographics;
var survey_demographicsClock;
function survey_demographicsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'survey_demographics' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    //--- Starting Routine 'survey_demographics' ---
    survey_demographics = new visual.Survey({
        win: psychoJS.window,
        name: 'survey_demographics',
        surveyId: 'afe5bbb0-9f7b-409a-a5b5-f8f9dfcaa894',
    });
    survey_demographicsClock = new util.Clock();
    survey_demographics.setAutoDraw(true);
    survey_demographics.status = PsychoJS.Status.STARTED;
    survey_demographics.isFinished = false;
    survey_demographics.tStart = t;  // (not accounting for frame time here)
    survey_demographics.frameNStart = frameN;  // exact frame index
    return Scheduler.Event.NEXT;
  }
}


function survey_demographicsRoutineEachFrame() {
  return async function () {
    t = survey_demographicsClock.getTime();
    frameN = frameN + 1;  // number of completed frames (so 0 is the first frame)
    // if survey_demographics is completed, move on
    if (survey_demographics.isFinished) {
      survey_demographics.setAutoDraw(false);
      survey_demographics.status = PsychoJS.Status.FINISHED;
      // survey routines are not non-slip safe, so reset the non-slip timer
      routineTimer.reset();
      return Scheduler.Event.NEXT;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    return Scheduler.Event.FLIP_REPEAT;
  }
}


function survey_demographicsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'survey_demographics' ---
    // get data from survey_demographics
    const survey_demographicsResponse =  survey_demographics.getResponse();
    for (const question in survey_demographicsResponse) {
      psychoJS.experiment.addData(`survey_demographics.${question}`, survey_demographicsResponse[question]);
    }
    await survey_demographics.save();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_debrief_allKeys;
var debriefing_or_farewellComponents;
function debriefing_or_farewellRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'debriefing_or_farewell' ---
    t = 0;
    debriefing_or_farewellClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_debrief.keys = undefined;
    key_debrief.rt = undefined;
    _key_debrief_allKeys = [];
    // keep track of which components have finished
    debriefing_or_farewellComponents = [];
    debriefing_or_farewellComponents.push(text_debrief);
    debriefing_or_farewellComponents.push(key_debrief);
    
    for (const thisComponent of debriefing_or_farewellComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function debriefing_or_farewellRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'debriefing_or_farewell' ---
    // get current time
    t = debriefing_or_farewellClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_debrief* updates
    if (t >= 0.0 && text_debrief.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_debrief.tStart = t;  // (not accounting for frame time here)
      text_debrief.frameNStart = frameN;  // exact frame index
      
      text_debrief.setAutoDraw(true);
    }

    
    // *key_debrief* updates
    if (t >= 0.0 && key_debrief.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_debrief.tStart = t;  // (not accounting for frame time here)
      key_debrief.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_debrief.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_debrief.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_debrief.clearEvents(); });
    }

    if (key_debrief.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_debrief.getKeys({keyList: ['space'], waitRelease: false});
      _key_debrief_allKeys = _key_debrief_allKeys.concat(theseKeys);
      if (_key_debrief_allKeys.length > 0) {
        key_debrief.keys = _key_debrief_allKeys[_key_debrief_allKeys.length - 1].name;  // just the last key pressed
        key_debrief.rt = _key_debrief_allKeys[_key_debrief_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of debriefing_or_farewellComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function debriefing_or_farewellRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'debriefing_or_farewell' ---
    for (const thisComponent of debriefing_or_farewellComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_debrief.corr, level);
    }
    psychoJS.experiment.addData('key_debrief.keys', key_debrief.keys);
    if (typeof key_debrief.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_debrief.rt', key_debrief.rt);
        routineTimer.reset();
        }
    
    key_debrief.stop();
    // the Routine "debriefing_or_farewell" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var feedback;
var feedbackClock;
function feedbackRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'feedback' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    //--- Starting Routine 'feedback' ---
    feedback = new visual.Survey({
        win: psychoJS.window,
        name: 'feedback',
        surveyId: '0f39242f-2312-451c-b7ca-14536cb886bd',
    });
    feedbackClock = new util.Clock();
    feedback.setAutoDraw(true);
    feedback.status = PsychoJS.Status.STARTED;
    feedback.isFinished = false;
    feedback.tStart = t;  // (not accounting for frame time here)
    feedback.frameNStart = frameN;  // exact frame index
    return Scheduler.Event.NEXT;
  }
}


function feedbackRoutineEachFrame() {
  return async function () {
    t = feedbackClock.getTime();
    frameN = frameN + 1;  // number of completed frames (so 0 is the first frame)
    // if feedback is completed, move on
    if (feedback.isFinished) {
      feedback.setAutoDraw(false);
      feedback.status = PsychoJS.Status.FINISHED;
      // survey routines are not non-slip safe, so reset the non-slip timer
      routineTimer.reset();
      return Scheduler.Event.NEXT;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    return Scheduler.Event.FLIP_REPEAT;
  }
}


function feedbackRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'feedback' ---
    // get data from feedback
    const feedbackResponse =  feedback.getResponse();
    for (const question in feedbackResponse) {
      psychoJS.experiment.addData(`feedback.${question}`, feedbackResponse[question]);
    }
    await feedback.save();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_resp_allKeys;
var bye_byeComponents;
function bye_byeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'bye_bye' ---
    t = 0;
    bye_byeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(2.000000);
    // update component parameters for each repeat
    key_resp.keys = undefined;
    key_resp.rt = undefined;
    _key_resp_allKeys = [];
    // keep track of which components have finished
    bye_byeComponents = [];
    bye_byeComponents.push(text_bye_bye);
    bye_byeComponents.push(key_resp);
    
    for (const thisComponent of bye_byeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function bye_byeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'bye_bye' ---
    // get current time
    t = bye_byeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_bye_bye* updates
    if (t >= 0.0 && text_bye_bye.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_bye_bye.tStart = t;  // (not accounting for frame time here)
      text_bye_bye.frameNStart = frameN;  // exact frame index
      
      text_bye_bye.setAutoDraw(true);
    }

    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_bye_bye.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_bye_bye.setAutoDraw(false);
    }
    
    // *key_resp* updates
    if (t >= 0.0 && key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp.tStart = t;  // (not accounting for frame time here)
      key_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp.clearEvents(); });
    }

    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (key_resp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      key_resp.status = PsychoJS.Status.FINISHED;
  }

    if (key_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_allKeys = _key_resp_allKeys.concat(theseKeys);
      if (_key_resp_allKeys.length > 0) {
        key_resp.keys = _key_resp_allKeys[_key_resp_allKeys.length - 1].name;  // just the last key pressed
        key_resp.rt = _key_resp_allKeys[_key_resp_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of bye_byeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function bye_byeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'bye_bye' ---
    for (const thisComponent of bye_byeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp.corr, level);
    }
    psychoJS.experiment.addData('key_resp.keys', key_resp.keys);
    if (typeof key_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp.rt', key_resp.rt);
        routineTimer.reset();
        }
    
    key_resp.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
