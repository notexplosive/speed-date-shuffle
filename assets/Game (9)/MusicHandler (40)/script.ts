class MusicHandlerBehavior extends Sup.Behavior {
  awake() {
    MUSIC.play();
    this.startTime = new Date().getTime() / 1000;
    // populate event queue
    let list = []
    
    // Raise this constant to allow more events
    for(let i = 1; i <= NUMBER_OF_MUSIC_EVENTS; i++){
      list.push(new Sup.Audio.SoundPlayer("Sound/Events/Event"+i));
    }
    
    MUSIC.setEventQueue(shuffle(list));
  }

  update() {
    let currentTime = new Date().getTime() / 1000;
    if(currentTime - this.startTime > 90){
      MUSIC.playNextEvent();
      this.startTime = currentTime;
    }
    
    if(MUSIC.isCurrentEventPlaying()){
      MUSIC.setVolume(.3);
    }else{
      MUSIC.setVolume(MUSIC.defaultVolume);
    }
    
    if(MUSIC.fadeOutFlag){
      MUSIC.setVolume(MUSIC.getVolume() - 1/60);
      
      if(MUSIC.getVolume() < .1){
        MUSIC.stop();
      }
    }
  }
  
  private frame = 0;
  private startTime = 0;
  private eventIndex = 0;
}
Sup.registerBehavior(MusicHandlerBehavior);

class Jukebox{
  stop(){
    this.mainTrack.stop();
    for(let player of this.eventQueue){
      player.stop();
      Sup.log(player.getState());
    }
  }
  
  fadeOut(){
    this.fadeOutFlag = true;
  }
  
  play(n:number=1){
    this.stop();
    
    if(n == 1){
      this.mainTrack = this.dateTrack;
      this.mainTrack.setVolume(this.defaultVolume);
    }
    if(n == 2){
      this.mainTrack = this.menuTrack;
      this.mainTrack.setVolume(this.defaultVolume * 0.7)
    }
    
    this.fadeOutFlag = false;
    this.mainTrack.play();
    this.mainTrack.setLoop(true);
  }
  
  setVolume(n){
    this.mainTrack.setVolume(n);
  }
  
  getVolume(){
    return this.mainTrack.getVolume();
  }
  
  playNextEvent(){
    this.currentEvent = MUSIC.eventQueue[this.eventIndex++]
    this.currentEvent.play();
    this.eventIndex %= this.eventQueue.length;
  }
  
  setEventQueue(list){
    this.eventQueue = list;
  }
  
  isCurrentEventPlaying(){
    if(this.currentEvent){
      return this.currentEvent.isPlaying();
    }
    return false;
  }
  
  fadeOutFlag = false;
  defaultVolume = .6;
  private currentEvent:Sup.Audio.SoundPlayer;
  private eventIndex = 0;
  private eventQueue:Sup.Audio.SoundPlayer[] = [];
  private dateTrack = new Sup.Audio.SoundPlayer("Sound/MainLoop");
  private menuTrack = new Sup.Audio.SoundPlayer("Sound/MenuGroove");
  private mainTrack:Sup.Audio.SoundPlayer = this.dateTrack;
}

MUSIC = new Jukebox()