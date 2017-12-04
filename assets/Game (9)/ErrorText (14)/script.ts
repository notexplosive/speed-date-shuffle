class ErrorTextBehavior extends CoolTextBehavior {
  awake() {
    ERRORTEXT = this;
    this.actor.setPosition(0,1.5,1)
  }

  update() {
    super.update();
    if(this.timer > 0){
      this.timer--;
    }else{
      this.opac *= .8;
      if(this.opac < .01){
        this.opac = 0;
      }
    }
    
    this.actor.getChildren()[0].textRenderer.setOpacity(this.opac);
    this.actor.textRenderer.setOpacity(this.opac)
  }
  
  showError(str:string){
    this.timer = 120;
    this.opac = 1;
    this.setText(str)
    this.actor.getChildren()[0].textRenderer.setText(str);
  }
  
  private timer = 0;
  private opac = 0;
}
Sup.registerBehavior(ErrorTextBehavior);
