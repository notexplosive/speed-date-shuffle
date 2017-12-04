class Card{
  value:number;
  color:string; // "red" "blue" "green" "yellow"
  
  constructor(color:string,value:number){
    this.value = value;
    this.color = color;
  }
  
  generateCardObject():Sup.Actor{
    let obj = new Sup.Actor("Card" + this.color + this.value);
    let beh = obj.addBehavior(CardObjectBehavior);
    beh.color = this.color;
    beh.value = this.value;
    beh.awake();
    
    return obj;
  }
  
  toString(){
    return this.color + " " + this.value;
  }
}