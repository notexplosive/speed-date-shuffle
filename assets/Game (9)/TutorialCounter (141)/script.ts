class TutorialCounterBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    this.actor.textRenderer.setText(this.value);
    this.actor.textRenderer.setColor(ColorStringToColor(this.color));
    
    this.colorMatch = false;
    this.valueMatch = false;
    this.valueLess = false;
    
    let playArea = Sup.getActor('PlayArea').getBehavior(PlayAreaBehavior);
    let colorsInPlayArea = playArea.getTotalColor();
    if(this.value == playArea.getTotalValue()){
      this.valueMatch = true;
    }
    
    if(this.value > playArea.getTotalValue()){
      this.valueLess = true;
    }
    
    for(let color of colorsInPlayArea){
      if(color.getHex() == ColorStringToColor(this.color).getHex()){
        this.colorMatch = true;
      }
    }
    
    // THIS WILL NEED TO BE REFACTORED IF WE EVER CHANGE THE SCORE SCHEME
    let x = this.value;
    if(this.valueMatch){
      x *= 2;
    }
    if(this.colorMatch){
      x *= 2;
    }
    if(this.valueLess){
      x *= 0;
    }
    
    Sup.getActor('ScoreText').textRenderer.setText(x + '% chemistry');
    Sup.getActor('ScoreText').setVisible(playArea.getTotalValue()>0)
    Sup.getActor('ValueMatchText').setVisible(this.valueMatch)
    Sup.getActor('ColorMatchText').setVisible(this.colorMatch)
    Sup.getActor('ValueLessText').setVisible(this.valueLess && playArea.getTotalValue()>0)
  }
  
  private value = 5;
  private color = 'red';
  
  colorMatch = false;
  valueMatch = false;
  valueLess = false;
}
Sup.registerBehavior(TutorialCounterBehavior);
