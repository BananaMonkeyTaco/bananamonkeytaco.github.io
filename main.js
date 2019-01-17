var mana = 250;
function start(){
  setInterval(work, 30);
}
function work(){
  document.getElementById("mana").innerHTML = mana;
  if (mana > 0) {
    mana--;
  } else {
    return;
  }
  document.getElementById("realActionList").innerHTML = actions[0];
}
