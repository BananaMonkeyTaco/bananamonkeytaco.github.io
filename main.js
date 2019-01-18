var mana = 250;
var trueActionList = "";
function start(){
  setInterval(work, 30);
}
function work(){
  document.getElementById("mana").innerHTML = "Mana = " + mana;
  document.getElementById("wanderTimes").innerHTML = actions.length;
  if (mana > 0) {
    mana--;
  }
  document.getElementById("actionBox").innerHTML = actions.join("<br/>");
}
