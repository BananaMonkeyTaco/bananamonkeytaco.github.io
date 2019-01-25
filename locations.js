var location;
var currentLocation = 0;

function changeLocation(direction) {
  switch (direction) {
    case "left":
      direction = "toLeft";
      break;
    case "right":
      direction = "toRight";
      break;
  }
  if (location[currentLocation][direction] != undefined) {
    currentLocation = location[currentLocation][direction];
  }
}

function buildTownBox() {
  let newTownBox = "";
  newTownBox += "<div class='townName'>";
  if (location[currentLocation].toLeft != undefined) {
    newTownBox +=
    "<button type='button' onclick=changeLocation('left')> < </button>";
  }
  newTownBox += "<span class='townName'>" +
  location[currentLocation].name; +
  "</span>";
  if (location[currentLocation].toRight != undefined) {
    newTownBox +=
    "<button type='button' onclick=changeLocation('right')> > </button>";
  }
  newTownBox += "</div>";
  newTownBox += "<div class='townProgressBars'>";
  for (x in location[currentLocation].progressBars) {
    if (location[currentLocation].progressBars[x].visible) {
      newTownBox += "<div class=progressBarEmpty>" +
      "<div class=progressBarFill id=" + x + "></div></div>";
    }
  }
  newTownBox += "</div>";
  newTownBox += "<div class=townButtons>";
  for (x in location[currentLocation].buttons) {
    if (location[currentLocation].buttons[x].visible) {
      newTownBox +=
      "<button type='button' onclick=addAction(" + x + ")>" +
      location[currentLocation].buttons[x].name +
      "</button>";
    }
  }
  newTownBox += "</div>";





  newTownBox += "</div>";
  document.getElementById("townBox").innerHTML = newTownBox;
}

location[0] = {
  name: "Noobton",
  toRight: 1,
  progressBars: {
    wanderProgressBar: {
      currentXP: 0,
      currentLevel: 0,
      visible: true,
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
