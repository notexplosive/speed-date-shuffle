class Deck{
  constructor(deckList:Card[]){
    for(let card of deckList){
      this.contents.push(card);
      this.deckList.push(card);
    }
    
    this.shuffle();
  }
  
  restore(){
    this.contents = [];
    for(let card of this.deckList){
      this.contents.push(card);
    }
    this.shuffle();
  }
  
  draw(){
    if(this.contents.length > 0 ){
      return this.contents.pop();
    }else{
      return null;
    }
  }
  
  countRemainingCards(){
    return this.contents.length;
  }
  
  private shuffle(){
    return shuffle(this.contents);
  }
  
  // Active list of cards.
  private contents:Card[] = [];
  // Copy of contents so it can be restored.
  private deckList:Card[] = [];
}