class TutorialElementBehavior extends Sup.Behavior {
  awake() {
    if(this.cardValue != -1){
      let actors = Sup.appendScene("template_Card");
      actors[0].setParent(this.actor);
      actors[0].setLocalPosition(0,0);
      actors[0].spriteRenderer.setAnimationFrameTime(this.cardValue);
      actors[0].spriteRenderer.pauseAnimation();
      let children = actors[0].getChildren()
      for(let child of children){
        if(child.getName() == "Number"){
          let text = ''+this.cardValue;
          if(this.cardValue == 0){
            text = 'C'
          }
          child.textRenderer.setText(text);
          child.textRenderer.setColor( ColorStringToColor(this.cardColor) );
        }
        if(child.getName() == "CardBorder"){
          child.spriteRenderer.setColor( ColorStringToColor(this.cardColor) );
        }
      }
    }
  }

  update() {
    let state = Sup.getActor("Tutorial").getBehavior(TutorialBehavior).state;
    if(state == this.state){
      this.actor.setVisible(true);
    }
    
    if(state < this.state){
      this.actor.setVisible(false);
    }
    
    if(state > this.state){
      this.actor.setVisible(this.stickAround);
      if(this.showUntil != -1){
        if(state > this.showUntil){
          this.actor.setVisible(false);
        }
      }
    }
  }
  
  state:number = -1;
  showUntil:number = -1;
  stickAround:boolean = false;
  cardValue = -1;
  cardColor = "red";
}
Sup.registerBehavior(TutorialElementBehavior);
