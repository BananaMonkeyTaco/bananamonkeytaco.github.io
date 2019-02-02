var characters = [];
var statNames = ["Dexterity", "Strength", "Constitution", "Speed", "Perception",
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
      newStatBox += "<div>" + statNames[i] + "</div>";
      newStatBox += "<div id=" + x.name + statNames[i] + "Level></div>";
      newStatBox += "<div id=" + x.name + statNames[i] + "Talent></div>";
      newStatBox += "<div id=" + x.name + statNames[i] + "Bonus></div>";
      newStatBox += "<div class=progressBarEmpty>";
      newStatBox += "<div class=progressBarFill id =" + x.name + statNames[i] + "XP></div></div>";
      newStatBox += "<div class=progressBarEmpty>";
      newStatBox += "<div class=progressBarFill id =" + x.name + statNames[i] + "TalentXP></div></div>";
    }
    newStatBox += "</div>";
    newStatBox += "</div>";
    newStatBox += "</div>";
    document.getElementById("statBox").innerHTML = newStatBox;
  }
}

function increaseStats() {

}

function updateStats() {
  for (let i = 0; i < characters.length; i++) {
    for (let j = 0; j < statNames.length; j++) {
      let x = statNames[j];
      let y = characters[i].name + x + "Level";
      let z = statNames[j].toLowerCase();
      document.getElementById(y).innerHTML = characters[i][z].level;
      y = characters[i].name + x + "Talent";
      document.getElementById(y).innerHTML = characters[i][z].talent;
    }
  }
}


/*document.getElementById("dexterity").innerHTML = mainCharacter.dexterity.level;
document.getElementById("strength").innerHTML = mainCharacter.strength.level;
document.getElementById("constitution").innerHTML = mainCharacter.constitution.level;
document.getElementById("speed").innerHTML = mainCharacter.speed.level;
document.getElementById("perception").innerHTML = mainCharacter.perception.level;
document.getElementById("charisma").innerHTML = mainCharacter.charisma.level;
document.getElementById("intelligence").innerHTML = mainCharacter.intelligence.level;
document.getElementById("wisdom").innerHTML = mainCharacter.wisdom.level;
document.getElementById("luck").innerHTML = mainCharacter.luck.level;
document.getElementById("spirit").innerHTML = mainCharacter.spirit.level;*/



function Person (name) {
  this.name = name;
  this.dexterity = {
    level: 0,
    levelXP: 0,
    talent: 0,
    talentXP: 0,
  }
  this.strength = {
    level: 0,
    levelXP: 0,
    talent: 0,
    talentXP: 0,
  }
  this.constitution = {
    level: 0,
    levelXP: 0,
    talent: 0,
    talentXP: 0,
  }
  this.speed = {
    level: 0,
    levelXP: 0,
    talent: 0,
    talentXP: 0,
  }
  this.perception = {
    level: 0,
    levelXP: 0,
    talent: 0,
    talentXP: 0,
  }
  this.charisma = {
    level: 0,
    levelXP: 0,
    talent: 0,
    talentXP: 0,
  }
  this.intelligence = {
    level: 0,
    levelXP: 0,
    talent: 0,
    talentXP: 0,
  }
  this.wisdom = {
    level: 0,
    levelXP: 0,
    talent: 0,
    talentXP: 0,
  }
  this.luck = {
    level: 0,
    levelXP: 0,
    talent: 0,
    talentXP: 0,
  }
  this.spirit = {
    level: 0,
    levelXP: 0,
    talent: 0,
    talentXP: 0,
  }
};
