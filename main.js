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
  if (gamePaused == true && document.getElementById("actionBoxActionList").childElementCount > 0) {
    if (cycleList.length == 0) {
      gameNewCycle();
    }
    gamePaused = false;
  }
}

function gameNewCycle() {
  if (document.getElementById("actionBoxActionList").childElementCount > 0) {
    currentActionPlace = 0;
    mana = 100;
    gold = 0;
    document.getElementById("goldBox").style.display = "none";
    currentAction = undefined;
    hasMap = false;
    hasGuide = false;
    for (let i in location) {
      for (let j in location[i].progressBars) {
        if (location[i].progressBars[j].resource) {
          location[i].progressBars[j].resource.usedAmount = 0;
        }
      }
    }
    for (let i = 0; i < characters.length; i++) {
      for (let j = 0; j < statNames.length; j++) {
        let x = statNames[j];
        characters[i][x].level = 0;
        characters[i][x].levelXP = 0;
      }
    }
    resetActionBars();
    initializeProgressList();
    save();
  } else {
    gamePaused = true;
  }
}

function work() {
  document.getElementById("mana").innerHTML = mana;
  if (gold != 0) {
    document.getElementById("goldBox").style.display = "inline";
    document.getElementById("gold").innerHTML = gold;
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
  newAction.setAttribute("data-action", lowerize(action.name));
  icon = document.createElement("img");
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
    this.parentElement.previousElementSibling.innerHTML =
    Number(this.parentElement.previousElementSibling.innerHTML) + 1;
  }
  options.appendChild(faIcon);
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-minus";
  faIcon.onclick = function() {
    this.parentElement.previousElementSibling.innerHTML =
    Number(this.parentElement.previousElementSibling.innerHTML) - 1;
  }
  options.appendChild(faIcon);
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-times";
  faIcon.onclick = function() {
    this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
    for (let i = 0; i < document.getElementById("actionBoxActionList").childElementCount; i++) {
      let x = document.getElementById("actionBoxActionList").childNodes[i].childNodes[2];
      x.id = "actionListAmount" + i;
    }
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
  for (let i = 0; i < document.getElementById("actionBoxActionList").childElementCount; i++) {
    let action = document.getElementById("actionBoxActionList").childNodes[i].getAttribute("data-action");
    action = window[action];

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
  if (action.progress) {
    action.progress(multiplier);
  }
  if (currentCostLeft <= 0) {
    cycleList[currentAction].finish();
    document.getElementById("completed" + currentAction).innerHTML =
    Number(document.getElementById("completed" + currentAction).innerHTML) + 1;
    currentAction = undefined;
  }
  return;
}

function findNextAction() {
  for (let i = 0; i < cycleList.length; i++) {
    if (Number(document.getElementById("completed" + i).innerHTML) < cycleGoal[i]) {
      if (cycleList[i].canStart == true) {
        return i;
      } else {
        document.getElementById("completed" + i).innerHTML =
        Number(document.getElementById("completed" + i).innerHTML) + 1;
        i--;
      }
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
