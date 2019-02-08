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
  for (i = 0; i < document.getElementById("townBox").childElementCount; i++) {
    let town = document.getElementById("town" + i);
    townName = document.createElement("div");
    townName.className = "townName";
    for (j = 0; j < directions.length; j++) {
      x = directions[j];
      box = document.createElement("div");
      if (location[i][x] != undefined) {
        if (x != "name") {
          arrow = document.createElement("i");
          arrow.className = "actionButton fas fa-arrow-right";
          arrow.style.transform = 'rotate(point[j] + "deg")';
          arrow.onclick = function() {
            location[i].display = none;
            location[i][x].display = block;
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
    for (x in location[0].buttons) {
      console.log(x);
      console.log(townButtons);
      if (location[0].buttons[x].visible == true) {
        button = document.createElement("div");
        button.className = "button";
        button.onclick = function() {
          addAction(x);
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
