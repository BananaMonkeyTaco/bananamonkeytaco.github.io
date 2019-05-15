function load() {
  let saveFile = {};
  if (localStorage.chronocycleSaveFile) {
    saveFile = JSON.parse(localStorage.chronocycleSaveFile);
  }
  for (let i = 0; i < 2; i++) {
    if (i != 0) {
      location[i].visible = saveFile[location[i].name + "visible"] == undefined ? false : saveFile[location[i].name + "visible"];
    }
    for (let x in location[i].progressBars) {
      if (location[i].progressBars[x].type == "Progress") {
        location[i].progressBars[x].currentLevel = saveFile[location[i].name + x + "currentLevel"] == undefined ?
        0 : saveFile[location[i].name + x + "currentLevel"];
        location[i].progressBars[x].currentXP = saveFile[location[i].name + x + "currentXP"] == undefined ?
        0 : saveFile[location[i].name + x + "currentXP"];
        location[i].progressBars[x].resource.checkedAmount = saveFile[location[i].name + x + "checkedAmount"] == undefined ?
        0 : saveFile[location[i].name + x + "checkedAmount"];
        location[i].progressBars[x].resource.reliableFirstLock = saveFile[location[i].name + x + "reliableFirstLock"] == undefined ?
        false : saveFile[location[i].name + x + "reliableFirstLock"];
        getNextLevel(location[i].progressBars[x]);
        updateResources(location[i].progressBars[x]);
      }
      else if (location[i].progressBars[x].type == "Action") {
        location[i].progressBars[x].completedAmount = saveFile[location[i].name + x + "completedAmount"] == undefined ?
        0 : saveFile[location[i].name + x + "completedAmount"];
      }
    }
  }
  if (saveFile["character0"] == undefined) {
    character[0] = new Person("You");
    character[0].visible = true;
  } else {
    character[0] = saveFile["character0"];
    character[0].currentCycleActionList = [];
    character[0].currentCycleActionAmount = [];
    character[0].currentCycleActionCompleted = [];
  }
  for (let i = 1; i < 2; i++) {
    if (saveFile["character" + i] == undefined) {
      character[i] = new Person("Extra");
      character[i].visible = true;
    } else {
      character[i] = saveFile["character" + i];
      character[i].currentCycleActionList = [];
      character[i].currentCycleActionAmount = [];
      character[i].currentCycleActionCompleted = [];
    }
  }
  //Making loadouts
  loadoutActions = [];
  loadoutAmount = [];
  for (let i = 1; i < 6; i++) {
    loadoutActions[i] = [];
    loadoutAmount[i] = [];
    for (let j = 0; j < character.length; j++) {
      loadoutActions[i][j] = [];
      loadoutAmount[i][j] = [];
    }
  }
  //Checking saved loadouts
  if (saveFile.loadoutActions) {
    for (let i = 1; i < 6; i++) {
      if (saveFile.loadoutActions[i]) {
        for (let j = 0; j < character.length; j++) {
          if (saveFile.loadoutActions[i][j]) {
            for (let k = 0; k < saveFile.loadoutActions[i][j].length; k++) {
              loadoutActions[i][j].push(window[lowerize(saveFile.loadoutActions[i][j][k].name)]);
              loadoutAmount[i][j].push(saveFile.loadoutAmount[i][j][k]);
            }
          }
        }
      }
    }
  }
  tutorial = (saveFile.tutorial != undefined) ? saveFile.tutorial : true;
}

function save() {
  let saveFile = {};
  for (let i = 0; i < 2; i++) {
    saveFile[location[i].name + "visible"] = location[i].visible;
    for (let x in location[i].progressBars) {
      if (location[i].progressBars[x].type == "Progress") {
        saveFile[location[i].name + x + "currentLevel"] = location[i].progressBars[x].currentLevel;
        saveFile[location[i].name + x + "currentXP"] = location[i].progressBars[x].currentXP;
        saveFile[location[i].name + x + "checkedAmount"] = location[i].progressBars[x].resource.checkedAmount;
        saveFile[location[i].name + x + "reliableFirstLock"] = location[i].progressBars[x].resource.reliableFirstLock;
      }
      else if (location[i].progressBars[x].type == "Action") {
        saveFile[location[i].name + x + "completedAmount"] = location[i].progressBars[x].completedAmount;
      }
    }
  }
  for (let i = 0; i < 2; i++) {
    saveFile["character" + i] = character[i];
  }
  saveFile.loadoutActions = loadoutActions;
  saveFile.loadoutAmount = loadoutAmount;
  saveFile.tutorial = tutorial;
  localStorage.chronocycleSaveFile = JSON.stringify(saveFile);
}

function deleteSave() {
  localStorage.removeItem("chronocycleSaveFile");
  load();
  buildTownBox();
}
