function start() {
  setInterval(work, 10);
  buildTownBox();
  buildStatBox();
  updateStats();
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
  gold = 0;
  currentAction = undefined;
  for (let i = 0; i < actionOrder.length; i++) {
    currentCycleActionList.push(actionOrder[i]);
    currentCycleActionAmount.push(actionAmount[i]);
  }
  location[0].progressBars.wanderProgressBar.resource.usedAmount = 0;
  hasMap = false;
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
      updateStats();
    }
  }
}

function addAction(action) {
  let newAction;
  let icon;
  let xMark;
  let actionAmount;
  let actionCount;
  let faIcon;
  let options;
  newAction = document.createElement("div");
  newAction.className = "actionBoxActions";
  icon = document.createElement("img");
  console.log(action);
  icon.src = "images/" + action.name + ".svg";
  icon.className = "actionIcon";
  newAction.appendChild(icon);
  xMark = document.createTextNode("x");
  newAction.appendChild(xMark);
  actionAmount = document.createElement("span");
  actionCount = document.getElementById("actionBoxActionList").childElementCount;
  actionAmount.id = "actionListAmount" + actionCount;
  actionAmount.innerText = 1;
  newAction.appendChild(actionAmount);
  options = document.createElement("span");
  options.className = "actionBoxOptions";
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-plus";
  faIcon.onclick = function() {
    document.getElementById("actionListAmount" + actionCount).innerHTML =
    Number(document.getElementById("actionListAmount" + actionCount).innerHTML) + 1;
  }
  options.appendChild(faIcon);
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-minus";
  faIcon.onclick = function() {
    document.getElementById("actionListAmount" + actionCount).innerHTML =
    Number(document.getElementById("actionListAmount" + actionCount).innerHTML) - 1;
  }
  options.appendChild(faIcon);
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-times";
  faIcon.onclick = function() {
    document.getElementById("actionBoxActionList").removeChild(
      document.getElementById("actionBoxActionList").childNodes[actionCount]
    );
  }
  options.appendChild(faIcon);
  newAction.appendChild(options);
  document.getElementById("actionBoxActionList").appendChild(newAction);
}

function initializeProgressList() {
  for (let i = 0; i < actionOrderList.length; i++) {
    actionAmountCompleted[i] = 0;
    actionOrderProgress[i] = 0;
  }
}

function progressAction(action) {
  currentCostLeft--;
  increaseStats(currentCycleActionList[action], multiplier);
  actionOrderProgress[action] = Math.floor(((originalCost - currentCostLeft) / originalCost) * 100);
  if (currentCostLeft <= 0) {
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
  let finalCost = 0;
  for (x in action.stats) {
    finalCost += ((action.manaCost * action.stats[x]) / (1 + (mainCharacter[x].level / 100)));
  }
  multiplier = action.manaCost / finalCost;
  return finalCost;
}

function updateActionProgressList() {
  var x = "";
  for (let i = 0; i < currentCycleActionList.length; i++) {
    x = x + "<div>" + "<span class=actionBoxProgressList>" + "<img src=images/" + currentCycleActionList[i].name +
     ".svg class=actionIcon></img>  ( " + actionAmountCompleted[i] + " / " + currentCycleActionAmount[i] + " )" + actionOrderProgress[i] +
    "%" + "</span></div>";
  }
  document.getElementById("actionBoxProgressList").innerHTML = x;
}

function capitalize(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}
