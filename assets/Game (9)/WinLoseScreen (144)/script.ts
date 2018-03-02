class WinLoseScreenBehavior extends Sup.Behavior {
  awake() {
    MUSIC.stop()
    let arr;
    let index = CURRENT_DATE_INDEX-1;
    if(index >= 0){
      if(WON_LAST_DATE){
        let tx = DATE_WIN_LINES[index];
        arr = this.parseWinloseLine(tx);
      }else{
        let tx = DATE_LOSE_LINES[index];
        arr = this.parseWinloseLine(tx);
      }
      Sup.getActor("Dates").getChildren()[index].setPosition(Sup.getActor("DateLocation").getPosition())
    }
    
    if(arr){
      Sup.getActor('DateMessageTitle').textRenderer.setText(arr[0]);
      Sup.getActor('DateMessage').textRenderer.setText(arr[1]);
    }
  }

  update() {
  }
  
  parseWinloseLine(line){
    let title = line.split('$')[0];
    let body = line.split('$')[1];
    return [title,body];
  }
}
Sup.registerBehavior(WinLoseScreenBehavior);
