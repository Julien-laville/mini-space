function UI() {
    
}


UI.prototype.drawManover = function(context,deltaT) {

        if(manover.state==1) {
            //get neareast point on trajectory
            mouseToSpace()
            //vMouse.sub(vCam)
            // vMouse.sub(vCam)
            manover.nearPoint = vPool[0]
            manover.minStance = vPool[0].pos.stance(tools.mouse)
            vPool.forEach(function(vp) {
                manover.stance = vp.pos.stance(tools.cam)
                if(manover.minStance > manover.stance) {
                    manover.minStance = manover.stance
                    manover.nearPoint = vp
                    manover.origin.setVector(mousePos)
                }
            })
            manover.state = 2
        } else if(manover.state==2) {
            context.moveTo(c.width/2+z(manover.nearPoint.pos.x-camera.pos.x+4),c.height/2+z(manover.nearPoint.pos.y-camera.pos.y-5))
            context.arc(c.width/2+z(manover.nearPoint.pos.x-camera.pos.x+4),c.height/2+z(manover.nearPoint.pos.y-camera.pos.y-5),4,0,7)
            context.fillStyle = "white"
            context.fill()
            context.strokeStyle = "white"
            context.lineTo(mousePos.x,mousePos.y)
            context.stroke()
            manover.deltaV.setVector(mousePos)
            manover.deltaV.sub(manover.origin)
            //manover.deltaV.sub(manover.nearPoint.speed)
            manover.fixedPoint.setVector(manover.nearPoint.pos)
            manover.initialDeltaV.setVector(manover.nearPoint.speed)
            trajectory(context,deltaT,manover.deltaV, manover.nearPoint.pos)
        } else if(manover.state==3) {
            trajectory(context,deltaT,manover.deltaV, manover.fixedPoint)
            //draw alternateManover
        }
    }



    function start() {
        m.style.display = "none"
        state = 1
    }
    function stop() {
        j.style.display = "none"
        state = 1;
    }

    function pause() {
        m.style.display = "inline"
        m.innerHTML = "Paused"
    }
    function unpause() {
        m.style.display = "none"
        m.innerHTML = ""
    }
