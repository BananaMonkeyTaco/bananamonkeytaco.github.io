function addAction(action) {
  let char = character[currentCharacter];
  let newAction;
  let changeAmount;
  let actionAmount;
  let icon;
  let actionPlace;
  let faIcon;
  let options;
  newAction = document.createElement("div");
  /*
change class later
  */
  newAction.className = "actionBoxActions";
  //Saving the actions place in the action list for later reference
  newAction.setAttribute("childNumber", char.nextCycleActionList.length);
  //adding action to the character's list and checking for the changer value
  if (Number(document.getElementById("amountChanger").value) < 1) {document.getElementById("amountChanger").value = 1}
  changeAmount = Number(document.getElementById("amountChanger").value);
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

function removeNextCycleAction(node) {
  node = node.target.parentElement;
  node.childNodes[0].removeEventListener("click", actionAmountChange);
  node.childNodes[1].removeEventListener("click", actionAmountChange);
  node.childNodes[2].removeEventListener("click", removeNextCycleAction);
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
  if (0 < activeLoadout && activeLoadout < 6) {
    while (loadoutActions[activeLoadout].length > 0) {
      loadoutActions[activeLoadout].pop();
      loadoutAmount[activeLoadout].pop();
    }
    for (i = 0; i < document.getElementById("actionBoxActionList").childElementCount; i++) {
      loadoutActions[activeLoadout].push(window[document.getElementById("actionBoxActionList").childNodes[i].getAttribute("data-action")]);
      loadoutAmount[activeLoadout].push(document.getElementById("actionListAmount" + i).outerText);
    }
  }
}

function loadLoadout() {
  if (0 < activeLoadout && activeLoadout < 6) {
    while (document.getElementById("actionBoxActionList").childElementCount > 0) {
      document.getElementById("actionBoxActionList").removeChild(document.getElementById("actionBoxActionList").firstElementChild);
    }
    let x = document.getElementById("amountChanger");
    let tempNumber = Number(x.value);
    for (i = 0; i < loadoutActions[activeLoadout].length; i++) {
      x.value = loadoutAmount[activeLoadout][i];
      addAction(loadoutActions[activeLoadout][i]);
    }
    x.value = tempNumber;
  }
}

function changeActiveLoadout(num) {
  for (i = 1; i < 6; i++) {
    document.getElementById("loadout" + i).className = "loadoutButton";
  }
  document.getElementById("loadout" + num).className = "activeLoadoutButton";
  activeLoadout = num;
}
