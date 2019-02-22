function save() {
  localStorage.wanderProgressBarcurrentXP = location[0].progressBars.wanderProgressBar.currentXP;
  localStorage.wanderProgressBarcurrentLevel = location[0].progressBars.wanderProgressBar.currentLevel;
  localStorage.wanderProgressBartoNextLevel = location[0].progressBars.wanderProgressBar.toNextLevel;
  localStorage.potsreliableAmount = location[0].progressBars.wanderProgressBar.resource.reliableAmount;
  localStorage.potsuncheckedAmount = location[0].progressBars.wanderProgressBar.resource.uncheckedAmount;
  localStorage.potsunreliableAmount = location[0].progressBars.wanderProgressBar.resource.unreliableAmount;
  localStorage.potstotalAmount = location[0].progressBars.wanderProgressBar.resource.totalAmount;
  localStorage.potstotalEfficiency = location[0].progressBars.wanderProgressBar.resource.totalEfficiency;
  localStorage.potsreliableEfficiency = location[0].progressBars.wanderProgressBar.resource.reliableEfficiency;
  localStorage.meetPeopleProgressBarcurrentXP = location[0].progressBars.meetPeopleProgressBar.currentXP;
  localStorage.meetPeopleProgressBarcurrentLevel = location[0].progressBars.meetPeopleProgressBar.currentLevel;
  localStorage.meetPeopleProgressBartoNextLevel = location[0].progressBars.meetPeopleProgressBar.toNextLevel;
  localStorage.favoursreliableAmount = location[0].progressBars.meetPeopleProgressBar.resource.reliableAmount;
  localStorage.favoursuncheckedAmount = location[0].progressBars.meetPeopleProgressBar.resource.uncheckedAmount;
  localStorage.favoursunreliableAmount = location[0].progressBars.meetPeopleProgressBar.resource.unreliableAmount;
  localStorage.favourstotalAmount = location[0].progressBars.meetPeopleProgressBar.resource.totalAmount;
  localStorage.favourstotalEfficiency = location[0].progressBars.meetPeopleProgressBar.resource.totalEfficiency;
  localStorage.favoursreliableEfficiency = location[0].progressBars.meetPeopleProgressBar.resource.reliableEfficiency;
  localStorage.secretsFoundProgressBarcurrentXP = location[0].progressBars.secretsFoundProgressBar.currentXP;
  localStorage.secretsFoundProgressBarcurrentLevel = location[0].progressBars.secretsFoundProgressBar.currentLevel;
  localStorage.secretsFoundProgressBartoNextLevel = location[0].progressBars.secretsFoundProgressBar.toNextLevel;
  localStorage.villagersrobbedreliableAmount = location[0].progressBars.secretsFoundProgressBar.resource.reliableAmount;
  localStorage.villagersrobbeduncheckedAmount = location[0].progressBars.secretsFoundProgressBar.resource.uncheckedAmount;
  localStorage.villagersrobbedunreliableAmount = location[0].progressBars.secretsFoundProgressBar.resource.unreliableAmount;
  localStorage.villagersrobbedtotalAmount = location[0].progressBars.secretsFoundProgressBar.resource.totalAmount;
  localStorage.villagersrobbedtotalEfficiency = location[0].progressBars.secretsFoundProgressBar.resource.totalEfficiency;
  localStorage.villagersrobbedreliableEfficiency = location[0].progressBars.secretsFoundProgressBar.resource.reliableEfficiency;
  localStorage.wolfFightingCompleted = location[0].actionBars.wolfFightingActionBar.completedAmount;
  localStorage.mainCharacter = JSON.stringify(mainCharacter);
  localStorage.tutorial = tutorial;
}

function load() {
  location[0].progressBars.wanderProgressBar.currentXP = !(isNaN(Number(localStorage.wanderProgressBarcurrentXP))) ?
  Number(localStorage.wanderProgressBarcurrentXP) : 0;
  location[0].progressBars.wanderProgressBar.currentLevel = !(isNaN(Number(localStorage.wanderProgressBarcurrentLevel))) ?
  Number(localStorage.wanderProgressBarcurrentLevel) : 0;
  location[0].progressBars.wanderProgressBar.toNextLevel = !(isNaN(Number(localStorage.wanderProgressBartoNextLevel))) ?
  Number(localStorage.wanderProgressBartoNextLevel) : 100;
  location[0].progressBars.wanderProgressBar.resource.reliableAmount = !(isNaN(Number(localStorage.potsreliableAmount))) ?
  Number(localStorage.potsreliableAmount) : 0;
  location[0].progressBars.wanderProgressBar.resource.uncheckedAmount = !(isNaN(Number(localStorage.potsuncheckedAmount))) ?
  Number(localStorage.potsuncheckedAmount) : 0;
  location[0].progressBars.wanderProgressBar.resource.unreliableAmount = !(isNaN(Number(localStorage.potsunreliableAmount))) ?
  Number(localStorage.potsunreliableAmount) : 0;
  location[0].progressBars.wanderProgressBar.resource.totalAmount = !(isNaN(Number(localStorage.potstotalAmount))) ?
  Number(localStorage.potstotalAmount) : 0;
  location[0].progressBars.wanderProgressBar.resource.totalEfficiency = !(isNaN(Number(localStorage.potstotalEfficiency))) ?
  Number(localStorage.potstotalEfficiency) : 10;
  location[0].progressBars.wanderProgressBar.resource.reliableEfficiency = !(isNaN(Number(localStorage.potsreliableEfficiency))) ?
  Number(localStorage.potsreliableEfficiency) : .10;
  location[0].progressBars.meetPeopleProgressBar.currentXP = !(isNaN(Number(localStorage.meetPeopleProgressBarcurrentXP))) ?
  Number(localStorage.meetPeopleProgressBarcurrentXP) : 0;
  location[0].progressBars.meetPeopleProgressBar.currentLevel = !(isNaN(Number(localStorage.meetPeopleProgressBarcurrentLevel))) ?
  Number(localStorage.meetPeopleProgressBarcurrentLevel) : 0;
  location[0].progressBars.meetPeopleProgressBar.toNextLevel = !(isNaN(Number(localStorage.meetPeopleProgressBartoNextLevel))) ?
  Number(localStorage.meetPeopleProgressBartoNextLevel) : 100;
  location[0].progressBars.meetPeopleProgressBar.resource.reliableAmount = !(isNaN(Number(localStorage.favoursreliableAmount))) ?
  Number(localStorage.favoursreliableAmount) : 0;
  location[0].progressBars.meetPeopleProgressBar.resource.uncheckedAmount = !(isNaN(Number(localStorage.favoursuncheckedAmount))) ?
  Number(localStorage.favoursuncheckedAmount) : 0;
  location[0].progressBars.meetPeopleProgressBar.resource.unreliableAmount = !(isNaN(Number(localStorage.favoursunreliableAmount))) ?
  Number(localStorage.favoursunreliableAmount) : 0;
  location[0].progressBars.meetPeopleProgressBar.resource.totalAmount = !(isNaN(Number(localStorage.favourstotalAmount))) ?
  Number(localStorage.favourstotalAmount) : 0;
  location[0].progressBars.meetPeopleProgressBar.resource.totalEfficiency = !(isNaN(Number(localStorage.favourstotalEfficiency))) ?
  Number(localStorage.favourstotalEfficiency) : 1;
  location[0].progressBars.meetPeopleProgressBar.resource.reliableEfficiency = !(isNaN(Number(localStorage.favoursreliableEfficiency))) ?
  Number(localStorage.favoursreliableEfficiency) : .20;
  location[0].progressBars.secretsFoundProgressBar.currentXP = !(isNaN(Number(localStorage.secretsFoundProgressBarcurrentXP))) ?
  Number(localStorage.secretsFoundProgressBarcurrentXP) : 0;
  location[0].progressBars.secretsFoundProgressBar.currentLevel = !(isNaN(Number(localStorage.secretsFoundProgressBarcurrentLevel))) ?
  Number(localStorage.secretsFoundProgressBarcurrentLevel) : 0;
  location[0].progressBars.secretsFoundProgressBar.toNextLevel = !(isNaN(Number(localStorage.secretsFoundProgressBartoNextLevel))) ?
  Number(localStorage.secretsFoundProgressBartoNextLevel) : 100;
  location[0].progressBars.secretsFoundProgressBar.resource.reliableAmount = !(isNaN(Number(localStorage.peoplerobbedreliableAmount))) ?
  Number(localStorage.peoplerobbedreliableAmount) : 0;
  location[0].progressBars.secretsFoundProgressBar.resource.uncheckedAmount = !(isNaN(Number(localStorage.peoplerobbeduncheckedAmount))) ?
  Number(localStorage.peoplerobbeduncheckedAmount) : 0;
  location[0].progressBars.secretsFoundProgressBar.resource.unreliableAmount = !(isNaN(Number(localStorage.peoplerobbedunreliableAmount))) ?
  Number(localStorage.peoplerobbedunreliableAmount) : 0;
  location[0].progressBars.secretsFoundProgressBar.resource.totalAmount = !(isNaN(Number(localStorage.peoplerobbedtotalAmount))) ?
  Number(localStorage.peoplerobbedtotalAmount) : 0;
  location[0].progressBars.secretsFoundProgressBar.resource.totalEfficiency = !(isNaN(Number(localStorage.peoplerobbedtotalEfficiency))) ?
  Number(localStorage.peoplerobbedtotalEfficiency) : .5;
  location[0].progressBars.secretsFoundProgressBar.resource.reliableEfficiency = !(isNaN(Number(localStorage.peoplerobbedreliableEfficiency))) ?
  Number(localStorage.peoplerobbedreliableEfficiency) : .1;
  location[0].actionBars.wolfFightingActionBar.completedAmount = !(isNaN(Number(localStorage.wolfFightingCompleted))) ?
  Number(localStorage.wolfFightingCompleted) : 0
  tutorial = !(localStorage.tutorial == undefined) ? localStorage.tutorial : true;
  if (localStorage.mainCharacter != undefined) {
    mainCharacter = JSON.parse(localStorage.mainCharacter);
    characters[0] = mainCharacter;
  } else {
    mainCharacter = new Person("You");
    characters[0] = mainCharacter;
  }
}

function deleteSave() {
  localStorage.clear();
  load();
  buildTownBox();
}
