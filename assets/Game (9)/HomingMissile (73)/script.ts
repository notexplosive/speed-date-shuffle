class HomingMissileBehavior extends Sup.Behavior {
  update() {
    this.actor.move(this.velocity);
    this.tick++;
    let displacement = this.targetPosition.clone().subtract(this.actor.getPosition())
    this.velocity.add(displacement.normalize().multiplyScalar(.06));
    
    if(displacement.length() < .1){
      this.actor.destroy();
    }
  }
  
  velocity:Sup.Math.Vector2 = new Sup.Math.Vector2();
  targetPosition:Sup.Math.Vector2 = new Sup.Math.Vector2();
  private tick = 0;
}
Sup.registerBehavior(HomingMissileBehavior);
