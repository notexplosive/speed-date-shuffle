class ButtonBehavior extends Sup.Behavior {
  callback = 'none'
  text = ''
  playAreaButton = false;
  private scaleFactor = 1;
  
  awake() {
    PLAYER_GRABBED = false;
    if(!this.actor.fMouseInput){
      new fMouseInput(this.actor);
      this.actor.fMouseInput.setCameraActorName("Camera");
    }
    
    if(!this.actor.spriteRenderer){
      new Sup.SpriteRenderer(this.actor,"Graphics/CardBack");
    }
    
    let bt = new Sup.Actor("ButtonText",this.actor);
    bt.moveZ(.1);
    bt.moveY(-.5);
    new Sup.TextRenderer(bt,this.text,"Graphics/Regular").setOpacity(1);
    this.scaleFactor = this.actor.getLocalScaleX();
  }

  update() {
    if(PLAYER_GRABBED && this.playAreaButton){
      this.actor.setVisible(false);
    }
    if(this.actor.fMouseInput.isMouseOver && !PLAYER_GRABBED && this.actor.getVisible()){
      if(this.cooldown > 0){
        this.cooldown--;
      }else{
        this.actor.setLocalScale(1.1,1.1,1)
        if(Sup.Input.wasMouseButtonJustPressed(0)){
          Sup.Audio.playSound("Sound/Effects/PlayCard");
          ButtonFunctions[this.callback]();
          this.cooldown = 5;
        }
        if(Sup.Input.isMouseButtonDown(0)){
          this.actor.setLocalScale(1.05*this.scaleFactor,1.05*this.scaleFactor,1.05)
        }
      }
    }else{
      this.actor.setLocalScale(1*this.scaleFactor,1*this.scaleFactor,1)
    }
  }
  
  private cooldown = 0;
}
Sup.registerBehavior(ButtonBehavior);

let ButtonFunctions = {
  'none' : function(){
    Sup.log("no behavior");
  },
  
  'play' : function(){
    PLAYAREA.play();
  },
  
  'cancel' : function(){
    PLAYAREA.returnPoolToDeck();
  },
  
  'start-date' : function(){
    MENU.pressDate();
  },
  
  'menu-left' : function(){
    MENU.tabLeft();
  },
  
  'menu-right' : function(){
    MENU.tabRight();
  },
  
  'tutorial-next' : function(){
    Sup.getActor("Tutorial").getBehavior(TutorialBehavior).nextState();
  },
  
  'tutorial-prev' : function(){
    Sup.getActor("Tutorial").getBehavior(TutorialBehavior).previousState();
  },
  
  'go-to-menu' : function(){
    Sup.loadScene("Bedroom");
  },
  
  'clear-progress' : function(){
    clearProgress();
  }
}
