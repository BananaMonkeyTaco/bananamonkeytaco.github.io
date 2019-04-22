function save() {
  let saveFile = {}
  saveFile.player = player;
  saveFile.city = city.current;
  saveFile.mediumMall = mediumMall.current;
  localStorage.bigCityDreamsReimaginingSaveFile = JSON.stringify(saveFile);
}

function load() {
  let saveFile = {}
  if (localStorage.bigCityDreamsReimaginingSaveFile) {
    saveFile = JSON.parse(localStorage.bigCityDreamsReimaginingSaveFile);
    player = saveFile.player;
    city.current = saveFile.city;
    mediumMall.current = saveFile.mediumMall;
  } else {
    player = defaults.player;
    city.current = defaults.city;
    mediumMall.current = defaults.mediumMall;
  }
}

function clearSave() {
  localStorage.removeItem("bigCityDreamsReimaginingSaveFile");
  load();
}
