var location;
var currentLocation = 0;

function changeLocation(direction) {
  if (location[currentLocation][direction] != undefined) {
    currentLocation = location[currentLocation][direction];
  }
  buildTownBox();
}

function buildTownBox() {
  let newTownBox = "";
  let resourcesToUpdate = [];
  let progressBarsToUpdate = [];

  newTownBox += "<div class=townName>";
  newTownBox += "<div>";
  if (location[currentLocation].toUpLeft != undefined) {
    newTownBox += "<i class='actionButton fas fa-arrow-left' style=transform:rotate(45deg) onclick=changeLocation('toUpLeft')></i>";
  }
  newTownBox += "</div>";
  newTownBox += "<div>";
  if (location[currentLocation].toUp != undefined) {
    newTownBox += "<i class='actionButton fas fa-arrow-up' onclick=changeLocation('toUp')></i>";
  }
  newTownBox += "</div>";
  newTownBox += "<div>";
  if (location[currentLocation].toUpRight != undefined) {
    newTownBox += "<i class='actionButton fas fa-arrow-right' style=transform:rotate(-45deg) onclick=changeLocation('toUpRight')></i>";
  }
  newTownBox += "</div>";
  newTownBox += "<div>";
  if (location[currentLocation].toLeft != undefined) {
    newTownBox += "<i class='actionButton fas fa-arrow-left' onclick=changeLocation('toLeft')></i>";
  }
  newTownBox += "</div>";
  newTownBox += "<div>" + location[currentLocation].name + "</div>";
  newTownBox += "<div>";
  if (location[currentLocation].toRight != undefined) {
    newTownBox += "<i class='actionButton fas fa-arrow-right' onclick=changeLocation('toRight')></i>";
  }
  newTownBox += "</div>";
  newTownBox += "<div>";
  if (location[currentLocation].toDownLeft != undefined) {
    newTownBox += "<i class='actionButton fas fa-arrow-left' style=transform:rotate(-45deg) onclick=changeLocation('toDownLeft')></i>";
  }
  newTownBox += "</div>";
  newTownBox += "<div>";
  if (location[currentLocation].toDown != undefined) {
    newTownBox += "<i class='actionButton fas fa-arrow-down' onclick=changeLocation('toDown')></i>";
  }
  newTownBox += "</div>";
  newTownBox += "<div>";
  if (location[currentLocation].toDownRight != undefined) {
    newTownBox += "<i class='actionButton fas fa-arrow-right' style=transform:rotate(45deg) onclick=changeLocation('toDownRight')></i>";
  }
  newTownBox += "</div>";
  newTownBox += "</div>";

  newTownBox += "<div class='townProgressBars'>";
  for (x in location[currentLocation].progressBars) {
    if (location[currentLocation].progressBars[x].visible) {
      newTownBox += "<div class=progressBarName id=" + location[currentLocation].progressBars[x].nameId + ">" +
      location[currentLocation].progressBars[x].name + location[currentLocation].progressBars[x].currentLevel +
      "%</div>" + "<div class=progressBarEmpty>" + "<div class=progressBarFill id=" + x + "></div></div>";
      progressBarsToUpdate.push(location[currentLocation].progressBars[x]);
      if (location[currentLocation].progressBars[x].resource.name != undefined) {
        newTownBox += "<div class=progressBarResource>" + location[currentLocation].progressBars[x].resource.reliableAmountText +
        "<span id=" + location[currentLocation].progressBars[x].resource.name + "usedAmount></span>" + "/" +
        "<span id=" + location[currentLocation].progressBars[x].resource.name + "reliableAmount></span>" + "</br>" +
        "<input type=checkbox id=" + location[currentLocation].progressBars[x].resource.name + "LootFirst>Reliable First" +
        "<span style=float:right>" + location[currentLocation].progressBars[x].resource.uncheckedAmountText +
        "<span id=" + location[currentLocation].progressBars[x].resource.name + "uncheckedAmount></span></span>" +
        "<tooltip>" + location[currentLocation].progressBars[x].resource.unreliableAmountText +
        "<span id=" + location[currentLocation].progressBars[x].resource.name + "unreliableAmount></span></tooltip></div>";
        resourcesToUpdate.push(location[currentLocation].progressBars[x].resource);
      }
    }
  }
  newTownBox += "</div>";
  newTownBox += "<div class=buttonBoxTitle><b>Actions</b></div>";
  newTownBox += "<div class=townButtons>";
  for (x in location[currentLocation].buttons) {
    if (location[currentLocation].buttons[x].visible) {
      newTownBox += "<div class=button onclick=addAction(" + x + ")>" + location[currentLocation].buttons[x].name +
      "<div><img src=images/" + x + ".svg></div></div>";
    }
  }
  newTownBox += "</div>";
  newTownBox += "</div>";
  document.getElementById("townBox").innerHTML = newTownBox;
  for (let i = 0; i < resourcesToUpdate.length; i++) {
    updateResourceText(resourcesToUpdate[i]);
  }
  for (let i = 0; i < progressBarsToUpdate.length; i++) {
    updateProgressBar(progressBarsToUpdate[i]);
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
  document.getElementById(progressBars.nameId).innerHTML = progressBars.name + progressBars.currentLevel + "%";
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
  toRight: 1,
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
  toLeft: 0,
}
