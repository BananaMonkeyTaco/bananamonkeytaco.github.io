var actionOrder = [];
var actionAmount = [];
function addAction(action) {
  action = action.name;
  actionOrder.push(action);
  actionAmount.push("1");
}
function Wander() {
  this.name = "Wander";
}
function listActions() {
  var x = "";
  for (let i = 0; i < actionOrder.length; i++) {
    x = x +
    "<div class=actionBoxAction>" + actionOrder[i] + "  x" + actionAmount[i] +
    "</div>" +
    "<div class=actionBoxOptions>" + "+-xx" +
    "</div>";
  }
  return x;
}
