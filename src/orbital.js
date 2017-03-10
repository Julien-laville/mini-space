function OrbitalMechanic2DMobile(pos, G, speed, acc) {
    this.pos = pos
    this.G = G
    this.speed = speed
    this.acc = acc
    
    this.stance = 0
    this.forceNorm = 0
    this.force = new v2d(0,0)
    this.i = 0   
    this.attractor = 0
    this.influentAttracorForceNorm = 0  
    this.influentAttractor = 0
    this.gravityNorm = 0
    this.gravityV2d = new v2d(0,0)
}

OrbitalMechanic2DMobile.prototype.getAttractor = function(attractors) {
    this.influentAttractor = attractors[0]
    this.influentAttracorForce = 0
    
    for(this.i = 0; this.i < attractors.length; this.i++) {
        this.attractor = attractors[this.i]
        this.stance = this.pos.stance(this.attractor.pos)
        this.forceNorm = this.attractor.G / (this.stance * this.stance)
        
        if(this.influentAttracorForceNorm < this.forceNorm) {
            this.influentAttracorForceNorm = this.forceNorm
            this.influentAttractor = this.attractor
        }        
    }
}

OrbitalMechanic2DMobile.prototype.getGravityV2d = function(attractors) {

    // set influentAttracorForceNorm & influentAttracor
    this.getAttractor(attractors)
    
    this.stance = this.pos.stance(this.influentAttractor.pos)
    
    this.gravityV2d.setVector(this.pos)
    this.gravityV2d.sub(this.influentAttractor.pos)
    this.gravityV2d.normalize()
    this.gravityV2d.scale(this.influentAttracorForceNorm)
}   



OrbitalMechanic2DMobile.prototype.computeNewPos = function(attractors, deltaT, forces) {
    // set gravityV2d
    this.getGravityV2d(attractors)
    this.force.setVector(this.gravityV2d)
    for(this.i=0; this.i < forces.length; this.i ++) {
        this.force.add(forces[this.i])
    }
    this.force.scale(deltaT)
    this.speed.add(this.force)
    this.speed.scale(deltaT)
    this.pos.add(this.speed)
    
}

OrbitalMechanic2DMobile.prototype.calcTrajectory = function() {
    for(this.i = 0; i < 1000; i ++) {
        
    }
}




// tests



var attractors = [
    new OrbitalMechanic2DMobile(new v2d(0,0), 100,new v2d(0,0),new v2d(0,0)),
    new OrbitalMechanic2DMobile(new v2d(100,0), 100,new v2d(0,0),new v2d(0,0))
]

var ship = new OrbitalMechanic2DMobile(new v2d(50,50), 0, new v2d(0,0), new v2d(0,0))
ship.computeNewPos(attractors,16,[])
console.log(    ship.pos    )
ship.computeNewPos(attractors,16,[])
console.log(    ship.pos    )
ship.computeNewPos(attractors,16,[])
console.log(    ship.pos    )