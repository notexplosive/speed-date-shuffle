class ScoreTrackerBehavior extends CoolTextBehavior {
  awake() {
    WINLOSE = this;
  }

  update() {
    super.update();
    if(this.previousScore != PLAYER_SCORE){
      this.previousScore = PLAYER_SCORE;
      let diff = Math.ceil(PLAYER_SCORE/SCORE_WIN_THRESHOLD*100);
      this.setText(diff+"%");
      if(PLAYER_SCORE < 0){
        this.setText("X");
      }
    }
    
    if(Sup.Input.isKeyDown("SPACE")){
      if(Sup.Input.wasKeyJustPressed("F")){
        PLAYER_SCORE -= 5;
        displayPopScore(0,"Cheat!",0xffffff);
      }
      if(Sup.Input.wasKeyJustPressed("G")){
        PLAYER_SCORE += 5;
        displayPopScore(0,"Cheat!",0xffffff);
      }
    }
    
    if( PLAYER_SCORE >= SCORE_WIN_THRESHOLD ){
      this.win();
    }
    
    if( PLAYER_SCORE < 0 ){
      this.lose("score-ran-out")
    }

    if(this.transitionTimer > 0 ){
      this.transitionTimer--;
      let fade = this.transitionTimer/60
      if(this.winGame || this.loseGame){
        fade = 1-fade;
      }
      Sup.getActor("White").spriteRenderer.setOpacity(fade);
    }else{
      if(this.winGame){
        WON_LAST_DATE = true;
        COMPLETED_DATES[CURRENT_DATE_INDEX] = true;
        this.queueSceneLoad("WinLoseScreen")
      }
      
      if(this.loseGame){
        WON_LAST_DATE = false;
        this.queueSceneLoad("WinLoseScreen")
      }
    }
  }
  
  queueSceneLoad(str:string){
    if(!this.triggerSceneTransition){
      Sup.log("Triggered Scene Load")
      this.triggerSceneTransition = true;
      let b = this.actor.addBehavior(TimeToNextSceneBehavior);
      b.target = str;
      b.timer=60;
    }
  }
  
  win(){
    if(!this.winGame){
      this.transitionTimer = 60;
      this.winGame = true;
      Sup.Audio.playSound("Sound/Effects/Ding3",.6);
      MUSIC.fadeOut();
    }
  }
  
  // "score-ran-out" "out-of-cards"
  lose(reason?:string){
    Sup.log("lost!")
    Sup.log(reason);
    if(!this.loseGame){
      this.transitionTimer = 60;
      this.loseGame = true;
      Sup.Audio.playSound("Sound/Effects/DingSad",.6);
      MUSIC.fadeOut();
    }
  }
  
  private transitionTimer = 60;
  private loseGame = false;
  private winGame = false;
  private previousScore = 0;
  private triggerSceneTransition = false;
}
Sup.registerBehavior(ScoreTrackerBehavior);
