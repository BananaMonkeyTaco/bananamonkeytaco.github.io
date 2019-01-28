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
    console.log(location[0].progressBars.wanderProgressBar);
    location[0].progressBars.wanderProgressBar.checkLevel();
    let x = document.getElementById("wanderProgressBar")
    x.style.width = (location[0].progressBars.wanderProgressBar.currentXP /
    location[0].progressBars.wanderProgressBar.toNextLevel) * 100 + "%";
    document.getElementById("cityExplored").innerHTML = "City Explored: " +
    location[0].progressBars.wanderProgressBar.currentLevel + "%";
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
      updateResources(this.resource);
    }
  }
};
