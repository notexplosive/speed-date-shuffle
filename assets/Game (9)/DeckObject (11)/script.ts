class DeckObjectBehavior extends Sup.Behavior {
  deckOwnerName:string = "";
  
  awake() {
    PLAYERHAND = this;
    this.deckData = DEFAULT_DECK;
    this.deckData.restore();
    
    Sup.getActor("PlayArea").getBehavior(PlayAreaBehavior).deck = this;
  }
  
  start(){
    // if we're in the tutorial
    if(!CURRENT_DATE){
      // Pink 3
      // Yellow 1
      // Blue 1
      // Yellow C
      // Green 7
      let cards:CardObjectBehavior[] = [];
      cards.push(new Sup.Actor('Card').addBehavior(CardObjectBehavior));
      cards.push(new Sup.Actor('Card').addBehavior(CardObjectBehavior));
      cards.push(new Sup.Actor('Card').addBehavior(CardObjectBehavior));
      cards.push(new Sup.Actor('Card').addBehavior(CardObjectBehavior));
      cards.push(new Sup.Actor('Card').addBehavior(CardObjectBehavior));
      cards[0].value = 3;
      cards[1].value = 1;
      cards[2].value = 1;
      cards[3].value = 0;
      cards[4].value = 7;
      
      cards[0].color = 'red';
      cards[1].color = 'yellow';
      cards[2].color = 'blue';
      cards[3].color = 'red';
      cards[4].color = 'green';
      
      for(let card of cards){
        card.deck = this;
        card.awake();
        this.addCardToHand(card.actor);
      }
      this.reorganizeHand();
      return;
    }
    if(CURRENT_DATE.deck != "none"){
      if(deckNames[CURRENT_DATE.deck]){
        this.deckData = deckNames[CURRENT_DATE.deck];
        this.deckData.restore();
      }
    }
  }
  
  update(){
    let deckCounter = Sup.getActor("DeckCounter")
    if(deckCounter){
      deckCounter.textRenderer.setText(""+this.deckData.countRemainingCards());
    }
  }
  
  countRemainingCards(){
    return this.deckData.countRemainingCards();
  }
  
  countCardsInHand(){
    return this.hand.length;
  }
  
  removeFromHand(obj:Sup.Actor){
    for(let i = 0; i < this.hand.length; i++){
      if(this.hand[i] == obj){
        this.hand.splice(i,1);
      }
    }
    this.reorganizeHand();
  }
  
  addCardToHand(obj:Sup.Actor){
    this.hand.push(obj);
    obj.setParent(this.actor);
    this.reorganizeHand();
  }
  
  drawCardObject(){
    let cardData = this.deckData.draw();
    if(cardData != null){
      Sup.Audio.playSound("Sound/Effects/PlayCard");
      let cardObj = cardData.generateCardObject();
      cardObj.getBehavior(CardObjectBehavior).deck = this;
      cardObj.setParent(this.actor)
      cardObj.setLocalPosition(-5,0,0);
      this.hand.push(cardObj)
      this.reorganizeHand()
      return cardObj;
    }else{
      ShowError("You're out of cards!")
    }
    return null;
  }
  
  // Ensures hand is up to five.
  private fillHand(){
    let numberOfNeededCards = 5 - this.hand.length;
    for(let i = 0; i < numberOfNeededCards; i++){
      let cardObj = this.drawCardObject();
      if(cardObj){
        cardObj.setLocalPosition(0,5,0);
      }
    }
    
    this.reorganizeHand()
  }
  
  private reorganizeHand(){
    for(let i = 0; i < this.hand.length; i++){
      let cardObj = this.hand[i];
      let distance = (i + 0.5 - this.hand.length / 2) * 1.9;
      cardObj.getBehavior(CardObjectBehavior).targetPosition = new Sup.Math.Vector2(distance,0);
      let pos = cardObj.getPosition();
      pos.z = i/10;
      cardObj.setPosition(pos)
    }
  }
  
  private deckData:Deck;
  private hand:Sup.Actor[] = [];
}
Sup.registerBehavior(DeckObjectBehavior);
