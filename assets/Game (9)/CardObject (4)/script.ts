class CardObjectBehavior extends Sup.Behavior {
  color = "red"; // ["red","blue","green","yellow"]
  value = 1;
  deck:DeckObjectBehavior;
  
  // target LOCAL position
  targetPosition:Sup.Math.Vector2 = new Sup.Math.Vector2();
  
  awake() {
    this.actor.setVisible(false)
    let pos = this.actor.getPosition();
    this.actor.setPosition(pos.x,pos.y,0)
    
    if(!this.actor.spriteRenderer){
      new Sup.SpriteRenderer(this.actor,"Graphics/CardSprite");
    }
    this.actor.spriteRenderer.setAnimation("All");
    this.actor.spriteRenderer.setAnimationFrameTime( this.value );
    this.actor.spriteRenderer.pauseAnimation();
    
    if(!this.borderChild){
      this.borderChild = new Sup.Actor("Border",this.actor);
      this.borderChild.setLocalPosition(0,0,.01);
      new Sup.SpriteRenderer( this.borderChild, "Graphics/CardBorder")
    }
    
    if(!this.frameChild){
      this.frameChild = new Sup.Actor("Frame",this.actor);
      this.frameChild.setLocalPosition(0,0,.02);
      new Sup.SpriteRenderer( this.frameChild, "Graphics/CardFrame")
    }
    
    if(!this.numberChild){
      this.numberChild = new Sup.Actor("Number",this.actor);
      this.numberChild.setLocalPosition(0,0.95,.03)
      new Sup.TextRenderer( this.numberChild, this.value, "Graphics/Bold" ).setOpacity(1);
    }
    
    if(!this.actor.fMouseInput){
      new fMouseInput(this.actor);
      this.actor.fMouseInput.setCameraActorName("Camera");
    }
    
    let sp = this.borderChild.spriteRenderer;
    switch (this.color){
      case "red":
        sp.setColor(RED);
        break;
      case "blue":
        sp.setColor(BLUE);
        break;
      case "green":
        sp.setColor(GREEN);
        break;
      case "yellow":
        sp.setColor(YELLOW);
        break;
    }
    
    this.numberChild.textRenderer.setColor(this.borderChild.spriteRenderer.getColor())
    this.numberChild.textRenderer.setText(this.value);
    this.numberChild.textRenderer.setOpacity(1);
    
    if(this.value == 0){
      this.numberChild.textRenderer.setText("C");
    }
  }
  
  update() {
    if(this.clearing){
      this.playable = false;
      this.actor.moveY(this.actor.getPosition().y / 100 + .2);
      
      if(this.actor.getPosition().y > 20){
        this.actor.destroy();
      }
    }
    
    if(this.grabCooldown > 0){
      this.grabCooldown--;
    }
    
    if(!this.grabbed && !this.clearing){
      let vec = this.targetPosition.clone().subtract(this.actor.getLocalPosition()).multiplyScalar(.8);
      this.actor.moveLocal(vec);
    }
    
    if(this.grabbed){
      PLAYER_GRABBED = true;
      let mp = Sup.Input.getMousePosition();
      let factor = .225;
      this.actor.setPosition( (mp.x*28)*factor , (mp.y*22)*factor, 1 );
      
      if(Sup.Input.wasMouseButtonJustPressed(0) || Sup.Input.wasMouseButtonJustPressed(2)){
        Sup.Audio.playSound("Sound/Effects/Pickup",.5,{pitch:-.5});
        this.grabbed = false;
        PLAYER_GRABBED = false;
        this.grabCooldown = 5;
        let pos = this.actor.getPosition();
        this.actor.setPosition(pos.x,pos.y,0);
      }
      
      let playAreaPos = Sup.getActor("PlayArea").getPosition()
      let distanceToPlayArea = playAreaPos.subtract(this.actor.getPosition()).length();
      
      if(distanceToPlayArea < 3.75){
        if(Sup.Input.wasMouseButtonJustPressed(0) && PLAYAREA.addToPool(this.actor)){
          Sup.Audio.playSound("Sound/Effects/PlayCard");
          this.deck.removeFromHand(this.actor);
          this.playable = false;
          this.actor.setParent(Sup.getActor("PlayArea"));
          this.actor.setLocalScale(1.2,1.2,1)
        }
      }
    }
    
    if(this.playable){
      this.actor.setVisible(true)
    }
    
    if(this.actor.fMouseInput.isMouseOver && !PLAYER_GRABBED && this.grabCooldown == 0 && this.playable){
      this.actor.setLocalScale(1.1,1.1,1);
      
      if(Sup.Input.wasMouseButtonJustPressed(0)){
        Sup.Audio.playSound("Sound/Effects/Pickup");
        this.grabbed = true;
      }
    }else{
      if(!this.grabbed){
        this.actor.setLocalScale(1,1,1);
      }
    }
    
    if(Sup.Input.wasKeyJustPressed("ESCAPE")){
      this.grabbed = false;
      PLAYER_GRABBED = false;
    }
  }
  
  restore(){
    Sup.Audio.playSound("Sound/Effects/PlayCard",.5,{pitch:Math.random()/2,pan:1/4 - Math.random()/2});
    this.playable = true;
    this.actor.setVisible(true);
    this.actor.spriteRenderer.setOpacity(1);
  }
  
  clear(){
    this.clearing = true;
    this.actor.setParent(null);
  }
  
  private playable = true;
  private grabbed = false;
  private grabCooldown = 0;
  private numberChild:Sup.Actor = null;
  private borderChild:Sup.Actor = null;
  private frameChild:Sup.Actor = null;
  private clearing = false;
}
Sup.registerBehavior(CardObjectBehavior);
