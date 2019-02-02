var actionOrder = [];
var actionOrderList = [];
var actionAmount = [];
var actionAmountCompleted = [];
var actionOrderProgress = [];
var mana = 100;
var currentAction;
var currentCostLeft;
var multiplier;
var gamePaused = true;
var currentCycleActionList = [];
var currentCycleActionAmount = [];
var currentActionPlace = 0;


var wander = {
  name: "Wander",
  manaCost: 100,
  finish: function() {
    location[0].progressBars.wanderProgressBar.currentXP += 100;
    location[0].progressBars.wanderProgressBar.checkLevel();
    updateProgressBar(location[0].progressBars.wanderProgressBar);
    updateResources(location[0].progressBars.wanderProgressBar.resource);
    updateResourceText(location[0].progressBars.wanderProgressBar.resource);
  },
  stats: {
    speed: .5,
    perception: .2,
    charisma: .3,
  }
};

var smashPots = {
  name:  "SmashPots",
  manaCost: 25,
  resource: location[0].progressBars.wanderProgressBar.resource,
  finish: function() {
    if (document.getElementById("PotsLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        mana += 100;
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.uncheckedAmount--;
      updateResources(location[0].progressBars.wanderProgressBar.resource);
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      mana += 100;
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  }
};
