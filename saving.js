function save() {
  localStorage.setItem("wanderProgressBar", wanderProgressBar);
}

function load() {
  wanderProgressBar = localStorage.getItem("wanderProgressBar");
}
