var actionOrder = [];
var actionAmount = [];
function addAction(action) {
  action = action.name;
  actionOrder.push(action);
  actionAmount.push("1");
}
function removeActionFromList(actionPlace){
  actionOrder.splice(actionPlace, 1);
}
function increaseActionAmount(actionPlace){
  actionAmount[actionPlace]++;
}
function decreaseActionAmount(actionPlace){
  actionAmount[actionPlace]--;
}
function Wander() {
  this.name = "Wander";
}
function checkActionList() {
  var x = "";
  for (let i = 0; i < actionOrder.length; i++) {
    x = x +
    "<div onclick=addAction(Wander)>" +
    "<span class='actionBoxAction'>" + actionOrder[i] + "  x" + actionAmount[i] + "</span>" +
    "<span class='actionBoxOptions'>" +
    "<span onclick=addAction(Wander)>" + " click me " + "</span>" +
    "<span onclick='decreaseActionAmount(i)'>" + " - " + "</span>" +
    "<span onclick='removeActionFromList(i)'>" + " x " + "</span>" +
    "</span></div>";
    document.getElementById("actionBoxActionList").innerHTML = x;
  }
/*  if (document.getElementById("actionBoxActionList").innerHTML == x) {
    return;
  } else {
    document.getElementById("actionBoxActionList").innerHTML == x;
    return;
  }*/
}
