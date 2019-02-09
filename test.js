var characters = [];
var statNames = ["dexterity", "strength", "constitution", "speed", "perception",
"charisma", "intelligence", "wisdom", "luck", "spirit"];
var statNamesUpperCase = ["Dexterity", "Strength", "Constitution", "Speed", "Perception",
"Charisma", "Intelligence", "Wisdom", "Luck", "Spirit"];


function buildStatBox() {
  let characterPage = document.createElement("div");
  characterPage.className = "characterPage";
  let characterPageTitle = document.createElement("div");
  characterPageTitle.className = "characterPageTitle";
  let characterPageText = document.createTextNode("Characters");
  characterPageTitle.appendChild(characterPageText);
  characterPage.appendChild(characterPageTitle);
  /*
  code here for character selection
  */
  for (let i = 0; i < characters.length; i++) {
    let x = characters[i];
    let statList = document.createElement("div");
    statList.className = "statList";
    statList.id = x.name;
    for (let j = 0; j < statNames.length; j++) {
      let y = statNames[j];
      let box = document.createElement("div");
      let miscText = document.createTextNode(capitalize(y));
      box.appendChild(miscText);
      statList.appendChild(box);
      box = document.createElement("div");
      box.id = x.name + y + "Level";
      miscText = document.createTextNode(x[y].level);
      box.appendChild(miscText);
      statList.appendChild(box);
      box = document.createElement("div");
      box.id = x.name + y + "Talent";
      miscText = document.createTextNode(x[y].talent);
      box.appendChild(miscText);
      statList.appendChild(box);
      box = document.createElement("div");
      box.id = x.name + y + "Bonus";
      statList.appendChild(box);
      let progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      let progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill";
      progressBarFill.id = x.name + y + "XP";
      progressBarFill.style.width = (x[y].levelXP / x[y].toNextLevel) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      statList.appendChild(progressBarEmpty);
      progressBarEmpty = document.createElement("div");
      progressBarEmpty.className = "progressBarEmpty";
      progressBarFill = document.createElement("div");
      progressBarFill.className = "progressBarFill";
      progressBarFill.id = x.name + y + "TalentXP";
      progressBarFill.style.width = (x[y].talentXP / x[y].toNextTalent) * 100 + "%";
      progressBarEmpty.appendChild(progressBarFill);
      statList.appendChild(progressBarEmpty);
    }
    characterPage.appendChild(statList);
  }
  document.getElementById("statBox").appendChild(characterPage);
}

function Person (name) {
  this.name = name,
  for (let i = 0; i < statNames.length; i++) {
    let x = statNames[i];
    this[x].level: 0,
    this[x].levelXP: 0,
    this[x].toNextLevel: 100,
    this[x].talent: 0,
    this[x].talentXP: 0,
    this[x].toNextTalent: 100,
  }
};
