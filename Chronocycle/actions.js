var wander = {
  name: "Wander",
  manaCost: function(char) {
    return 100;
  },
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
  manaCost: function(char) {
    return 25;
  },
  manaGain: function(char) {
    return 50;
  },
  resource: location[0].progressBars.wanderProgressBar.resource,
  stats: {
    strength: .4,
    constitution: .1,
    speed: .5,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    if (document.getElementById("PotsLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        char.mana += this.manaGain(char);
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      let tempReliable = this.resource.reliableAmount;
      updateResources(location[0].progressBars.wanderProgressBar);
      if (tempReliable < this.resource.reliableAmount) {
        char.mana += this.manaGain(char);
        this.resource.usedAmount++;
      }
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      char.mana += this.manaGain(char);
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "For whatever reason the villagers here like throwing bits of mana in pots",
    "Reliable pots have " + this.manaGain(character[currentCharacter]) + " mana in them",
    "Every " + 100 / (this.resource.reliableEfficiency * 100) + " pots are reliable",
  ]},
};

var meetPeople = {
  name: "MeetPeople",
  manaCost: function(char) {
    return 200;
  },
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
  manaCost: function(char) {
    return 400;
  },
  goldGain: function(char) {
    return 5;
  },
  resource: location[0].progressBars.meetPeopleProgressBar.resource,
  stats: {
    strength: .3,
    constitution: .2,
    speed: .5,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    if (document.getElementById("FavoursLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        char.gold += this.goldGain(char);
        updateResourceBox("gold");
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      let tempReliable = this.resource.reliableAmount;
      updateResources(location[0].progressBars.meetPeopleProgressBar);
      if (tempReliable < this.resource.reliableAmount) {
        char.gold += this.goldGain(char);
        updateResourceBox("gold");
        this.resource.usedAmount++;
      }
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      char.gold += this.goldGain(char);
      updateResourceBox("gold");
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "Even though these villagers aren't rich, some might reward you for hard work",
    "Villagers with gold to spare will reward " + this.goldGain(character[currentCharacter]) + " gold for a favour",
    "Every " + 100 / (this.resource.reliableEfficiency * 100) + " favours will have a reward",
  ]},
};

var investigate = {
  name: "Investigate",
  manaCost: function(char) {
    return 400;
  },
  stats: {
    dexterity: .2,
    perception: .3,
    intelligence: .5,
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
  manaCost: function(char) {
    return 1000;
  },
  goldGain: function(char) {
    return 15;
  },
  reputationChange: function(char) {
    return -1;
  },
  resource: location[0].progressBars.secretsFoundProgressBar.resource,
  stats: {
    dexterity: .3,
    strength: .1,
    speed: .6,
    //soul -10%?
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    if (document.getElementById("VillagersRobbedLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        char.gold += this.goldGain(char);
        updateResourceBox("gold");
        char.reputation -= 1;
        updateResourceBox("reputation");
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      let tempReliable = this.resource.reliableAmount;
      updateResources(location[0].progressBars.secretsFoundProgressBar);
      if (tempReliable < this.resource.reliableAmount) {
        char.gold += this.goldGain(char);
        this.resource.usedAmount++;
      }
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      char.gold += this.goldGain(char);
      updateResourceBox("gold");
      char.reputation -= 1;
      updateResourceBox("reputation");
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "Gives you more gold than helping the town that's for sure, but you still don't feel good about it",
    "Houses with loot in them have " + this.goldGain(character[currentCharacter]) + " gold in them",
    "Every " + 100 / (this.resource.reliableEfficiency * 100) + " houses have loot in them",
  ]},
};

var combatTraining = {
  name: "CombatTraining",
  manaCost: function(char) {
    return 1500;
  },
  stats: {
    dexterity: .2,
    strength: .5,
    constitution: .3,
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

var fightWolves = {
  name: "FightWolves",
  manaCost: function(char) {
    return 3000;
  },
  stats: {
    dexterity: .2,
    strength: .4,
    constitution: .2,
    speed: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  progress: function(char) {
    let x = location[0].progressBars.wolfFightingActionBar;
    let y = document.getElementById("fightWolvesActionBar");
    let segment;
    let num;
    //Find out which segment we're on
    for (let i = 1; i < 4; i++) {
      if (x["segment" + i].progress < x["segment" + i].goal) {
        segment = x["segment" + i];
        num = i;
        break;
      }
    }
    //Increase the progress for the segment
    segment.progress += 1 * char.multiplier * (1 + char[segment.stat].level / 100) * (char.combat.level) *
    Math.sqrt(1 + location[0].progressBars.wolfFightingActionBar.completedAmount / 100);
    //When the segment is completed
    if (segment.progress >= segment.goal) {
      segment.progress = segment.goal;
      //The character's reward
      char.gold += 30;
      updateResourceBox("gold");
      if (num == 3) {
        //Give the character a pelt for each kill
        char.pelts++;
        updateResourceBox("pelts");
        //Resetting the bar with higher values
        x.segment1.progress = 0;
        x.segment1.goal = fibonacci(x.segment2.goal, x.segment3.goal);
        y.childNodes[0].childNodes[0].childNodes[0].style.width = "100%";
        y.childNodes[0].childNodes[1].innerHTML =
        "<b>Stat: " + capitalize(segment.stat) + "</b><br>Progress: " + segment.progress.toFixed(0) + "/" + segment.goal;
        x.segment2.progress = 0;
        x.segment2.goal = fibonacci(x.segment3.goal, x.segment1.goal);
        y.childNodes[1].childNodes[0].childNodes[0].style.width = "100%";
        y.childNodes[1].childNodes[1].innerHTML =
        "<b>Stat: " + capitalize(segment.stat) + "</b><br>Progress: " + segment.progress.toFixed(0) + "/" + segment.goal;
        x.segment3.progress = 0;
        x.segment3.goal = fibonacci(x.segment1.goal, x.segment2.goal);
        y.childNodes[2].childNodes[0].childNodes[0].style.width = "100%";
        y.childNodes[2].childNodes[1].innerHTML =
        "<b>Stat: " + capitalize(segment.stat) + "</b><br>Progress: " + segment.progress.toFixed(0) + "/" + segment.goal;
        x.completedAmount++;
      }
    }
    //Update the bar and tooltip
    y.childNodes[num - 1].childNodes[0].childNodes[0].style.width =
    (100 - ((segment.progress / segment.goal) * 100) + "%");
    y.childNodes[num - 1].childNodes[1].innerHTML =
    "<b>Stat: " + capitalize(segment.stat) + "</b><br>Progress: " + segment.progress.toFixed(0) + "/" + segment.goal;
  },
  finish: function() {},
  get tooltip() { return [
    "There's a pack of wolves that hide in a nearby cave. You're sure they must have valuables from their previous victims, 30 gold perhaps?",
    "Progress is earned at a rate of <b>Combat * sqrt(1 + Total Wolves Killed / 100) * 3000 over the course of the action",
  ]},
}

var buyMana = {
  name: "BuyMana",
  manaCost: function(char) {
    return 100;
  },
  stats: {
    dexterity: .2,
    perception: .3,
    charisma: .5,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    char.mana += char.gold * 100;
    char.gold = 0;
    updateResourceBox("gold");
  },
  get tooltip() { return [
    "You can spend all your hard earned gold to get some mana. Luckily the shop owner won't ask questions about where you got the gold",
    "1 Gold will buy you 100 Mana",
  ]},
};

var buyMap = {
  name: "BuyMap",
  manaCost: function(char) {
    return 100;
  },
  goldCost: function(char) {
    return 10;
  },
  stats: {
    perception: .2,
    charisma: .5,
    intelligence: .3,
  },
  canStart: function(char) {
    return (char.currentLocation == 0 && char.gold >= 10);
  },
  finish: function(char) {
    char.gold -= this.goldCost(char);
    updateResourceBox("gold");
    char.hasMap = true;
    updateItemBox("map", "BuyMap");
  },
  tooltip: "You're sure that having a map will make it easier exploring the area",
};

var buyAxe = {
  name: "BuyAxe",
  manaCost: function(char) {
    return 100;
  },
  goldCost: function(char) {
    return 20;
  },
  stats: {
    charisma: 1,
  },
  canStart: function(char) {
    return (char.currentLocation == 0 && char.gold >= 20);
  },
  finish: function(char) {
    char.gold -= this.goldCost(char);
    updateResourceBox("gold");
    char.hasAxe = true;
    updateItemBox("axe", "BuyAxe");
  },
  tooltip: "A nice shiny axe to chop down whatever you can",
};

var buyGuide = {
  name: "BuyGuide",
  manaCost: function(char) {
    return 500;
  },
  goldCost: function(char) {
    return 5;
  },
  stats: {
    charisma: .6,
    intelligence: .3,
    spirit: .1,
  },
  canStart: function(char) {
    return (char.currentLocation == 0);
  },
  finish: function(char) {
    char.gold -= this.goldCost(char);
    updateResourceBox("gold");
    char.hasGuide = true;
    updateItemBox("guide", "BuyGuide");
  },
  get tooltip() { return [
    "The path to the next town isn't an easy one. Luckily one of the villagers will help you, for a price of course",
    "Reduces the mana it takes to travel to the forest by 90%",
  ]},
};

var sellLeather = {
  name: "SellLeather",
  manaCost: function(char) {
    return 250;
  },
  stats: {
    charisma: .9,
    intelligence: .1,
  },
  canStart: function(char) {
    return (char.currentLocation == 0 && char.leather > 0);
  },
  finish: function(char) {
    char.gold += char.leather * 20;
    updateResourceBox("gold");
    char.leather = 0;
    updateResourceBox("leather");
  },
  get tooltip() { return [
    "The town doesn't have a local tannery so you're not quite sure how there's a leatherworker here. Either way you're happy you can earn some money",
  ]},
}

var travelToForest = {
  name: "TravelToForest",
  manaCost: function(char) {
    if (char.hasGuide) {
      return 2500;
    }
    else {
      return 25000 - (location[1].progressBars.mapGameTrailsProgressBar.currentLevel * 225);
    }
  },
  stats: {
    constitution: .2,
    speed: .8,
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
    "Start your adventure out of this one horse town",
    "Only costs 2500 mana if you have a guide with you",
  ]},
};

var returnToNoobton = {
  name: "ReturnToNoobton",
  manaCost: function(char) {
    return 25000 - (location[1].progressBars.mapGameTrailsProgressBar.currentLevel * 225);
  },
  stats: {
    constitution: .2,
    speed: .8,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function(char) {
    char.currentLocation = 0;
  },
  get tooltip() { return [
    "For whatever reason you can backtrack all the way back to the small village you started this adventure in",
    "Since the guide only leads one way trips (jerk), you will have to find your own way back using the trails"
  ]},
};

var exploreForest = {
  name: "ExploreForest",
  manaCost: function(char) {
    return 300;
  },
  stats: {
    constitution: .1,
    speed: .1,
    perception: .6,
    intelligence: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function(char) {
    if (location[1].progressBars.exploreForestProgressBar.currentLevel < 100) {
      location[1].progressBars.exploreForestProgressBar.currentXP += (char.hasMap) ? 400 : 100;
      checkLevel(location[1].progressBars.exploreForestProgressBar);
      updateProgressBar(location[1].progressBars.exploreForestProgressBar);
    }
  },
  get tooltip() { return [
    "You've got all the time in the world, so why not spend some of it seeing what the forest has to offer?",
    "<b>Forest Explored XP: </b> 100 (400 with a Map)",
  ]},
};

var investigateTrees = {
  name: "InvestigateTrees",
  manaCost: function(char) {
    return 500;
  },
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
    "<b>Trees Checked XP: </b> 100",
  ]},
};

var absorbManaFromTrees = {
  name: "AbsorbManaFromTrees",
  manaCost: function(char) {
    return 100;
  },
  manaGain: function(char) {
    if (char.manaFlow.level == 0) {
      return 175;
    } else {
      return Number((175 * (Math.pow(1 + char.manaFlow.level / 5, 0.3))).toFixed(0));
    }
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
  finish: function(char) {
    if (document.getElementById("TreesLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        char.mana += this.manaGain(char);
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      let tempReliable = this.resource.reliableAmount;
      updateResources(location[1].progressBars.investigateTreesProgressBar);
      if (tempReliable < this.resource.reliableAmount) {
        char.mana += this.manaGain(char);
        this.resource.usedAmount++;
      }
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      char.mana += this.manaGain(char);
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "You can siphon the mana out of these trees. Normally you'd worry about saving the forest, but they'll be back in the next cycle",
    "Mana trees have " + this.manaGain(character[currentCharacter]) + " in them",
    "Every 5 trees have mana in them",
  ]},
};

var chopTrees = {
  name: "ChopTrees",
  manaCost: function(char) {
    return 250;
  },
  resource: location[1].progressBars.investigateTreesProgressBar.resource,
  stats: {
    dexterity: .2,
    strength: .6,
    constitution: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 1 && char.hasAxe);
  },
  finish: function(char) {
    if (document.getElementById("TreesLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        char.wood++;
        updateResourceBox("wood");
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      let tempReliable = this.resource.reliableAmount;
      updateResources(location[1].progressBars.investigateTreesProgressBar);
      if (tempReliable < this.resource.reliableAmount) {
        char.wood++;
        updateResourceBox("wood");
        this.resource.usedAmount++;
      }
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      char.wood++;
      updateResourceBox("wood");
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "These trees are probably reserved, but with how you keep being pulled back in time it's safe to say it probably won't matter... Probably",
    "Mana trees can be cut down for 1 mana infused log",
    "Every 5 trees have mana in them",
  ]},
};

var mapGameTrails = {
  name: "MapGameTrails",
  manaCost: function(char) {
    return 1000;
  },
  stats: {
    dexterity: .3,
    perception: .7,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function() {
    if (location[1].progressBars.mapGameTrailsProgressBar.currentLevel < 100) {
      location[1].progressBars.mapGameTrailsProgressBar.currentXP += 100;
      checkLevel(location[1].progressBars.mapGameTrailsProgressBar);
      updateProgressBar(location[1].progressBars.mapGameTrailsProgressBar);
      updateResources(location[1].progressBars.mapGameTrailsProgressBar);
      updateResourceText(location[1].progressBars.mapGameTrailsProgressBar.resource);
    }
  },
  get tooltip() { return [
    "The animals always know the fastest way around the forest. Finding the paths they take should make it easier to travel through the forest",
    "<b>Game Trails Explored XP: </b> 100",
  ]},
};

var huntAnimals = {
  name: "HuntAnimals",
  manaCost: function(char) {
    return 1500;
  },
  resource: location[1].progressBars.mapGameTrailsProgressBar.resource,
  stats: {
    dexterity: .3,
    speed: .5,
    intelligence: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function(char) {
    if (document.getElementById("AnimalsLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        char.pelts += 1;
        updateResourceBox("pelts");
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      let tempReliable = this.resource.reliableAmount;
      updateResources(location[1].progressBars.mapGameTrailsProgressBar);
      if (tempReliable < this.resource.reliableAmount) {
        char.pelts++;
        updateResourceBox("pelts");
        this.resource.usedAmount++;
      }
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      char.pelts += 1;
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
  manaCost: function(char) {
    return 750;
  },
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
      let y = location[1].progressBars.investigateTreesProgressBar;
      x.currentXP += 100;
      checkLevel(x);updateProgressBar(x);updateResources(y);updateResourceText(y.resource);
    }
  },
  get tooltip() { return [
    "The ancient tree spirits might be able to show you some more magical trees that you missed",
    "<b>Dryad Knowledge Learned XP: </b> 100",
  ]},
};

var wizardTraining = {
  name: "WizardTraining",
  manaCost: function(char) {
    return 1000;
  },
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
      checkLevel(x);updateProgressBar(x);
      if (x.currentLevel >= 30 && character[1] == undefined) {
        character[1] = new Person("Terragon");
        character[1].visible = true;
        newPersonPrep(1);
        buildStatBox();
      }
    }
  },
  get tooltip() { return [
    "There's an old wizard you've stumbled upon that's agreed to teach you magic",
    "<b>Wizard Training Received XP: </b> 100",
  ]},
};

var searchForElderberries = {
  name: "SearchForElderberries",
  manaCost: function(char) {
    return 750;
  },
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
      x.currentXP += 100;
      checkLevel(x);updateProgressBar(x);updateResources(x);updateResourceText(x.resource);
    }
  },
  get tooltip() { return [
    "<b>Elderberries Found XP: </b> 100",
  ]},
};

var pickElderberries = {
  name: "PickElderberries",
  manaCost: function(char) {
    return 200;
  },
  resource: location[1].progressBars.searchForElderberriesProgressBar.resource,
  stats: {
    dexterity: .2,
    speed: .4,
    intelligence: .4,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function(char) {
    if (document.getElementById("ElderberriesLootFirst").checked) {
      if (this.resource.usedAmount < this.resource.reliableAmount) {
        char.elderberries++;
        updateResourceBox("elderberries");
        this.resource.usedAmount++;
        updateResourceText(this.resource);
        return;
      }
    }
    if (this.resource.uncheckedAmount > 0) {
      this.resource.checkedAmount++;
      let tempReliable = this.resource.reliableAmount;
      updateResources(location[1].progressBars.searchForElderberriesProgressBar);
      if (tempReliable < this.resource.reliableAmount) {
        char.elderberries++;
        updateResourceBox("elderberries");
        this.resource.usedAmount++;
      }
      updateResourceText(this.resource);
    } else if (this.resource.usedAmount < this.resource.reliableAmount) {
      char.elderberries++;
      updateResourceBox("elderberries");
      this.resource.usedAmount++;
      updateResourceText(this.resource);
      return;
    }
  },
  get tooltip() { return [
    "A basic alchemical ingrediant",
    "Every 20 are ripe",
  ]},
};

var makeMinorHealthPotion = {
  name: "MakeMinorHealthPotion",
  manaCost: function(char) {
    return 5000;
  },
  stats: {
    dexterity: .1,
    perception: .1,
    intelligence: .4,
    wisdom: .4,
  },
  canStart: function(char) {
    return (char.currentLocation == 1 && char.elderberries >= 1);
  },
  finish: function(char) {
    char.elderberries--;
    updateResourceBox("elderberries");
    char.minorHealthPotions++;
    updateResourceBox("minorHealthPotions");
    increaseSkills(char, "alchemy", 100);
  },
  get tooltip() { return [
    "Takes one elderberry and a lot of mana",
    "<b>Alchemy XP: </b> 100",
  ]},
};

var trainManaFlow = {
  name: "TrainManaFlow",
  manaCost: function(char) {
    return 1500;
  },
  stats: {
    wisdom: .9,
    spirit: .1,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function(char) {
    increaseSkills(char, "manaFlow", 100);
  },
  get tooltip() { return [
    "The wizards showed you the basics of how mana actually works. You believe that further study will help you absorb mana from the trees",
    "<b>Mana Flow Skill XP: </b> 100",
  ]},
};

var tanPelt = {
  name: "TanPelt",
  manaCost: function(char) {
    return 1000;
  },
  stats: {
    dexterity: .7,
    perception: .1,
    intelligence: .2,
  },
  canStart: function(char) {
    return (char.currentLocation == 1 && char.pelts > 0);
  },
  finish: function(char) {
    char.pelts--;
    updateResourceBox("pelts");
    char.leather++;
    updateResourceBox("leather");
  },
  get tooltip() { return [
    "Amidst the trees and trails you stumble upon a hunter's lodge. He's willing to let you use it to tan some pelts.",
    "You're not sure if it's always going to be here though",
  ]},
};

var travelToCyoria = {
  name: "TravelToCyoria",
  manaCost: function(char) {
    return 7;
  },
  stats: {
    spirit: 1,
  },
  canStart: function(char) {
    return (char.currentLocation == 1);
  },
  finish: function(char) {
    char.currentLocation = 2;
  },
  get tooltip() { return [
    "Leave the forest to head to the big city",
  ]},
};

var headBackToTheForest = {
  name: "HeadBackToTheForest",
  manaCost: function(char) {
    return 16;
  },
  stats: {
    spirit: 1,
  },
  canStart: function(char) {
    return (char.currentLocation == 2);
  },
  finish: function(char) {
    char.currentLocation = 1;
  },
  get tooltip() { return [
    "The city can be pretty loud. The silence of the Forest might suit you better",
  ]},
};

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
