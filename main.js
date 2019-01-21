var mana = 100;
function start(){
  setInterval(work, 10);
}
function work(){
  document.getElementById("mana").innerHTML = "Mana = " + mana;
  if (mana > 0) {
    mana--;
  }
  initializeProgressList();
  updateActionProgressList();
}
