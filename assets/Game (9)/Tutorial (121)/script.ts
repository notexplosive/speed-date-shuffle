class TutorialBehavior extends Sup.Behavior {
  update() {  
    this.calledBlinkThisFrame = false;
    this.setText(newTutorialText[this.state]);
    let playArea = Sup.getActor('PlayArea').getBehavior(PlayAreaBehavior)
    if(this.state == 0 && playArea.getCardCount() == 3){
      this.state++;
    }
    if(this.state == 1){
      this.blink(Sup.getActor('Poolbg'));
    }
    if(this.state == 2 && playArea.getTotalValue() == 7){
      this.state++;
    }
    if(this.state == 3){
      this.blink(Sup.getActor('Targetbg'))
    }  
    if(this.state == 4 && playArea.getTotalValue() == 10){
      this.state++;
    }
    if(this.state == 5){
      this.blink(Sup.getActor('green7'));
    }
    if(this.state == 6 && playArea.getTotalValue() == 2){
      this.state++;
    }
    if(this.state == 8 && playArea.getTotalValue() == 7 && playArea.getTotalColorAsString()[0] == 'red'){
      this.state++;
    }
    if(this.state == 9){
      this.blink(Sup.getActor('pinkc'));
    }
    if(this.state == 10 && playArea.getTotalValue() == 5){
      this.state++;
    }
    if(this.state == 11){
      this.blink(Sup.getActor('Targetbg'))
    }
    if(this.state > 12){
      this.blink(Sup.getActor("BackButton"));
      TUTORIAL_COMPLETE = true;
    }
    
    if(CANCEL_PRESSED){
      switch(this.state){
        case 1:
        case 3:
        case 5:
        case 7:
        case 9:
        case 11:
        case 12:
        case 13:
        this.state++;
      }
    }
    
    if(!this.calledBlinkThisFrame){
      this.blink(null);
    }
    
    CANCEL_PRESSED = false;
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
  
  blink(act:Sup.Actor){
    this.calledBlinkThisFrame = true;
    if(this.blinkTarget){
      this.blinkTarget.spriteRenderer.setColor(new Sup.Color(1,1,1))
    }
    if(!act){
      return;
    }
    this.blinkTarget = act;
    this.timer ++;
    if(this.timer % 10 == 0){
      this.blinkOn = !this.blinkOn
    }
    if(this.blinkOn){
      this.blinkTarget.spriteRenderer.setColor(new Sup.Color(2,2,2))
    }else{
      this.blinkTarget.spriteRenderer.setColor(new Sup.Color(1,1,1))
    }
  }
  
  state = 0;
  timer = 0;
  blinkOn = false;
  blinkTarget:Sup.Actor = null;
  calledBlinkThisFrame = false;
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
  "Score is determined by THEIR topic number.\nYour number only needs to meet or beat theirs.",
  "So...\nhow do you add to the conversation?",
  "By playing cards, obviously!\nYou can play up to three cards at a time.",
  "The left indicator shows the current value and\ncolor of the cards you placed in the play area.", // 12 TEAL 7:  white 2 + white 1 + teal 4
  "Color is determined by which color\n has the highest total value.",
  "Special \'C\' cards are worth zero value,\nbut they overwrite the color of your play.", // 14 // white 8 + indigo C
  "Remember! There's no reason\nto spend more cards than you need to!",
  "The goal is to meet or beat their number.\nThe margin does not matter.",
  "The more your date speaks, the larger\nthe number gets.",
  "One last thing!\n",
  "It's rude to interrupt people while they're talking.\nMind your manners!",
  "That\'s about it!\nI hope you enjoy. ♥"
]

let newTutorialText = [
  'Place any 3 cards here!',
  'The small number above corresponds to your play.\nPress cancel to withdraw your play.',
  'Put your 7 in the play area.',
  "You want your play to be worth at least as much as the\ntarget value. Going over doesn't benefit you.",
  'Put your 7 and 3 in the play area',
  'The color with the highest total value (green) \nis the color of the whole play.',
  'Put both of your 1s in the play area.',
  'Matching values count as both colors.',
  'Put your 7 and C in the play area',
  'C cards overwrite the color of your play',
  'Put your 3 and both 1s in the play area.',
  'Matching value is good, matching color is also good.\nBoth is perfect! (This is the ideal play for this hand.)',
  "Don't forget! It's rude to interrupt people\nwhile they're talking! (You'll see)",
  "Feel free to use this space to experiment.\nHit Back when you're ready.",
  ''
]