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

function updateActionList() {
  let x = "";
  for (let i = 0)
}

function updateActionList() {
  var x = "";
  for(let i = 0; i < actionOrderList.length; i++) {
    x = x + "<div>" + "<span class=actionBoxActions>" +
    "<img src=images/" + actionOrderList[i] + ".svg class=actionIcon></img>" + "  x" + actionAmount[i] +
    "<span class=actionBoxOptions>" +
    "<i class='actionButton fas fa-plus' onclick=increaseActionAmount(" + i + ")>" + "</i>" +
    "<i class='actionButton fas fa-minus' onclick=decreaseActionAmount(" + i + ")>" + "</i>" +
    "<i class='actionButton fas fa-times-circle' onclick=removeActionFromList(" + i + ")>" + "</i>" +
    "</span></span></div>"
    document.getElementById('actionBoxActionList').innerHTML = x;
  }
  if (actionOrderList.length == 0) {
    document.getElementById('actionBoxActionList').innerHTML = "";
  }
}
