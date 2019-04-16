var currentCharacter = 0;
var nextReset;
var actionAmountCh;
var hasGuide = false;
var currentAction;
var currentCostLeft;
var multiplier;
var currentActionPlace = 0;
var resources = ["mana", "gold", "reputation", "pelts"];
var gamePaused = true;
var tutorial = true;
var location;
var currentLocation = 0;
var directions = ["toNorthWest", "toNorth", "toNorthEast", "toWest", "name",
"toEast", "toSouthWest", "toSouth", "toSouthEast"];
var point = [225, 270, 315, 180, 0, 0, 135, 90, 45];
var character = [];
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
var wisdomColour = "#8080ff";
var spiritColour = "grey";
var activeLoadout = 0;
var loadoutActions = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
}
var loadoutAmount = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
}

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

function changeChanger(num) {
  document.getElementById("amountChanger").value = num;
}

function checkCharacters() {
  // TODO: resources need to be made better here
  let tempElement = document.getElementById("actionColumn");
  for (let i = 0; i < character.length; i++) {
    if (character[i].visible) {
      let tempDiv;
      let tempSubDiv;
      //Resource boxes
      document.getElementById("characterList").innerHTML += "<br>" + character[i].name;
      for (let j = 0; j < resources.length; j++) {
        let x = resources[j];
        document.getElementById(x + "Box").innerHTML += "<br>" + character[i][x];
      }
      //Stat boxes
      //Character selection
      tempDiv = document.createElement("div");
      tempDiv.className = "characterSelectButton";
      tempDiv.innerHTML = character[i].name;
// TODO: change to event listener
      tempDiv.onclick = function() {
        characterSwitch(i);
      }
      document.getElementById("characterSelection").appendChild(tempDiv);
      //Stats
      tempDiv = document.createElement("div");
      tempDiv.id = "character" + i;
      tempDiv.style.display = "none";
      document.getElementById("characterBox").appendChild(tempDiv);
      //Action boxes
      tempDiv = document.createElement("div");
      tempDiv.className = "actionBox";
      tempDiv.id = "character" + i + "ActionBox";
      tempDiv.style.display = "none";
      tempSubDiv = document.createElement("div");
      tempSubDiv.className = "actionBoxProgressList";
      tempSubDiv.id = lowerize(character[i].name) + "ProgressList";
      tempDiv.appendChild(tempSubDiv);
      tempSubDiv = document.createElement("div");
      tempSubDiv.className = "actionBoxActionList";
      tempSubDiv.id = lowerize(character[i].name) + "ActionList";
      tempDiv.appendChild(tempSubDiv);
      tempElement.insertBefore(tempDiv, document.getElementById("actionBoxButtons"));
    }
  }
  document.getElementById("character0").style.display = "block";
  document.getElementById("character0ActionBox").style.display = "grid";
}

function showTutorial() {
  let tutorialBox = document.createElement("div");
  tutorialBox.style.position = "absolute";
  tutorialBox.style.backgroundColor = "lightgreen";
  tutorialBox.style.zIndex = "1";
  tutorialBox.style.borderRadius = "5px";
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
    tutorial = false;
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
  getNextLevel(location[0].progressBars.wanderProgressBar);
  updateResources(location[0].progressBars.wanderProgressBar);
  location[0].progressBars.meetPeopleProgressBar.currentLevel = 80;
  getNextLevel(location[0].progressBars.meetPeopleProgressBar);
  updateResources(location[0].progressBars.meetPeopleProgressBar);
  location[0].progressBars.secretsFoundProgressBar.currentLevel = 80;
  getNextLevel(location[0].progressBars.secretsFoundProgressBar);
  updateResources(location[0].progressBars.secretsFoundProgressBar);
  location[1].progressBars.exploreForestProgressBar.currentLevel = 100;
  getNextLevel(location[1].progressBars.exploreForestProgressBar);
  location[1].progressBars.investigateTreesProgressBar.currentLevel = 100;
  getNextLevel(location[1].progressBars.investigateTreesProgressBar);
  updateResources(location[1].progressBars.investigateTreesProgressBar);
  location[1].progressBars.mapGameTrailsProgressBar.currentLevel = 100;
  getNextLevel(location[1].progressBars.mapGameTrailsProgressBar);
  updateResources(location[1].progressBars.mapGameTrailsProgressBar);
  location[1].progressBars.talkToDryadProgressBar.currentLevel = 100;
  getNextLevel(location[1].progressBars.talkToDryadProgressBar);
  updateResources(location[1].progressBars.investigateTreesProgressBar);
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
