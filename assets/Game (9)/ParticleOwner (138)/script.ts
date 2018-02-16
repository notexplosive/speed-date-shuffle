class ParticleOwnerBehavior extends Sup.Behavior {
  awake() {
    for(let x = 0; x < this.density; x++){
      let p = new Sup.Actor('particle'+x,this.actor);
      p.addBehavior(SparkleBehavior);
      p.moveLocalY(this.offsety)
      p.moveLocalX(this.offsetx)
      let speed = 0;
      if(this.moveUp){
        speed = 1;
      }
      p.getBehavior(SparkleBehavior).init('2',new Sup.Color(this.r,this.g,this.b),this.radius,speed);
      p.setLocalScale(x/8+1,x/8+1,1);
      this.children.push(p)
    }
  }

  update() {
    for(let child of this.children){
      child.getBehavior(SparkleBehavior).enabled = this.enabled;
    }
  }
  
  setColor(color){
    for(let child of this.children){
      child.getBehavior(SparkleBehavior).setColor(color)
    }
  }
  
  offsetx = 0;
  offsety = 0;
  r = 1
  g = 1
  b = 1
  enabled = true;
  moveUp = true;
  radius = 1;
  density = 5;
  
  private children:Sup.Actor[] = []
}
Sup.registerBehavior(ParticleOwnerBehavior);
