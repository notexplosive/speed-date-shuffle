class PoolCounterBehavior extends CoolTextBehavior {
  update() {
    super.update();
    this.frame ++;
    let justBecameVisible = false;
    
    let total = PLAYAREA.getTotalValue();
    if(total == 0){
      this.actor.setVisible(false);
    }else{
      if(!this.actor.getVisible()){
        justBecameVisible = true;
      }
      
      this.actor.setVisible(true);
    }
    
    let pool = PLAYAREA.getPoolAsData();
    let animLength = 10;
    if(this.cardsInPoolCount != pool.length){
      this.cardsInPoolCount = pool.length
      this.actor.setLocalScale(1.5,1.5,1)
      this.colorOptions = PLAYAREA.getTotalColor();

      CURRENT_POOL_TOTAL = total;
      this.setText(total+"");
    }
    
    
    if(this.frame % 30 == 0 || justBecameVisible){
      let color = this.colorOptions[0];
      if(this.colorOptions.length > 1){
        let index = (this.colorIndex++)%this.colorOptions.length;
        color = this.colorOptions[index];
      }
      this.actor.textRenderer.setColor(color)
      this.overrideShadowInvert();
    }
  }
  
  private cardsInPoolCount = 0;
  private color = "";
  private colorOptions:Sup.Color[] = [RED];
  private frame = 0;
  private colorIndex = 0;
}
Sup.registerBehavior(PoolCounterBehavior);
