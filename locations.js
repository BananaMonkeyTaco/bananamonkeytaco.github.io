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

location[0] = {
  name: "Noobton",
  toRight: 1,
};

location[1] = {
  name: "Forest",
  toLeft: 0,
}
