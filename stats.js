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
      tempElement.className = "statListItem " + y;
      let tempBox = document.createElement("div");
      tempBox.innerHTML = capitalize(y);
      tempElement.appendChild(tempBox);
      tempBox = document.createElement("div");
      tempBox.id = x.name + y + "Level";
      tempBox.innerHTML = x[y].level;
      tempElement.appendChild(tempBox);
      tempBox = document.createElement("div");
      tempBox.id = x.name + y + "Talent";
      tempBox.innerHTML = x[y].talent;
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
      tempBox.style.transform = "translate(0px, 30px)";
      let tempText = document.createElement("div");
      tempText.style.fontWeight = "bold";
      tempText.innerHTML = capitalize(y);
      tempBox.appendChild(tempText);
      let tempLine = document.createElement("div");
      tempLine.id = x.name + y + "LevelTip";
      tempLine.innerHTML = "<b>Level:</b> " + x[y].level;
      tempBox.appendChild(tempLine);
      tempLine = document.createElement("div");
      tempLine.id = x.name + y + "LevelXPTip";
      tempLine.innerHTML = "<b>Level XP:</b> " + x[y].levelXP + " / " + x[y].toNextLevel;
      tempBox.appendChild(tempLine);
      tempLine = document.createElement("div");
      tempLine.id = x.name + y + "TalentTip";
      tempLine.innerHTML = "<b>Talent:</b> " + x[y].talent;
      tempBox.appendChild(tempLine);
      tempLine = document.createElement("div");
      tempLine.id = x.name + y + "TalentXPTip";
      tempLine.innerHTML = "<b>Talent XP:</b> " + x[y].talentXP + " / " + x[y].toNextTalent;
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
      y = document.getElementById(characters[i].name + x + "XP");
      y.style.width = (characters[i][x].levelXP / mainCharacter[x].toNextLevel) * 100 + "%";
      y = document.getElementById(characters[i].name + x + "TalentXP");
      y.style.width = (characters[i][x].talentXP / mainCharacter[x].toNextTalent) * 100 + "%";
      document.getElementById(characters[i].name + x + "LevelTip").innerHTML = "<b>Level:</b> " + characters[i][x].level;
      document.getElementById(characters[i].name + x + "LevelXPTip").innerHTML = "<b>Level XP:</b> " +
      Math.floor(characters[i][x].levelXP) + " / " + Math.floor(characters[i][x].toNextLevel);
      document.getElementById(characters[i].name + x + "TalentTip").innerHTML = "<b>Talent:</b> " + characters[i][x].talent;
      document.getElementById(characters[i].name + x + "TalentXPTip").innerHTML = "<b>Talent XP:</b> " +
      Math.floor(characters[i][x].talentXP) + " / " + Math.floor(characters[i][x].toNextTalent);
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
