class PlayAreaBehavior extends Sup.Behavior {
  awake() {
    PLAYAREA = this;
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("ESCAPE") ){
      this.returnPoolToDeck();
    }
    
    if(this.pool.length > 0){
      if(this.getTotalValue() > 0 && (CURRENT_DATE && CURRENT_DATE.getCurrentColor() != 'white') || !CURRENT_DATE){
        Sup.getActor("PlayButton").setVisible(true)
      }
      Sup.getActor("CancelButton").setVisible(true)
    }else{
      Sup.getActor("PlayButton").setVisible(false)
      Sup.getActor("CancelButton").setVisible(false)
    }
    
    if(this.restoreHandTimer > 0){
      this.restoreHandTimer--;
    }else{
      if(this.cardsOwedToHand > 0){
        this.restoreHandTimer = 60;
        this.cardsOwedToHand--;
        PLAYERHAND.drawCardObject();
      }
    }
  }
  
  play(){
    CURRENT_DATE.playerRespond(this.getTotalValue(), this.getTotalColorAsString());
    if(PLAYERHAND.countRemainingCards() == 0 && PLAYERHAND.countCardsInHand() == 0 && PLAYER_SCORE < SCORE_WIN_THRESHOLD){
      displayPopScore(0,"Ran out of cards!",0xffeeee);
      WINLOSE.lose("out-of-cards");
    }
    this.cardsOwedToHand += this.pool.length;
    this.restoreHandTimer = 120;
    this.clear();
  }
  
  clear(){
    for(let card of this.pool){
      card.getBehavior(CardObjectBehavior).clear();
    }
    this.pool = [];
  }
  
  getPoolAsData(){
    let datapool = []
    for(let card of this.pool){
      let cardBehavior = card.getBehavior(CardObjectBehavior);
      datapool.push(new Card(cardBehavior.color,cardBehavior.value))
    }
    return datapool;
  }
  
  getPool(){
    return this.pool;
  }
  
  getCardCount(){
    return this.pool.length;
  }
  
  addToPool(card:Sup.Actor){
    if(this.pool.length < 3){
      this.pool.push(card);
      this.reorganizeHand();
      return true
    }
    ShowError("You can only play 3 cards at a time.")
    return false;
  }
  
  returnPoolToDeck(){
    for(let card of this.pool){
      this.deck.addCardToHand(card);
      card.getBehavior(CardObjectBehavior).restore();
    }
    this.pool = [];
  }
  
  getTotalValue(){
    let v = 0;
    for(let card of this.getPoolAsData()){
      v += card.value;
    }
    return v;
  }
  
  getTotalColorAsString():string[]{
    let colorString = determineColor(this.getPoolAsData());
    let colors = colorString.split(' ');
    return colors;
  }
  
  getTotalColor():Sup.Color[]{
    let colorString = determineColor(this.getPoolAsData());
    if(this.getPoolAsData().length == 0){
      return [WHITE];
    }
    let colors = colorString.split(' ');
    let pallette = [];
    for(let color of colors){
      if(color == "red"){
        pallette.push(RED);
      }
      if(color == "blue"){
        pallette.push(BLUE);
      }
      if(color == "green"){
        pallette.push(GREEN);
      }
      if(color == "yellow"){
        pallette.push(YELLOW);
      }
    }
    return pallette;
  }
  
  private reorganizeHand(){
    for(let i = 0; i < this.pool.length; i++){
      let cardObj = this.pool[i];
      let distance = (i + 0.5 - this.pool.length / 2) * 1.35;
      cardObj.getBehavior(CardObjectBehavior).targetPosition = new Sup.Math.Vector2(distance,0);
      let pos = cardObj.getPosition();
      pos.z = i/10;
      cardObj.setPosition(pos)
    }
  }
  
  // Points to the player's deck
  deck:DeckObjectBehavior;
  private pool:Sup.Actor[] = [];
  private restoreHandTimer = 120;
  private cardsOwedToHand = 0;
}
Sup.registerBehavior(PlayAreaBehavior);
