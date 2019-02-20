var cycleGoal = [];
var cycleList = [];
var mana = 100;
var gold = 0;
var currentAction;
var currentCostLeft;
var multiplier;
var gamePaused = true;
var currentActionPlace = 0;
var hasMap = false;
var hasGuide = false;
var location;
var currentLocation = 0;
var directions = ["toNorthWest", "toNorth", "toNorthEast", "toWest", "name",
"toEast", "toSouthWest", "toSouth", "toSouthEast"];
var point = [225, 270, 315, 180, 0, 0, 135, 90, 45];
var characters = [];
var statNames = ["dexterity", "strength", "constitution", "speed", "perception",
"charisma", "intelligence", "wisdom", "spirit"];
var skills = ["combat"];
var dexterityColour = "#996633";
var strengthColour = "red";
var constitutionColour = "lime";
var speedColour = "orange";
var perceptionColour = "#e335e3";
var charismaColour = "#e6e600";
var intelligenceColour = "#33ccff";
var wisdomColour = "#0033cc";
var spiritColour = "grey";

function capitalize(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

function lowerize(string) {
  return string.slice(0, 1).toLowerCase() + string.slice(1);
}

function cheat() {
  location[0].progressBars.wanderProgressBar.currentLevel = 80;
  location[0].progressBars.meetPeopleProgressBar.currentLevel = 80;
  location[0].progressBars.secretsFoundProgressBar.currentLevel = 80;
  buildTownBox();
}

function fibonacci(num1, num2) {
  if (num2 === undefined) {
    num2 = num1;
  }
  return num1 + num2;
}
/*
for (let i = 0; i < statNames.length; i++) {
  let skill = document.createElement("div");
  skill.className = "progressBarEmpty";
  skill.style.margin = "25px";
  let thing = document.createElement("div");
  thing.className = "progressBarFill";
  thing.width = "100%";
  thing.style.backgroundColor = window[statNames[i] + "Colour"];
  skill.appendChild(thing);
  let miscText = document.createTextNode(statNames[i]);
  skill.appendChild(miscText);
  town.appendChild(skill);
}
*/
