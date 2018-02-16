let PLAYER_GRABBED = false;

let PLAYAREA:PlayAreaBehavior;
let PLAYERHAND:DeckObjectBehavior;
let ERRORTEXT:ErrorTextBehavior;
let CURRENT_DATE:DateBehavior;
let COLORS = ["red","blue","green","yellow"]
let CURRENT_POOL_TOTAL = 0;
let PLAYER_SCORE = 0;
let MUSIC:Jukebox;
let NUMBER_OF_MUSIC_EVENTS = 4;
let WINLOSE:ScoreTrackerBehavior;
let MENU:MenuBehavior;
let DATE_TEMPLATE:string = "template_Cat"

let SCORE_WIN_THRESHOLD = 100;

let RED = new Sup.Color(0x01ffd8)
let BLUE = new Sup.Color(0x71ff28)
let GREEN = new Sup.Color(0x0e2259)
let YELLOW = new Sup.Color(0xeeeeee)
let WHITE = new Sup.Color(0xcccccc)

let literalRed = 0x921a1d;
let literalGreen = 0x0d991f;

let PLAYER_VOICE:Sup.Audio.SoundPlayer[] = [];
let COMPLETED_DATES:boolean[] = [];
let CURRENT_DATE_INDEX:number = 0;
let DATE_DESCRIPTIONS:string[] = [
  "Learn how to play.",
  "Easy",
  "Medium",
  "Hard\nNo Green Cards",
  "IMPOSSIBLE\nTweet @NotExplosive if you complete him"
]

let VOICES = [];
VOICES["cat"] = []
VOICES["player"] = []
VOICES["bird"] = []
for(let i = 1; i < 12; i++){
  VOICES["cat"].push(new Sup.Audio.SoundPlayer("Sound/Talk/Female/Talk"+i))
  VOICES["player"].push(new Sup.Audio.SoundPlayer("Sound/Talk/Male/Talk"+i))
}

for(let i = 1; i < 9; i++){
  VOICES["bird"].push(new Sup.Audio.SoundPlayer("Sound/Talk/Bird/Talk"+i))
}

PLAYER_VOICE = VOICES["player"];

/*
Red: 921a1d
Blue: 055578
Green: 0d991f
Yellow: d2b930
*/

/*

teal: 01ffd8
indigo: 0d0051
lime green: 71ff28
pink: ffafd0
*/

function saveProgress(){
  let datastring = "";
  for(let i = 0; i <  COMPLETED_DATES.length; i++){
    if(COMPLETED_DATES[i]){
      datastring+="1";
    }else{
      datastring+="0";
    }
  }
  Sup.Storage.set("progress",datastring);
}

function loadProgress(){
  let datastring = Sup.Storage.get("progress",null);
  if(datastring == null){
    COMPLETED_DATES = [];
  }else{
    for(let i = 0; i <  datastring.length; i++){
      COMPLETED_DATES[i] = datastring[i] == '1';
    }
  }
}

function clearProgress(){
  Sup.Storage.remove("progress");
  COMPLETED_DATES = [];
}

loadProgress();

function ColorStringToColor(colorstring){
  switch (colorstring){
    case "red":
      return (RED);
    case "blue":
      return (BLUE);
    case "green":
      return (GREEN);
    case "yellow":
      return (YELLOW);
    case "white":
      return (WHITE);
  }
  Sup.log("colorstring invalid " + colorstring)
  return null;
}

// Taken from Stackoverflow...
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let deckList = []

for(let i = 0; i < 9; i++){
  deckList.push(new Card("red",i));
  deckList.push(new Card("blue",i));
  deckList.push(new Card("green",i));
  deckList.push(new Card("yellow",i));
}

// technically it's "no blues" because blue is lime green
let deckListNoGreens = [];
for(let i = 0; i < 9; i++){
  deckListNoGreens.push(new Card("red",i));
  deckListNoGreens.push(new Card("green",i));
  deckListNoGreens.push(new Card("yellow",i));
}

let deckListHalvedCards = [];
// Same number of cards except you only have values up to 6
// No C cards.
for(let i = 1; i < 6; i++){
  deckListHalvedCards.push(new Card("red",i));
  deckListHalvedCards.push(new Card("green",i));
  deckListHalvedCards.push(new Card("yellow",i));
  deckListHalvedCards.push(new Card("blue",i));
  deckListHalvedCards.push(new Card("red",i));
  deckListHalvedCards.push(new Card("green",i));
  deckListHalvedCards.push(new Card("yellow",i));
  deckListHalvedCards.push(new Card("blue",i));
}


let deckNames = {}
deckNames['none'] = new Deck(deckList);
deckNames['nogreens'] = new Deck(deckListNoGreens);
deckNames['lowcards'] = new Deck(deckListHalvedCards);

let DEFAULT_DECK:Deck = deckNames['none'];

function ShowError(str:string){
  ERRORTEXT.showError(str);
}