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
        newTownBox += "<div class=progressBarResource id=" + location[currentLocation].progressBars[x].resource.name +
        ">" + "</div>";
        resourcesToUpdate.push(location[currentLocation].progressBars[x].resource);
      }
    }
  }
  newTownBox += "</div>";
  newTownBox += "<div class=townButtons>";
  for (x in location[currentLocation].buttons) {
    if (location[currentLocation].buttons[x].visible) {
      newTownBox += "<button type='button' onclick=addAction(" + x + ")>" + location[currentLocation].buttons[x].name +
      "</button>";
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
  let x = "<div>" + resource.reliableAmountText + resource.usedAmount + "/" + resource.reliableAmount;
  if (resource.uncheckedAmount > 0) {
    x += resource.uncheckedAmountText + resource.uncheckedAmount;
  }
  x += "<tooltip>" + resource.unreliableAmountText + resource.unreliableAmount + "</tooltip>" + "</div>";
  document.getElementById(resource.name).innerHTML = x;
}

function updateResources(resource) {
  console.log(resource);
  resource.reliableAmount = floor((resource.totalAmount - resource.uncheckedAmount) * resource.efficiency);
}

function updateProgressBar(progressBar) {
  let x = document.getElementById(progressBar.barId);
  x.style.width = (progressBar.currentXP / progressBar.toNextLevel) * 100 + "%";
  document.getElementById(progressBar.nameId).innerHTML = progressBar.name + progressBar.currentLevel + "%";
}

location[0] = {
  name: "Noobton",
  toRight: 1,
  progressBars: {
    wanderProgressBar: {
      name: "City Explored: ",
      nameId: "cityExplored",
      barId: "wanderProgressBar",
      currentXP: 0,
      currentLevel: 0,
      toNextLevel: 100,
      getNextLevel: function() {
        location[0].progressBars.wanderProgressBar.toNextLevel =
        (location[0].progressBars.wanderProgressBar.currentLevel + 1) * 100;
      },
      checkLevel: function() {
        let x = location[0].progressBars.wanderProgressBar;
        if (x.currentXP >= x.toNextLevel) {
          x.currentLevel++;
          x.totalAmount += x.totalEfficiency;
          x.currentXP = 0;
          x.getNextLevel();
        }
      },
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
  },
};

location[1] = {
  name: "Forest",
  toLeft: 0,
}
