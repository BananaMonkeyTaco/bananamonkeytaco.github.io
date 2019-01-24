var actionOrder = [];
var actionOrderList = [];
var actionAmount = [];
var actionAmountCompleted = [];
var actionOrderProgress = [];
var mana = 10000;
var currentAction;
var currentCostLeft;
var gamePaused = true;

var currentCycleActionList = [];
var currentCycleActionAmount = [];
var currentActionPlace = 0;

var wanderProgressBar = 0;

var wander = {
  name: "Wander",
  manaCost: 50,
  finish: function() {
    wanderProgressBar++;
    if (wanderProgressBar >= 100) {
      wanderProgressBar = 0;
    }
    let x = document.getElementById("wanderProgressBar")
    x.style.width = wanderProgressBar + "%";
  }
};

var smashPots = {
  name:  "Smash Pots",
  manaCost: 10,
  finish: function() {
    mana = mana + 50;
  }
};
