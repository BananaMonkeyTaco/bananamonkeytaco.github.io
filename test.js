function buildTownBox() {
  let box;
  let arrow;
  let miscText;
  let barName;
  let x;
  let y;
  let progress;
  let progressEmpty;
  let progressFill;
  let resourceBox;
  let resource;
  let townProgressBars;
  let townButtons;
  let button;
  let icon;
  let line;
  for (let i = 0; i < document.getElementById("townBox").childElementCount; i++) {
    let town = document.getElementById("town" + i);
    while (town.hasChildNodes()) {
      town.removeChild(town.childNodes[0]);
    }
    townName = document.createElement("div");
    townName.className = "townName";
    for (let j = 0; j < directions.length; j++) {
      let x = directions[j];
      box = document.createElement("div");
      if (location[i][x] != undefined) {
        if (x != "name") {
          arrow = document.createElement("i");
          arrow.className = "actionButton fas fa-arrow-right";
          arrow.style.transform = "rotate(" + point[j] + "deg)";
          arrow.onclick = function() {
            document.getElementById("town" + i).style.display = "none";
            document.getElementById("town" + location[i][x]).style.display = "block";
          }
        } else if (x == "name") {
          arrow = document.createElement("div");
          arrow.innerHTML = location[i][x];
          arrow.style.fontWeight = "bold";
        }
        box.appendChild(arrow);
      }
      townName.appendChild(box);
    }
    town.appendChild(townName);
    townProgressBars = document.createElement("div");
    townProgressBars.className = "townProgressBars";
    for (let x in location[i].progressBars) {
      if (location[i].progressBars[x].visible) {
        if (location[i].progressBars[x].type == "Progress") {
          let tempTooltip;
          box = document.createElement("div");
          box.className = "townProgressBar";
          y = location[i].progressBars[x];
          barName = document.createElement("div");
          barName.style.fontWeight = "bold";
          barName.id = y.nameId;
          barName.innerHTML = y.name + y.currentLevel + "%";
          tempTooltip = document.createElement("tooltip");
          tempTooltip.innerHTML = "<b>Progress</b> ";
          barName.appendChild(tempTooltip);
          box.appendChild(barName);
          progressEmpty = document.createElement("div");
          progressEmpty.className = "progressBarEmpty";
          progressFill = document.createElement("div");
          progressFill.className = "progressBarFill";
          progressFill.id = x;
          progressFill.style.width = (y.currentXP / y.toNextLevel) * 100 + "%";
          progressEmpty.appendChild(progressFill);
          box.appendChild(progressEmpty);
          if (y.resource.name != undefined) {
            y = y.resource;
            resourceBox = document.createElement("div");
            resourceBox.className = "progressBarResource";
            let amountBar = document.createElement("span");
            amountBar.id = y.name + "Amount";
            amountBar.innerHTML = y.reliableAmountText + y.usedAmount + "/" + y.reliableAmount;
            resourceBox.appendChild(amountBar);
            line = document.createElement("span");
            line.style.display = "block";
            resource = document.createElement("input");
            resource.type = "checkbox";
            resource.id = y.name + "LootFirst";
            line.appendChild(resource);
            miscText = document.createTextNode("Reliable First");
            line.appendChild(miscText);
            resource = document.createElement("span");
            resource.style.float = "right";
            resource.style.fontWeight = "bold";
            resource.id = y.name + "uncheckedAmount";
            resource.innerHTML = y.uncheckedAmountText + y.uncheckedAmount;
            if (y.uncheckedAmount == 0) {
              resource.style.visibility = "hidden";
            }
            line.appendChild(resource);
            resourceBox.appendChild(line);
            resource = document.createElement("tooltip");
            resource.id = y.name + "unreliableAmount";
            resource.innerHTML = y.unreliableAmountText + y.unreliableAmount;
            box.appendChild(resourceBox);
            box.appendChild(resource);
          }
          townProgressBars.appendChild(box);
        } else if (location[i].progressBars[x].type == "Action") {
          x = location[i].progressBars[x];
          let bar = document.createElement("div");
          bar.className = "townProgressBar";
          bar.id = x.id + "Bar";
          let name = document.createElement("div");
          let miscText = document.createTextNode(x.name);
          name.appendChild(miscText);
          let completedText = document.createElement("span");
          completedText.style.float = "right";
          miscText = document.createTextNode(x.completedName);
          completedText.appendChild(miscText);
          let tempElement = document.createElement("span");
          tempElement.id = x.id + "Completed";
          miscText = document.createTextNode(x.completedAmount);
          tempElement.appendChild(miscText);
          completedText.appendChild(tempElement);
          name.appendChild(completedText);
          bar.appendChild(name);
          let segmentBar = document.createElement("div");
          segmentBar.className = "actionBar";
          let previousGoals = [];
          for (let i = 0; i < x.segmentStats.length; i++){
            let tempBar = document.createElement("div");
            tempBar.className = "progressBarEmpty";
            tempBar.style.display = "inline-block";
            tempBar.style.width = 'calc(' + 100 / x.segmentStats.length + '% - 6px)';
            tempBar.style.margin = "3px";
            tempBar.style.height = "8px";
            tempBar.style.backgroundColor = window[x.segmentStats[i] + "Colour"];
            let segment = document.createElement("div");
            segment.className = "progressBarFill";
            segment.style.width = "0%";
            segment.style.backgroundColor = "lightgrey";
            segment.setAttribute("data-progress", 0);
            segment.setAttribute("data-goal", x.segmentGoal(previousGoals));
            segment.setAttribute("data-stat", x.segmentStats[i]);
            previousGoals.push(segment.getAttribute("data-goal"));
            tempBar.appendChild(segment);
            let tooltip = document.createElement("tooltip");
            let tempElement = document.createElement("b");
            miscText = document.createTextNode("Stat: ");
            tempElement.appendChild(miscText);
            tooltip.appendChild(tempElement);
            miscText = document.createTextNode(capitalize(x.segmentStats[i]));
            tooltip.appendChild(miscText);
            let lineBreak = document.createElement("br");
            tooltip.appendChild(lineBreak);
            tempElement = document.createElement("b");
            miscText = document.createTextNode("Progress: ");
            tempElement.appendChild(miscText);
            tooltip.appendChild(tempElement);
            tempElement = document.createElement("span");
            tempElement.id = x.id + "Segment" + i;
            miscText = document.createTextNode(0);
            tempElement.appendChild(miscText);
            tooltip.appendChild(tempElement);
            tempElement = document.createTextNode(" / " + segment.getAttribute("data-goal"));
            tooltip.appendChild(tempElement);
            tempBar.appendChild(tooltip);
            segmentBar.appendChild(tempBar);
          }
          bar.appendChild(segmentBar);
          townProgressBars.appendChild(bar);
        }
      }
    }
    town.appendChild(townProgressBars);
    line = document.createElement("div");
    line.className = "buttonBoxTitle";
    miscText = document.createTextNode("Actions");
    line.appendChild(miscText);
    town.appendChild(line);
    townButtons = document.createElement("div");
    townButtons.className = "townButtons";
    for (let x in location[i].buttons) {
      if (location[i].buttons[x].visible == true) {
        let action = window[x];
        let tooltip;
        let check = action.tooltip;
        let y = location[i].buttons[x];
        button = document.createElement("div");
        button.className = "button";
        if (y.unlocked == true) {
          button.onclick = function() {
            addAction(action);
          };
        } else {
          button.style.backgroundColor = "lightgrey";
        }
        miscText = document.createTextNode(location[i].buttons[x].name);
        button.appendChild(miscText);
        miscText = document.createElement("div");
        icon = document.createElement("img");
        icon.src = "images/" + capitalize(x) + ".svg";
        miscText.appendChild(icon);
        button.appendChild(miscText);
        tooltip = document.createElement("tooltip");
        // potential to remove this if statement later
        if (action.tooltip.join) {
          tooltip.innerHTML = action.tooltip.join("<br>");
        } else {
          tooltip.innerHTML = action.tooltip;
        }
        for (let k = 0; k < statNames.length; k++) {
          let x = statNames[k];
          if (action.stats[x]) {
            let box = document.createElement("div");
            box.style.textAlign = "left";
            let stat = document.createElement("b");
            miscText = document.createTextNode(capitalize(x) + " ");
            stat.appendChild(miscText);
            miscText = document.createTextNode(action.stats[x] * 100 +"%");
            box.appendChild(stat);
            box.appendChild(miscText);
            tooltip.appendChild(box);
          }
        }
        tooltip.innerHTML += "<br>Mana Cost " + action.manaCost;
        if (action.goldCost) {
          tooltip.innerHTML += "<br>Gold Cost " + action.goldCost;
        }
        if (y.unlocked == false) {
          let tempElement = document.createElement("div");
          for (let j = 0; j < y.requirementAction.length; j++) {
            if (j == 0) {
              miscText = document.createTextNode("Unlocks at ");
              tempElement.appendChild(miscText);
            } else {
              miscText = document.createTextNode(" and ");
              tempElement.appendChild(miscText);
            }
            miscText = document.createTextNode(y.requirementAmount[j] + " " + y.requirementAction[j]);
            tempElement.appendChild(miscText);
            tooltip.appendChild(tempElement);
          }
        }
        button.appendChild(tooltip);
        townButtons.appendChild(button);
      }
    }
    town.appendChild(townButtons);
    let travelButtons = document.createElement("div");
    travelButtons.className = "townTravelButtons";

    for (let j = 0; j < directions.length; j++) {
      let tempButton = document.createElement("div");
      for (x in location[i].travelButtons) {
        if (location[i].travelButtons[x].direction == directions[j]) {
          if (location[i].travelButtons[x].visible) {
            let action = window[x];
            let y = location[i].travelButtons[x];
            button = document.createElement("div");
            button.className = "button";
            if (y.unlocked == true) {
              button.onclick = function() {
                addAction(action);
              };
            } else {
              button.style.backgroundColor = "lightgrey";
            }
            miscText = document.createTextNode(location[i].travelButtons[x].name);
            button.appendChild(miscText);
            miscText = document.createElement("div");
            icon = document.createElement("img");
            icon.src = "images/" + capitalize(x) + ".svg";
            miscText.appendChild(icon);
            button.appendChild(miscText);
            let tooltip = document.createElement("tooltip");
            // potential to remove this if statement later
            if (action.tooltip.join) {
              tooltip.innerHTML = action.tooltip.join("<br>");
            } else {
              tooltip.innerHTML = action.tooltip;
            }
            for (let k = 0; k < statNames.length; k++) {
              let x = statNames[k];
              if (action.stats[x]) {
                let box = document.createElement("div");
                box.style.textAlign = "left";
                let stat = document.createElement("b");
                miscText = document.createTextNode(capitalize(x) + " ");
                stat.appendChild(miscText);
                miscText = document.createTextNode(action.stats[x] * 100 +"%");
                box.appendChild(stat);
                box.appendChild(miscText);
                tooltip.appendChild(box);
              }
            }
            tooltip.innerHTML += "<br>Mana Cost " + action.manaCost;
            if (action.goldCost) {
              tooltip.innerHTML += "<br>Gold Cost " + action.goldCost;
            }
            if (y.unlocked == false) {
              let tempElement = document.createElement("div");
              for (let j = 0; j < y.requirementAction.length; j++) {
                if (j == 0) {
                  miscText = document.createTextNode("Unlocks at ");
                  tempElement.appendChild(miscText);
                } else {
                  miscText = document.createTextNode(" and ");
                  tempElement.appendChild(miscText);
                }
                miscText = document.createTextNode(y.requirementAmount[j] + " " + y.requirementAction[j]);
                tempElement.appendChild(miscText);
                tooltip.appendChild(tempElement);
              }
            }
            button.appendChild(tooltip);
            tempButton.appendChild(button);
          }
        }
      }
      travelButtons.appendChild(tempButton);
    }
    town.appendChild(travelButtons);
  }
}

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
      if (!characters[i][j].level == 0 && characters[i][j].levelXP == 0) {
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
    }
    characterPage.appendChild(skillList);
  }
  document.getElementById("statBox").appendChild(characterPage);
}

function updateStats() {
  for (let i = 0; i < character.length; i++) {
    for (let j = 0; j < statNames.length; j++) {
      let x = statNames[j];
      let y = character[i].name + x + "Level";
      document.getElementById(y).innerHTML = character[i][x].level;
      y = character[i].name + x + "Talent";
      document.getElementById(y).innerHTML = character[i][x].talent;
      y = document.getElementById(character[i].name + x + "XP");
      y.style.width = (character[i][x].levelXP / mainCharacter[x].toNextLevel) * 100 + "%";
      y = document.getElementById(character[i].name + x + "TalentXP");
      y.style.width = (character[i][x].talentXP / mainCharacter[x].toNextTalent) * 100 + "%";
      document.getElementById(character[i].name + x + "LevelTip").innerHTML = "<b>Level:</b> " + character[i][x].level;
      document.getElementById(character[i].name + x + "LevelXPTip").innerHTML = "<b>Level XP:</b> " +
      Math.floor(character[i][x].levelXP) + " / " + Math.floor(character[i][x].toNextLevel);
      document.getElementById(character[i].name + x + "TalentTip").innerHTML = "<b>Talent:</b> " + character[i][x].talent;
      document.getElementById(character[i].name + x + "TalentXPTip").innerHTML = "<b>Talent XP:</b> " +
      Math.floor(character[i][x].talentXP) + " / " + Math.floor(character[i][x].toNextTalent);
    }
  }
}

function Person (name) {
  this.name = name,
  for (let i = 0; i < statNames.length; i++) {
    let x = statNames[i];
    this[x].level: 0,
    this[x].levelXP: 0,
    this[x].toNextLevel: 100,
    this[x].talent: 0,
    this[x].talentXP: 0,
    this[x].toNextTalent: 100,
  }
};
