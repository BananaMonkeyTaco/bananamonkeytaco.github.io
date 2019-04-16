function start() {
  buildPlayer();
  activateUpgrades();
  buildEstates();
  gameplay = true;
  setInterval(work, 100);
  setInterval(save, 10000);
}

function work() {
  let x = document.getElementById("estates");
  for (let i = 1; i < x.children.length; i++) {
    let estate = window[x.children[i].id];
    estate.current.progress += 100 / (estate.cooldown * 10);
    if (estate.current.progress >= 100) {
      estate.current.progress = 0;
      estate.current.holding += estate.payoff;
      if (estate.current.holding >= estate.maxHolding) {
        estate.current.holding = estate.maxHolding;
      }
      x.children[i].children[2].innerHTML = estate.current.holding + " / " + estate.maxHolding;
    }
    x.children[i].children[1].innerHTML = (estate.current.progress).toFixed(2) + "%";
  }
}

function buildPlayer() {
  document.getElementById("cityTier").innerHTML = "Tier " + city.tier + " City";
  document.getElementById("playerMoney").innerHTML = "$" + player.money;
  document.getElementById("playerHourglass").innerHTML = player.hourglass + " Hourglass Points";
  document.getElementById("playerDiamond").innerHTML = player.diamonds + " Diamonds";
  document.getElementById("playerRareCoins").innerHTML = player.rareCoins + " Rare Coins";
}

function activateUpgrades() {
  for (let i = 0; i < estates.length; i++) {
    for (let x in window[estates[i]].upgrades) {
      window[estates[i]].upgrades[x].activate();
    }
  }
}

function buildEstates() {
  let x = document.getElementById("estates");
  let y = document.getElementById("interactionBox");
  for (let i = 0; i < estates.length; i++) {
    let estate;
    let estateDiv;
    let estateName;
    let estateButtons;
    let tempElement;
    estate = window[estates[i]];
    estateDiv = document.createElement("div");
    estateDiv.id = estates[i];
    estateDiv.className = "estate";
    estateName = document.createElement("span");
    estateName.className = "estateNameBox";
    tempElement = document.createElement("span");
    tempElement.className = "estateName";
    tempElement.innerHTML = estate.name;
    estateName.appendChild(tempElement);
    tempElement = document.createElement("span");
    tempElement.className = "estateIncrease";
    tempElement.innerHTML = estate.payoff + " p/tick";
    estateName.appendChild(tempElement);
    tempElement = document.createElement("span");
    tempElement.className = "estateIncrease";
    tempElement.innerHTML = "cooldown: " + estate.cooldown + "s";
    estateName.appendChild(tempElement);
    estateDiv.appendChild(estateName);
    tempElement = document.createElement("span");
    tempElement.className = "estateProgress";
    tempElement.innerHTML = estate.current.progress + "%";
    estateDiv.appendChild(tempElement);
    tempElement = document.createElement("span");
    tempElement.className = "estateHolding";
    tempElement.innerHTML = estate.current.holding + " / " + estate.maxHolding;
    estateDiv.appendChild(tempElement);
    estateButtons = document.createElement("span");
    estateButtons.className = "estateButtons";
    tempElement = document.createElement("span");
    tempElement.className = "button";
    tempElement.innerHTML = "Collect";
    tempElement.addEventListener("click", collect);
    estateButtons.appendChild(tempElement);
    tempElement = document.createElement("span");
    tempElement.className = "button";
    tempElement.innerHTML = "Upgrades";
    tempElement.addEventListener("click", showUpgrades);
    estateButtons.appendChild(tempElement);
    estateDiv.appendChild(estateButtons);
    x.appendChild(estateDiv);
    //upgrade box
    estateDiv = document.createElement("div");
    estateDiv.id = estates[i] + "UpgradeSheet";
    estateDiv.className = "upgradeSheet";
    estateDiv.style.display = "none";
    tempElement = document.createElement("div");
    tempElement.className = "exitButton";
    tempElement.innerHTML = "X";
    tempElement.addEventListener("click", closeUpgrades);
    estateDiv.appendChild(tempElement);
    tempElement = document.createElement("div");
    tempElement.innerHTML = estate.name + " Upgrades";
    estateDiv.appendChild(tempElement);
    for (let z in estate.upgrades) {
      let upgradeDiv = document.createElement("div");
      upgradeDiv.id = z;
      tempElement = document.createElement("span");
      tempElement.className = "upgradeName";
      tempElement.innerHTML = estate.upgrades[z].name;
      upgradeDiv.appendChild(tempElement);
      tempElement = document.createElement("span");
      tempElement.className = "upgradeBonus";
      tempElement.innerHTML = estate.upgrades[z].bonus;
      upgradeDiv.appendChild(tempElement);
      tempElement = document.createElement("span");
      tempElement.className = "upgradeButton";
      tempElement.innerHTML = estate.upgrades[z].cost;
      tempElement.addEventListener("click", upgrade);
      upgradeDiv.appendChild(tempElement);
      estateDiv.appendChild(upgradeDiv);
    }
    y.appendChild(estateDiv);
  }
  let cityDiv;
  let tempElement;
  cityDiv = document.createElement("div");
  cityDiv.className = "upgradesTitle";
  cityDiv.style.display = "none";
  cityDiv.innerHTML = "City Upgrades";
  for (let x in city.cityUpgrades) {
    let upgradeDiv;
    let tempElement;
    upgradeDiv = document.createElement("div");
    upgradeDiv.id = "cityUpgrades";
    upgradeDiv.style.display = "none";
    tempElement = document.createElement("span");
    tempElement.className = "upgradeName";
    tempElement.innerHTML = city.cityUpgrades[x].name;
    upgradeDiv.appendChild(tempElement);
    tempElement = document.createElement("span");
    tempElement.className = "upgradeBonus";
    tempElement.innerHTML = city.cityUpgrades[x].bonus;
    upgradeDiv.appendChild(tempElement);
    tempElement = document.createElement("span");
    tempElement.className = "upgradeButton";
    tempElement.innerHTML = city.cityUpgrades[x].cost;
    tempElement.addEventListener("click", cityUpgrade);
    upgradeDiv.appendChild(tempElement);
    cityDiv.appendChild(upgradeDiv);
  }
  y.appendChild(cityDiv);
  tierDiv = document.createElement("div");
  tierDiv.className = "upgradesTitle";
  tierDiv.style.display = "none";
  tierDiv.innerHTML = "Tier Upgrades";
  for (let x in city.tierUpgrades) {
    let upgradeDiv;
    let tempElement;
    upgradeDiv = document.createElement("div");
    upgradeDiv.id = "tierUpgrades";
    upgradeDiv.style.display = "none";
    tempElement = document.createElement("span")
    tempElement.className = "upgradeName";
    tempElement.innerHTML = city.tierUpgrades[x].name;
    upgrades.appendChild(tempElement);
    tempElement = document.createElement("span");
    tempElement.className = "upgradeBonus";
    tempElement.innerHTML = city.tierUpgrades[x].bonus;
    upgradeDiv.appendChild(tempElement);
    tempElement = document.createElement("span");
    tempElement.className = "upgradeButton";
    tempElement.innerHTML = city.tierUpgrades[x].cost;
    tempElement.addEventListener("click", tierUpgrade);
    upgradeDiv.appendChild(tempElement);
    tierDiv.appendChild(upgradeDiv);
  }
  y.appendChild(tierDiv);
}

function collect(node) {
  node = node.target.parentElement.parentElement;
  let estate = window[node.id];
  player.money += estate.current.holding;
  estate.current.holding = 0;
  document.getElementById("playerMoney").innerHTML = "$" + player.money;
  node.children[2].innerHTML = estate.current.holding + " / " + estate.maxHolding;
  return;
}

function showUpgrades(node) {
  let x = document.getElementById("interactionBox");
  for (let i = 0; i < x.childElementCount; i++) {
    x.children[i].style.display = "none";
  }
  let estate = node.target.parentElement.parentElement.id;
  node = estate + "UpgradeSheet"
  document.getElementById(node).style.display = "block";
}

function showCityUpgrades() {
  return;
}

function showTierUpgrades() {
  return;
}

function closeUpgrades() {
  let x = document.getElementById("interactionBox");
  for (let i = 0; i < x .childElementCount; i++) {
    x.children[i].style.display = "none";
  }
  document.getElementById("estates").style.display = "block";
}

function upgrade(node) {
  let cost = Number(node.target.innerHTML);
  if (player.money >= cost) {
    let upgrade = node.target.parentElement.id;
    /*
      estate = node.target.parentElement.parentElement.id
      estate = estate.split("UpgradeSheet")[0]
      estate = window[estate]
    */
    let estate = window[(node.target.parentElement.parentElement.id).split("UpgradeSheet")[0]];
    console.log(upgrade)
    player.money -= cost;
    estate.current[upgrade]++;
    estate.upgrades[upgrade].activate();
    cost = estate.upgrades[upgrade].cost
  }
}
