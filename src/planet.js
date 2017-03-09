function Planet(pos, diameter, revolutionTime) {
    this.pos = pos
    this.diameter = diameter
    this.revolutionTime = revolutionTime
    
}


Planet.prototype.move=function(delta){
    this.angle = this.angle+delta*this.speed/100
    this.pos.x=Math.cos(this.angle)*this.distanceMinFromParent
    this.pos.y=Math.sin(this.angle)*this.distanceMinFromParent

    this.shadowPos.setPoint(
        Math.cos(this.angle)*(this.distanceMinFromParent-this.diameter),
        Math.sin(this.angle)*(this.distanceMinFromParent-this.diameter))
}