class DateCounterBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    this.frame ++;
    
    let pool = PLAYAREA.getPoolAsData();
    let animLength = 10;
    if(this.cardsInPoolCount != pool.length){
      this.cardsInPoolCount = pool.length
      this.animationTimer = animLength;
      this.actor.setLocalScale(1.5,1.5,1)
      let colorString = determineColor(pool);
      let colors = colorString.split(' ');
      let pallette = [];
      for(let color of colors){
        if(color == "red"){
          pallette.push(RED);
        }
        if(color == "blue"){
          pallette.push(BLUE);
        }
        if(color == "green"){
          pallette.push(GREEN);
        }
        if(color == "yellow"){
          pallette.push(YELLOW);
        }
      }
      Sup.log(pallette)
      this.colorOptions = pallette;
    }
    
    
    if(this.frame % 2 == 0){
      let color = this.colorOptions[Math.floor(Math.random()*this.colorOptions.length)];
      this.actor.textRenderer.setColor(color)
    }
    
    if(this.animationTimer > 0){
      this.animationTimer--;
      this.actor.setLocalScale(1+this.animationTimer/animLength/2,1+this.animationTimer/animLength,1)
    }else{
      let sclx = this.actor.getLocalScaleX();
      let scly = this.actor.getLocalScaleY();
      let difx = 1 - sclx;
      let dify = 1 - scly;
      
      this.actor.setLocalScale(sclx + difx * .5, scly + dify * .5,1);
    }
    
    let total = 0;
    for(let card of pool){
      total += card.value;
      card.color;
    }
    
    if(total == 0){
      this.actor.setVisible(false);
    }else{
      this.actor.setVisible(true);
    }
    
    this.actor.textRenderer.setText(total);
    CURRENT_POOL_TOTAL = total;
  }
  
  private cardsInPoolCount = 0;
  private animationTimer = 0;
  private color = "";
  private colorOptions:Sup.Color[] = [RED];
  private frame = 0;
}
Sup.registerBehavior(DateCounterBehavior);
