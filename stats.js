function buildStatBox() {
  let characterPage = document.createElement("div");
  characterPage.className = "characterPage";
  let characterPageTitle = document.createElement("div");
  characterPageTitle.className = "characterPageTitle";
  let characterPageText = document.createTextNode("Characters");
  characterPageTitle.appendChild(characterPageText);
  characterPage.appendChild(characterPageTitle);
  /*
  code here for characters selection
  */
  for (let i = 0; i < characters.length; i++) {
    let x = characters[i];
    let statList = document.createElement("div");
    statList.className = "statList";
    statList.id = x.name + "Stats";
    for (let j = 0; j < statNames.length; j++) {
      let y = statNames[j];
      let tempElement = document.createElement("div");
      tempElement.className = "statListItem";
      let tempBox = document.createElement("div");
      let miscText = document.createTextNode(capitalize(y));
      tempBox.appendChild(miscText);
      tempElement.appendChild(tempBox);
      tempBox = document.createElement("div");
      tempBox.id = x.name + y + "Level";
      miscText = document.createTextNode(x[y].level);
      tempBox.appendChild(miscText);
      tempElement.appendChild(tempBox);
      tempBox = document.createElement("div");
      tempBox.id = x.name + y + "Talent";
      miscText = document.createTextNode(x[y].talent);
      tempBox.appendChild(miscText);
      tempElement.appendChild(tempBox);
      tempBox = document.createElement("div");
      tempBox.id = x.name + y + "Bonus";
      tempElement.appendChild(tempBox);
      let progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      let progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill";
      progressBarFill.id = x.name + y + "XP";
      progressBarFill.style.width = (x[y].levelXP / x[y].toNextLevel) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      tempElement.appendChild(progressBarEmpty);
      progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill";
      progressBarFill.id = x.name + y + "TalentXP";
      progressBarFill.style.width = (x[y].talentXP / x[y].toNextTalent) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      tempElement.appendChild(progressBarEmpty);
      tempBox = document.createElement("tooltip");
      let tempText = document.createElement("div");
      tempText.style.fontWeight = "bold";
      miscText = document.createTextNode(capitalize(y));
      tempText.appendChild(miscText);
      tempBox.appendChild(tempText);
      let tempLine = document.createElement("div");
      tempText = document.createElement("span");
      tempText.id = x.name + y + "Level";
      tempText.style.fontWeight = "bold";
      miscText = document.createTextNode("Level: ");
      tempText.appendChild(miscText);
      tempLine.appendChild(tempText);
      miscText = document.createTextNode(x[y].level);
      tempLine.appendChild(miscText);
      tempBox.appendChild(tempLine);
      tempLine = document.createElement("div");
      tempText = document.createElement("span");
      tempText.id = x.name + y + "LevelXP";
      tempText.style.fontWeight = "bold";
      miscText = document.createTextNode("Level XP: ");
      tempText.appendChild(miscText);
      tempLine.appendChild(tempText);
      miscText = document.createTextNode(x[y].levelXP);
      tempLine.appendChild(miscText);
      miscText = document.createTextNode(" / ");
      tempLine.appendChild(miscText);
      tempText = document.createElement("span");
      tempText.id = x.name + y + "NextLevel";
      miscText = document.createTextNode(x[y].toNextLevel);
      tempText.appendChild(miscText);
      tempLine.appendChild(tempText);
      tempBox.appendChild(tempLine);
      tempLine = document.createElement("div");
      tempText = document.createElement("span");
      tempText.id = x.name + y + "Talent";
      tempText.style.fontWeight = "bold";
      miscText = document.createTextNode("Talent: ");
      tempText.appendChild(miscText);
      tempLine.appendChild(tempText);
      miscText = document.createTextNode(x[y].talent);
      tempLine.appendChild(miscText);
      tempBox.appendChild(tempLine);
      tempLine = document.createElement("div");
      tempText = document.createElement("span");
      tempText.id = x.name + y + "TalentXP";
      tempText.style.fontWeight = "bold";
      miscText = document.createTextNode("Talent XP: ");
      tempText.appendChild(miscText);
      tempLine.appendChild(tempText);
      miscText = document.createTextNode(x[y].talentXP);
      tempLine.appendChild(miscText);
      miscText = document.createTextNode(" / ");
      tempLine.appendChild(miscText);
      tempText = document.createElement("span");
      tempText.id = x.name + y + "NextTalent";
      miscText = document.createTextNode(x[y].toNextTalent);
      tempText.appendChild(miscText);
      tempLine.appendChild(tempText);
      tempBox.appendChild(tempLine);
      tempElement.appendChild(tempBox);
      statList.appendChild(tempElement);
    }
    characterPage.appendChild(statList);
    let skillsTitle = document.createElement("div");
    skillsTitle.className = "text";
    skillsTitle.style.marginTop = "10px";
    skillsTitle.style.marginBottom = "10px";
    let skillsTitleText = document.createTextNode("Skills");
    skillsTitle.appendChild(skillsTitleText);
    characterPage.appendChild(skillsTitle);
    let skillList = document.createElement("div");
    skillList.className = "skillList";
    for (let j = 0; j < skills.length; j++) {
      j = skills[j];
      let name = document.createElement("div");
      let miscText = document.createTextNode(capitalize(j));
      name.appendChild(miscText);
      let number = document.createElement("span");
      miscText = document.createTextNode(characters[i][j].level);
      number.id = characters[i].name + j;
      number.style.float = "right";
      number.appendChild(miscText);
      name.appendChild(number);
      skillList.appendChild(name);
      let progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      let progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill";
      progressBarFill.id = characters[i].name + j + "Progress";
      progressBarFill.style.width = (characters[i][j].levelXP / characters[i][j].toNextLevel) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      skillList.appendChild(progressBarEmpty);
    }
    characterPage.appendChild(skillList);
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

function increaseSkills(skill, amount) {
  characters[0][skill].levelXP += amount;
  if (characters[0][skill].levelXP >= characters[0][skill].toNextLevel) {
    levelUp(characters[0], skill, "level");
  }
  document.getElementById(characters[0].name + skill).innerHTML = characters[0][skill].level;
  document.getElementById(characters[0].name + skill + "Progress").style.width = characters[0][skill].levelXP /
  characters[0][skill].toNextLevel * 100 + "%";
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
  this.spirit = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
    talent: 0,
    talentXP: 0,
    toNextTalent: 100,
  }
  this.combat = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
  }
};
