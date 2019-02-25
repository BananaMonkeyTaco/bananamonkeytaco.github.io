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
  if (Number(document.getElementById("amountChanger").value) < 1) {document.getElementById("amountChanger").value = 1}
  actionAmount.innerText = document.getElementById("amountChanger").value;
  newAction.appendChild(actionAmount);
  options = document.createElement("span");
  options.className = "actionBoxOptions";
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-plus";
  faIcon.onclick = function() {
    if (Number(document.getElementById("amountChanger").value) < 1) {document.getElementById("amountChanger").value = 1}
    this.parentElement.previousElementSibling.innerHTML =
    Number(this.parentElement.previousElementSibling.innerHTML) + Number(document.getElementById("amountChanger").value);
  }
  options.appendChild(faIcon);
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-minus";
  faIcon.onclick = function() {
    if (Number(document.getElementById("amountChanger").value) < 1) {document.getElementById("amountChanger").value = 1}
    this.parentElement.previousElementSibling.innerHTML =
    Number(this.parentElement.previousElementSibling.innerHTML) - document.getElementById("amountChanger").value;
    if (this.parentElement.previousElementSibling.innerHTML < 0) {
      this.parentElement.previousElementSibling.innerHTML = 0;
    }
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
