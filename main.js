var mana = 250;
function start(){
  setInterval(work, 30);
}
function work(){
  document.getElementById("mana").innerHTML = "Mana = " + mana;
  document.getElementById("wanderTimes").innerHTML = actionAmount.length;
  if (mana > 0) {
    mana--;
  }
  document.getElementById("actionBoxActions").innerHTML = listActions();
}
