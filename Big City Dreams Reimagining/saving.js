function save() {
  let saveFile = {}
  saveFile.player = player;
  saveFile.city = city;
  saveFile.mediumMall = mediumMall.current;
  localStorage.saveFile = JSON.stringify(saveFile);
}

function load() {
  let saveFile = {}
  if (localStorage.saveFile) {
    saveFile = JSON.parse(localStorage.saveFile);
    player = saveFile.player;
    city = saveFile.city;
    mediumMall.current = saveFile.mediumMall;
  }
}

function clearSave() {
  localStorage.clear();
}
