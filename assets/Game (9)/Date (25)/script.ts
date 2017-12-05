class DateBehavior extends Sup.Behavior {
  disabled = false;
  difficulty = 1;
  deck = "none";
  awake() {
    CURRENT_DATE = this;
    PLAYER_SCORE = Math.floor(SCORE_WIN_THRESHOLD/2);
    
    if(this.difficulty > 1){
      PLAYER_SCORE -= 5 * this.difficulty;
    }
    
    this.sounds = VOICES[this.voiceName];
    
    Sup.getActor("DateCounter").setVisible(false);
  }

  update() {
    if(this.disabled){return}
    
    if(this.scoreBleedInterval > 0){
      this.scoreBleedInterval--; 
    }else{
      PLAYER_SCORE--;
      this.scoreBleedInterval = 60*4;
      if(this.difficulty > 1){
        this.scoreBleedInterval -= this.difficulty*45;
        Sup.log(this.scoreBleedInterval)
      }
    }
    
    this.faceChangedThisFrame = false;
    if(Sup.getActor("DateCounter").textRenderer.getText() == "0"){
      Sup.getActor("DateCounter").setVisible(false);
    }else{
      Sup.getActor("DateCounter").setVisible(true);
      Sup.getActor("Player").spriteRenderer.setAnimation("stop");
    }
    
    // If date just started talking you still have a grace period.
    if(this.gracePeriod > 0){
      this.gracePeriod--;
    }
    
    if(this.gracePeriod == 0){
      this.gracePeriod = -1;
      if(this.currentAction == "talk"){
        this.iterateValue(this.difficulty);
      }
    }
    
    if(PLAYER_SCORE < 10){
      this.changeFace("talk","stop");
      this.changeFace("talkHappy","stop");
      
      if(this.currentValue == 1){
        this.iterateValue(Math.floor(Math.random()*4))
      }
    }
    
    if(this.currentIntervalTimer > 0){
      this.currentIntervalTimer--;
    }else{
      this.changeFace("start","talk");
      this.changeFace("good","talk");
      
      // Stopping current action, starting a new one.
      let lengthClass = Math.floor(Math.random()*3);
      
      if(this.changeFace("angry","talk") || this.changeFace("nod","talk")){
        this.currentIntervalTimer = 30;
      }
      
      if(lengthClass == 0){ // short
        this.currentIntervalTimer = Math.floor(Math.random()*3) * 60 + 90;
        this.changeFace("talkHappy","stop");
        this.changeFace("talk","stop");
        this.changeFace("stop","talk");
      }
      
      if(lengthClass == 1){ // med
        this.currentIntervalTimer = Math.floor(Math.random()*5) * 60 + 60;
        this.changeFace("stop","talk");
        this.changeFace("talk","talkHappy");
        this.changeFace("talkHappy","stop");
      }
      
      if(lengthClass == 2){ // long
        this.currentIntervalTimer = Math.floor(Math.random()*5) * 60 + 60*3;
        this.changeFace("talk","talkHappy");
        this.changeFace("stop","talk");
        this.changeFace("talkHappy","talk");
      }
    }
    
    if(this.soundInterval > 0){
      this.soundInterval--;
    }else{
      this.playSounds();
      let tempo = 4;
      this.soundInterval = tempo + Math.floor(Math.random()*tempo);
      if(Math.random() < .33){
        this.soundInterval = Math.floor(tempo + tempo*1.75 + Math.random()*tempo);
      }
    }
    
    this.animateFace();
  }
  
  playerRespond(value:number,colors:string[]){
    Sup.getActor("Player").spriteRenderer.setAnimation("talk");
    let interrupt = !(this.currentAction == "stop" || this.gracePeriod > 0);
    
    let calc = calculateScore({colors:PLAYAREA.getTotalColorAsString(),value:PLAYAREA.getTotalValue()},{color:CURRENT_DATE.getCurrentColor(),value:CURRENT_DATE.getCurrentValue()},interrupt)
    let score = calc['score']
    let strings = calc['bonusLines']
    let i = 0;
    for(let str of strings){
      let c = 0x55cc55;
      if(str == "Too small! (x0)" || str == "INTERRUPTED! (x1/4)"){
        c = 0xcc5555;
      }
      let pop = displayPopScore(++i*65+10,str,c);
      pop.setPosition(0,2,4);
      pop.textRenderer.setSize(64);
    }
    
    /*
    let scoreCounterPos = Sup.getActor("Score").getPosition().toVector2();
    for(let i = 0; i < score; i++){
      this.shootHeartAt(scoreCounterPos)
    }
    */
    
    PLAYER_SCORE += score;
    let act;
    if(score > 0){
      this.scoreBleedInterval = 60 * 4;
      let flavor = "OK";
      let soundLevel = 1;
      if(score > 5){
        flavor = "Nice!"
      }
      if(score > 10){
        flavor = "Great!"
      }
      if(score > 15){
        flavor = "Romantic!"
        soundLevel = 2;
      }
      if(score > 20){
        flavor = "Genuine connection!"
      }
      if(score > 25){
        flavor = "Bonding!"
      }
      if(score > 45){
        flavor = "DOG TIER"
      }
      
      Sup.Audio.playSound("Sound/Effects/Ding"+(soundLevel + 1));
      
      act = displayPopScore(0,flavor,0x55cc55);
    }else{
      if(calc['multiplier'] == 0){
        ShowError("Too low!");
      }
      Sup.Audio.playSound("Sound/Effects/DingSad");
    }
    
    if(interrupt){
      this.currentIntervalTimer = 60 * 3;
      this.currentAction = "angry";
      ShowError("DON\'T INTERRUPT!");
      Sup.Audio.playSound("Sound/Effects/Hiss",.5,{pitch:.5,pan:.2});
    }else{
      this.currentIntervalTimer = 60 * 3;
      this.currentAction = "nod";
      if(score > 25){
        this.currentAction = "good";
      }
    }
    
    this.currentValue = 0;
    this.currentColor = 'white';
    let coolText = Sup.getActor("DateCounter").getBehavior(CoolTextBehavior);
    coolText.setText(this.currentValue+"");
    coolText.overrideShadowInvert();
  }
  
  private changeFace(current:string,target:string){
    if(!this.faceChangedThisFrame){
      if(this.numberOfFaceChangesSinceStop > 3 + Math.random()*3 ){
        target = "stop";
      }
      
      if(this.currentAction == current){
        if(current == "stop"){
          this.gracePeriod = 25;
        }
        this.currentAction = target;
        this.faceChangedThisFrame = true;
        
        if(target == "stop"){
          this.numberOfFaceChangesSinceStop++;
        }else{
          this.numberOfFaceChangesSinceStop = 0;
        }
        
        if(this.gracePeriod == -1){
          if(target == "talk"){
            this.iterateValue(this.difficulty);
          }

          if(target == "talkHappy"){
            this.iterateValue(this.difficulty+1);
          }
        }
        
        return true;
      }
    }
    return false;
  }
  
  private playSounds(){
    let playerTalking = Sup.getActor("Player").spriteRenderer.getAnimation() == "talk";
    if(this.currentAction == "talk" || this.currentAction == "talkHappy" || playerTalking){
      let pitch = this.basePitch + Math.random()/8;
      let vol = .15 + Math.random()/8
      if(this.currentAction == "talkHappy"){
        pitch += .2;
      }
      this.currentSoundIndex++;
      if(this.currentSoundIndex >= this.sounds.length){
        shuffle(this.sounds);
        this.currentSoundIndex = 0;
      }
      this.currentSound = this.sounds[this.currentSoundIndex];
      this.currentSound.setPan(.2);
      this.currentSound.setPitch(pitch);
      
      if(playerTalking){
        this.currentSound = PLAYER_VOICE[Math.floor(PLAYER_VOICE.length*Math.random())];
        this.currentSound.setPitch(-.2 + + Math.random()/8);
        this.currentSound.setPan(-.2);
        
        if(this.currentIntervalTimer < 30){
          Sup.getActor("Player").spriteRenderer.setAnimation("stop");
        }
      }
      
      this.currentSound.setVolume(vol)
      this.currentSound.play();
    }
  }
  
  private animateFace(){
    let head = this.actor.getChild("Head")
    head.spriteRenderer.setAnimation(this.currentAction);
  }
  
  private iterateValue(amount:number){
    Sup.Audio.playSound("Sound/Effects/Ding",.25,{pan:.2});
    
    if(this.currentValue > 21){
      this.currentValue = 21;
    }
    
    if(this.currentColor == "white"){
      this.currentValue = 1;
    }
    
    if(Math.random() < .25 || this.currentColor == "white"){
      let index = Math.floor(Math.random()*COLORS.length);
      let tempcolor = COLORS[index];
      if(this.currentColor == tempcolor){
        tempcolor = COLORS[(index+1)%COLORS.length];
      }
      this.currentColor = tempcolor
    }else{
      this.currentValue += amount;
    }
    
    let textrenderer = Sup.getActor("DateCounter").textRenderer;
    let coolText = Sup.getActor("DateCounter").getBehavior(CoolTextBehavior);
    coolText.setText(this.currentValue+"");
    textrenderer.setColor(ColorStringToColor(this.currentColor));
    coolText.overrideShadowInvert();
  }
  
  getCurrentValue(){
    return this.currentValue;
  }
  
  getCurrentColor(){
    return this.currentColor;
  }
  
  shootHeartAt(pos){
    let act = new Sup.Actor("HeartMissile");
    act.setPosition(this.actor.getPosition());
    new Sup.SpriteRenderer(act,"Graphics/Heart");
    let missile = act.addBehavior(HomingMissileBehavior);
    missile.velocity = new Sup.Math.Vector2(Math.random() - .5 ,Math.random() - .5).normalize().multiplyScalar(.01);
    missile.targetPosition = pos;
  }
  
  basePitch = 0;
  voiceName = "cat";
  private talkFolder = "Female"
  private currentIntervalTimer = 120;
  private currentAction = "start"; // "stop" "talk" "talkHappy"
  private faceChangedThisFrame = false;
  private gracePeriod = 0;
  private currentValue = 0;
  private currentColor = "white";
  private numberOfFaceChangesSinceStop = 0;
  private sounds = [];
  private soundInterval = 0;
  private currentSound:Sup.Audio.SoundPlayer = null;
  private currentSoundIndex = 0;
  private scoreBleedInterval = 0;
}
Sup.registerBehavior(DateBehavior);


/*

Talking/not talking at randomish intervals
Sometimes happy talking
Random talk balloons throughout
As she talks, the number goes up
  Color changes randomly, sometimes it's white
  maybe sometimes the color is prismatic (require both!)

She pauses, signified by a particular face

*/