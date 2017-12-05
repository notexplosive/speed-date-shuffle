class CameraShakeBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(this.shakeTick > 0){
      this.shakeTick--;
      this.actor.setPosition(Math.random()*.25,Math.random()*.25);
    }
  }
  
  shake(n){
    this.shakeTick = n;
  }
  
  shakeTick = 0;
}
Sup.registerBehavior(CameraShakeBehavior);
