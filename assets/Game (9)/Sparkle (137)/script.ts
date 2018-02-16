class SparkleBehavior extends Sup.Behavior {
  init(anim,color,radius,speed) {
    this.anim = anim;
    this.color = color;
    this.radius = radius;
    this.actor.setLocalZ(4.5);
    this.startPos = this.actor.getLocalPosition().toVector2();
    this.speed = speed;
    this.start();
  }
  
  awake() {
    new Sup.SpriteRenderer(this.actor,"Graphics/Sparkle");
    this.delay = Math.floor(120*Math.random());
  }
  
  start() {
    this.actor.spriteRenderer.setAnimation(this.anim);
    this.actor.spriteRenderer.playAnimation(false);
    this.actor.spriteRenderer.setColor(this.color);
  }

  update() {
    if(!this.enabled){
      this.actor.setVisible(false);
      this.delay = Math.floor(120*Math.random());
      return;
    }
    if(this.delay > 0){
      this.delay--;
      this.actor.setVisible(false)
      this.actor.spriteRenderer.setAnimationFrameTime(0);
      if(this.speed != 0){
        this.speed = 0.05 * Math.random() + 0.01
      }
    }else{
      this.actor.setVisible(true)
      this.actor.moveLocalY(this.speed);
      if(!this.actor.spriteRenderer.isAnimationPlaying()){
        this.delay = 1;//10*Math.random();
        this.actor.setLocalPosition(this.startPos);
        this.actor.setVisible(false)
        let movVec = new Sup.Math.Vector2(this.radius*(Math.random()-.5),this.radius*(Math.random()-.5)).normalize().multiplyScalar(Math.random())
        this.actor.moveLocal( movVec );
        this.actor.spriteRenderer.playAnimation(false)
      }
    }
  }
  
  setColor(color:Sup.Color){
    color = new Sup.Color(color.r-.1,color.g-.1,color.b-.1);
    this.color = color;
    this.actor.spriteRenderer.setColor(this.color);
  }
  
  private color = new Sup.Color(0xffffff);
  private anim = '2';
  private startPos = new Sup.Math.Vector2()
  private radius = 2.5
  private speed = 1;
  enabled = true;
  delay = 50;
}
Sup.registerBehavior(SparkleBehavior);
