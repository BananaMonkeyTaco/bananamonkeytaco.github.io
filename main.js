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
