class GameStartBehavior extends Sup.Behavior {
  awake() {
    let actors = Sup.appendScene(DATE_TEMPLATE);
    let date = actors[0];
    date.setPosition(2.1, .3, -1);
    date.addBehavior(MoveToStartPositionBehavior).delay = 240;
    date.move(-15,0);
    CURRENT_DATE.disabled = true
    MUSIC.stop();
  }

  update() {
    if(this.timer > 0){
      this.timer --;
      
      if(this.timer == 60 * 5.5){
        if(!this.startedIntro){
          this.startedIntro = true;
          if(MUSIC.getEnabled()){
            Sup.Audio.playSound("Sound/Intro");
          }
        }
      }
      
      if(this.timer == 60 * 4.2){
        displayPopScore(0,"Ready",WHITE.getHex());
        Sup.Audio.playSound("Sound/Effects/Ding");
      }
      if(this.timer == 60 * 3){
        displayPopScore(0,"Set",WHITE.getHex());
        Sup.Audio.playSound("Sound/Effects/Ding");
      }
      if(this.timer == 60 * 1.8){
        displayPopScore(0,"DATE!",WHITE.getHex());
        Sup.Audio.playSound("Sound/Effects/Ding3");
      }
      
      if(this.timer == 60){
        PLAYERHAND.drawCardObject();
      }
      if(this.timer == 50){
        PLAYERHAND.drawCardObject();
      }
      if(this.timer == 40){
        PLAYERHAND.drawCardObject();
      }
      if(this.timer == 30){
        PLAYERHAND.drawCardObject();
      }
      if(this.timer == 20){
        PLAYERHAND.drawCardObject();
      }
    }
    if(this.timer == 0){
      MUSIC.play();
      if(CURRENT_DATE.difficulty >= 4){
        MUSIC.play(3);
      }
      this.timer = -1;
      CURRENT_DATE.disabled = false;
    }
  }
  
  private timer = 60 * 6;
  private startedIntro = false;
}
Sup.registerBehavior(GameStartBehavior);
