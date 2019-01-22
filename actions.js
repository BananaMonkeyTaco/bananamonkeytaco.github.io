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
var currentActionPlace = -1;

function start() {
  setInterval(work, 10);
}

function gamePause() {
  if (gamePaused == false) {
    gamePaused = true;
  }
}

function gamePlay() {
  if (gamePaused == true && actionOrder.length > 0) {
    if (currentCycleActionList.length == 0) {
      gameNewCycle();
    }
    gamePaused = false;
  }
}

function gameNewCycle() {
  currentCycleActionList.splice(0, currentCycleActionList.length);
  currentCycleActionAmount.splice(0, currentCycleActionAmount.length);
  currentActionPlace = -1;
  for (let i = 0; i < actionOrder.length; i++) {
    currentCycleActionList.push(actionOrder[i]);
    currentCycleActionAmount.push(actionAmount[i]);
  }
  initializeProgressList();
}

function work() {
  document.getElementById("mana").innerHTML = "Mana = " + mana;
  if (gamePaused == false) {
    if (mana == 0) {
      gamePaused;
    } else {
      mana--;
      if (currentAction == undefined) {
        currentAction = findNextAction();
        originalCost = calculateActualMana(currentAction);
        currentCostLeft = calculateActualMana(currentAction);
      }
      progressAction(currentActionPlace);
      updateActionProgressList();
    }
  }
}

function addAction(action) {
  actionOrder.push(action);
  actionOrderList.push(action.name);
  actionAmount.push("1");
  updateActionList();
}

function removeActionFromList(actionPlace) {
  actionOrder.splice(actionPlace, 1);
  actionOrderList.splice(actionPlace, 1);
  actionAmount.splice(actionPlace, 1);
  updateActionList();
}

function increaseActionAmount(actionPlace) {
  actionAmount[actionPlace]++;
  updateActionList();
}

function decreaseActionAmount(actionPlace) {
  if(actionAmount[actionPlace] > 0){
    actionAmount[actionPlace]--;
  }
  updateActionList();
}

function initializeProgressList() {
  for (let i = 0; i < actionOrderList.length; i++) {
    actionAmountCompleted[i] = 0;
    actionOrderProgress[i] = 0;
  }
}

function progressAction(action) {
  currentCostLeft--;
  actionOrderProgress[action] =
  (Math.round((originalCost - currentCostLeft) / originalCost)) * 100;
  if (currentCostLeft == 0) {
    actionAmountCompleted[action]++;
    currentAction = undefined;
  }
  return;
}

function findNextAction() {
  for (let i = 0; i < currentCycleActionList.length; i++) {
    if (actionAmountCompleted[i] < currentCycleActionAmount[i]) {
      console.log("for loop" + i);
      console.log("completed" + actionAmountCompleted[i]);
      console.log("needed" + currentCycleActionAmount[i]);
      currentActionPlace = i;
      return currentCycleActionList[i];
    }
  }
}

function calculateActualMana(action) {
  return action.manaCost;
}

var wander = {
  name: "Wander",
  manaCost: 500,
};

var smashPots = {
  name:  "Smash Pots",
  manaCost: 10,
};

function updateActionList() {
  var x = "";
  for(let i = 0; i < actionOrderList.length; i++) {
    x = x + "<div>" +
    "<span class=actionBoxActions>" +
    actionOrderList[i] + "  x" + actionAmount[i] +
    "<span class=actionBoxOptions>" +
    "<span onclick=increaseActionAmount(" + i + ")>" + " + " + "</span>" +
    "<span onclick=decreaseActionAmount(" + i + ")>" + " - " + "</span>" +
    "<span onclick=removeActionFromList(" + i + ")>" + " x " + "</span>" +
    "</span></span></div>"
    document.getElementById('actionBoxActionList').innerHTML = x;
  }
}

function updateActionProgressList() {
  var x = "";
  for (let i = 0; i < currentCycleActionList.length; i++) {
    x = x + "<div>" +
    "<span class=actionBoxProgressList>" + currentCycleActionList[i].name +
    "  ( " + actionAmountCompleted[i] + " / " + currentCycleActionAmount[i] + " )" +
    actionOrderProgress[i] + "%" + "</span></div>";
  }
  document.getElementById("actionBoxProgressList").innerHTML = x;
}
