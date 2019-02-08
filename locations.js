var location;
var currentLocation = 0;
var directions = ["toNorthWest", "toNorth", "toNorthEast", "toWest", "name",
"toEast", "toSouthWest", "toSouth", "toSouthEast"];
var point = [225, 270, 315, 180, 0, 0, 135, 90, 45];

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
        box.className = "townProgressBars";
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
    line = document.createElement("div");
    line.className = "buttonBoxTitle";
    miscText = document.createTextNode("Actions");
    line.appendChild(miscText);
    town.appendChild(line);
    townButtons = document.createElement("div");
    townButtons.className = "townButtons";
    for (let x in location[i].buttons) {
      if (location[0].buttons[x].visible == true) {
        button = document.createElement("div");
        button.className = "button";
        button.onclick = function() {
          addAction(window[x]);
        };
        miscText = document.createTextNode(capitalize(x));
        button.appendChild(miscText);
        miscText = document.createElement("div");
        icon = document.createElement("img");
        icon.src = "images/" + capitalize(x) + ".svg";
        miscText.appendChild(icon);
        button.appendChild(miscText);
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
        reliableAmountText: "Mana filled pots smashed: ",
        uncheckedAmount: 0,
        uncheckedAmountText: "Pots not checked for mana: ",
        unreliableAmount: 0,
        unreliableAmountText: "Pots with no mana: ",
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
      visible: true,
      resource: {
        name: "Favours",
        visible: true,
        usedAmount: 0,
        reliableAmount: 0,
        reliableAmountText: "Favours rewarded: ",
        uncheckedAmount: 0,
        uncheckedAmountText: "Favours never done: ",
        unreliableAmount: 0,
        unreliableAmountText: "Favours without a reward: ",
        totalAmount: 0,
        totalEfficiency: 1,
        reliableEfficiency: .20,
      }
    }
  },
  buttons: {
    wander: {
      name: "Wander",
      visible: true,
    },
    smashPots: {
      name: "Smash Pots",
      visible: true,
    },
    meetPeople: {
      name: "Meet People",
      visible: true,
    },
    doFavours: {
      name: "Do Favours",
      visible: true,
    },
    buyMap: {
      name: "Buy a Map",
      visible: true,
    },
  },
};

location[1] = {
  name: "Forest",
  toWest: 0,
}
