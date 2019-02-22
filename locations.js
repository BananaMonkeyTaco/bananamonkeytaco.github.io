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
          miscText = document.createTextNode(location[i][x]);
          arrow.appendChild(miscText);
        }
        box.appendChild(arrow);
      }
      townName.appendChild(box);
    }
    town.appendChild(townName);
    townProgressBars = document.createElement("div");
    townProgressBars.className = "townProgressBars";
    for (x in location[i].progressBars) {
      if (location[i].progressBars[x].visible) {
        box = document.createElement("div");
        box.className = "townProgressBar";
        y = location[i].progressBars[x];
        barName = document.createElement("div");
        barName.className = "progressBarName";
        miscText = document.createTextNode(y.name);
        barName.appendChild(miscText);
        progress = document.createElement("span");
        progress.id = y.nameId;
        miscText = document.createTextNode(y.currentLevel + "%");
        progress.appendChild(miscText);
        barName.appendChild(progress);
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
          miscText = document.createTextNode(y.reliableAmountText);
          resourceBox.appendChild(miscText)
          resource = document.createElement("span");
          resource.id = y.name + "usedAmount";
          miscText = document.createTextNode(y.usedAmount);
          resource.appendChild(miscText);
          resourceBox.appendChild(resource);
          miscText = document.createTextNode("/");
          resourceBox.appendChild(miscText);
          resource = document.createElement("span");
          resource.id = y.name + "reliableAmount";
          miscText = document.createTextNode(y.reliableAmount);
          resource.appendChild(miscText);
          resourceBox.appendChild(resource);
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
          miscText = document.createTextNode(y.uncheckedAmountText);
          resource.appendChild(miscText);
          progress = document.createElement("span");
          progress.id = y.name + "uncheckedAmount";
          miscText = document.createTextNode(y.uncheckedAmount);
          progress.appendChild(miscText);
          resource.appendChild(progress);
          line.appendChild(resource);
          resourceBox.appendChild(line);
          resource = document.createElement("tooltip");
          miscText = document.createTextNode(y.unreliableAmountText);
          resource.appendChild(miscText);
          progress = document.createElement("span");
          progress.id = y.name + "unreliableAmount";
          miscText = document.createTextNode(y.unreliableAmount);
          progress.appendChild(miscText);
          resource.appendChild(progress);
          resourceBox.appendChild(resource);
          box.appendChild(resourceBox);
        }
        townProgressBars.appendChild(box);
      }
    }
    town.appendChild(townProgressBars);
    let townActionBars = document.createElement("div");
    townActionBars.className = "townActionBars";
    for (x in location[i].actionBars) {
      x = location[i].actionBars[x];
      if (x.visible) {
        let bar = document.createElement("div");
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
        townActionBars.appendChild(bar);
      }
    }
    town.appendChild(townActionBars);
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
        miscText = document.createTextNode(action.tooltip);
        tooltip.appendChild(miscText);
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
        miscText = document.createTextNode("Mana Cost " + action.manaCost);
        tooltip.appendChild(miscText);
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
  }
}

function updateResourceText(resource) {
  let x = resource.name + "usedAmount";
  document.getElementById(x).innerHTML = resource.usedAmount;
  x = resource.name + "reliableAmount";
  document.getElementById(x).innerHTML = resource.reliableAmount;
  x = resource.name + "uncheckedAmount";
  document.getElementById(x).innerHTML = resource.uncheckedAmount;
  x = resource.name + "unreliableAmount";
  document.getElementById(x).innerHTML = resource.unreliableAmount;
}

function updateResources(resource) {
  resource.reliableAmount = Math.floor((resource.totalAmount - resource.uncheckedAmount) * resource.reliableEfficiency);
  resource.unreliableAmount = resource.totalAmount - resource.reliableAmount;
}

function updateProgressBar(progressBars) {
  let x = document.getElementById(progressBars.barId);
  x.style.width = (progressBars.currentXP / progressBars.toNextLevel) * 100 + "%";
  document.getElementById(progressBars.nameId).innerHTML = progressBars.currentLevel + "%";
}

function getNextLevel(x) {
  x.toNextLevel = (x.currentLevel + 1) * 100;
  x.resource.totalAmount += x.resource.totalEfficiency;
  x.resource.uncheckedAmount += x.resource.totalEfficiency;
}

function checkLevel(x) {
  if (x.currentXP >= x.toNextLevel) {
    x.currentLevel++;
    x.totalAmount += x.totalEfficiency;
    x.currentXP = 0;
    getNextLevel(x);
    buildTownBox();
  }
}

function resetActionBars() {
  for (let i in location) {
    for (let j in location[i].actionBars) {
      let x = location[i].actionBars[j];
      if (x.visible) {
        let y = document.getElementById(x.id + "Bar");
        y = y.childNodes[1];
        let previousGoals = [];
        for (let k = 0; k < y.childElementCount; k++) {
          let z = y.childNodes[k];
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

function rebuildActionBar(barLocation, actionBar) {
  let x = location[barLocation].actionBars[actionBar];
  let y = document.getElementById(x.id + "Segment0").parentElement.parentElement.parentElement;
  let previousGoals = [];
  for (let i = 0; i < y.childElementCount; i++) {
    previousGoals.push(y.childNodes[i].firstElementChild.getAttribute("data-goal"));
  }
  for (let i = 0; i < y.childElementCount; i++) {
    let z = y.childNodes[i].firstElementChild;
    z.setAttribute("data-progress", 0);
    console.log(x.segmentGoal(previousGoals))
    console.log(previousGoals)
    z.setAttribute("data-goal", x.segmentGoal(previousGoals));
    document.getElementById(x.id + "Segment" + i).innerHTML = 0;
    document.getElementById(x.id + "Segment" + i).nextSibling.textContent = " / " + z.getAttribute("data-goal");
    document.getElementById(x.id + "Completed").innerHTML = x.completedAmount;
    previousGoals.push(z.getAttribute("data-goal"));
    z.style.width = "0%";
  }
}

location[0] = {
  name: "Noobton",
  toEast: 1,
  progressBars: {
    wanderProgressBar: {
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
        usedAmount: 0,
        reliableAmount: 0,
        reliableAmountText: "Mana Filled Pots Smashed: ",
        uncheckedAmount: 0,
        uncheckedAmountText: "Pots Not Checked For Mana: ",
        unreliableAmount: 0,
        unreliableAmountText: "Pots With No Mana: ",
        totalAmount: 0,
        totalEfficiency: 10,
        reliableEfficiency: .10,
      },
    },
    meetPeopleProgressBar: {
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
        usedAmount: 0,
        reliableAmount: 0,
        reliableAmountText: "Favours Rewarded: ",
        uncheckedAmount: 0,
        uncheckedAmountText: "Favours Never Done: ",
        unreliableAmount: 0,
        unreliableAmountText: "Favours Without a Reward: ",
        totalAmount: 0,
        totalEfficiency: .5,
        reliableEfficiency: .1,
      },
    },
    secretsFoundProgressBar: {
      name: "Secrets Found: ",
      nameId: "secretsFound",
      barId: "secretsFoundProgressBar",
      currentXP: 0,
      currentLevel: 0,
      toNextLevel: 100,
      get visible() {
        return location[0].buttons.investigate.unlocked;
      },
      resource: {
        name: "VillagersRobbed",
        visible: true,
        usedAmount: 0,
        reliableAmount: 0,
        reliableAmountText: "People Robbed: ",
        uncheckedAmount: 0,
        uncheckedAmountText: "People Never Robbed: ",
        unreliableAmount: 0,
        unreliableAmountText: "People Not Worth Robbing: ",
        totalAmount: 0,
        totalEfficiency: .5,
        reliableEfficiency: .4,
      },
    },
  },
  actionBars: {
    wolfFightingActionBar: {
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
      completeSegment: function() {
        gold += 30;
      },
      completeBar: function() {
        this.completedAmount++;
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
      requirementAmount: ["30%"],
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
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 30);
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
      requirementAmount: [10],
    },
    combatTraining: {
      name: "Combat Training",
      get visible() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 10);
      },
      get unlocked() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 20)
      },
      requirementAction: ["People Met"],
      requirementAmount: [20],
    },
    fightWolves: {
      name: "Fight Wolves",
      get visible() {
        return (location[0].progressBars.secretsFoundProgressBar.currentLevel >= 20);
      },
      get unlocked() {
        return (location[0].progressBars.secretsFoundProgressBar.currentLevel >= 20
        && characters[0].combat.level >= 5);
      },
      requirementAction: ["Secrets Found", "Combat"],
      requirementAmount: [20, 5],
    },
    buyGuide: {
      name: "Buy Guide",
      get visible() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 25);
      },
      get unlocked() {
        return (location[0].progressBars.meetPeopleProgressBar.currentLevel >= 40);
      },
      requirementAction: ["People Met"],
      requirementAmount: [40],
    },
    buyMap: {
      name: "Buy a Map",
      get visible() {
        return (location[0].progressBars.wanderProgressBar.currentLevel >= 35);
      },
      get unlocked() {
        return (location[0].progressBars.wanderProgressBar.currentLevel >= 60);
      },
      requirementAction: ["Village Explored"],
      requirementAmount: ["60%"],
    },
    travelToForest: {
      name: "Travel to the Forest",
      get visible() {
        return (location[0].progressBars.secretsFoundProgressBar >= 20)
      },
      get unlocked() {
        return (characters[0].combat.level >= 15);
      },
      requirementAction: ["Combat"],
      requirementAmount: [15],
    },
  },
};

location[1] = {
  name: "Forest",
  toWest: 0,
  //toNorth: circus training area?
};
