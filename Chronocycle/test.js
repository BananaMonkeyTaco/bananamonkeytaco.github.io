function buildTownBox() {
  for (let i = 0; i < document.getElementById("townBox").childElementCount; i++) {
    let town;
    let townName;
    town = document.getElementById("town" + i);
    //clear previous box
    while (town.hasChildNodes()) {
      town.removeChild(town.childNodes[0]);
    }
    //top bar with arrows and town's name
    townName = document.createElement("div");
    townName.className = "townName";
    for (let j = 0; j < directions.length; j++) {
      let x = directions[j];
      let box = document.createElement("div");
      if (location[i][x] != undefined) {
        if (x != "name") {
          //check if next town is unlocked
          let nextTown = location[i][x];
          if (location[nextTown].visible == false) {
            townName.appendChild(box);
            continue;
          }
          //make arrow to next town
          let arrow = document.createElement("i");
          arrow.className = "actionButton fas fa-arrow-right";
          arrow.style.transform = "rotate(" + point[j] + "deg)";
          arrow.onclick = function() {
            /*
            may need to specifically delete these action listeners
            */
            document.getElementById("town" + i).style.display = "none";
            document.getElementById("town" + nextTown).style.display = "block";
          }
          box.appendChild(arrow);
        } else if (x == "name") {
          /*
          may need to add more height
          */
          box.style.fontWeight = "bold";
          box.innerHTML = location[i][x];
        }
      }
      townName.appendChild(box);
    }
    town.appendChild(townName);
    //Now for any progress bars the town has
    let townProgressBarsBox = document.createElement("div");
    townProgressBarsBox.className = "townProgressBarsBox"
    for (let x in location[i].progressBars) {
      if (location[i].progressBars[x].visible) {
        let y = location[i].progressBars[x]
        //For progress types of bars
        if (location[i].progressBars[x].type == "Progress") {
          let townProgressBar;
          let barName;
          let tooltip;
          let progressEmpty;
          let progressFill;
          townProgressBar = document.createElement("div");
          townProgressBar.className = "townProgressBar";
          //Name of the bar and the base info
          barName = document.createElement("div");
          barName.style.fontWeight = "bold";
          barName.className = "townProgressBarName";
          barName.id = y.nameId;
          barName.innerHTML = y.name + y.currentLevel + "%";
          townProgressBar.appendChild(barName);
          //tooltip showing specifics of the bar's stats
          tooltip = document.createElement("tooltip");
          tooltip.innerHTML = "<b>Progress</b> " + y.currentXP + "/" + y.toNextLevel +
          "(" + (y.currentXP / y.toNextLevel * 100).toFixed(2) + "%)";
          townProgressBar.appendChild(tooltip);
          //The progress bar itself
          progressEmpty = document.createElement("div");
          progressEmpty.className = "progressBarEmpty";
          progressFill = document.createElement("div");
          progressFill.className = "progressBarFill";
          progressFill.id = y.barId;
          progressFill.style.width = (y.currentXP / y.toNextLevel) * 100 + "%";
          progressEmpty.appendChild(progressFill);
          townProgressBar.appendChild(progressEmpty);
          if (y.resource.name != undefined) {
            let resourceBox;
            let amountBar;
            let tempLine
            let inputBox;
            let unchecked;
            let tooltip;
            y = y.resource;
            resourceBox = document.createElement("div");
            resourceBox.className = "progressBarResource";
            amountBar = document.createElement("span");
            amountBar.id = y.name + "Amount";
            amountBar.innerHTML = y.reliableAmountText + y.usedAmount + "/" + y.reliableAmount;
            resourceBox.appendChild(amountBar);
            //line for the lootable checkbox and the potential unchecked resources
            tempLine = document.createElement("span");
            tempLine.style.display = "block";
            inputBox = document.createElement("input");
            inputBox.type = "checkbox";
            inputBox.id = y.name + "LootFirst";
            inputBox.addEventListener("change", reliableLock);
            inputBox.checked = y.reliableFirstLock;
            tempLine.appendChild(inputBox);
            inputBox = document.createElement("label");
            inputBox.htmlFor = y.name + "LootFirst";
            inputBox.innerHTML = "Reliable First";
            tempLine.appendChild(inputBox);
            //span for the unchecked resources
            unchecked = document.createElement("span");
            unchecked.style.float = "right";
            unchecked.style.fontWeight = "bold";
            unchecked.id = y.name + "uncheckedAmount";
            unchecked.innerHTML = y.uncheckedAmountText + y.uncheckedAmount;
            //check for any unchecked resources
            if (y.uncheckedAmount == 0) {
              unchecked.style.visibility = "hidden";
            }
            tempLine.appendChild(unchecked);
            resourceBox.appendChild(tempLine);
            townProgressBar.appendChild(resourceBox);
            //tooltip for unreliable resources
            tooltip = document.createElement("tooltip");
            tooltip.id = y.name + "unreliableAmount";
            tooltip.innerHTML = y.unreliableAmountText + y.unreliableAmount;
            townProgressBar.appendChild(tooltip);
          }
          townProgressBarsBox.appendChild(townProgressBar)
          //For action types of bars
        } else if (location[i].progressBars[x].type == "Action") {
          let townActionBar;
          let nameBar;
          let completedSpan;
          let completedNumber;
          let progressEmpty;
          let progressFill;
          townActionBar = document.createElement("div");
          townActionBar.className = "townProgressBar";
          townActionBar.id = y.id + "Bar";
          nameBar = document.createElement("div");
          nameBar.style.fontWeight = "bold";
          nameBar.innerHTML = y.name;
          completedSpan = document.createElement("span");
          completedSpan.style.float = "right";
          completedSpan.innerHTML = y.completedName;
          completedNumber = document.createElement("span");
          completedNumber.style.fontWeight = "normal";
          completedNumber.id = y.id + "Completed";
          completedNumber.innerHTML = y.completedAmount;
          completedSpan.appendChild(completedNumber);
          nameBar.appendChild(completedSpan);
          townActionBar.appendChild(nameBar);
          //The action part of the action bar
          let segmentBar = document.createElement("div");
          segmentBar.className = "actionBar";
          let previousGoals = [];
          for (let j = 0; j < y.segmentStats.length; j++) {
            let segmentContainer;
            let segment;
            let segmentProgress;
            let tooltip;
            let currentProgress;
            let progressGoal;
            segmentContainer = document.createElement("div");
            segmentContainer.style.width = 'calc(' + 100 / y.segmentStats.length + '% - 6px)';
            segmentContainer.style.margin = "3px";
            segmentContainer.style.display = "inline-block";
            segment = document.createElement("div");
            segment.className = "progressBarEmpty";
            segment.style.display = "inline-block"; segment.style.height = "8px";
            segment.style.backgroundColor = window[y.segmentStats[j] + "Colour"];
            segmentProgress = document.createElement("div");
            segmentProgress.className = "progressBarFill";
            segmentProgress.style.width = "0%";
            segmentProgress.style.backgroundColor = "lightgrey";
            segmentProgress.setAttribute("data-progress", 0);
            segmentProgress.setAttribute("data-goal", y.segmentGoal(previousGoals));
            segmentProgress.setAttribute("data-stat", y.segmentStats[j]);
            previousGoals.push(segmentProgress.getAttribute("data-goal"));
            segment.appendChild(segmentProgress);
            tooltip = document.createElement("tooltip");
            /*
            put the fluff stuff here
            */
            tooltip.innerHTML = "<b>Stat: " + capitalize(y.segmentStats[j]);
            currentProgress = document.createElement("span");
            currentProgress.id = y.id + "Segment" + j;
            currentProgress.innerHTML = "0";
            tooltip.innerHTML += "<br>Progress: "
            tooltip.appendChild(currentProgress);
            tooltip.innerHTML += "/" + segmentProgress.getAttribute("data-goal");
            segmentContainer.appendChild(segment);
            segmentContainer.appendChild(tooltip);
            segmentBar.appendChild(segmentContainer);
          }
          townActionBar.appendChild(segmentBar);
          townProgressBarsBox.appendChild(townActionBar);
        }
      }
    }
    town.appendChild(townProgressBarsBox);
    //Now for a quick ACTIONS bullet
    let tempTitle = document.createElement("div");
    tempTitle.className = "buttonBoxTitle";
    tempTitle.innerHTML = "Actions";
    town.appendChild(tempTitle);
    //And now buttons
    let townButtons = document.createElement("div");
    townButtons.className = "townButtons";
    for (let x in location[i].buttons) {
      if (location[i].buttons[x].visible == true) {
        let buttonContainer;
        let y = location[i].buttons[x];
        let button;
        let action = window[x];
        let icon;
        let tooltip;
        buttonContainer = document.createElement("div");
        button = document.createElement("div");
        button.className = "button";
        if (y.unlocked == true) {
          /*
          might have to delete this action listener later
          */
          button.addEventListener("click", function() {
            addAction(action);
          });
        } else {
          button.style.backgroundColor = "lightgrey";
        }
        button.innerHTML = location[i].buttons[x].name + "<br>";
        icon = document.createElement("img");
        icon.src = "images/" + capitalize(x) + ".svg";
        button.appendChild(icon);
        buttonContainer.appendChild(button);
        //all the glory of the tooltip
        tooltip = document.createElement("tooltip");
        tooltip.innerHTML = "<b>" + location[i].buttons[x].name + "</b><br>";
        //potential to remove this if statement later
        if (action.tooltip.join) {
          tooltip.innerHTML += action.tooltip.join("<br>");
        } else {
          tooltip.innerHTML += action.tooltip;
        }
        for (let j = 0; j < statNames.length; j++) {
          let z = statNames[j];
          if (action.stats[z]) {
            tooltip.innerHTML += "<br><b>" + capitalize(statNames[j]) + "</b> " + action.stats[z] * 100 + "%";
          }
        }
        tooltip.innerHTML += "<br>Mana Cost " + action.manaCost(character[0]);
        if (action.goldCost) {
          tooltip.innerHTML += "<br>Gold Cost " + action.goldCost(character[currentCharacter]);
        }
        if (y.unlocked == false) {
          let requirementLine = document.createElement("div");
          requirementLine.innerHTML = "Unlocks at ";
          for (let k = 0; k < y.requirementAction.length; k++) {
            if (k > 0) {
              requirementLine.innerHTML += " and ";
            }
            requirementLine.innerHTML += y.requirementAmount[k] + " " + y.requirementAction[k];
          }
          tooltip.appendChild(requirementLine);
        }
        buttonContainer.appendChild(tooltip);
        townButtons.appendChild(buttonContainer);
      }
    }
    town.appendChild(townButtons);
    //And finally travel buttons
    let townTravelButtons = document.createElement("div");
    townTravelButtons.className = "townTravelButtons";
    for (let j = 0; j < directions.length; j++) {
      let buttonContainer = document.createElement("div");
      for (x in location[i].travelButtons) {
        if (location[i].travelButtons[x].direction == directions[j] && location[i].travelButtons[x].visible == true) {
          let action = window[x];
          let y = location[i].travelButtons[x];
          let button;
          let icon;
          let tooltip;
          button = document.createElement("div");
          button.className = "button";
          if (y.unlocked == true) {
            button.addEventListener("click", function() {
              addAction(action);
            });
          } else {
            button.style.backgroundColor = "lightgrey";
          }
          button.innerHTML = y.name + "<br>";
          icon = document.createElement("img");
          icon.src = "images/" + capitalize(x) + ".svg";
          button.appendChild(icon);
          buttonContainer.appendChild(button);
          tooltip = document.createElement("tooltip");
          /*
          potential to remove this if statement later
          */
          if (action.tooltip.join) {
            tooltip.innerHTML = action.tooltip.join("<br>");
          } else {
            tooltip.innerHTML = action.tooltip;
          }
          for (let k = 0; k < statNames.length; k++) {
            let z = statNames[k];
            if (action.stats[z]) {
              tooltip.innerHTML += "<br><b>" + capitalize(z) + "</b> " + action.stats[z] * 100 + "%";
            }
          }
          tooltip.innerHTML += "<br>Mana Cost " + action.manaCost(character[currentCharacter]);
          if (action.goldCost) {
            tooltip.innerHTML += "<br>Gold Cost " + action.goldCost(character[currentCharacter]);
          }
          if (y.unlocked == false) {
            let requirementLine = document.createElement("div");
            for (let k = 0; k < y.requirementAction.length; k++) {
              if (k > 0) {
                requirementLine.innerHTML += " and ";
              }
              requirementLine.innerHTML += y.requirementAmount[k] + " " + y.requirementAction[k];
            }
            tooltip.appendChild(requirementLine);
          }
          buttonContainer.appendChild(tooltip);
        }
      }
      townTravelButtons.appendChild(buttonContainer);
    }
    town.appendChild(townTravelButtons);
  }
}

var fightWolves = {
  name: "FightWolves",
  manaCost: function(char) {
    return 3000;
  },
  stats: {
    dexterity: .2,
    strength: .4,
    constitution: .2,
    speed: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  progress: function(char, multiplier) {
    let stat = undefined;
    let x = 0;
    let bar = 0;
    let last = false;
    for (let i = 0; i < 3; i++) {
      x = document.getElementById("wolfFightingSegment" + i);
      if (Number(x.innerHTML) < x.parentElement.previousElementSibling.childNodes[0].getAttribute("data-goal")) {
        stat = x.parentElement.previousElementSibling.childNodes[0].getAttribute("data-stat");
        bar = x.parentElement.previousElementSibling.childNodes[0];
        if (i == 2) {
          last = true;
        }
        break;
      }
    }
    let progress = 1 * multiplier * (1 + char[stat].level / 100) * (char.combat.level) *
    Math.sqrt(1 + location[0].progressBars.wolfFightingActionBar.completedAmount / 100);
    x.innerHTML = Math.floor(progress + Number(x.innerHTML));
    bar.setAttribute("data-progress", String(Number(bar.getAttribute("data-progress")) + progress));
    bar.style.width = bar.getAttribute("data-progress") / bar.getAttribute("data-goal") * 100 + "%";
    if (Number(bar.getAttribute("data-progress")) >= bar.getAttribute("data-goal")) {
      bar.style.width = "100%";
      x.innerHTML = Number(bar.getAttribute("data-goal"));
      location[0].progressBars.wolfFightingActionBar.completeSegment(char);
      if (last == true) {
        location[0].progressBars.wolfFightingActionBar.completeBar();
        rebuildActionBar(0, "wolfFightingActionBar");
      }
    }
  },
  finish: function() {
  },
  get tooltip() { return [
    "There's a pack of wolves that hide in a nearby cave. You're sure they must have valuables from their previous victims, 30 gold perhaps?",
    "Progress is earned at a rate of <b>Combat * sqrt(1 + Total Wolves Killed / 100) per "
  ]},
};

wolfFightingActionBar: {
  type: "Action",
  name: ["Wolves"],
  id: "wolfFighting",
  completedName: "Killed: ",
  completedAmount: 0,
  segmentStats: ["dexterity", "constitution", "strength"],
  segmentGoal: function(previousGoals) {
    if (previousGoals && previousGoals.length >= 2) {
      let x = previousGoals.length;
      return fibonacci(Number(previousGoals[x - 2]), Number(previousGoals[x - 1]));
    } else {
      return 20000;
    }
  },
  segmentProgress: 0,
  completeSegment: function(char) {
    char.gold += 30;
    updateResourceBox("gold");
  },
  completeBar: function() {
    this.completedAmount++;
    document.getElementById("wolfFightingCompleted").innerHTML = this.completedAmount;
  },
  get visible() {
    return location[0].buttons.fightWolves.visible;
  },
},
