function buildStatBox() {
  for (let i = 0; i < character.length; i++) {
    let characterNumber = document.getElementById("character" + i);
    let x = character[i];
    let statBox = document.createElement("div");
    statBox.className = "statBox";
    statBox.id = x.name + "Stats";
    statBox.innerHTML = "<b>Stats</b>";
    for (let j = 0; j < statNames.length; j++) {
      let y;
      let statListItem;
      let tempNumber;
      let progressBarEmpty;
      let progressBarFill;
      let tooltip;
      let statListItemContainer = document.createElement("div");
      y = statNames[j];
      //Name of stat
      statListItem = document.createElement("div");
      statListItem.className = "statListItem " + y;
      statListItem.innerHTML = capitalize(y);
      //Stat's level
      tempNumber = document.createElement("div");
      tempNumber.id = x.name + y + "Level";
      tempNumber.innerHTML = x[y].level;
      statListItem.appendChild(tempNumber);
      //Stat's talent
      tempNumber = document.createElement("div");
      tempNumber.id = x.name + y + "Talent";
      tempNumber.innerHTML = x[y].talent;
      statListItem.appendChild(tempNumber);
      //Stat's level progress bar
      progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill";
      progressBarFill.id = x.name + y + "XP";
      progressBarFill.style.width = (x[y].levelXP / x[y].toNextLevel) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      statListItem.appendChild(progressBarEmpty);
      //Stat's talent progress bar
      progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill";
      progressBarFill.id = x.name + y + "TalentXP";
      progressBarFill.style.width = (x[y].talentXP / x[y].toNextTalent) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      statListItem.appendChild(progressBarEmpty);
      statListItemContainer.appendChild(statListItem);
      //Tooltip for the specifics
      tooltip = document.createElement("tooltip");
      tooltip.id = x.name + y + "Tooltip";
      tooltip.innerHTML = "<b>" + capitalize(y) + "</b>" +
      "<br><b>Level: </b>" + x[y].level +
      "<br><b>Level XP: </b>" + x[y].levelXP + " / " + x[y].toNextLevel +
      "<br><b>Talent: </b>" + x[y].talent +
      "<br><b>Talent XP: </b>" + x[y].talentXP + " / " + x[y].toNextTalent;
      statListItemContainer.appendChild(tooltip);
      statBox.appendChild(statListItemContainer);
    }
    characterNumber.appendChild(statBox);
    //Now for skills
    let skillsBox = document.createElement("div");
    skillsBox.innerHTML = "<b>Skills</b>";
    for (let j = 0; j < skills.length; j++) {
      j = skills[j];
      if (character[i][j].level > 0 || character[i][j].levelXP > 0) {
        let skillListItem;
        let skillNumber;
        let progressBarEmpty;
        let progressBarFill;
        let tooltip;
        let skillListItemContainer = document.createElement("div");
        skillListItem = document.createElement("div");
        skillListItem.innerHTML = "<b>" + capitalize(j) + "</b>";
        skillNumber = document.createElement("span");
        skillNumber.id = x.name + j;
        skillNumber.style.textAlign = "right";
        skillListItem.appendChild(skillNumber);
        progressBarEmpty = document.createElement("div");
        progressBarEmpty.className = "progressBarEmpty";
        progressBarFill = document.createElement("div");
        progressBarFill.className = "progressBarFill"
        progressBarFill.id = x.name + j + "Progress";
        progressBarFill.style.width = (x[j].levelXP / x[j].toNextLevel) * 100 + "%";
        progressBarEmpty.appendChild(progressBarFill);
        skillListItem.appendChild(progressBarEmpty);
        skillListItemContainer.appendChild(skillListItem);
        tooltip = document.createElement("tooltip");
        tooltip.id = x.name + j + "Tooltip";
        tooltip.innerHTML = "<b>" + capitalize(j) + "</b>" +
        "<br><b>Level: </b>" + x[j].level +
        "<br><b>Level XP: </b>" + x[j].levelXP + " / " + x[j].toNextLevel;
        skillListItemContainer.appendChild(tooltip);
        skillsBox.appendChild(skillListItemContainer);
      }
    }
    characterNumber.appendChild(skillsBox);
  }
}

function characterSwitch(target) {
  for (let i = 0; i < character.length; i++) {
    document.getElementById("character" + i).style.display = "none";
    document.getElementById("character" + i + "ActionBox").style.display = "none";
  }
  document.getElementById("character" + target).style.display = "block";
  document.getElementById("character" + target + "ActionBox").style.display = "grid";
  currentCharacter = target;
}

function increaseStats(char, action, multiplier) {
  for (x in action.stats) {
    char[x].levelXP += action.stats[x] * multiplier;
    if (char[x].levelXP >= char[x].toNextLevel) {
      levelUp(char, x, "level");
    }
    char[x].talentXP += (action.stats[x] * multiplier) / 100;
    if (char[x].talentXP >= char[x].toNextTalent) {
      levelUp(char, x, "talent");
    }
  }
}

function increaseSkills(char, skill, amount) {
  char[skill].levelXP += amount;
  if (char[skill].levelXP >= char[skill].toNextLevel) {
    levelUp(char, skill, "level");
  }
  document.getElementById(char.name + skill).innerHTML = char[skill].level;
  document.getElementById(char.name + skill + "Progress").style.width = char[skill].levelXP /
  char[skill].toNextLevel * 100 + "%";
}

function updateStats() {
  for (let i = 0; i < character.length; i++) {
    for (let j = 0; j < statNames.length; j++) {
      let x = character[i];
      let y = statNames[j];
      let z = x.name + y;
      document.getElementById(z + "Level").innerHTML = x[y].level;
      document.getElementById(z + "Talent").innerHTML = x[y].talent;
      document.getElementById(z + "XP").style.width =
      (x[y].levelXP / x[y].toNextLevel) * 100 + "%";
      document.getElementById(z + "TalentXP").style.width =
      (x[y].talentXP / x[y].toNextTalent) * 100 + "%";
      document.getElementById(z + "Tooltip").innerHTML = "<b>" + capitalize(y) + "</b>" +
      "<br><b>Level: </b>" + x[y].level +
      "<br><b>Level XP: </b>" + Math.floor(x[y].levelXP) + " / " + x[y].toNextLevel +
      "<br><b>Talent: </b>" + x[y].talent +
      "<br><b>Talent XP: </b>" + Math.floor(x[y].talentXP) + " / " + x[y].toNextTalent;
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
  this.visible = false,
  this.active = false,
  this.startingMana = 100;
  this.nextCycleActionList = [];
  this.nextCycleActionAmount = [];
  this.currentCycleActionList = [];
  this.currentCycleActionAmount = [];
  this.currentCycleActionCompleted = [];
  this.currentAction = null;
  this.originalCost = null;
  this.currentCostLeft = null;
  this.multiplier = null;
  this.currentLocation = 0;
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
