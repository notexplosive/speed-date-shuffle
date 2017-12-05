class TimeToNextSceneBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(this.timer > 0){
      this.timer--;
    }else{
      Sup.log("loading")
      Sup.loadScene(this.target)
    }
  }
  
  timer = 10;
  target = "Bedroom";
}
Sup.registerBehavior(TimeToNextSceneBehavior);
