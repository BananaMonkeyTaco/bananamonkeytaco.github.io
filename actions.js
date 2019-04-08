var wander = {
  name: "Wander",
  manaCost: 100,
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
      x.currentXP += (char.hasMap) ? 400 : 100;
      checkLevel(x);updateProgressBar(x);updateResources(x);updateResourceText(x.resource);
    }
  },
  tooltip: "If you look around the village maybe you can find something to make these cycles longer",
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
    "Every " + this.resource.reliableEfficiency * 100 + " pots are reliable",
  ]},
};

var meetPeople = {
  name: "MeetPeople",
  manaCost: 250,
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
      location[0].progressBars.meetPeopleProgressBar.currentXP += 100;
      checkLevel(location[0].progressBars.meetPeopleProgressBar);
      updateProgressBar(location[0].progressBars.meetPeopleProgressBar);
      updateResources(location[0].progressBars.meetPeopleProgressBar);
      updateResourceText(location[0].progressBars.meetPeopleProgressBar.resource);
    }
  },
  tooltip: "Well you're going to be stuck here a while, might as well make some friends",
};

var doFavours = {
  name: "DoFavours",
  manaCost: 250,
  goldGain: 3,
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
        char.gold += 1;
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
      char.gold += 1;
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "Even though these villagers aren't rich, some might reward you for hard work",
    "Villagers with gold to spare will reward " + this.goldGain + " gold for a favour",
    "Every " + this.resource.reliableEfficiency * 100 + " favours will have a reward",
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
  tooltip: "Snooping around the village might gain you insight into a few valueable things",
};

var steal = {
  name: "Steal",
  manaCost: 600,
  goldGain: 10,
  resource: location[0].progressBars.secretsFoundProgressBar.resource,
  stats: {
    speed: .6,
    dexterity: .3,
    strength: .3,
    //soul -10%?
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    if (document.getElementById("VillagersRobbedLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        char.gold += 10;
        char.reputation -= 1;
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
      char.gold += 10;
      char.reputation -= 1;
      this.resource.usedAmount;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "Gives you more gold than helping the town that's for sure, but you still don't feel good about it",
    "Houses with loot in them have " + this.goldGain + " gold in them",
    "Every " + this.resource.reliableEfficiency * 100 + " houses have loot in them",
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
  tooltip: "There's an old retired soldier who's willing to show you how to fight",
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
      if (Number(x.innerHTML) < x.parentElement.previousElementSibling.getAttribute("data-goal")) {
        stat = x.parentElement.previousElementSibling.getAttribute("data-stat");
        bar = x.parentElement.previousElementSibling;
        if (i == 2) {
          last = true;
        }
        break;
      }
    }
    let progress = 1 * multiplier * (1 + char[stat].level / 100) * (char.combat.level) *
    (1 + location[0].progressBars.wolfFightingActionBar.completedAmount);
    x.innerHTML = progress + Number(x.innerHTML);
    bar.setAttribute("data-progress", String(Number(bar.getAttribute("data-progress")) + progress));
    bar.style.width = bar.getAttribute("data-progress") / bar.getAttribute("data-goal") * 100 + "%";
    if (Number(bar.getAttribute("data-progress")) >= bar.getAttribute("data-goal")) {
      bar.style.width = "100%";
      location[0].progressBars.wolfFightingActionBar.completeSegment();
      if (last == true) {
        location[0].progressBars.wolfFightingActionBar.completeBar();
        rebuildActionBar(0, "wolfFightingActionBar");
      }
    }
  },
  finish: function() {
  },
  tooltip: "There's a pack of wolves that hide in a nearby cave. You're sure they must have valuables from their previous victims",
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
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    char.gold -= 10;
    char.hasMap = true;
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
    char.hasGuide = true;
  },
  get tooltip() { return [
    "The path to the next town isn't an easy one. Luckily one of the villagers will help you, for a price of course",
    "Reduces the mana it takes to travel by 90%"
  ]},
};

var travelToForest = {
  name: "",
  get manaCost() {
    return (hasGuide) ? 2500 : (25000 - (location[1].progressBars.mapGameTrailsProgressBar.currentLevel * 225));
  },
  stats: {
    speed: .8,
    constitution: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function() {
    location[1].visible = true;
    currentLocation = 1;
  },
  get tooltip() { return [
    "Start your adventure out of this one horse town. If you have a guide it only costs 10% of the mana",
    "Only costs 2500 mana if you have a guide with you"
  ]},
};

var returnToNoobton = {
  name: "ReturnToNoobton",
  get manaCost() {
    return (hasGuide) ? 2500 : (25000 - (location[1].progressBars.mapGameTrailsProgressBar.currentLevel * 225));
  },
  stats: {
    speed: .8,
    constitution: .2,
  },
  get canStart() {
    return (currentLocation == 1);
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
  get canStart() {
    return (currentLocation == 1);
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
  tooltip: "You've got all the time in the world, so why not spend some of it seeing what the forest has to offer?",
};

var investigateTrees = {
  name: "InvestigateTrees",
  manaCost: 500,
  stats: {
    constitution: .3,
    perception: .6,
    wisdom: .1,
  },
  get canStart() {
    return (currentLocation == 1);
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
  tooltip: "Some of the trees seem to have magical properties. Maybe you can find some that are ripe to take",
};

var absorbManaFromTrees = {
  name: "AbsorbManaFromTrees",
  manaCost: 100,
  manaGain: 175,
  resource: location[1].progressBars.investigateTreesProgressBar.resource,
  stats: {
    constitution: .8,
    wisdom: .1,
    spirit: .1,
  },
  get canStart() {
    return (currentLocation == 1);
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
  tooltip: "You can siphon the mana out of these trees. Normally you'd worry about saving the forest, but they'll be back in the next cycle",
};
//explore forest 100 = circus traval
//game trails reduce travel costs
//game hunt for gold give pelts
var chopTrees = {
  name: "ChopTrees",
  manaCost: 250,
  resource: location[1].progressBars.investigateTreesProgressBar,
  stats: {
    dexterity: .2,
    strength: .6,
    constitution: .2,
  },
  get canStart() {
    return (currentLocation == 1);
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
  tooltip: "",
};

var mapGameTrails = {
  name: "MapGameTrails",
  manaCost: 0,
  stats: {

  },
  get canStart() {
    return (currentLocation == 1);
  },
  finish: function() {

  },
  tooltip: "",
};

var huntAnimals = {
  name: "HuntAnimals",
  manaCost: 0,
  resource: location[1].progressBars.mapGameTrailsProgressBar,
  stats: {

  },
  get canStart() {
    return (currentLocation == 1);
  },
  finish: function() {
    if (document.getElementById("AnimalsLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        pelts += 1;
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
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  tooltip: "",
};

var talkToDryad = {
  name: "TalkToDryad",
  manaCost: 0,
  stats: {

  },
  get canStart() {
    return (currentLocation == 1);
  },
  finish: function() {
    if (location[1].progressBars.talkToDryadProgressBar.currentLevel < 100) {
      let x = location[1].progressBars.talkToDryadProgressBar;
      x.currentXP += 100;
      checkLevel(x);updateProgressBar(x);updateResources(x);updateResourceText(x);
    }
  },
  tooltip: "",
};

//highwayman blocking route?
/*
var action = {
  name:,
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
