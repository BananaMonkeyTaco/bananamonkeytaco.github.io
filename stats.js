var characters = [];
var statNames = ["dexterity", "strength", "constitution", "speed", "perception",
"charisma", "intelligence", "wisdom", "luck", "spirit"];
var statNamesUpperCase = ["Dexterity", "Strength", "Constitution", "Speed", "Perception",
"Charisma", "Intelligence", "Wisdom", "Luck", "Spirit"];

function buildStatBox() {
  let newStatBox = "";
  for (let i = 0; i < characters.length; i++) {
    let x = characters[i];
    newStatBox += "<div class=characterPage id=" + x.name + ">";

    newStatBox += "<div class=characterPageTitle id=characterPageTitle></div>";
    newStatBox += "<div class=characterChoice></div>";
    newStatBox += "<div class=statList>";

    for (let i = 0; i < statNames.length; i++) {
      newStatBox += "<div>" + statNamesUpperCase[i] + "</div>";
      newStatBox += "<div id=" + x.name + statNames[i] + "Level></div>";
      newStatBox += "<div id=" + x.name + statNames[i] + "Talent></div>";
      newStatBox += "<div id=" + x.name + statNames[i] + "Bonus></div>";
      newStatBox += "<div class=progressBarEmpty>";
      newStatBox += "<div class=progressBarFill id=" + x.name + statNames[i] + "XP></div></div>";
      newStatBox += "<div class=progressBarEmpty>";
      newStatBox += "<div class=progressBarFill id=" + x.name + statNames[i] + "TalentXP></div></div>";
    }
    newStatBox += "</div>";
    newStatBox += "</div>";
    newStatBox += "</div>";
    document.getElementById("statBox").innerHTML = newStatBox;
  }
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
  this.name = name;
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
