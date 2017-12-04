class MenuBehavior extends Sup.Behavior {
  awake() {
    MENU = this;
    MUSIC.play(2);
    this.maxIndex = Sup.getActor("DateBackground").getChildren().length-1;
    this.handleOverlayText();
    saveProgress();
  }

  update() {
    let children = Sup.getActor("DateBackground").getChildren();
    for(let i = 0; i < children.length; i++){
      if(i == this.selectIndex){
        children[i].setVisible(true);
        Sup.getActor("Name").textRenderer.setText(children[i].getName());
        if(!COMPLETED_DATES[this.selectIndex-1] && this.selectIndex > 1){
          Sup.getActor("Name").textRenderer.setText("????");
        }
      }else{
        children[i].setVisible(false);
      }
    }
    
    Sup.getActor("Description").textRenderer.setText(DATE_DESCRIPTIONS[this.selectIndex])
  }
  
  handleOverlayText(){
    let act = Sup.getActor("OverlayText")
    let dateButton = Sup.getActor("DateButton");
    dateButton.setVisible(true);
    act.setVisible(false);
    let behavior = act.getBehavior(CoolTextBehavior)
    if(COMPLETED_DATES[this.selectIndex]){
      act.setVisible(true);
      behavior.setText("COMPLETE")
    }
    if(!COMPLETED_DATES[this.selectIndex-1] && this.selectIndex > 1){
      act.setVisible(true);
      dateButton.setVisible(false);
      behavior.setText("LOCKED")
      let actors = Sup.getActor("DateBackground").getChildren()[this.selectIndex].getChildren();
      for(let actor of actors){
        actor.spriteRenderer.setColor(new Sup.Color(0x111111))
      }
    }
  }
  
  tabLeft(){
    this.selectIndex--;
    if(this.selectIndex < 0){
      this.selectIndex = this.maxIndex;
    }
    this.handleOverlayText();
  }
  
  tabRight(){
    this.selectIndex++;
    if(this.selectIndex > this.maxIndex){
      this.selectIndex = 0;
    }
    this.handleOverlayText();
  }
  
  pressDate(){
    if(this.selectIndex == 0){
      Sup.loadScene("Tutorial");
      return;
    }
    let templates = ["template_Cat","template_Bird","template_Dog","template_Secret"];
    DATE_TEMPLATE = templates[this.selectIndex-1];
    CURRENT_DATE_INDEX = this.selectIndex;
    Sup.loadScene("GameScreen");
  }
  
  private selectIndex = 0;
  private maxIndex;
}
Sup.registerBehavior(MenuBehavior);
