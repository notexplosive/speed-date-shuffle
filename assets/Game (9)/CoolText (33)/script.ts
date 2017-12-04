class CoolTextBehavior extends Sup.Behavior {
  awake() {
    let shd = new Sup.Actor("Shadow",this.actor);
    shd.setLocalPosition(.05,-.05,-.1);
    let tr = new Sup.TextRenderer(shd,"","Graphics/Bold");
    tr.setSize(this.actor.textRenderer.getSize());
    tr.setColor( new Sup.Color(this.shadowDark) )
    tr.setOpacity(.75);
  }
  
  start(){
    let shad = this.findShadow();
    if(shad){
      shad.textRenderer.setText(this.actor.textRenderer.getText());
      shad.textRenderer.setSize(this.actor.textRenderer.getSize());
      let scalefactor = this.actor.textRenderer.getSize()/128;
      shad.setLocalPosition(.025*scalefactor,-.025*scalefactor,-.1);
    }
  }
  
  update() {
    if(this.animationTimer > 0){
      this.animationTimer--;
      this.actor.setLocalScale(1+this.animationTimer/this.animLength/2,1+this.animationTimer/this.animLength,1)
    }else{
      let sclx = this.actor.getLocalScaleX();
      let scly = this.actor.getLocalScaleY();
      let difx = this.scaleFactor - sclx;
      let dify = this.scaleFactor - scly;
      
      this.actor.setLocalScale(sclx + difx * .5, scly + dify * .5,1);
    }
  }
  
  setText(str:string){
    this.animationTimer = this.animLength;
    this.actor.setLocalScale(1.5*this.scaleFactor,1.5*this.scaleFactor,1)
    this.actor.textRenderer.setText(str);
    let shad = this.findShadow();
    if(shad){
      shad.textRenderer.setText(str);
      if(this.invertShadowColor){
        shad.textRenderer.setColor(new Sup.Color(this.shadowLight));
        shad.textRenderer.setOpacity(.4);
      }
    }
  }
  
  protected findShadow(){
    let children = this.actor.getChildren();
    for(let child of children){
      if(child.getName() == "Shadow"){
        return child;
      }
    }
    return null;
  }
  
  protected findBackground(){
    let children = this.actor.getChildren();
    for(let child of children){
      if(child.getName() == "Circle"){
        return child;
      }
    }
    return null;
  }
  
  overrideShadowInvert(){
    // override the shadow invert if the color is yellow
    let shad = this.findShadow();
    let hex = this.actor.textRenderer.getColor().getHex();
    if(hex == YELLOW.getHex() || hex == RED.getHex() || hex == GREEN.getHex()){
      shad.textRenderer.setColor(new Sup.Color(this.shadowDark));
      shad.textRenderer.setOpacity(.75);
    }
  }
  
  invertShadowColor = false;
  scaleFactor = 1;
  protected animationTimer = 0;
  protected animLength = 10;
  private shadowDark = 0x555555;
  private shadowLight = 0xaaaaaa;
}
Sup.registerBehavior(CoolTextBehavior);
