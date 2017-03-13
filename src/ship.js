
function Ship(pos, mesh) {
    this.orbitalMechanic2DMobile = new OrbitalMechanic2DMobile(pos, 0, new v2d(0,0), new v2d(0,0))
    this.mesh = mesh
}


Ship.prototype.move = function(delta, solarSystem) {
    this.orbitalMechanic2DMobile.computeNewPos(solarSystem, delta,[])
    this.mesh.position.set(this.orbitalMechanic2DMobile.pos.x, this.orbitalMechanic2DMobile.pos.y, 0)
}

Ship.prototype.getV3d = function() {
    return this.orbitalMechanic2DMobile.getV3d()
}
