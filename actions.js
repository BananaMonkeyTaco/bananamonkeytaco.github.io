var actionOrder = [];
var actionAmount = [];
var actionAmountCompleted = [];
var actionOrderProgress = [];
function addAction(action) {
  action = action.name;
  actionOrder.push(action);
  actionAmount.push("1");
  updateActionList();
}
function removeActionFromList(actionPlace) {
  actionOrder.splice(actionPlace, 1);
  actionAmount.splice(actionPlace, 1);
  updateActionList();
}
function increaseActionAmount(actionPlace) {
  actionAmount[actionPlace]++;
  updateActionList();
}
function decreaseActionAmount(actionPlace) {
  if(actionAmount[actionPlace] > 0){
    actionAmount[actionPlace]--;
  }
  updateActionList();
}
function Wander() {
  this.name = "Wander";
  this.manaCost = "50";
}
function updateActionList() {
  var x = "";
  for(let i = 0; i < actionOrder.length; i++) {
    x = x + "<div>" +
    "<span class=actionBoxActions>" +
    actionOrder[i] + "  x" + actionAmount[i] +
    "<span class=actionBoxOptions>" +
    "<span onclick=increaseActionAmount(" + i + ")>" + " + " + "</span>" +
    "<span onclick=decreaseActionAmount(" + i + ")>" + " - " + "</span>" +
    "<span onclick=removeActionFromList(" + i + ")>" + " x " + "</span>" +
    "</span></span></div>"
    document.getElementById('actionBoxActionList').innerHTML = x;
  }
}
function updateActionProgressList(){
  var x = "";
  for (let i = 0; i < actionOrder.length; i++) {
    x = x + "<div>" +
    "<span class=actionBoxProgressList>" + actionOrder[i] +
    "  ( " + actionAmountCompleted[i] + " / " + actionAmount[i] + " )" +
    actionOrderProgress[i] + "%" + "</span></div>";
  }
  document.getElementById("actionBoxProgressList").innerHTML = x;
}
