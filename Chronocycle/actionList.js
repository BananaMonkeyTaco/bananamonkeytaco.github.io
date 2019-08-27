function addAction(action, amount, char) {
  let newAction;
  let changeAmount;
  let actionAmount;
  let icon;
  let actionPlace;
  let faIcon;
  let options;
  if (char == undefined) {
    char = character[currentCharacter];
  }
  if (amount == undefined) {
    if (Number(document.getElementById("amountChanger").value) < 1) {document.getElementById("amountChanger").value = 1}
    changeAmount = Number(document.getElementById("amountChanger").value);
  } else {
    changeAmount = amount;
  }
  newAction = document.createElement("div");
  /*
change class later
  */
  newAction.className = "actionBoxActions";
  //Saving the actions place in the action list for later reference
  newAction.setAttribute("childNumber", char.nextCycleActionList.length);
  //adding action to the character's list and checking for the changer value
  char.nextCycleActionList.push(action);
  char.nextCycleActionAmount.push(changeAmount);
  icon = document.createElement("img");
  icon.src = "images/" + action.name + ".svg";
  icon.className = "actionIcon";
  newAction.appendChild(icon);
  //span for amount of times to do the action
  actionAmount = document.createElement("span");
  actionAmount.innerHTML = "x" + changeAmount;
  newAction.appendChild(actionAmount);
  //option icons for editing the action list
  options = document.createElement("span");
  /*
  maybe change this class name to
  */
  options.className = "actionBoxOptions";
  //Adding
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-plus";
  faIcon.addEventListener("click", actionAmountChange);
  options.appendChild(faIcon);
  //Subtracting
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-minus";
  faIcon.addEventListener("click", actionAmountChange);
  options.appendChild(faIcon);
  //Moving the action up the list
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-chevron-up";
  faIcon.addEventListener("click", actionIncreasePriority);
  options.appendChild(faIcon);
  //Moving the action down the list
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-chevron-down";
  faIcon.addEventListener("click", actionDecreasePriority);
  options.appendChild(faIcon);
  //Removing the action from the list
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-times";
  faIcon.addEventListener("click", removeNextCycleAction);
  options.appendChild(faIcon);
  newAction.appendChild(options);
  document.getElementById(lowerize(char.name) + "ActionList").appendChild(newAction);
}
// TODO: Check if same list
function initializeProgressList() {
  for (let i = 0; i < character.length; i++) {
    let x = character[i];
    let cycleList = document.getElementById(lowerize(x.name) + "ProgressList")
    //Clearing the previous progress list
    x.currentCycleActionList = [];
    x.currentCycleActionAmount = [];
    x.currentCycleActionCompleted = [];
    while (cycleList.firstChild) {
      cycleList.removeChild(cycleList.firstChild);
    }
    //Making the new list from the start
    for (let j = 0; j < x.nextCycleActionList.length; j++) {
      let newProgress;
      let icon;
      let completedSpan;
      let progressSpan;
      //Add data to the character
      x.currentCycleActionList.push(x.nextCycleActionList[j]);
      x.currentCycleActionAmount.push(x.nextCycleActionAmount[j]);
      x.currentCycleActionCompleted.push(0);
      newProgress = document.createElement("div");
      // TODO: change class name
      newProgress.className = "actionBoxProgressList";
      //Making the icon
      icon = document.createElement("img");
      icon.src = "images/" + capitalize(x.nextCycleActionList[j].name) + ".svg";
      icon.className = "actionIcon";
      newProgress.appendChild(icon);
      //Span for amount completed / amount to complete during cycle
      completedSpan = document.createElement("span");
      completedSpan.innerHTML = "(" + x.currentCycleActionCompleted[j] + "/" + x.currentCycleActionAmount[j] + ")";
      newProgress.appendChild(completedSpan);
      //Span for the percentage of the current action that has been completed
      progressSpan = document.createElement("span");
      progressSpan.style.float = "right";
      progressSpan.innerHTML = "0%";
      newProgress.appendChild(progressSpan);
      cycleList.appendChild(newProgress);
    }
  }
}

function initializeActionList() {
  for (let i = 0; i < character.length; i++) {
    let char = character[i];
    for (let j = 0; j < char.nextCycleActionList.length; j++) {
      char.nextCycleActionList[j] = window[lowerize(char.nextCycleActionList[j].name)];
      let action = char.nextCycleActionList[j];
      let changeAmount = char.nextCycleActionAmount[j]
      let newAction;
      let icon;
      let actionAmount;
      let options;
      let faIcon;
      newAction = document.createElement("div");
      newAction.className = "actionBoxActions";
      //Saving the actions place in the action list for later reference
      newAction.setAttribute("childNumber", j);
      //adding action to the character's list and checking for the changer value
      icon = document.createElement("img");
      icon.src = "images/" + action.name + ".svg";
      icon.className = "actionIcon";
      newAction.appendChild(icon);
      //span for amount of times to do the action
      actionAmount = document.createElement("span");
      actionAmount.innerHTML = "x" + changeAmount;
      newAction.appendChild(actionAmount);
      //option icons for editing the action list
      options = document.createElement("span");
      /*
      maybe change this class name to
      */
      options.className = "actionBoxOptions";
      //Adding
      faIcon = document.createElement("i");
      faIcon.className = "actionButton fas fa-plus";
      faIcon.addEventListener("click", actionAmountChange);
      options.appendChild(faIcon);
      //Subtracting
      faIcon = document.createElement("i");
      faIcon.className = "actionButton fas fa-minus";
      faIcon.addEventListener("click", actionAmountChange);
      options.appendChild(faIcon);
      //Moving the action up the list
      faIcon = document.createElement("i");
      faIcon.className = "actionButton fas fa-chevron-up";
      faIcon.addEventListener("click", actionIncreasePriority);
      options.appendChild(faIcon);
      //Moving the action down the list
      faIcon = document.createElement("i");
      faIcon.className = "actionButton fas fa-chevron-down";
      faIcon.addEventListener("click", actionDecreasePriority);
      options.appendChild(faIcon);
      //Removing the action from the list
      faIcon = document.createElement("i");
      faIcon.className = "actionButton fas fa-times";
      faIcon.addEventListener("click", removeNextCycleAction);
      options.appendChild(faIcon);
      newAction.appendChild(options);
      document.getElementById(lowerize(char.name) + "ActionList").appendChild(newAction);
    }
  }
}

// TODO: may have to clean up this function
function actionAmountChange(node) {
  node = node.target;
  let sign;
  if (node.classList.contains("fa-plus")) {
    sign = "plus";
  } else if (node.classList.contains("fa-minus")) {
    sign = "minus";
  }
  node = node.parentElement.previousElementSibling;
  let amount = Number(node.innerHTML.slice(1));
  let change = document.getElementById("amountChanger");
  if (Number(change.value) < 1) {change.value = 1}
  change = Number(change.value);
  if (sign == "plus") {
    node.innerHTML = "x" + (amount + change);
    character[currentCharacter].nextCycleActionAmount[node.parentElement.getAttribute("childNumber")] += change;
  } else if (sign == "minus") {
    if (amount - change < 0) {
      node.innerHTML = "x0";
      character[currentCharacter].nextCycleActionAmount[node.parentElement.getAttribute("childNumber")] = 0;
    } else {
      node.innerHTML = "x" + (amount - change);
      character[currentCharacter].nextCycleActionAmount[node.parentElement.getAttribute("childNumber")] -= change;
    }
  }
}

function actionIncreasePriority(node) {
  node = node.target.parentElement.parentElement;
  let list = node.parentElement;
  let child = node.getAttribute("childNumber");
  //Setting new child numbers
  list.childNodes[child - 1].setAttribute("childNumber", child);
  list.childNodes[child].setAttribute("childNumber", child - 1);
  //Moving the action in the list
  list.insertBefore(node, list.childNodes[child - 1]);
  //Moving the action for the character
  let char = character[currentCharacter];
  [char.nextCycleActionList[child - 1], char.nextCycleActionList[child]] =
  [char.nextCycleActionList[child], char.nextCycleActionList[child - 1]];
  [char.nextCycleActionAmount[child - 1], char.nextCycleActionAmount[child]] =
  [char.nextCycleActionAmount[child], char.nextCycleActionAmount[child - 1]];
}

function actionDecreasePriority(node) {
  node = node.target.parentElement.parentElement;
  let list = node.parentElement;
  let child = Number(node.getAttribute("childNumber"));
  //Setting new child numbers
  list.childNodes[child + 1].setAttribute("childNumber", child);
  list.childNodes[child].setAttribute("childNumber", child + 1);
  //Moving the action in the list
  list.insertBefore(list.childNodes[child + 1], node);
  //Moving the action for the character
  let char = character[currentCharacter];
  [char.nextCycleActionList[child + 1], char.nextCycleActionList[child]] =
  [char.nextCycleActionList[child], char.nextCycleActionList[child + 1]];
  [char.nextCycleActionAmount[child + 1], char.nextCycleActionAmount[child]] =
  [char.nextCycleActionAmount[child], char.nextCycleActionAmount[child + 1]];
}

function removeNextCycleAction(node) {
  node = node.target.parentElement;
  node.childNodes[0].removeEventListener("click", actionAmountChange);
  node.childNodes[1].removeEventListener("click", actionAmountChange);
  node.childNodes[2].removeEventListener("click", actionIncreasePriority);
  node.childNodes[3].removeEventListener("click", actionDecreasePriority);
  node.childNodes[4].removeEventListener("click", removeNextCycleAction);
  node = node.parentElement;
  character[currentCharacter].nextCycleActionList.splice(node.getAttribute("childNumber"), 1);
  character[currentCharacter].nextCycleActionAmount.splice(node.getAttribute("childNumber"), 1);
  let list = node.parentElement;
  let nodeDeleted = false;
  for (let i = 0; i < list.childElementCount; i++) {
    if (list.childNodes[i] === node) {
      list.removeChild(list.childNodes[i]);
      nodeDeleted = true;
    }
    if (nodeDeleted == true) {
      list.childNodes[i].setAttribute("childNumber", list.childNodes[i].getAttribute("childNumber") - 1);
    }
  }
}

function saveLoadout() {
  // TODO: maybe make this a NOT statement and remove the whole indent and brackets
  if (0 < activeLoadout && activeLoadout < 6) {
    if (activeLoadoutType == "individual") {
      while (individualLoadoutActions[activeLoadout].length > 0) {
        individualLoadoutActions[activeLoadout].pop();
        individualLoadoutAmount[activeLoadout].pop();
      }
      char = character[currentCharacter];
      for (let i = 0; i < char.nextCycleActionList.length; i++) {
        individualLoadoutActions[activeLoadout].push(char.nextCycleActionList[i]);
        individualLoadoutAmount[activeLoadout].push(char.nextCycleActionAmount[i]);
      }
    } else if (activeLoadoutType == "party") {
      for (let i = 0; i < character.length; i++) {
        char = character[i];
        partyLoadoutActions[activeLoadout][i] = [];
        partyLoadoutAmount[activeLoadout][i] = [];
        for (let j = 0; j < char.nextCycleActionList.length; j++) {
          partyLoadoutActions[activeLoadout][i].push(char.nextCycleActionList[j]);
          partyLoadoutAmount[activeLoadout][i].push(char.nextCycleActionAmount[j]);
        }
      }
    }
  }
}

function loadLoadout() {
  //Checking for valid loadout
  if (0 < activeLoadout && activeLoadout < 6) {
    if (activeLoadoutType == "individual") {
      char = character[currentCharacter];
      let box = document.getElementById(lowerize(char.name) + "ActionList");
      //Empty the character's visual action list
      while (box.childElementCount > 0) {
        box.removeChild(box.firstElementChild);
      }
      //Emptying the character's actual action list
      char.nextCycleActionList = [];
      char.nextCycleActionAmount = [];
      //Setting character's new action list
      if (individualLoadoutActions[activeLoadout][0] != undefined) {
        for (let i = 0; i < individualLoadoutActions[activeLoadout].length; i++) {
          char.nextCycleActionList.push(individualLoadoutActions[activeLoadout][i]);
          char.nextCycleActionAmount.push(individualLoadoutAmount[activeLoadout][i]);
        }
      }
    } else if (activeLoadoutType == "party") {
      for (let i = 0; i < partyLoadoutActions[activeLoadout].length; i++) {
        char = character[i];
        let box = document.getElementById(lowerize(character[i].name) + "ActionList");
        //Empty the character's visual action list
        while (box.childElementCount > 0) {
          box.removeChild(box.firstElementChild);
        }
        //Emptying each character's actual action list
        char.nextCycleActionList = [];
        char.nextCycleActionAmount = [];
        //Setting character's new action list
        if (partyLoadoutActions[activeLoadout][i][0] != undefined) {
          for (let j = 0; j < partyLoadoutActions[activeLoadout][i].length; j++) {
            char.nextCycleActionList.push(partyLoadoutActions[activeLoadout][i][j]);
            char.nextCycleActionAmount.push(partyLoadoutAmount[activeLoadout][i][j]);
          }
        }
      }
    }
    initializeActionList();
  }
}

function changeActiveLoadout(type, num) {
  for (let i = 1; i < 6; i++) {
    document.getElementById("individualLoadout" + i).className = "loadoutButton";
  }
  for (let i = 1; i < 6; i++) {
    document.getElementById("partyLoadout" + i).className = "loadoutButton";
  }
  document.getElementById(type + "Loadout" + num).className = "activeLoadoutButton";
  activeLoadoutType = type;
  activeLoadout = num;
}
