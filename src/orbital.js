function OrbitalMechanic2DMobile() {

}



OrbitalMechanic2DMobile.prototype.computeGravity = function(object) {
        player.trajectory.stance = player.trajectory.attratedBy.pos.stance(futureObect)
        player.trajectory.force = player.trajectory.attratedBy.G / (player.trajectory.stance * player.trajectory.stance)

        planets.forEach(function(planet) {
            var stanceZ = planet.getFuturePosition(futureTime).stance(futureObect)
            var forceZ = planet.G / (stanceZ * stanceZ)
            if(player.trajectory.force < forceZ) {
                player.trajectory.force = forceZ
                player.trajectory.attratedBy = planet
            }
        })

        stanceZ = futureObect.stance(sun.pos)

        forceZ = sun.G / (stanceZ * stanceZ)
        if(player.trajectory.force < forceZ) {
            player.trajectory.force = forceZ
            player.trajectory.attratedBy = sun
        }

        //return player.future.planet

}


OrbitalMechanic2DMobile.prototype.getTrajectory = function() {

}
