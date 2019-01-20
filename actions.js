var actionOrder = [];
var actionAmount = [];
function addAction(action) {
  action = action.name;
  actionOrder.push(action);
  actionAmount.push("1");
  updateActionList();
}
function removeActionFromList(actionPlace) {
  actionOrder.splice(actionPlace, 1);
  updateActionList();
}
function increaseActionAmount(actionPlace) {
  actionAmount[actionPlace]++;
  updateActionList();
}
function decreaseActionAmount(actionPlace) {
  actionAmount[actionPlace]--;
  updateActionList();
}
function Wander() {
  this.name = "Wander";
}
function updateActionList() {
  var x = "";
  for(let i = 0; i < actionOrder.length; i++) {
    x = x +
    "<div>" +
    "<span class=actionBoxAction>" + actionOrder[i] + "  x" + actionAmount[i] + "</span>" +
    "<span class=actionBoxOptions>" +
    "<span onclick=increaseActionAmount(" + i + ")>" + " + " + "</span>" +
    "<span onclick=decreaseActionAmount(" + i + ")>" + " - " + "</span>" +
    "<span onclick=removeActionFromList(" + i + ")>" + " x " + "</span>" +
    "</span></div>"
    document.getElementById('actionBoxActionList').innerHTML = x;
  }
}
