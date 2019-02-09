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
  if (gamePaused == true && cyclePlan.length > 0) {
    if (currentCycleActionList.length == 0) {
      gameNewCycle();
    }
    gamePaused = false;
  }
}

function gameNewCycle() {
  if (cyclePlan.length > 0) {
    currentActionPlace = 0;
    mana = 100;
    gold = 0;
    document.getElementById("goldBox").style.display = "none";
    currentAction = undefined;
    location[0].progressBars.wanderProgressBar.resource.usedAmount = 0;
    hasMap = false;
    initializeProgressList();
    save();
  } else {
    gamePaused = true;
  }
}

function work() {
  document.getElementById("mana").innerHTML = mana;
  if (gold != 0) {
    document.getElementById("goldBox").style.display = "block";
  }
  if (gamePaused == false) {
    if (mana == 0) {
      gameNewCycle();
    } else {
      mana--;
      if (currentAction == undefined) {
        currentAction = findNextAction();
        if (currentAction == undefined) {
          gameNewCycle();
          return;
        }
        originalCost = calculateActualMana(cycleList[currentAction]);
        currentCostLeft = calculateActualMana(cycleList[currentAction]);
      }
      progressAction(cycleList[currentAction]);
      updateStats(cycleList[currentAction]);
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
  icon.src = "images/" + action.name + ".svg";
  icon.className = "actionIcon";
  newAction.appendChild(icon);
  xMark = document.createTextNode("x");
  newAction.appendChild(xMark);
  actionAmount = document.createElement("span");
  actionCount = document.getElementById("actionBoxActionList").childElementCount;
  actionAmount.id = "actionListAmount" + actionCount;
  cyclePlan[actionCount] = action;
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
    let element = document.getElementById("actionListAmount" + actionCount);
    element = element.parentNode;
    element.parentNode.removeChild(element);
    for (let i = actionCount + 1; i < document.getElementById("actionBoxActionList").childElementCount + 1; i++) {
      let x = document.getElementById("actionListAmount" + i);
      x.id = "actionListAmount" + (i - 1);
    }
    cyclePlan.splice(actionCount, 1);
  }
  options.appendChild(faIcon);
  newAction.appendChild(options);
  document.getElementById("actionBoxActionList").appendChild(newAction);
}

function initializeProgressList() {
  while (cycleGoal.length > 0) {
    cycleGoal.pop();
  }
  while (cycleList.length > 0) {
    cycleList.pop();
  }
  while (document.getElementById("actionBoxProgressList").hasChildNodes()) {
    document.getElementById("actionBoxProgressList").removeChild(document.getElementById("actionBoxProgressList").firstElementChild);
  }
  for (let i = 0; i < cyclePlan.length; i++) {
    let action = cyclePlan[i];
    let newAction;
    let miscText;
    let actionAmount;
    let progress;
    let icon;
    newAction = document.createElement("div");
    newAction.className = "actionBoxProgressList";
    icon = document.createElement("img");
    icon.src = "images/" + action.name + ".svg";
    icon.className = "actionIcon";
    newAction.appendChild(icon);
    miscText = document.createTextNode("(");
    newAction.appendChild(miscText);
    progress = document.createElement("span");
    progress.id = "completed" + i;
    miscText = document.createTextNode("0");
    progress.appendChild(miscText);
    newAction.appendChild(progress);
    miscText = document.createTextNode("/" + document.getElementById("actionListAmount" + i).outerText + ")");
    newAction.appendChild(miscText);
    progress = document.createElement("span");
    progress.id = "progress" + i;
    progress.style.float = "right";
    miscText = document.createTextNode("0%");
    progress.appendChild(miscText);
    newAction.appendChild(progress);
    document.getElementById("actionBoxProgressList").appendChild(newAction);
    cycleGoal.push(document.getElementById("actionListAmount" + i).outerText);
    cycleList.push(action);
  }
}

function progressAction(action) {
  currentCostLeft--;
  increaseStats(cycleList[currentAction], multiplier);
  document.getElementById("progress" + currentAction).innerHTML =
  Math.floor(((originalCost - currentCostLeft) / originalCost) * 100) + "%";
  if (currentCostLeft <= 0) {
    cycleList[currentAction].finish();
    document.getElementById("completed" + currentAction).innerHTML =
    Number(document.getElementById("completed" + currentAction).innerHTML) + 1;
    currentAction = undefined;
  }
  return;
}

function findNextAction() {
  for (let i = 0; i < cyclePlan.length; i++) {
    if (Number(document.getElementById("completed" + i).outerText) < cycleGoal[i]) {
      return i;
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

function capitalize(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}
