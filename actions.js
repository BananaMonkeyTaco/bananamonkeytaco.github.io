var actionOrder = [];
var actionOrderList = [];
var actionAmount = [];
var actionAmountCompleted = [];
var actionOrderProgress = [];
var mana = 100;
var gold = 0;
var currentAction;
var currentCostLeft;
var multiplier;
var gamePaused = true;
var currentCycleActionList = [];
var currentCycleActionAmount = [];
var currentActionPlace = 0;
var hasMap = false;


var wander = {
  name: "Wander",
  manaCost: 100,
  stats: {
    speed: .2,
    perception: .5,
    intelligence: .3,
  },
  finish: function() {
    location[0].progressBars.wanderProgressBar.currentXP += (hasMap) ? 400 : 100;
    checkLevel(location[0].progressBars.wanderProgressBar);
    updateProgressBar(location[0].progressBars.wanderProgressBar);
    updateResources(location[0].progressBars.wanderProgressBar.resource);
    updateResourceText(location[0].progressBars.wanderProgressBar.resource);
  },
};

var smashPots = {
  name:  "SmashPots",
  manaCost: 25,
  resource: location[0].progressBars.wanderProgressBar.resource,
  stats: {
    speed: .5,
    strength: .4,
    constitution: .1,
  },
  finish: function() {
    if (document.getElementById("PotsLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        mana += 50;
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
      mana += 50;
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
};

var meetPeople = {
  name: "MeetPeople",
  manaCost: 400,
  stats: {
    charisma: .5,
    intelligence:.2,
    spirit: .3,
  },
  finish: function() {
    location[0].progressBars.meetPeopleProgressBar.currentXP += 100;
    checkLevel(location[0].progressBars.meetPeopleProgressBar);
    updateProgressBar(location[0].progressBars.meetPeopleProgressBar);
    updateResources(location[0].progressBars.meetPeopleProgressBar.resource);
    updateResourceText(location[0].progressBars.meetPeopleProgressBar.resource);
  }
};

var doFavours = {
  name: "DoFavours",
  manaCost: 400,
  resource: location[0].progressBars.meetPeopleProgressBar.resource,
  stats: {
    speed: .5,
    strength: .3,
    constitution: .2,
  },
  finish: function() {
    if (document.getElementById("FavoursLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        gold += 5;
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.uncheckedAmount--;
      updateResources(location[0].progressBars.meetPeopleProgressBar.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      gold += 5;
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
};

var investigate = {

};

var steal = {

};

var buyMap = {
  name: "BuyMap",
  manaCost: 100,
  stats: {
    charisma: .5,
    intelligence: .3,
    perception: .2,
  },
  finish: function() {
    hasMap = true;
  },
};

/*
var action = {
  name:
  manaCost:
  resource:
  stats:
  function:
}
*/
