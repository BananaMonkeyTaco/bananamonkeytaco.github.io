var gameplay = false;
var estates = ["mediumMall"];

var player = {
  money: 0,
  hourglass: 0,
  diamonds: 0,
  rareCoins: 0,
}

var city = {
  current: {
    tier: 1,
    cityUpgrades: {
      increaseTickSpeed: 0,
    },
    tierUpgrades: {
      xpBoost: 0,
      autoclickChance: 0,
      globalIncomeFactor: 0,
    }
  },
  cityUpgrades: {
    increaseTickSpeed: {
      name: "Increase Tick Speed",
      bonus: "1%",
      cost: null,
      currency: "",
      activate: function() {
        return;
      },
    },
  },
  tierUpgrades: {
    xpBoost: {
      name: "XP Boost",
      bonus: "5%",
      cost: null,
      currency: "rareCoins",
      activate: function() {
        return;
      },
    },
    autoclickChance: {
      name: "Autoclick Chance",
      bonus: "0.01% p/sec",
      cost: null,
      currency: "rareCoins",
      activate: function() {
        return;
      },
    },
    globalIncomeFactor: {
      name: "Global Income Factor",
      bonus: "x1.01",
      cost: null,
      currency: "rareCoins",
      activate: function() {
        return;
      }
    }
  },
}

var mediumMall = {
  name: "Medium Mall",
  bought: true,
  cooldown: null,
  payoff: null,
  maxHolding: null,
  default: {
    bought: true,
    cooldown: 8,
    payoff: 1000,
    maxHolding: 10000,
  },
  current: {
    cooldown: 0,
    progress: 0,
    holding: 0,
    lowerCooldown: 0,
    increaseMaxHoldings: 0,
    incomeFactor: 0,
  },
  upgrades: {
    lowerCooldown: {
      name: "Lower Cooldown",
      bonus: "-1%",
      cost: null,
      activate: function() {
        mediumMall.cooldown = mediumMall.default.cooldown * Math.pow(0.99, mediumMall.current.lowerCooldown);
        this.cost = 1000 * Math.pow(2, mediumMall.current.lowerCooldown);
        if (gameplay) {
          document.getElementById("mediumMall").children[0].children[2].innerHTML =
          "cooldown: " + mediumMall.cooldown + "s";
        }
      },
    },
    increaseMaxHoldings: {
      name: "Increase Maximum Holdings",
      bonus: "5%",
      cost: null,
      activate: function() {
        mediumMall.maxHolding = mediumMall.default.maxHolding * Math.pow(1.05, mediumMall.current.increaseMaxHoldings);
        this.cost = 250000 * Math.pow(2, mediumMall.current.increaseMaxHoldings);
        if (gameplay) {
          document.getElementById("mediumMall").children[2].innerHTML =
          mediumMall.current.holding + " / " + mediumMall.maxHolding;
        }
      },
    },
    incomeFactor: {
      name: "Increase Factor",
      bonus: "1.01x",
      cost: null,
      activate: function() {
        mediumMall.payoff = mediumMall.default.payoff * Math.pow(1.01, mediumMall.current.incomeFactor);
        this.cost = 100000 * Math.pow(2, mediumMall.current.incomeFactor);
        if (gameplay) {
          document.getElementById("mediumMall").children[0].children[1].innerHTML =
          mediumMall.payoff + " p/tick";
        }
      },
    },
  },
}
