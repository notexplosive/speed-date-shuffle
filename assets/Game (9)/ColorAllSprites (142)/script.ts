class ColorAllSpritesBehavior extends Sup.Behavior {
  awake() {
    let actors = Sup.getAllActors();
    for(let act of actors){
      if(act.getName() == 'CardBack'){
        act.spriteRenderer.setColor(new Sup.Color(0x5875C1));
      }
    }
  }

  update() {
    
  }
}
Sup.registerBehavior(ColorAllSpritesBehavior);
