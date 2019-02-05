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
  icon.src = "images/" + capitalize(action) + ".svg";
  newAction.appendChild(icon);
  xMark = document.createTextNode("x");
  newAction.appendChild(amount);
  actionAmount = document.createTextNode(1);
  actionCount = document.getElementById("actionBoxActionList").childElementCount;
  actionAmount.id = "actionListAmount" + actionCount;
  newAction.appendChild(actionAmount);
  options = document.createElement("span");
  options.className = "actionBoxOptions";
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-plus";
  faIcon.onclick = document.getElementById("actionListAmount" + actionCount)++;
  options.appendChild(faIcon);
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-minus";
  faIcon.onclick = document.getElementById("actionListAmount" + actionCount)--;
  options.appendChild(faIcon);
  faIcon = document.createElement("i");
  faIcon.className = "actionButton fas fa-times";
  faIcon.onclick = document.getElementById("actionListAmount" + actionCount);
  options.appendChild(faIcon);
  newAction.appendChild(options);
}

function initializeProgressList() {
  for (i = 0; i < cyclePlan.length; i++) {
    let action = cyclePlan[i];
    let newAction;
    let miscText;
    let actionAmount;
    let progress;
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
    newAction.appendChild(progress);
    miscText = document.createTextNode("/" + document.getElementById("actionListAmount" + i).outerText);
    newAction.appendChild(miscText);
    progress = document.createElement("span");
    progress.id = "progress" + i;
    progress.style.float = "right";
    miscText = document.createTextNode("%");
    progress.appendChild(miscText);
    newAction.appendChild(progress);
  }
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
