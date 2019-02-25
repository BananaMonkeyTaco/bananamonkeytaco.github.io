var wander = {
  name: "Wander",
  manaCost: 100,
  stats: {
    speed: .2,
    perception: .5,
    intelligence: .3,
  },
  canStart: true,
  finish: function() {
    if (location[0].progressBars.wanderProgressBar.currentLevel < 100) {
      location[0].progressBars.wanderProgressBar.currentXP += (hasMap) ? 400 : 100;
      checkLevel(location[0].progressBars.wanderProgressBar);
      updateProgressBar(location[0].progressBars.wanderProgressBar);
      updateResources(location[0].progressBars.wanderProgressBar.resource);
      updateResourceText(location[0].progressBars.wanderProgressBar.resource);
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
  canStart: true,
  finish: function() {
    if (document.getElementById("PotsLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        mana += this.manaGain;
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.uncheckedAmount--;
      updateResources(location[0].progressBars.wanderProgressBar.resource);
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      mana += 50;
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "For whatever reason the villagers here like throwing bits of mana in pots",
    "Reliable pots have " + this.manaGain + " mana in them",
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
  canStart: true,
  finish: function() {
    if (location[0].progressBars.meetPeopleProgressBar.currentLevel < 100) {
      location[0].progressBars.meetPeopleProgressBar.currentXP += 100;
      checkLevel(location[0].progressBars.meetPeopleProgressBar);
      updateProgressBar(location[0].progressBars.meetPeopleProgressBar);
      updateResources(location[0].progressBars.meetPeopleProgressBar.resource);
      updateResourceText(location[0].progressBars.meetPeopleProgressBar.resource);
    }
  },
  tooltip: "Well you're going to be stuck here a while, might as well make some friends",
};

var doFavours = {
  name: "DoFavours",
  manaCost: 100,
  goldGain: 1,
  resource: location[0].progressBars.meetPeopleProgressBar.resource,
  stats: {
    speed: .5,
    strength: .3,
    constitution: .2,
  },
  canStart: true,
  finish: function() {
    if (document.getElementById("FavoursLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        gold += 1;
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.uncheckedAmount--;
      updateResources(location[0].progressBars.meetPeopleProgressBar.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      gold += 1;
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return ["Even though these villagers aren't rich, some might reward you for hard work",
    "Villagers with gold to spare will reward " + this.goldGain + " gold for a favour"
  ]},
};

var investigate = {
  name: "Investigate",
  manaCost: 100,
  stats: {
    intelligence: .5,
    perception: .3,
    speed: .2, //maybe something better
  },
  canStart: true,
  finish: function() {
    if (location[0].progressBars.secretsFoundProgressBar.currentLevel < 100) {
      location[0].progressBars.secretsFoundProgressBar.currentXP += 100;
      checkLevel(location[0].progressBars.secretsFoundProgressBar);
      updateProgressBar(location[0].progressBars.secretsFoundProgressBar);
      updateResources(location[0].progressBars.secretsFoundProgressBar.resource);
      updateResourceText(location[0].progressBars.secretsFoundProgressBar.resource);
    }
  },
  tooltip: "Snooping around the village might gain you insight into a few valueable things",
};

var steal = {
  name: "Steal",
  manaCost: 500,
  goldGain: 10,
  resource: location[0].progressBars.secretsFoundProgressBar.resource,
  stats: {
    speed: .6,
    dexterity: .3,
    strength: .3,
    //soul -10%?
  },
  canStart: true,
  finish: function() {
    if (document.getElementById("VillagersRobbedLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        gold += 10;
        reputation -= 1;
        this.resource.usedAmount++
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.uncheckedAmount--;
      updateResources(location[0].progressBars.secretsFoundProgressBar.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      gold += 10;
      reputation -= 1;
      this.resource.usedAmount;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "Gives you more gold than helping the town that's for sure, but you still don't feel good about it",
    "Houses with loot in them have " + this.goldGain + " gold in them"
  ] }
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
  canStart: function() {
    return (gold >= 10);
  },
  finish: function() {
    gold -= 10;
    hasMap = true;
  },
  tooltip: "You're sure that having a map will make it easier exploring the area",
};

var combatTraining = {
  name: "CombatTraining",
  manaCost: 1500,
  stats: {
    strength: .5,
    constitution: .3,
    dexterity: .2,
  },
  canStart: true,
  finish: function() {
    increaseSkills("combat", 100);
  },
  tooltip: "There's an old retired soldier who's willing to show you how to fight",
};

var fightWolves = {
  name: "FightWolves",
  manaCost: 3000,
  stats: {
    strength: .4,
    constitution: .2,
    dexterity: .2,
    speed: .2,
  },
  canStart: true,
  progress: function(multiplier) {
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
    let progress = 1 * multiplier * (1 + characters[0][stat].level / 100) * (characters[0].combat.level) *
    (1 + location[0].actionBars.wolfFightingActionBar.completedAmount);
    x.innerHTML = progress + Number(x.innerHTML);
    bar.setAttribute("data-progress", String(Number(bar.getAttribute("data-progress")) + progress));
    bar.style.width = bar.getAttribute("data-progress") / bar.getAttribute("data-goal") * 100 + "%";
    if (Number(bar.getAttribute("data-progress")) >= bar.getAttribute("data-goal")) {
      bar.style.width = "100%";
      location[0].actionBars.wolfFightingActionBar.completeSegment();
      if (last == true) {
        location[0].actionBars.wolfFightingActionBar.completeBar();
        rebuildActionBar(0, "wolfFightingActionBar");
      }
    }
  },
  finish: function() {
  },
  tooltip: "There's a pack of wolves that hide in a nearby cave. You're sure they must have valuables from their previous victims",
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
  canStart: function() {
    if (gold >= 5);
  },
  finish: function() {
    gold -= 5;
    hasGuide = true;
  },
  tooltip: "The path to the next town isn't an easy one. Luckily one of the villagers will help you, for a price of course",
};

var travelToForest = {
  name: "",
  get manaCost() {
    return (hasGuide) ? 2500 : 25000
  },
  stats: {
    speed: .8,
    constitution: .2,
  },
  canStart: true,
  finish: function() {

  },
  tooltip: "Start your adventure out of this one horse town. If you have a guide it only costs 10% of the mana",
};

var buyMana = {
  name: "BuyMana",
  manaCost: 100,
  stats: {
    charisma: .5,
    perception: .3,
    dexterity: .2,
  },
  canStart: true,
  finish: function() {
    mana += gold * 100;
    gold -= gold;
  },
  tooltip: "You can spend all your hard earned gold to get some mana. Luckily the shop owner won't ask questions about where you got the gold",
};


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
  unlocksCheck: function() {

  },
}
*/
