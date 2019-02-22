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
var tutorial = true;

function capitalize(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

function lowerize(string) {
  return string.slice(0, 1).toLowerCase() + string.slice(1);
}

function fibonacci(num1, num2) {
  if (num2 === undefined) {
    num2 = num1;
  }
  return num1 + num2;
}

function roundStatGain() {

}

function showTutorial() {
  let tutorialBox = document.createElement("div");
  tutorialBox.style.position = "absolute";
  tutorialBox.style.backgroundColor = "lightgreen";

/*  display: none;
  padding: 4px;
  position: absolute;
  background-color: lightgreen;
  border: 1px solid black;
  border-radius: 5px;
  text-align: left;*/
  let tempElement = document.createElement("div");
  tempElement.style.fontWeight = "bold";
  let miscText = document.createTextNode("Tutorial");
  tempElement.appendChild(miscText);
  tutorialBox.appendChild(tempElement);
  tempElement = document.createElement("div");
  tempElement.innerHTML =
  "You don't quite remember who you are or how you got here..." +
  "<br>" +
  "You don't quite remember who you are or how you got here..." +
  "<br>" +
  "You don't quite rememeber who you are- wait a second..." +
  "<br>" +
  "You don't- you DO remember forgetting everything. But why..." +
  "<br>" +
  "You remember this. But why do you keep being brought back in time?..." +
  "<br>" +
  "You remember being brought back. Wait, you're mana's draining rapidly..." +
  "<br>" +
  "You're mana's draining. Maybe if you focus on containing it you can make it last longer. It's still draining too fast..." +
  "<br>" +
  "You remember to focus on your mana. It's still draining slowly, but at least you have some time to think. " +
  "You try to remember how you got into this situation but can't remember more than some foggy memories of being abducted " +
  "by somebody. Well you can't just stay here reliving the same few seconds over and over again. Maybe if you explored " +
  "this small village you're conveniently next to you might be able to find some mana lying around to make these cycles " +
  "last a little bit longer.";
  tutorialBox.appendChild(tempElement);
  tempElement = document.createElement("button");
  tempElement.innerHTML = "Close";
  tempElement.onclick = function() {
    document.getElementById("introButton").removeChild(this.parentElement);
    document.getElementById("introButton").onclick = function() {
      //showTutorial();
    }
  }
  tutorialBox.appendChild(tempElement);
  document.getElementById("introButton").appendChild(tutorialBox);
  document.getElementById("introButton").onclick = function() {}
}

function cheat() {
  location[0].progressBars.wanderProgressBar.currentLevel = 80;
  location[0].progressBars.meetPeopleProgressBar.currentLevel = 80;
  location[0].progressBars.secretsFoundProgressBar.currentLevel = 80;
  buildTownBox();
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
