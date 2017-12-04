class PopScoreBehavior extends CoolTextBehavior {
  awake() {
    if(!this.actor.textRenderer){
      new Sup.TextRenderer(this.actor,"","Graphics/Bold").setOpacity(1);
    }
    super.awake();
    this.actor.setVisible(false)
    this.actor.textRenderer.setSize(128);
    this.scaleFactor = 1;
    this.findShadow().textRenderer.setSize(this.actor.textRenderer.getSize());
  }

  update() {
    if(this.delay > 0){
      this.delay--;
      return;
    }
    super.update()
    
    if(this.animationTimer > 0){
      this.actor.moveY(0.1);
    }
    
    this.actor.textRenderer.setColor(new Sup.Color(this.color))
    
    if(this.delay == 0){
      this.actor.setVisible(true);
    }
    if(this.animationTimer == 0){
      this.lifetimer--;
      if(this.lifetimer < 0){
        this.actor.destroy();
      }
    }
  }
  
  delay = 0;
  text = "";
  color = 0xffeeee;
  private lifetimer = 60;
}
Sup.registerBehavior(PopScoreBehavior);

function displayPopScore(delay,text,color:number){
  let act = new Sup.Actor("PopScore");
  let b = act.addBehavior(PopScoreBehavior)
  b.text = text;
  b.delay = delay;
  b.color = color;
  b.setText(text);
  return act;
}