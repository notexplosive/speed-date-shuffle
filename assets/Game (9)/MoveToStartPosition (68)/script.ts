class MoveToStartPositionBehavior extends Sup.Behavior {
  awake() {
    this.startPosition = this.actor.getPosition().toVector2();
    this.actor.move(this.offset);
  }

  update() {
    if(this.delay > 0){
      this.delay--;
    }else{
      let displacement = this.startPosition.clone().subtract(this.actor.getPosition())
      this.actor.move( displacement.multiplyScalar(.1) );
      
      if(displacement.length() < .001){
        this.actor.setPosition(this.startPosition);
        this.destroy();
      }
    }
  }
  
  offset:Sup.Math.Vector2 = new Sup.Math.Vector2();
  delay:number = 0;
  startPosition:Sup.Math.Vector2;
}
Sup.registerBehavior(MoveToStartPositionBehavior);
