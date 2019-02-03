var directions = ["toNorthWest", "toNorth", "toNorthEast", "toWest", "name",
"toEast", "toSouthWest", "toSouth", "toSouthEast"];
var point = [225, 270, 315, 180, 0, 0, 135, 90, 45];

function buildTownBox() {
  let newTownBox = "";
  let resourcesToUpdate = [];
  let progressBarsToUpdate = [];

  newTownBox += "<div class=townName>";

  for (let i = 0; i < directions.length; i++) {
    newTownBox += "<div>";
    let y = directions[i];
    if (location[currentLocation][y] != undefined) {
      if (y != "name") {
        newTownBox += "<i class='actionButton fas fa-arrow-right' style=transform:rotate(" +
        point[i] + "deg) onclick=changeLocation('" + y + "')></i>";
      } else {
        newTownBox += "<div>" + location[currentLocation][y] + "</div>";
      }
    }
    newTownBox += "</div>";
  }
  newTownBox += "</div>";
}
