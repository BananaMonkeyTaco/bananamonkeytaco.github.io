function start() {
  checkCharacters();
  buildTownBox();
  buildStatBox();
  setInterval(work, 10);
}

function gamePause() {
  if (gamePaused == false) {
    gamePaused = true;
  }
}

function gamePlay() {
  if (character[0].currentCycleActionList.length > 0 || character[0].nextCycleActionList.length > 0) {
    if (character[0].currentCycleActionList.length <= 0) {
      gameNewCycle();
    }
    gamePaused = false;
  }
}

function gameNewCycle() {
// TODO: maybe put the resource loop here if needed
  for (let i = 0; i < character.length; i++) {
    if (character[i].visible) {
      resetCharacter(character[i]);
    }
    if (character[i].nextCycleActionList.length <= 0) {
      character[i].active = false;
    }
  }
  for (let i in location) {
    for (let j in location[i].progressBars) {
      if (location[i].progressBars[j].resource) {
        location[i].progressBars[j].resource.usedAmount = 0;
      }
    }
  }
  resetActionBars();
  save();
  initializeProgressList();
}

function work() {
  //Update all the resources
  updateResourceBox();
  if (gamePaused == false) {
    //Check to make sure there's a character that can still do stuff
    for (let i = 0; i < character.length; i++) {
      if (character[i].active) {
        if (character[i].mana <= 0) {
          character[i].active = false;
        }
      }
      /*
      if (character[i].currentCycleActionCompleted[character[i].currentCycleActionCompleted.length] >=
        character[i].currentCycleActionAmount[character[i].currentCycleActionAmount.length]) {
        character[i].active = false;
      }*/
    }
    //If no characters can progress, start a new cycle
    for (let i = 0; i < character.length; i++) {
      if (character[i].active == true) {
        break;
      }
      if (i == character.length - 1) {
        gameNewCycle();
        return;
      }
    }
    for (let i = 0; i < character.length; i++) {
      if (character[i].active) {
        if (character[i].currentAction == null) {
          findNextAction(character[i]);
        }
      }
    }
    //Progress for each character
    for (let i = 0; i < character.length; i++) {
      let char = character[i];
      if (char.active) {
        progressAction(char);
      }
    }
    updateStats();
  }
}

function resetCharacter(char) {
  char.mana = (char.startingMana) ? char.startingMana : 0;
  char.gold = (char.startingGold) ? char.startingGold : 0;
  char.reputation = (char.startingReputation) ? char.startingReputation : 0;
  char.pelts = (char.startingPelts) ? char.startingPelts : 0;
  char.currentLocation = (char.startingLocation) ? char.startingLocation : 0;
  char.hasMap = false;
  char.hasGuide = false;
  char.currentAction = null;
  char.active = true;
  for (let i = 0; i < statNames.length; i++) {
    char[statNames[i]].level = 0;
    char[statNames[i]].levelXP = 0;
  }
}

function progressAction(char) {
  //Use the characters mana
  char.mana--;
  char.currentCostLeft--;
  increaseStats(char, char.currentCycleActionList[char.currentAction], char.multiplier);
  //Show the percentage of progress for the current action
  document.getElementById(lowerize(char.name) + "ProgressList").childNodes[char.currentAction].childNodes[2].innerHTML =
  Math.floor(((char.originalCost - char.currentCostLeft) / char.originalCost) * 100) + "%";
  //For when an action has a progress
  if (char.currentCycleActionList[char.currentAction].progress) {
    char.currentCycleActionList[char.currentAction].progress(char, char.multiplier);
  }
  //Check if the current action is finished
  if (char.currentCostLeft <= 0) {
    char.currentCycleActionList[char.currentAction].finish(char);
    //Show the new amount of completed actions
    char.currentCycleActionCompleted[char.currentAction]++;
    document.getElementById(lowerize(char.name) + "ProgressList").childNodes[char.currentAction].childNodes[1].innerHTML =
    "(" + char.currentCycleActionCompleted[char.currentAction] + "/" + char.currentCycleActionAmount[char.currentAction] + ")";
    //Check if the requested amount has been reached
    char.currentAction = null;
  }
}

function findNextAction(char) {
  //Find the next action the character needs to do
  for (let i = 0; i < char.currentCycleActionList.length; i++) {
    if (char.currentCycleActionCompleted[i] < char.currentCycleActionAmount[i]) {
      char.currentAction = i;
      break;
    }
  }
  //If there were no more actions for the character set them to inactive
  if (char.currentAction == null) {
    char.active = false;
    return;
  }
  //Finding the cost of the next action
  let action = char.currentCycleActionList[char.currentAction];
  let finalCost = 0;
  for (x in action.stats) {
    finalCost += (action.manaCost * action.stats[x]) / (1 + (char[x].level / 100));
  }
  char.multiplier = action.manaCost / finalCost;
  char.originalCost = finalCost;
  char.currentCostLeft = finalCost;
}

function updateResourceBox() {
  document.getElementById("characterList").innerHTML = "";
  for (let i = 0; i < character.length; i++) {
    document.getElementById("characterList").innerHTML += "<br><b>" + character[i].name + "</b>";
  }
  for (let i = 0; i < resources.length; i++) {
    let x = resources[i];
    let y = document.getElementById(x + "Box");
    y.innerHTML = "<b>" + capitalize(x) + "</b>";
    for (let j = 0; j < character.length; j++) {
      y.innerHTML += "<br>" + character[j][x];
    }
  }
}