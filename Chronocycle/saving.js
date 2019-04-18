function save() {
  let saveFile = {};
  for (let i = 0; i < 2; i++) {
    for (let x in location[i].progressBars) {
      if (location[i].progressBars[x].type == "Progress") {
        saveFile[location[i].name + x + "currentLevel"] = location[i].progressBars[x].currentLevel;
        saveFile[location[i].name + x + "currentXP"] = location[i].progressBars[x].currentXP;
        saveFile[location[i].name + x + "checkedAmount"] = location[i].progressBars[x].resource.checkedAmount;
        saveFile[location[i].name + x + "reliableFirstLock"] = location[i].progressBars[x].resource.reliableFirstLock;
      }
    }
  }
  for (let i = 0; i < 2; i++) {
    saveFile["character" + i] = character[i];
  }
  //localStorage.wolfFightingCompleted = location[0].actionBars.wolfFightingActionBar.completedAmount;
  saveFile.tutorial = tutorial;
  localStorage.chronocycleSaveFile = JSON.stringify(saveFile);
}

function load() {
  let saveFile = {};
  if (localStorage.chronocycleSaveFile) {
    saveFile = JSON.parse(localStorage.chronocycleSaveFile);
  }
  for (let i = 0; i < 2; i++) {
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
    }
  }
  if (saveFile["character0"] == undefined) {
    character[0] = new Person("You");
    character[0].visible = true;
  } else {
    character[0] = saveFile["character0"];
    character[0].nextCycleActionList = [];
    character[0].nextCycleActionAmount = [];
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
      character[i].nextCycleActionList = [];
      character[i].nextCycleActionAmount = [];
      character[i].currentCycleActionList = [];
      character[i].currentCycleActionAmount = [];
      character[i].currentCycleActionCompleted = [];
    }
  }

  //location[0].actionBars.wolfFightingActionBar.completedAmount = !(isNaN(Number(localStorage.wolfFightingCompleted))) ?
  //Number(localStorage.wolfFightingCompleted) : 0
  tutorial = (saveFile.tutorial) ? saveFile.tutorial : true;
}

function deleteSave() {
  localStorage.removeItem("chronocycleSaveFile");
  load();
  buildTownBox();
}
