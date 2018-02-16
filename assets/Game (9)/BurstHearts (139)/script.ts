class BurstHeartsBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    for(let heart of this.hearts){
      if(heart.actor == undefined){
        continue;
      }
      heart.actor.move( heart.vel );
      heart.vel.x = heart.vel.x *= 0.8;
      heart.vel.y = heart.vel.y + 0.005;
      
      if(heart.actor.getPosition().y > 10){
        heart.actor.destroy();
        heart.actor = undefined;
      }
    }
  }
  
  burst(n:number){
    for(let i = 0; i < n; i++){
      let act = new Sup.Actor("HeartParticle",this.actor);
      new Sup.SpriteRenderer(act,"Graphics/Heart");
      let targetPos = Sup.getActor("PlayArea").getPosition();
      act.setPosition(targetPos);
      act.moveZ(1);
      this.hearts.push({actor:act,vel:new Sup.Math.Vector2( .5*(Math.random()-.5) , -.1*Math.random() )});
    }
  }
  
  private hearts:{actor:Sup.Actor,vel:Sup.Math.Vector2}[] = [];
}
Sup.registerBehavior(BurstHeartsBehavior);
