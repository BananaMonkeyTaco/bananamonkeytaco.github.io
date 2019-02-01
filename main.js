function start() {
  setInterval(work, 10);
  buildTownBox();
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
  currentActionPlace = 0;
  mana = 100;
  currentAction = undefined;
  for (let i = 0; i < actionOrder.length; i++) {
    currentCycleActionList.push(actionOrder[i]);
    currentCycleActionAmount.push(actionAmount[i]);
  }
  location[0].progressBars.wanderProgressBar.resource.usedAmount = 0;
  initializeProgressList();
  save();
}

function work() {
  document.getElementById("mana").innerHTML = "Mana = " + mana;
  if (gamePaused == false) {
    if (mana == 0) {
      if (actionOrder.length > 0){
        gameNewCycle();
      } else {
        gamePaused;
      }
    } else {
      mana--;
      if (currentAction == undefined) {
        currentAction = findNextAction();
        if (currentAction == undefined) {
          gameNewCycle();
          return;
        }
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
  Math.floor(((originalCost - currentCostLeft) / originalCost) * 100);
  if (currentCostLeft == 0) {
    actionAmountCompleted[action]++;
    currentCycleActionList[action].finish();
    currentAction = undefined;
  }
  return;
}

function findNextAction() {
  for (let i = 0; i < currentCycleActionList.length; i++) {
    if (actionAmountCompleted[i] < currentCycleActionAmount[i]) {
      currentActionPlace = i;
      return currentCycleActionList[i];
    }
  }
}

function calculateActualMana(action) {
  return action.manaCost;
}

function updateActionList() {
  var x = "";
  for(let i = 0; i < actionOrderList.length; i++) {
    x = x + "<div>" + "<span class=actionBoxActions>" +
    "<img src=images/" + actionOrderList[i] + ".svg class=actionIcon></img>" + "  x" + actionAmount[i] +
    "<span class=actionBoxOptions>" +
    "<i class='actionButton fas fa-plus' onclick=increaseActionAmount(" + i + ")>" + "</i>" +
    "<i class='actionButton fas fa-minus' onclick=decreaseActionAmount(" + i + ")>" + "</i>" +
    "<i class='actionButton fas fa-times-circle' onclick=removeActionFromList(" + i + ")>" + "</i>" +
    "</span></span></div>"
    document.getElementById('actionBoxActionList').innerHTML = x;
  }
  if (actionOrderList.length == 0) {
    document.getElementById('actionBoxActionList').innerHTML = "";
  }
}

function updateActionProgressList() {
  var x = "";
  for (let i = 0; i < currentCycleActionList.length; i++) {
    x = x + "<div>" + "<span class=actionBoxProgressList>" + currentCycleActionList[i].name + "  ( " +
    actionAmountCompleted[i] + " / " + currentCycleActionAmount[i] + " )" + actionOrderProgress[i] +
    "%" + "</span></div>";
  }
  document.getElementById("actionBoxProgressList").innerHTML = x;
}
