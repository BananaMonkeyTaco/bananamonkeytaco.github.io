var wander = {
  name: "Wander",
  manaCost: 100,
  exploration: "<b>Village Explored XP: 250(1000 with a Map)",
  stats: {
    speed: .2,
    perception: .5,
    intelligence: .3,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    if (location[0].progressBars.wanderProgressBar.currentLevel < 100) {
      let x = location[0].progressBars.wanderProgressBar;
      x.currentXP += (char.hasMap) ? 1000 : 250;
      checkLevel(x);updateProgressBar(x);updateResources(x);updateResourceText(x.resource);
    }
  },
  get tooltip() { return [
    "If you look around the village maybe you can find something to make these cycles longer",
    "<b>Village Explored XP: </b> 250 (1000 with a Map)",
  ]},
};

var smashPots = {
  name:  "SmashPots",
  manaCost: 25,
  manaGain: 50,
  resource: location[0].progressBars.wanderProgressBar.resource,
  stats: {
    speed: .5,
    strength: .4,
    constitution: .1,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    if (document.getElementById("PotsLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        char.mana += this.manaGain;
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      updateResources(location[0].progressBars.wanderProgressBar);
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      char.mana += 50;
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "For whatever reason the villagers here like throwing bits of mana in pots",
    "Reliable pots have " + this.manaGain + " mana in them",
    "Every " + 100 / (this.resource.reliableEfficiency * 100) + " pots are reliable",
  ]},
};

var meetPeople = {
  name: "MeetPeople",
  manaCost: 200,
  stats: {
    charisma: .5,
    intelligence:.2,
    spirit: .3,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function() {
    if (location[0].progressBars.meetPeopleProgressBar.currentLevel < 100) {
      location[0].progressBars.meetPeopleProgressBar.currentXP += 150;
      checkLevel(location[0].progressBars.meetPeopleProgressBar);
      updateProgressBar(location[0].progressBars.meetPeopleProgressBar);
      updateResources(location[0].progressBars.meetPeopleProgressBar);
      updateResourceText(location[0].progressBars.meetPeopleProgressBar.resource);
    }
  },
  get tooltip() { return [
    "Well you're going to be stuck here a while, might as well make some friends",
    "<b>People Met XP: </b> 150"
  ]},
};

var doFavours = {
  name: "DoFavours",
  manaCost: 400,
  goldGain: 5,
  resource: location[0].progressBars.meetPeopleProgressBar.resource,
  stats: {
    speed: .5,
    strength: .3,
    constitution: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    if (document.getElementById("FavoursLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        char.gold += 5;
        updateResourceBox("gold");
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      updateResources(location[0].progressBars.meetPeopleProgressBar);
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      char.gold += 5;
      updateResourceBox("gold");
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "Even though these villagers aren't rich, some might reward you for hard work",
    "Villagers with gold to spare will reward " + this.goldGain + " gold for a favour",
    "Every " + 100 / (this.resource.reliableEfficiency * 100) + " favours will have a reward",
  ]},
};

var investigate = {
  name: "Investigate",
  manaCost: 400,
  stats: {
    intelligence: .5,
    perception: .3,
    dexterity: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function() {
    if (location[0].progressBars.secretsFoundProgressBar.currentLevel < 100) {
      location[0].progressBars.secretsFoundProgressBar.currentXP += 100;
      checkLevel(location[0].progressBars.secretsFoundProgressBar);
      updateProgressBar(location[0].progressBars.secretsFoundProgressBar);
      updateResources(location[0].progressBars.secretsFoundProgressBar);
      updateResourceText(location[0].progressBars.secretsFoundProgressBar.resource);
    }
  },
  get tooltip() { return [
    "Snooping around the village might gain you insight into a few valueable things",
    "<b>Secrets Found XP: </b> 100"
  ]},
};

var steal = {
  name: "Steal",
  manaCost: 1000,
  goldGain: 15,
  resource: location[0].progressBars.secretsFoundProgressBar.resource,
  stats: {
    speed: .6,
    dexterity: .3,
    strength: .1,
    //soul -10%?
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    if (document.getElementById("VillagersRobbedLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        char.gold += 15;
        updateResourceBox("gold");
        char.reputation -= 1;
        updateResourceBox("reputation");
        this.resource.usedAmount++
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      updateResources(location[0].progressBars.secretsFoundProgressBar);
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      char.gold += 15;
      updateResourceBox("gold");
      char.reputation -= 1;
      updateResourceBox("reputation");
      this.resource.usedAmount;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "Gives you more gold than helping the town that's for sure, but you still don't feel good about it",
    "Houses with loot in them have " + this.goldGain + " gold in them",
    "Every " + 100 / (this.resource.reliableEfficiency * 100) + " houses have loot in them",
  ]},
};

var combatTraining = {
  name: "CombatTraining",
  manaCost: 1500,
  stats: {
    strength: .5,
    constitution: .3,
    dexterity: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    increaseSkills(char, "combat", 100);
  },
  get tooltip() { return [
    "There's an old retired soldier who's willing to show you how to fight",
    "<b>Combat Skill XP: </b> 100",
  ]},
};
// TODO: chars
var fightWolves = {
  name: "FightWolves",
  manaCost: 3000,
  stats: {
    strength: .4,
    constitution: .2,
    dexterity: .2,
    speed: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  progress: function(char, multiplier) {
    let stat = undefined;
    let x = 0;
    let bar = 0;
    let last = false;
    for (let i = 0; i < 3; i++) {
      x = document.getElementById("wolfFightingSegment" + i);
      if (Number(x.innerHTML) < x.parentElement.previousElementSibling.childNodes[0].getAttribute("data-goal")) {
        stat = x.parentElement.previousElementSibling.childNodes[0].getAttribute("data-stat");
        bar = x.parentElement.previousElementSibling.childNodes[0];
        if (i == 2) {
          last = true;
        }
        break;
      }
    }
    let progress = 1 * multiplier * (1 + char[stat].level / 100) * (char.combat.level) *
    Math.sqrt(1 + location[0].progressBars.wolfFightingActionBar.completedAmount / 100);
    x.innerHTML = Math.floor(progress + Number(x.innerHTML));
    bar.setAttribute("data-progress", String(Number(bar.getAttribute("data-progress")) + progress));
    bar.style.width = bar.getAttribute("data-progress") / bar.getAttribute("data-goal") * 100 + "%";
    if (Number(bar.getAttribute("data-progress")) >= bar.getAttribute("data-goal")) {
      bar.style.width = "100%";
      x.innerHTML = Number(bar.getAttribute("data-goal"));
      location[0].progressBars.wolfFightingActionBar.completeSegment(char);
      if (last == true) {
        location[0].progressBars.wolfFightingActionBar.completeBar();
        rebuildActionBar(0, "wolfFightingActionBar");
      }
    }
  },
  finish: function() {
  },
  get tooltip() { return [
    "There's a pack of wolves that hide in a nearby cave. You're sure they must have valuables from their previous victims",
    "Progress is earned at a rate of <b>Combat * sqrt(1 + Total Wolves Killed / 100) per "
  ]},
};

var buyMana = {
  name: "BuyMana",
  manaCost: 100,
  stats: {
    charisma: .5,
    perception: .3,
    dexterity: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    char.mana += char.gold * 100;
    char.gold -= char.gold;
    updateResourceBox("gold");
  },
  tooltip: "You can spend all your hard earned gold to get some mana. Luckily the shop owner won't ask questions about where you got the gold",
};

var buyMap = {
  name: "BuyMap",
  manaCost: 100,
  goldCost: 10,
  stats: {
    charisma: .5,
    intelligence: .3,
    perception: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 0 && char.gold >= 10);
  },
  finish: function(char) {
    char.gold -= 10;
    updateResourceBox("gold");
    char.hasMap = true;
    updateItemBox("map", "BuyMap");
  },
  tooltip: "You're sure that having a map will make it easier exploring the area",
};

var buyAxe = {
  name: "BuyAxe",
  manaCost: 100,
  goldCost: 20,
  stats: {
    charisma: 1,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  // TODO: finish
};

var buyGuide = {
  name: "BuyGuide",
  manaCost: 500,
  goldCost: 5,
  stats: {
    charisma: .6,
    intelligence: .3,
    spirit: .1,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    char.gold -= 5;
    updateResourceBox("gold");
    char.hasGuide = true;
    updateItemBox("guide", "BuyGuide");
  },
  get tooltip() { return [
    "The path to the next town isn't an easy one. Luckily one of the villagers will help you, for a price of course",
    "Reduces the mana it takes to travel by 90%"
  ]},
};

var travelToForest = {
  name: "TravelToForest",
  hasSetter: true,
  set manaSet(char) {
    if (char.hasGuide) {
      this.manaCost = 2500;
    } else {
      this.manaCost = 25000 - (location[1].progressBars.mapGameTrailsProgressBar.currentLevel * 225);
    }
  },
  manaCost: null,
  stats: {
    speed: .8,
    constitution: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    if (location[1].visible == false) {
      location[1].visible = true;
      buildTownBox();
    }
    char.currentLocation = 1;
  },
  get tooltip() { return [
    "Start your adventure out of this one horse town. If you have a guide it only costs 10% of the mana",
    "Only costs 2500 mana if you have a guide with you"
  ]},
};

var returnToNoobton = {
  name: "ReturnToNoobton",
  get manaCost() {
    return 25000 - (location[1].progressBars.mapGameTrailsProgressBar.currentLevel * 225);
  },
  stats: {
    speed: .8,
    constitution: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function() {
    currentLocation = 0;
  },
  get tooltip() { return [
    "For whatever reason you can backtrack all the way back to the small village you started this adventure in",
    "Only costs 2500 if you have the guide with you"
  ]},
};

var exploreForest = {
  name: "ExploreForest",
  manaCost: 300,
  stats: {
    constitution: .1,
    perception: .6,
    intelligence: .2,
    speed: .1,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function() {
    if (location[1].progressBars.exploreForestProgressBar.currentLevel < 100) {
      location[1].progressBars.exploreForestProgressBar.currentXP += (hasMap) ? 400 : 100;
      checkLevel(location[1].progressBars.exploreForestProgressBar);
      updateProgressBar(location[1].progressBars.exploreForestProgressBar);
      updateResources(location[1].progressBars.exploreForestProgressBar);
      updateResourceText(location[1].progressBars.exploreForestProgressBar.resource);
    }
  },
  get tooltip() { return [
    "You've got all the time in the world, so why not spend some of it seeing what the forest has to offer?",
    "<b>Forest Explored XP: </b> 100 (400 with a Map)",
  ]},
};

var investigateTrees = {
  name: "InvestigateTrees",
  manaCost: 500,
  stats: {
    constitution: .3,
    perception: .6,
    wisdom: .1,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function() {
    if (location[1].progressBars.investigateTreesProgressBar.currentLevel < 100) {
      location[1].progressBars.investigateTreesProgressBar.currentXP += 100;
      checkLevel(location[1].progressBars.investigateTreesProgressBar);
      updateProgressBar(location[1].progressBars.investigateTreesProgressBar);
      updateResources(location[1].progressBars.investigateTreesProgressBar);
      updateResourceText(location[1].progressBars.investigateTreesProgressBar.resource);
    }
  },
  get tooltip() { return [
    "Some of the trees seem to have magical properties. Maybe you can find some that are ripe to take",
    "<b>Trees Checked XP: </b> 100"
  ]},
};

var absorbManaFromTrees = {
  name: "AbsorbManaFromTrees",
  manaCost: 100,
  get manaGain() {
    return (175 * (1 + Math.pow(character[0].manaFlow.level, 0.3))).toFixed(0);
  },
  resource: location[1].progressBars.investigateTreesProgressBar.resource,
  stats: {
    constitution: .8,
    wisdom: .1,
    spirit: .1,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function() {
    if (document.getElementById("TreesLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        mana += this.manaGain;
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      updateResources(location[1].progressBars.investigateTreesProgressBar);
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      mana += this.manaGain;
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "You can siphon the mana out of these trees. Normally you'd worry about saving the forest, but they'll be back in the next cycle",
    "Mana trees have " + this.manaGain + " in them",
    "Every 5 trees have mana in them",
  ]},
};

var chopTrees = {
  name: "ChopTrees",
  manaCost: 250,
  resource: location[1].progressBars.investigateTreesProgressBar,
  stats: {
    dexterity: .2,
    strength: .6,
    constitution: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function() {
    if (document.getElementById("TreesLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        mana += this.manaGain;
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      updateResources(location[1].progressBars.investigateTreesProgressBar);
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      mana += this.manaGain;
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "Maybe you can make something useful out of these trees",
    "Mana trees can be cut down for 1 mana infused log",
    "Every 5 trees have mana in them",
  ]},
};

var mapGameTrails = {
  name: "MapGameTrails",
  manaCost: 1000,
  stats: {
    dexterity: .3,
    perception: .7,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function() {

  },
  get tooltip() { return [
    "The animals always know the fastest way around the forest. Finding the paths they take should make it easier to travel through the forest",
    "<b>Game Trails Explored XP: </b> 100 (400 with a Map)",
  ]},
};

var huntAnimals = {
  name: "HuntAnimals",
  manaCost: 1500,
  resource: location[1].progressBars.mapGameTrailsProgressBar,
  stats: {
    dexterity: .3,
    intelligence: .2,
    speed: .5,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function() {
    if (document.getElementById("AnimalsLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        pelts += 1;
        updateResourceBox("pelts");
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      updateResources(location[1].progressBars.mapGameTrailsProgressBar);
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      pelts += 1;
      updateResourceBox("pelts");
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "You might be able to sell some of the better pelts, or use them yourself if you think you can",
    "Every 20 animals have useable pelts",
  ]},
};

var talkToDryad = {
  name: "TalkToDryad",
  manaCost: 750,
  stats: {
    constitution: .3,
    wisdom: .5,
    spirit: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function() {
    if (location[1].progressBars.talkToDryadProgressBar.currentLevel < 100) {
      let x = location[1].progressBars.talkToDryadProgressBar;
      x.currentXP += 100;
      checkLevel(x);updateProgressBar(x);updateResources(x);updateResourceText(x);
    }
  },
  get tooltip() { return [
    "The ancient tree spirits might be able to show you some more magical trees that you missed",
    "<b>Dryad Knowledge Learned XP: </b> 100"
  ]},
};

var wizardTraining = {
  name: "WizardTraining",
  manaCost: 1000,
  stats: {
    wisdom: .8,
    spirit: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function() {
    if (location[1].progressBars.wizardTrainingProgressBar.currentLevel < 100) {
      let x = location[1].progressBars.wizardTrainingProgressBar;
      x.currentXP += 100;
      checkLevel(x);updateProgressBar(x);updateResources(x);updateResourceText(x);
    }
  },
  get tooltip() { return [
    "There's an old wizard you've stumbled upon that's agreed to teach you magic",
    "<b>Wizard Training Received XP: </b> 100"
  ]},
};

var searchForElderberries = {
  name: "SearchForElderberries",
  manaCost: 750,
  stats: {
    dexterity: .2,
    perception: .5,
    intelligence: .3,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function(char) {
    if (location[1].progressBars.searchForElderberriesProgressBar.currentLevel < 100) {
      let x = location[1].progressBars.searchForElderberriesProgressBar;
      x.currentXP += (char.hasMap) ? 400 : 100;
      checkLevel(x);updateProgressBar(x);updateResources(x);updateResourceText(x);
    }
  },
  get tooltip() { return [
    "<b>Elderberries Found XP: </b> 100 (400)"
  ]},
};

var pickElderberries = {
  name: "PickElderberries",
  manaCost: 200,
  stats: {
    dexterity: .2,
    speed: .4,
    intelligence: .4,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function() {

  },
  get tooltip() { return [
    ""
  ]},
};

var makeMinorHealthPotion = {
  name: "makeMinorHealthPotion",
  manaCost: 5000,
  stats: {
    dexterity: .1,
    perception: .1,
    intelligence: .4,
    wisdom: .4,
  },
  canStart: function(char) {
    return (char.currentLocation == 1 && char.elderberries >= 5);
  },
  finish: function(char) {
    increaseSkills(char, "alchemy", 100);
  },
  get tooltip() { return [
    "<b>Alchemy XP: </b> 100",
  ]},
}

var trainManaFlow = {
  name: "Train Mana Flow",
  manaCost: 1500,
  stats: {
    wisdom: .9,
    spirit: .1,
  },
  canStart: function(char) {
    return (char.currentLocation == 1 && char.elderberries >= 5);
  },
  finish: function(char) {
    increaseSkills(char, "manaFlow", 100);
  },
  get tooltip() { return [
    "",
    "<b>Mana Flow Skill XP: </b> 100",
  ]},
}

//highwayman blocking route?
/*
var action = {
  name:,
  hasSetter:,
  set ManaSet:,
  manaCost:,
  stats: {

  },
  startCheck: function() {

  },
  finish: function() {

  },
  tooltip: "",
}
*/
