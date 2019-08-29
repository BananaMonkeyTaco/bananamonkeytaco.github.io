function buildStatBox() {
  for (let i = 0; i < character.length; i++) {
    let characterNumber = document.getElementById("character" + i);
    let x = character[i];
    while (characterNumber.hasChildNodes()) {
      characterNumber.removeChild(characterNumber.childNodes[0]);
    }
    let statBox = document.createElement("div");
    statBox.className = "statBox";
    statBox.id = x.name + "Stats";
    //Stats info
    let titleContainer = document.createElement("div");
    let title = document.createElement("div");
    title.innerHTML = "<b>Stats</b>";
    let statTooltip = document.createElement("tooltip");
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
      "<br><b>Level XP: </b>" + Math.floor(x[y].levelXP) + " / " + x[y].toNextLevel +
      "<br><b>Talent: </b>" + x[y].talent +
      "<br><b>Talent XP: </b>" + Math.floor(x[y].talentXP) + " / " + x[y].toNextTalent +
      "<br><b>Talent Multi: </b>" + (1 + Math.pow(x[y].talent, .3) / 2).toFixed(2);
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
      skillNumber.id = x.name + y;
      skillNumber.style.float = "right";
      skillNumber.innerHTML = x[y].level;
      skillListItem.appendChild(skillNumber);
      progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill"
      progressBarFill.id = x.name + y + "Progress";
      progressBarFill.style.width = (x[y].levelXP / x[y].toNextLevel) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      skillListItem.appendChild(progressBarEmpty);
      skillListItemContainer.appendChild(skillListItem);
      tooltip = document.createElement("tooltip");
      tooltip.id = x.name + y + "Tooltip";
      tooltip.innerHTML = "<b>" + z + "</b>" +
      "<br><b>Level: </b>" + x[y].level +
      "<br><b>Level XP: </b>" + x[y].levelXP + " / " + x[y].toNextLevel +
      "<br>" + window[y + "Tooltip"];
      skillListItemContainer.appendChild(tooltip);
      if (character[i][y].level == 0 && character[i][y].levelXP == 0) {
        skillListItemContainer.style.display = "none";
      }
      skillsBox.appendChild(skillListItemContainer);
    }
    characterNumber.appendChild(skillsBox);
  }
}
/*
function rebuildStatBox() {
  let box = document.getElementById("characterBox");
  for (let i = 1; i < box.childElementCount; i++) {
    while (box.children[i].firstElementChild) {
      box.childNodes[i].removeChild(box.childNodes[i].firstElementChild);
    }
  }
  buildStatBox();
}
*/
function characterSwitch(target) {
  for (let i = 0; i < character.length; i++) {
    document.getElementById("character" + i).style.display = "none";
    document.getElementById("character" + i + "ActionBox").style.display = "none";
    document.getElementById("character" + i + "Select").className = "characterSelectButton";
  }
  document.getElementById("character" + target).style.display = "block";
  document.getElementById("character" + target + "ActionBox").style.display = "grid";
  document.getElementById("character" + target + "Select").className = "characterSelectButtonSelected";
  currentCharacter = target;
  buildTownBox();
}

function increaseStats(char, action, multiplier) {
  for (x in action.stats) {
    char[x].levelXP += action.stats[x] * multiplier * (1 + Math.pow(char[x].talent, .3) / 2);
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
      "<br><b>Talent XP: </b>" + Math.floor(x[y].talentXP) + " / " + x[y].toNextTalent +
      "<br><b>Talent Multi: </b>" + (1 + Math.pow(x[y].talent, .3) / 2).toFixed(2);
    }
  }
}

function newPersonPrep(num) {
  let tempElement = document.getElementById("actionColumn");
  let tempDiv;
  let tempSubDiv;
  tempDiv = document.createElement("div");
  tempDiv.className = "characterSelectButton";
  tempDiv.id = "character" + num + "Select";
  tempDiv.innerHTML = character[num].name;
  tempDiv.onclick = function() {
    characterSwitch(num);
  }
  document.getElementById("characterSelection").appendChild(tempDiv);
  tempDiv = document.createElement("div");
  tempDiv.id = "character" + num;
  tempDiv.style.display = "none";
  document.getElementById("characterBox").appendChild(tempDiv);
  tempDiv = document.createElement("div");
  tempDiv.className = "actionBox";
  tempDiv.id = "character" + num + "ActionBox";
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
