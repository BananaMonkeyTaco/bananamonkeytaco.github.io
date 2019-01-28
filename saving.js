function save() {
  localStorage.wanderProgressBarcurrentXP =
  location[0].progressBars.wanderProgressBar.currentXP;
  localStorage.wanderProgressBarcurrentLevel =
  location[0].progressBars.wanderProgressBar.currentLevel;
  localStorage.wanderProgressBartoNextLevel =
  location[0].progressBars.wanderProgressBar.toNextLevel;
}

function load() {
  location[0].progressBars.wanderProgressBar.currentXP =
  Number(localStorage.wanderProgressBarcurrentXP) != NaN ?
  Number(localStorage.wanderProgressBarcurrentXP) : 0;
  location[0].progressBars.wanderProgressBar.currentLevel =
  Number(localStorage.wanderProgressBarcurrentLevel) != NaN ?
  Number(localStorage.wanderProgressBarcurrentLevel) : 0;
  location[0].progressBars.wanderProgressBar.toNextLevel =
  Number(localStorage.wanderProgressBartoNextLevel) != NaN ?
  Number(localStorage.wanderProgressBartoNextLevel) : 100;
}

function deleteSave() {
  localStorage.clear();
  load();
}
