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
            tempLine.insertAdjacentHTML("beforeend", "Reliable First");
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
        tooltip.innerHTML += "<br>Mana Cost " + action.manaCost;
        if (action.goldCost) {
          tooltip.innerHTML += "<br>Gold Cost " + action.goldCost;
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
              tooltip.innerHTML += "<br><b>" + capitalize(z) + "</b>" + action.stats[z] * 100 + "%";
            }
          }
          tooltip.innerHTML += "<br>Mana Cost " + action.manaCost;
          if (action.goldCost) {
            tooltip.innerHTML += "<br>Gold Cost " + action.goldCost;
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

function updateResourceText(resource) {
  let x = resource.name + "Amount";
  document.getElementById(x).innerHTML = resource.reliableAmountText + resource.usedAmount + "/" + resource.reliableAmount;
  x = resource.name + "unreliableAmount";
  document.getElementById(x).innerHTML = resource.unreliableAmountText + resource.unreliableAmount;
  x = resource.name + "uncheckedAmount";
  document.getElementById(x).innerHTML = resource.uncheckedAmountText + resource.uncheckedAmount;
  if (resource.uncheckedAmount > 0) {
    document.getElementById(x).style.visibility = "visible";
  } else {
    document.getElementById(x).style.visibility = "hidden";
  }
}

function updateResources(progressBars) {
  resource = progressBars.resource;
  resource.totalAmount = Math.floor(progressBars.currentLevel * resource.totalEfficiency);
  resource.uncheckedAmount = resource.totalAmount - resource.checkedAmount;
  resource.reliableAmount = Math.floor((resource.totalAmount - resource.uncheckedAmount) * resource.reliableEfficiency);
  resource.unreliableAmount = resource.totalAmount - resource.uncheckedAmount - resource.reliableAmount;
}

function updateProgressBar(progressBars) {
  let x = document.getElementById(progressBars.barId);
  x.style.width = (progressBars.currentXP / progressBars.toNextLevel) * 100 + "%";
  document.getElementById(progressBars.nameId).innerHTML = progressBars.name + progressBars.currentLevel + "%";
  x = x.parentElement.parentElement.childNodes[1];
  x.innerHTML = "<b>Progress</b> " + progressBars.currentXP + "/" + progressBars.toNextLevel +
  "(" + (progressBars.currentXP / progressBars.toNextLevel * 100).toFixed(2) + "%)";
}

function getNextLevel(x) {
  if (x == location[1].progressBars.wizardTrainingProgressBar) {
    x.toNextLevel = Math.max(1, (x.currentLevel + 1) % 10) * (100 * Math.pow(10, Math.floor((x.currentLevel + 1) / 10)));
  } else {
    x.toNextLevel = (x.currentLevel + 1) * 100;
    x.resource.totalAmount += x.resource.totalEfficiency;
    x.resource.uncheckedAmount += x.resource.totalEfficiency;
  }
}

function checkLevel(x) {
  if (x.currentXP >= x.toNextLevel) {
    x.currentLevel++;
    if (x.currentLevel >= 100) {
      x.currentXP = 0;
    } else {
      x.currentXP = x.currentXP - x.toNextLevel;
    }
    getNextLevel(x);
    updateResources(x);
    buildTownBox();
    checkLevel(x);
  }
}

function resetActionBars() {
  for (let i in location) {
    for (let j in location[i].progressBars) {
      if (location[i].progressBars[j].type == "Action") {
        let x = location[i].progressBars[j];
        if (x.visible) {
          let y = document.getElementById(x.id + "Bar");
          y = y.childNodes[1];
          let previousGoals = [];
          for (let k = 0; k < y.childElementCount; k++) {
            let z = y.childNodes[k].firstElementChild;
            z.firstElementChild.setAttribute("data-progress", 0);
            z.firstElementChild.setAttribute("data-goal", x.segmentGoal(previousGoals));
            z.firstElementChild.style.width = "0%";
            previousGoals.push(x.segmentGoal(previousGoals));
            document.getElementById(x.id + "Segment" + k).innerHTML = 0;
            document.getElementById(x.id + "Segment" + k).nextSibling.textContent =
            " / " + z.firstElementChild.getAttribute("data-goal");
          }
        }
      }
    }
  }
}

function rebuildActionBar(barLocation, actionBar) {
  let x = location[barLocation].progressBars[actionBar];
  let y = document.getElementById(x.id + "Segment0").parentElement.parentElement.parentElement;
  let previousGoals = [];
  for (let i = 0; i < y.childElementCount; i++) {
    previousGoals.push(y.childNodes[i].firstElementChild.firstElementChild.getAttribute("data-goal"));
  }
  for (let i = 0; i < y.childElementCount; i++) {
    let z = y.childNodes[i].firstElementChild.firstElementChild;
    z.setAttribute("data-progress", 0);
    z.setAttribute("data-goal", x.segmentGoal(previousGoals));
    document.getElementById(x.id + "Segment" + i).innerHTML = 0;
    document.getElementById(x.id + "Segment" + i).nextSibling.textContent = " / " + z.getAttribute("data-goal");
    document.getElementById(x.id + "Completed").innerHTML = x.completedAmount;
    previousGoals.push(z.getAttribute("data-goal"));
    z.style.width = "0%";
  }
}

function reliableLock(node) {
  node = node.target;
  let resourceName = node.id.split("LootFirst")[0];
  for (let i in location) {
    for (let j in location[i].progressBars) {
      console.log(i + j);
      if (location[i].progressBars[j].type == "Progress" && location[i].progressBars[j].resource.name == resourceName) {
        if (node.checked) {
          location[i].progressBars[j].resource.reliableFirstLock = true;
        } else {
          location[i].progressBars[j].resource.reliableFirstLock = false;
        }
        return;
      }
    }
  }
}

location[0] = {
  name: "Noobton",
  visible: true,
  toEast: 1,
  progressBars: {
    wanderProgressBar: {
      type: "Progress",
      name: "Village Explored: ",
      nameId: "villageExplored",
      barId: "wanderProgressBar",
      currentXP: 0,
      currentLevel: 0,
      toNextLevel: 100,
      visible: true,
      resource: {
        name: "Pots",
        visible: true,
        reliableFirstLock: false,
        usedAmount: 0,
        reliableAmount: 0,
        reliableAmountText: "Mana Filled Pots Smashed: ",
        uncheckedAmount: 0,
        uncheckedAmountText: "Pots Not Checked For Mana: ",
        unreliableAmount: 0,
        unreliableAmountText: "Pots With No Mana: ",
        totalAmount: 0,
        totalEfficiency: 10,
        reliableEfficiency: .1,
        checkedAmount: 0,
      },
    },
    meetPeopleProgressBar: {
      type: "Progress",
      name: "People Met: ",
      nameId: "peopleMet",
      barId: "meetPeopleProgressBar",
      currentXP: 0,
      currentLevel: 0,
      toNextLevel: 100,
      get visible() {
        return location[0].buttons.meetPeople.unlocked;
      },
      resource: {
        name: "Favours",
        visible: true,
        reliableFirstLock: false,
        usedAmount: 0,
        reliableAmount: 0,
        reliableAmountText: "Favours Rewarded: ",
        uncheckedAmount: 0,
        uncheckedAmountText: "Favours Never Done: ",
        unreliableAmount: 0,
        unreliableAmountText: "Favours Without a Reward: ",
        totalAmount: 0,
        totalEfficiency: 1,
        reliableEfficiency: .1,
        checkedAmount: 0,
      },
    },
    secretsFoundProgressBar: {
      type: "Progress",
      name: "Secrets Found: ",
      nameId: "secretsFound",
      barId: "investigateProgressBar",
      currentXP: 0,
      currentLevel: 0,
      toNextLevel: 100,
      get visible() {
        return location[0].buttons.investigate.unlocked;
      },
      resource: {
        name: "VillagersRobbed",
        visible: true,
        reliableFirstLock: false,
        usedAmount: 0,
        reliableAmount: 0,
        reliableAmountText: "People Robbed: ",
        uncheckedAmount: 0,
        uncheckedAmountText: "People Never Robbed: ",
        unreliableAmount: 0,
        unreliableAmountText: "People Not Worth Robbing: ",
        totalAmount: 0,
        totalEfficiency: .5,
        reliableEfficiency: .5,
        checkedAmount: 0,
      },
    },
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
  },
  buttons: {
    wander: {
      name: "Wander",
      visible: true,
      unlocked: true,
    },
    smashPots: {
      name: "Smash Pots",
      visible: true,
      unlocked: true,
    },
    meetPeople: {
      name: "Meet People",
      get visible() {
        return (location[0].progressBars.wanderProgressBar.currentLevel >= 5);
      },
      get unlocked() {
        return (location[0].progressBars.wanderProgressBar.currentLevel >= 15);
      },
      requirementAction: ["Village Explored"],
      requirementAmount: ["15%"],
    },
    doFavours: {
      name: "Do Favours",
      get visible() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 5);
      },
      get unlocked() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 10);
      },
      requirementAction: ["People Met"],
      requirementAmount: [10],
    },
    investigate: {
      name: "Investigate",
      get visible() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 15);
      },
      get unlocked() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 20);
      },
      requirementAction: ["People Met"],
      requirementAmount: [30],
    },
    steal: {
      name: "Steal",
      get visible() {
        return (location[0].progressBars.secretsFoundProgressBar.currentLevel >= 5);
      },
      get unlocked() {
        return (location[0].progressBars.secretsFoundProgressBar.currentLevel >= 10);
      },
      requirementAction: ["Secrets Found"],
      requirementAmount: ["10%"],
    },
    combatTraining: {
      name: "Combat Training",
      get visible() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 20);
      },
      get unlocked() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 30)
      },
      requirementAction: ["People Met"],
      requirementAmount: [20],
    },
    fightWolves: {
      name: "Fight Wolves",
      get visible() {
        return (location[0].progressBars.secretsFoundProgressBar.currentLevel >= 10);
      },
      get unlocked() {
        return (location[0].progressBars.secretsFoundProgressBar.currentLevel >= 20
        && character[0].combat.level >= 5);
      },
      requirementAction: ["Secrets Found", "Combat"],
      requirementAmount: ["20%", 5],
    },
    buyMana: {
      name: "Buy Mana",
      get visible() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 10);
      },
      get unlocked() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 15);
      },
      requirementAction: ["People Met"],
      requirementAmount: [15],
    },
    buyMap: {
      name: "Buy a Map",
      get visible() {
        return (location[0].progressBars.wanderProgressBar.currentLevel >= 15);
      },
      get unlocked() {
        return (location[0].progressBars.wanderProgressBar.currentLevel >= 30);
      },
      requirementAction: ["Village Explored"],
      requirementAmount: ["30%"],
    },
    buyAxe: {

    },
    buyGuide: {
      name: "Buy Guide",
      get visible() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 30);
      },
      get unlocked() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 40);
      },
      requirementAction: ["People Met"],
      requirementAmount: [40],
    },
  },
  travelButtons: {
    travelToForest: {
      name: "Travel to Forest",
      direction: "toEast",
      get visible() {
        return (location[0].progressBars.secretsFoundProgressBar.currentLevel >= 25)
      },
      get unlocked() {
        return (character[0].combat.level >= 15);
      },
      requirementAction: ["Combat"],
      requirementAmount: [15],
    },
  },
};

location[1] = {
  name: "Forest",
  visible: false,
  toWest: 0,
  //toNorth: circus training area?
  progressBars: {
    exploreForestProgressBar: {
      type: "Progress",
      name: "Forest Explored: ",
      nameId: "forestExplored",
      barId: "exploreForestProgressBar",
      currentXP: 0,
      currentLevel: 0,
      toNextLevel: 100,
      visible: true,
      resource: {
        name: undefined,
      },
    },
    investigateTreesProgressBar: {
      type: "Progress",
      name: "Trees Checked: ",
      nameId: "treesChecked",
      barId: "investigateTreesProgressBar",
      currentXP: 0,
      currentLevel: 0,
      toNextLevel: 100,
      get visible() {
        return location[1].buttons.investigateTrees.unlocked;
      },
      resource: {
        name: "Trees",//Infused or filled? something cooler maybe?
        visible: true,
        reliableFirstLock: false,
        usedAmount: 0,
        reliableAmount: 0,
        reliableAmountText: "Trees with mana in them: ",
        uncheckedAmount: 0,
        uncheckedAmountText: "Trees that haven't been checked: ",
        unreliableAmount: 0,
        unreliableAmountText: "Trees with only trace amounts of mana: ",
        get totalAmount() {
          return (location[1].progressBars.investigateTreesProgressBar.currentLevel +
          location[1].progressBars.talkToDryadProgressBar.currentLevel) * this.totalEfficiency;
        },
        totalEfficiency: 10,
        reliableEfficiency: .2,
        checkedAmount: 0,
      },
    },
    mapGameTrailsProgressBar: {
      type: "Progress",
      name: "Game Trails Explored: ",
      nameId: "gameTrailsExplored",
      barId: "mapGameTrailsProgressBar",
      currentXP: 0,
      currentLevel: 0,
      toNextLevel: 100,
      get visible() {
        return location[1].buttons.mapGameTrails.unlocked;
      },
      resource: {
        name: "Animals",
        visible: true,
        reliableFirstLock: false,
        usedAmount: 0,
        reliableAmount: 0,
        reliableAmountText: "Animals with good pelts: ",
        uncheckedAmount: 0,
        uncheckedAmountText: "Animals never hunted: ",
        unreliableAmount: 0,
        unreliableAmountText: "Animals with inferior pelts: ",
        totalAmount: 0,
        totalEfficiency: 5,
        reliableEfficiency: .05,
        checkedAmount: 0,
      },
    },
    talkToDryadProgressBar: {
      type: "Progress",
      name: "Dryad Knowledge Learned: ",
      nameId: "dryadKnowledgeLearned",
      barId: "talkToDryadProgressBar",
      currentXP: 0,
      currentLevel: 0,
      toNextLevel: 100,
      get visible() {
        return location[1].buttons.talkToDryad.unlocked;
      },
      resource: {
        name: undefined,
      },
    },
    wizardTrainingProgressBar: {
      type: "Progress",
      name: "Wizard Training Received: ",
      nameId: "wizardTrainingReceived",
      barId: "wizardTrainingProgressBar",
      currentXP: 0,
      currentLevel: 0,
      toNextLevel: 100,
      get visible() {
        return location[1].buttons.wizardTraining.unlocked;
      },
      resource: {
        name: undefined,
      },
    },
    searchForElderberriesProgressBar: {
      type: "Progress",
      name: "Elderberries Found: ",
      nameId: "elderberriesFound",
      barId: "searchForElderberriesProgressBar",
      currentXP: 0,
      currentLevel: 0,
      toNextLevel: 100,
      get visible() {
        return location[1].buttons.searchForElderberries.unlocked;
      },
      resource: {
        name: "Elderberries",
        visible: true,
        reliableFirstLock: false,
        usedAmount: 0,
        reliableAmount: 0,
        reliableAmountText: "Ripe Elderberries: ",
        uncheckedAmount: 0,
        uncheckedAmountText: "Elderberries Not Checked: ",
        unreliableAmount: 0,
        unreliableAmountText: "Unripe Elderberries: ",
        totalAmount: 0,
        totalEfficiency: 5,
        reliableEfficiency: 0.05,
        checkedAmount: 0,
      }
    }
  },
  buttons: {
    exploreForest: {
      name: "Explore Forest",
      visible: true,
      unlocked: true,
    },
    investigateTrees: {
      name: "Investigate Trees",
      get visible() {
        return (location[1].progressBars.exploreForestProgressBar.currentLevel >= 5);
      },
      get unlocked() {
        return (location[1].progressBars.exploreForestProgressBar.currentLevel >= 10);
      },
      requirementAction: ["Forest Explored"],
      requirementAmount: [10],
    },
    absorbManaFromTrees: {
      name: "Absorb Mana From Trees",
      get visible() {
        return (location[1].progressBars.investigateTreesProgressBar.currentLevel >= 5);
      },
      get unlocked() {
        return (location[1].progressBars.investigateTreesProgressBar.currentLevel >= 10);
      },
      requirementAction: ["Trees Checked"],
      requirementAmount: [10],
    },
    chopTrees: {
      name: "Chop Trees",
      get visible() {
        return (location[1].progressBars.investigateTreesProgressBar.currentLevel >= 25);
      },
      get unlocked() {
        return (location[1].progressBars.investigateTreesProgressBar.currentLevel >= 40);
      },
      requirementAction: ["Trees Checked"],
      requirementAmount: [40],
    },
    mapGameTrails: {
      name: "Map Game Trails",
      get visible() {
        return (location[1].progressBars.exploreForestProgressBar.currentLevel >= 10);
      },
      get unlocked() {
        return (location[1].progressBars.exploreForestProgressBar.currentLevel >= 25);
      },
      requirementAction: ["Forest Explored"],
      requirementAmount: [25],
    },
    huntAnimals: {
      name: "Hunt Animals",
      get visible() {
        return (location[1].progressBars.mapGameTrailsProgressBar.currentLevel >= 5);
      },
      get unlocked() {
        return (location[1].progressBars.mapGameTrailsProgressBar.currentLevel >= 10);
      },
      requirementAction: ["Game Trails Explored"],
      requirementAmount: [10],
    },
    talkToDryad: {
      name: "Talk to Dryad",
      get visible() {
        return (location[1].progressBars.exploreForestProgressBar.currentLevel >= 25);
      },
      get unlocked() {
        return (location[1].progressBars.exploreForestProgressBar.currentLevel >= 50);
      },
      requirementAction: ["Forest Explored"],
      requirementAmount: [50],
    },
    wizardTraining: {
      name: "Wizard Training",
      get visible() {
        return (location[1].progressBars.exploreForestProgressBar.currentLevel >= 50);
      },
      get unlocked() {
        return (location[1].progressBars.exploreForestProgressBar.currentLevel >= 75);
      },
      requirementAction: ["Forest Explored"],
      requirementAmount: [75],
    },
    searchForElderberries: {
      name: "Search For Elderberries",
      get visible() {
        return (location[1].progressBars.wizardTrainingProgressBar.currentLevel >= 5);
      },
      get unlocked() {
        return (location[1].progressBars.wizardTrainingProgressBar.currentLevel >= 10);
      },
      requirementAction: ["Wizard Training"],
      requirementAmount: [10],
    },
    pickElderberries: {
      name: "Pick Elderberries",
      get visible() {
        return (location[1].progressBars.wizardTrainingProgressBar.currentLevel >= 10);
      },
      get unlocked() {
        return (location[1].progressBars.searchForElderberriesProgressBar.currentLevel >= 5);
      },
      requirementAction: ["Elderberries Found"],
      requirementAmount: [5],
    },
    makeMinorHealthPotion: {
      name: "Make Minor Health Potion",
      get visible() {
        return (location[1].progressBars.wizardTrainingProgressBar.currentLevel >= 5);
      },
      get unlocked() {
        return (location[1].progressBars.wizardTrainingProgressBar.currentLevel >= 10);
      },
      requirementAction: ["Wizard Training"],
      requirementAmount: [10],
    },
    trainManaFlow: {
      name: "Train Mana Flow",
      get visible() {
        return (location[1].progressBars.wizardTrainingProgressBar.currentLevel >= 10);
      },
      get unlocked() {
        return (location[1].progressBars.wizardTrainingProgressBar.currentLevel >= 20);
      },
      requirementAction: ["Wizard Training"],
      requirementAmount: [10],
    },
  },
  travelButtons: {
    returnToNoobton: {
      name: "Return to Noobton",
      visible: true,
      unlocked: true,
      direction: "toWest",
    },
  },
};
