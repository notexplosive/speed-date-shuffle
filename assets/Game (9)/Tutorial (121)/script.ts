class TutorialBehavior extends Sup.Behavior {
  update() {  
    this.setText(TutorialText[this.state]);
  }
  
  nextState(){
    this.state ++;
  }
  
  previousState(){
    this.state --;
  }
  
  setText(str:string){
    if(!TutorialText[this.state]){
      Sup.loadScene("Bedroom");
      return;
    }
    Sup.getActor("Text").textRenderer.setText(str)
    Sup.getActor("TextShadow").textRenderer.setText(str);
  }
  
  state = 0;
}
Sup.registerBehavior(TutorialBehavior);

let TutorialText = [
  "Hi! Welcome to Speed Date Shuffle.\n",
  "Let's start simple. This is your life meter.\nIt gauges how well the date is going.",
  "If it reaches 100% then you win the date!\nHowever, if it falls below zero, you lose.",
  "This is your date's current topic of conversation.\nNote the color.", // 3
  "Your goal is to contribute something\nrelevant to the discussion.",
  "You want to create a topic either greator\nor equal value to your date's topic.", // 5
  "If your topic matches the color of their topic,\nyou get a x2 bonus.", // 6
  "If your topic matches the exact value\nyou get another x2 bonus.", // 7
  "If your topic is smaller than your\ndate's in value, it's worth nothing.", // 8
  "Score is determined by THEIR topic value.\nYour value only needs to meet or beat their value.",
  "So...\nhow do you add to the conversation?",
  "By playing cards, obviously!\nYou can play up to three cards at a time.",
  "The left indicator shows the current value and\ncolor of the cards you placed in the play area.", // 12 TEAL 7:  white 2 + white 1 + teal 4
  "Color is determined by which color\n has the highest total value.",
  "Special \'C\' cards are worth zero value,\nbut they overwrite the color of your play.", // 14 // white 8 + indigo C
  "Remember! There's no reason\nto spend more cards than you need to!",
  "The goal is to meet or beat their value.\nThe margin does not matter.",
  "One last thing!\n",
  "It's rude to interrupt people while they're talking.\nMind your manners!",
  "That\'s about it!\nI hope you enjoy. ♥"
]