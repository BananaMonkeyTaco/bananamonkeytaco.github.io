function buildStatBox() {
  for (let i = 0; i < character.length; i++) {
    let char = character[i];
    let characterNumber = document.getElementById(lowerize(char.name));
    while (characterNumber.hasChildNodes()) {
      characterNumber.removeChild(characterNumber.childNodes[0]);
    }
    let statBox = document.createElement("div");
    statBox.className = "statBox";
    statBox.id = char.name + "Stats";
    //Stats info
    let titleContainer = document.createElement("div");
    let title = document.createElement("div");
    title.innerHTML = "<b>Stats</b>";
    let statTooltip = document.createElement("tooltip");
    statTooltip.style.zIndex = 1;
    statTooltip.innerHTML = "Stats lower the amount of mana you use on each action" +
    "<br>The mana is reduced according to this formula:" +
    "<br><b>Cost / ( 1 + (stat / 100))</b>" +
    "<br>This forumla is applied to each stat an action has according to its share" +
    "<br>For example Wander costs 100 mana and 50% of that is based on Perception" +
    "<br>50 mana would go through the formula. If you had 100 levels in Perception it would go like this:" +
    "<br>50 / ( 1 + (100 / 100)) = 50 / (1 + 1) = 50 / 2 = 25" +
    "<br>So because what should have been 50 mana is now 25, the cost of Wander would then be 75" +
    "<br>Now remember the only stats that matter for an action is what is listed" +
    "<br>So if you had a bajillionity and 7 levels in Spirit, that's not really going to help you with Wander, maybe something else though :)";
    titleContainer.appendChild(title);
    titleContainer.appendChild(statTooltip);
    statBox.appendChild(titleContainer);
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
      tempNumber.id = char.name + y + "Level";
      tempNumber.innerHTML = char[y].level;
      statListItem.appendChild(tempNumber);
      //Stat's talent
      tempNumber = document.createElement("div");
      tempNumber.id = char.name + y + "Talent";
      tempNumber.innerHTML = char[y].talent;
      statListItem.appendChild(tempNumber);
      //Stat's level progress bar
      progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill";
      progressBarFill.id = char.name + y + "XP";
      progressBarFill.style.width = (char[y].levelXP / char[y].toNextLevel) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      statListItem.appendChild(progressBarEmpty);
      //Stat's talent progress bar
      progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill";
      progressBarFill.id = char.name + y + "TalentXP";
      progressBarFill.style.width = (char[y].talentXP / char[y].toNextTalent) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      statListItem.appendChild(progressBarEmpty);
      statListItemContainer.appendChild(statListItem);
      //Tooltip for the specifics
      tooltip = document.createElement("tooltip");
      tooltip.id = char.name + y + "Tooltip";
      tooltip.innerHTML = "<b>" + capitalize(y) + "</b>" +
      "<br><b>Level: </b>" + char[y].level +
      "<br><b>Level XP: </b>" + Math.floor(char[y].levelXP) + " / " + char[y].toNextLevel +
      "<br><b>Talent: </b>" + char[y].talent +
      "<br><b>Talent XP: </b>" + Math.floor(char[y].talentXP) + " / " + char[y].toNextTalent +
      "<br><b>Talent Multi: </b>" + (1 + Math.pow(char[y].talent, .3) / 2).toFixed(2);
      statListItemContainer.appendChild(tooltip);
      statBox.appendChild(statListItemContainer);
    }
    characterNumber.appendChild(statBox);
    //Now for skills
    if (character[0].combat.level == 0 && character[0].combat.levelXP == 0) {
      continue;
    }
    let skillsBox = document.createElement("div");
    skillsBox.innerHTML = "<b>Skills</b>";
    for (let j = 0; j < skills.length; j++) {
      let y = skills[j];
      let z = skillsNames[j];
      let skillListItem;
      let skillNumber;
      let progressBarEmpty;
      let progressBarFill;
      let tooltip;
      let skillListItemContainer = document.createElement("div");
      skillListItem = document.createElement("div");
      skillListItem.innerHTML = "<b>" + z + "</b>";
      skillNumber = document.createElement("span");
      skillNumber.id = char.name + y;
      skillNumber.style.float = "right";
      skillNumber.innerHTML = char[y].level;
      skillListItem.appendChild(skillNumber);
      progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill"
      progressBarFill.id = char.name + y + "Progress";
      progressBarFill.style.width = (char[y].levelXP / char[y].toNextLevel) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      skillListItem.appendChild(progressBarEmpty);
      skillListItemContainer.appendChild(skillListItem);
      tooltip = document.createElement("tooltip");
      tooltip.id = char.name + y + "Tooltip";
      tooltip.innerHTML = "<b>" + z + "</b>" +
      "<br><b>Level: </b>" + char[y].level +
      "<br><b>Level XP: </b>" + char[y].levelXP + " / " + char[y].toNextLevel +
      "<br>" + window[y + "Tooltip"];
      skillListItemContainer.appendChild(tooltip);
      if (char[y].level == 0 && char[y].levelXP == 0) {
        skillListItemContainer.style.display = "none";
      }
      skillsBox.appendChild(skillListItemContainer);
    }
    characterNumber.appendChild(skillsBox);
  }
}

function characterSwitch(target) {
  for (let i = 0; i < character.length; i++) {
    let char = character[i];
    document.getElementById(lowerize(char.name)).style.display = "none";
    document.getElementById(lowerize(char.name) + "ActionBox").style.display = "none";
    document.getElementById(lowerize(char.name) + "Select").className = "characterSelectButton";
  }
  let char = character[target]
  document.getElementById(lowerize(char.name)).style.display = "block";
  document.getElementById(lowerize(char.name) + "ActionBox").style.display = "grid";
  document.getElementById(lowerize(char.name) + "Select").className = "characterSelectButtonSelected";
  currentCharacter = target;
  buildTownBox();
}

function increaseStats(char, action, multiplier) {
  let i = 6;
  for (x in action.stats) {
    char[x].levelXP += action.stats[x] * multiplier * (1 + Math.pow(char[x].talent, .3) / 2);
    document.getElementById(lowerize(char.name + "ProgressList")).childNodes[char.currentAction].childNodes[1].childNodes[i].innerHTML =
    "<br><b>" + capitalize(x) + ": </b>" +
    (Number(document.getElementById(lowerize(char.name + "ProgressList")).childNodes[char.currentAction].childNodes[1].childNodes[i].innerHTML.split("</b>")[1]) +
    (action.stats[x] * multiplier * (1 + Math.pow(char[x].talent, .3) / 2))).toFixed(1);
    i++;
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
  let rebuild = false;
  if (char[skill].level == 0 && char[skill].levelXP == 0) {
    rebuild = true;
  }
  char[skill].levelXP += amount;
  if (char[skill].levelXP >= char[skill].toNextLevel) {
    levelUp(char, skill, "level");
    if (skill == "combat" && char[skill].level == 5) {
      buildTownBox();
    }
  }
  if (rebuild == true) {
    buildStatBox();
  }
  document.getElementById(char.name + skill).innerHTML = char[skill].level;
  document.getElementById(char.name + skill + "Progress").style.width = char[skill].levelXP /
  char[skill].toNextLevel * 100 + "%";
  document.getElementById(char.name + skill + "Tooltip").innerHTML =
  "<b>" + capitalize(skill) + "</b>" +
  "<br><b>Level: </b>" + char[skill].level +
  "<br><b>Level XP: </b>" + char[skill].levelXP + " / " + char[skill].toNextLevel;
}

function updateStats() {
  for (let i = 0; i < character.length; i++) {
    for (let j = 0; j < statNames.length; j++) {
      let char = character[i];
      let y = statNames[j];
      let z = char.name + y;
      document.getElementById(z + "Level").innerHTML = char[y].level;
      document.getElementById(z + "Talent").innerHTML = char[y].talent;
      document.getElementById(z + "XP").style.width =
      (char[y].levelXP / char[y].toNextLevel) * 100 + "%";
      document.getElementById(z + "TalentXP").style.width =
      (char[y].talentXP / char[y].toNextTalent) * 100 + "%";
      document.getElementById(z + "Tooltip").innerHTML = "<b>" + capitalize(y) + "</b>" +
      "<br><b>Level: </b>" + char[y].level +
      "<br><b>Level XP: </b>" + Math.floor(char[y].levelXP) + " / " + char[y].toNextLevel +
      "<br><b>Talent: </b>" + char[y].talent +
      "<br><b>Talent XP: </b>" + Math.floor(char[y].talentXP) + " / " + char[y].toNextTalent +
      "<br><b>Talent Multi: </b>" + (1 + Math.pow(char[y].talent, .3) / 2).toFixed(2);
    }
  }
}

function levelUp(object, stat, select) {
  if (select == "level") {
    object[stat].level++;
    object[stat].levelXP -= object[stat].toNextLevel;
    object[stat].toNextLevel = (object[stat].level + 1) * 100;
    if (object[stat].levelXP >= object[stat].toNextLevel) {
      levelUp(object, stat, "level");
    }
  } else if (select == "talent") {
    object[stat].talent++;
    object[stat].talentXP -= object[stat].toNextTalent;
    object[stat].toNextTalent = (object[stat].talent + 1) * 100;
    if (object[stat].talentXP >= object[stat].toNextTalent) {
      levelUp(object, stat, "talent");
    }
  }
}

function newPersonPrep(num) {
  let char = character[num];
  let tempElement = document.getElementById("actionColumn");
  let tempDiv;
  let tempSubDiv;
  tempDiv = document.createElement("div");
  tempDiv.className = "characterSelectButton";
  tempDiv.id = lowerize(char.name) + "Select";
  tempDiv.innerHTML = character[num].name;
  tempDiv.onclick = function() {
    characterSwitch(num);
  }
  document.getElementById("characterSelection").appendChild(tempDiv);
  tempDiv = document.createElement("div");
  tempDiv.id = lowerize(char.name);
  tempDiv.style.display = "none";
  document.getElementById("characterBox").appendChild(tempDiv);
  tempDiv = document.createElement("div");
  tempDiv.className = "actionBox";
  tempDiv.id = lowerize(char.name) + "ActionBox";
  tempDiv.style.display = "none";
  tempSubDiv = document.createElement("div");
  tempSubDiv.className = "actionBoxProgressList";
  tempSubDiv.id = lowerize(character[num].name) + "ProgressList";
  tempDiv.appendChild(tempSubDiv);
  tempSubDiv = document.createElement("div");
  tempSubDiv.className = "actionBoxActionList";
  tempSubDiv.id = lowerize(character[num].name) + "ActionList";
  tempDiv.appendChild(tempSubDiv);
  tempElement.insertBefore(tempDiv, document.getElementById("actionBoxButtons"));
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
  this.alchemy = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
  }
  this.manaFlow = {
    level: 0,
    levelXP: 0,
    toNextLevel: 100,
  }
};
