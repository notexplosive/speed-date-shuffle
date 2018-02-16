class ScoreEstimatorBehavior extends CoolTextBehavior {
  update() {
    super.update();
    if(this.currentEstimate == 1){
      this.actor.setVisible(false)
    }else{
      this.actor.setVisible(true)
    }
    
    let calc = calculateScore({colors:PLAYAREA.getTotalColorAsString(),value:PLAYAREA.getTotalValue()},{color:CURRENT_DATE.getCurrentColor(),value:CURRENT_DATE.getCurrentValue()},false)
    let newEstimate = calc['multiplier'];
    if(newEstimate != this.currentEstimate){
      let text = "";
      if(calc['multiplier'] > 1){
        text += "x"+ calc['multiplier']
      }
      if(calc['multiplier'] == .5){
        text += "x1/2"
      }
      if(calc['multiplier'] == 0){
        text += "x0"
      }
      this.setText(text);
    }
    this.currentEstimate = newEstimate;
    
    if(calc['multiplier'] != 0){
      Sup.getActor("MatchValueParticles").getBehavior(ParticleOwnerBehavior).enabled = calc['val'] == 2;
      Sup.getActor("MatchColorParticles").getBehavior(ParticleOwnerBehavior).enabled = calc['col'];
    }else{
      Sup.getActor("MatchValueParticles").getBehavior(ParticleOwnerBehavior).enabled = false;
      Sup.getActor("MatchColorParticles").getBehavior(ParticleOwnerBehavior).enabled = false;
    }
    
    if(calc['col'] == true){
      let partColor = ColorStringToColor(CURRENT_DATE.getCurrentColor());
      Sup.log(CURRENT_DATE.getCurrentColor());
      Sup.getActor("MatchColorParticles").getBehavior(ParticleOwnerBehavior).setColor(partColor);
    }
  }
  
  private currentEstimate = 0;
}
Sup.registerBehavior(ScoreEstimatorBehavior);
