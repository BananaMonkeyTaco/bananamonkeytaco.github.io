var actionOrder = [];
var actionOrderList = [];
var actionAmount = [];
var actionAmountCompleted = [];
var actionOrderProgress = [];
var mana = 100;
var currentAction;
var currentCostLeft;
var gamePaused = true;

var currentCycleActionList = [];
var currentCycleActionAmount = [];
var currentActionPlace = 0;

var wanderProgressBar = 0;

var wander = {
  name: "Wander",
  manaCost: 100,
  finish: function() {
    location[0].progressBars.wanderProgressBar.currentXP += 100;
    location[0].progressBars.wanderProgressBar.checkLevel();
    updateProgressBar(location[0].progressBars.wanderProgressBar)
  }
};

var smashPots = {
  name:  "Smash Pots",
  manaCost: 25,
  resource: location[0].progressBars.wanderProgressBar,
  finish: function() {
    if (this.resource.usedAmount < this.resource.reliableAmount) {
      mana = mana + 100;
      this.resource.usedAmount++;
      updateResourceText(this.resource);
    }
  }
};
