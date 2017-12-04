class FadeInBehavior extends Sup.Behavior {
  private screen:Sup.Actor;
  private totalTime;
  timer = 60;
  awake() {
    this.screen = new Sup.Actor("screen");
    this.screen.setPosition(0,0,4);
    new Sup.SpriteRenderer(this.screen,"Graphics/White");
  }
  
  start(){
    this.totalTime = this.timer;
  }

  update() {
    this.screen.spriteRenderer.setOpacity(this.timer/this.totalTime);
    
    if(this.timer > 0){
      this.timer--;
    }else{
      this.actor.destroy();
    }
  }
}
Sup.registerBehavior(FadeInBehavior);
