var characters = [];
var statNames = ["dexterity", "strength", "constitution", "speed", "perception",
"charisma", "intelligence", "wisdom", "luck", "spirit"];
var statNamesUpperCase = ["Dexterity", "Strength", "Constitution", "Speed", "Perception",
"Charisma", "Intelligence", "Wisdom", "Luck", "Spirit"];

function buildStatBox() {
  let characterPage = document.createElement("div");
  characterPage.className = "characterPage";
  let characterPageTitle = document.createElement("div");
  characterPageTitle.className = "characterPageTitle";
  let characterPageText = document.createTextNode("Characters");
  characterPageTitle.appendChild(characterPageText);
  characterPage.appendChild(characterPageTitle);
  /*
  code here for character selection
  */
  for (let i = 0; i < characters.length; i++) {
    let x = characters[i];
    let statList = document.createElement("div");
    statList.className = "statList";
    statList.id = x.name;
    for (let j = 0; j < statNames.length; j++) {
      let y = statNames[j];
      let box = document.createElement("div");
      let miscText = document.createTextNode(capitalize(y));
      box.appendChild(miscText);
      statList.appendChild(box);
      box = document.createElement("div");
      box.id = x.name + y + "Level";
      miscText = document.createTextNode(x[y].level);
      box.appendChild(miscText);
      statList.appendChild(box);
      box = document.createElement("div");
      box.id = x.name + y + "Talent";
      miscText = document.createTextNode(x[y].talent);
      box.appendChild(miscText);
      statList.appendChild(box);
      box = document.createElement("div");
      box.id = x.name + y + "Bonus";
      statList.appendChild(box);
      let progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      let progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill";
      progressBarFill.id = x.name + y + "XP";
      progressBarFill.style.width = (x[y].levelXP / x[y].toNextLevel) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      statList.appendChild(progressBarEmpty);
      progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill";
      progressBarFill.id = x.name + y + "TalentXP";
      progressBarFill.style.width = (x[y].talentXP / x[y].toNextTalent) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      statList.appendChild(progressBarEmpty);
    }
    characterPage.appendChild(statList);
  }
  document.getElementById("statBox").appendChild(characterPage);
}

function increaseStats(action) {
  for (x in action.stats) {
    mainCharacter[x].levelXP += action.stats[x] * multiplier;
    if (mainCharacter[x].levelXP >= mainCharacter[x].toNextLevel) {
      levelUp(mainCharacter, x, "level");
    }
    mainCharacter[x].talentXP += (action.stats[x] * multiplier) / 100;
    if (mainCharacter[x].talentXP >= mainCharacter[x].toNextTalent) {
      levelUp(mainCharacter, x, "talent");
    }
  }
}

function updateStats() {
  for (let i = 0; i < characters.length; i++) {
    for (let j = 0; j < statNames.length; j++) {
      let x = statNames[j];
      let y = characters[i].name + x + "Level";
      document.getElementById(y).innerHTML = characters[i][x].level;
      y = characters[i].name + x + "Talent";
      document.getElementById(y).innerHTML = characters[i][x].talent;
      y = document.getElementById(mainCharacter.name + x + "XP");
      y.style.width = (mainCharacter[x].levelXP / mainCharacter[x].toNextLevel) * 100 + "%";
      y = document.getElementById(mainCharacter.name + x + "TalentXP");
      y.style.width = (mainCharacter[x].talentXP / mainCharacter[x].toNextTalent) * 100 + "%";
    }
  }
}

function levelUp(object, stat, select) {
  if (select == "level") {
    object[stat].level++;
    object[stat].levelXP = 0;
    object[stat].toNextLevel = (object[stat].level + 1) * 100;
  } else if (select == "talent") {
    object[stat].talent++;
    object[stat].talentXP = 0;
    object[stat].toNextTalent = (object[stat].talent + 1) * 100;
  }
}

function Person (name) {
  this.name = name,
  this.dexterity = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
    talent: 0,
    talentXP: 0,
    toNextTalent: 100,
  }
  this.strength = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
    talent: 0,
    talentXP: 0,
    toNextTalent: 100,
  }
  this.constitution = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
    talent: 0,
    talentXP: 0,
    toNextTalent: 100,
  }
  this.speed = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
    talent: 0,
    talentXP: 0,
    toNextTalent: 100,
  }
  this.perception = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
    talent: 0,
    talentXP: 0,
    toNextTalent: 100,
  }
  this.charisma = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
    talent: 0,
    talentXP: 0,
    toNextTalent: 100,
  }
  this.intelligence = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
    talent: 0,
    talentXP: 0,
    toNextTalent: 100,
  }
  this.wisdom = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
    talent: 0,
    talentXP: 0,
    toNextTalent: 100,
  }
  this.luck = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
    talent: 0,
    talentXP: 0,
    toNextTalent: 100,  }
  this.spirit = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
    talent: 0,
    talentXP: 0,
    toNextTalent: 100,
  }
};
