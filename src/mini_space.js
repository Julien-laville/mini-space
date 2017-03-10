let FOV = 90
let FAR_DISTANCE = 1000

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, FAR_DISTANCE)

let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight, document.body.appendChild(renderer.domElement))



camera.position.z = 100
MissionLoader.load(scene)

let now = performance.now()
let delta = 0
function render() {
    delta = performance.now() - now
    
    ship.move(delta)
    
    requestAnimationFrame( render )
    renderer.render( scene, camera )
    now = performance.now()
}
render()



function Ship() {
    this.orbitalMechanic2DMobile = new OrbitalMechanic2DMobile(new v2d(), 0, new v2d(), new v2d())
}


Ship.prototype.move() {
    this.orbitalMechanic2DMobile.getPo
}

/*
PHYSIC_STEP = 10
POOL_SIZE = 400

mousePos = new v2d(0,0)

Number.prototype.m = function(n){return((this%n)+n)%n;}

var vPool=[]
for(var i = 0;index < POOL_SIZE; index++) {
    vPool[index]={
        speed : new v2d(0,0),
        f : 0,
        pos : new v2d()

    }
}


oldDate = new Date();
nz = 4
sun = {pos : new v2d(0,0), stance: 0, name : 'sun', G : 440000, color : "#ffffff", diameter : 10000}
stars = []
starsU = []
sky = {
    pos : new v2d(0,0)
}
g = function(x,player,planets){
    mats = 1
    logs = []
    function log(m) {
        logs.push({date : new Date(), m})
    }

    cpu =  {
        remaining : 0,
        glitchCharge : 0,
        precision : 30
    }

    land = function(planet, choc) {
        j.innerHTML = "<h1 color='red'>Successfull landed on " + player.attratedBy.name + "</h1>" +

        logs.map(function(l){
            return "at " +l.date.getTime() + " " + l.m
        }).join('<br>')
        state = 3
    }

    displayCrash = function () {
        j.innerHTML = "<h1 color='red'>Rocket is lost</h1>" +



        logs.map(function(l){
            return "at " +l.date.getTime() + " " + l.m
        }).join('<br>')
        state = 3
    }


    state = 0;

    tools = {
        mouse : new v2d(0,0),
        cam : new v2d(0,0),
        screen : new v2d(c.width/2,c.height/2),
    },
        manover = {
            nearPoint : null,
            minStance : 0,
            stance : 0,
            origin : new v2d(0,0),
            deltaV : new v2d(0,0),
            state : 0,
            fixedPoint : new v2d(0,0),
            initialDeltaV : new v2d(0,0)
        },

        player = {
            fuel : 100000,
            alt: 0,
            gravity : {
                normamizedGravity : new v2d(0,0),
                moveVector : new v2d(0,0)
            },

            trajectory : {
                apo : new v2d(0,0),
                peri : new v2d(0,0),
                stanceCurrent : new v2d(0,0),
                posCurrent : new v2d(0,0),
                normamizedGravity : new v2d(0,0),
                pos : new v2d(0,0),
                speed : new v2d(0,0),
                acc : new v2d(0,0),
                force : 0,
                forceCurrent : 0,
                attratedBy : sun,
                attratedByCurrent : sun,
                futurePlanetStance : new v2d(0,0),
                moveVector : new v2d(0,0)
            },
            pdv : new v2d(0,0),
            pdvs : "",
            pos : new v2d(200,200),
            heading:-Math.PI/2,
            agility:Math.PI/45,
            speed : new v2d(0,0),
            acc : new v2d(0,0),
            right:false,
            M:1000,
            mass : 1,
            left:false,
            thrustUp:false,

            linkedTo:null,
            attratedBy:null,

            stages:[
                {isOn:false, power:1.3, isCurrent:true}
            ],
            thrustDown:false,
            thrust : 0,


            move : function(delta){

                //landed
                if(player.linkedTo){
                    player.pos.setPoint(player.linkedTo.pos.x,player.linkedTo.pos.y-player.linkedTo.diameter-104)
                } else {
                    //collide
                    planets.forEach(function(planet){

                        if(player.pos.stance(planet.pos) < planet.diameter + 104) {
                            // collide
                            // go get energy !
                            var choc = player.speed.norm() // approx energy
                            if(choc >= 10) {
                                log("Collide with " + planet.name + " | velocity  " + choc + "m/s")
                                displayCrash()
                            } else {
                                land()
                            }
                        }
                    })

                    //gravity well
                    sun.stance = sun.pos.stance(player.pos)

                    g = sun.G / (sun.stance * sun.stance)
                    player.attratedBy = sun

                    planets.forEach(function(planet) {
                        planet.stance = planet.pos.stance(player.pos)
                        if((planet.G / (planet.stance * planet.stance)) > g) {
                            g = planet.G / (planet.stance * planet.stance)
                            player.attratedBy = planet
                        }
                    })



                    player.gravity.normamizedGravity.setVector(player.attratedBy.pos)

                    player.gravity.normamizedGravity.sub(player.pos)

                    player.gravity.normamizedGravity.normalize()

                    player.gravity.normamizedGravity.scale(g)



                    //atmoshperic

                    //engine

                    player.fuel -= player.thrust * delta
                    // document.title = "fuel : "+player.fuel


                    if(player.stages[0].isOn && player.fuel > 0) {

                        player.acc.setPoint(Math.cos(player.heading)*player.stages[0].power*player.thrust / 10,
                            Math.sin(player.heading)*player.stages[0].power*player.thrust / 10)

                    }

                    player.acc.add(player.gravity.normamizedGravity)
                    player.acc.scale(delta)
                    player.speed.add(player.acc)


                    player.gravity.moveVector.setVector(player.speed)
                    player.gravity.moveVector.scale(delta)
                    //player.gravity.moveVector.scale(0.16)

                    player.pos.add(player.gravity.moveVector)

                }
            },

            link : function(o) {
                player.linkedTo = o
                player.attratedBy = o
                player.pos.x = o.pos.x
                player.pos.y = o.pos.y+(o.diameter/2)
            },

            stage : function() {
                player.stages[0].isOn = true
                console.log("Start engine")
                player.linkedTo = false
                player.speed.setPoint(0,0)
                log("Take off")
            },

            draw : function(x) {
                player.pdvs = ''

                if(manover.state != 0) {
                    player.pdv.setVector(player.speed)
                    player.pdv.sub(manover.initialDeltaV)
                    player.pdvs = "|dv : " + Math.round(player.pdv .norm())
                }

                t.innerHTML = player.pdvs + "<br>|speed : " + Math.round(player.speed.norm()) + "<br>|alt : " + Math.round(player.alt)

                if(nz < 1) {
                    x.drawImage(sprite, 111,183,50,50, c.width/2-25,c.height/2-25,50, 50)
                    return;
                }

                //x.beginPath();
                x.save()
                x.translate((c.width/2+z(player.pos.x- camera.pos.x)) ,(c.height/2+z(player.pos.y - camera.pos.y)))
                x.rotate(player.heading+Math.PI/2)


                x.drawImage(sprite, 174,74,50,208, z(-25),z(-104),z(50), z(208))

                x.fillStyle = "rgba(250,250,250,0.3)"
                x.restore()

                var relativeSpeed = new v2d(player.speed.x,player.speed.y)


            }
        }
    player.toString = function() {
        return 'pos:'+player.pos.toString()+'|heading:'+player.heading+'|thrust:'+player.thrust
    }

    player.controll=function(delta){
        if(player.thrustUp&&!player.thrustDown) player.thrust = player.thrust >= 1 ? 1 : player.thrust+0.025
        if(player.thrustDown&&!player.thrustUp) player.thrust = player.thrust <= 0 ? 0 : player.thrust-0.025
        if(player.stages[0].isOn) {
            if(player.left&&!player.right) player.heading = player.heading-player.agility
            if(player.right&&!player.left) player.heading = player.heading+player.agility
        }
        if(player.thrust!=0 || player.left || player.right) {
            mats = 1
        }
    }


    function computeGravity(futureObect,futureTime) {
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

    function trajectory(context,deltaT,deltaV,nearPoint) {
        deltaT *= mats
        if(nearPoint) {
            context.fillRect(c.width/2+z(nearPoint.x-camera.pos.x+4),c.height/2+z(nearPoint.y-camera.pos.y-5),8,8)
            player.trajectory.pos.setVector(nearPoint)
            player.trajectory.speed.setVector(deltaV)
        } else {
            player.trajectory.pos.setVector(player.pos)
            player.trajectory.speed.setVector(player.speed)
        }
        player.trajectory.attratedByCurrent = player.attratedBy
        var step = 100
        var breakFlag = false
        for(var i=0;index<POOL_SIZE;index++) {
            if(breakFlag) {
                break;
            }


            // new acc
            player.trajectory.acc.setVector(player.acc)

            computeGravity(player.trajectory.pos, index*deltaT)
            player.trajectory.normamizedGravity.setVector(player.trajectory.attratedBy.pos)
            player.trajectory.normamizedGravity.sub(player.trajectory.pos)
            player.trajectory.normamizedGravity.normalize()

            player.trajectory.normamizedGravity.scale(deltaT)


            player.trajectory.normamizedGravity.scale(player.trajectory.force)


            player.trajectory.speed.add(player.trajectory.normamizedGravity)

            // console.log(planet)
            player.trajectory.moveVector.setVector(player.trajectory.speed)
            //player.trajectory.moveVector.scale(16)
            player.trajectory.moveVector.scale(deltaT)


            player.trajectory.pos.add(player.trajectory.moveVector)

            // for apo / peri
            vPool[index].pos.setVector(player.trajectory.pos)
            vPool[index].force = player.trajectory.force
            vPool[index].speed.setVector(player.trajectory.speed)
            var dist = Math.hypot(player.pos.x-player.trajectory.pos.x, player.pos.y-player.trajectory.pos.y)
            if(dist < 100 && dist != 0) {
                // detect loop
                //breakFlag = true
            }
            planets.forEach(function(planet){

                if(player.trajectory.pos.stance(planet.pos) < planet.diameter / 2) {
                    // collide
                    // go get energy !
                    if(index > PHYSIC_STEP) {
                        breakFlag = true
                    }
                }
            })
            // update color of trajectory if influence change
            context.fillStyle  = "#78CBFF"//player.attratedBy.color
            if(player.trajectory.attratedByCurrent != player.trajectory.attratedBy) {
                player.trajectory.attratedByCurrent = player.trajectory.attratedBy
                context.fillStyle  = player.trajectory.attratedBy.color
            }
            if(nearPoint) {
                context.fillStyle = 'red'
            }
            context.fillRect(c.width/2+z(player.trajectory.pos.x-camera.pos.x+4),c.height/2+z(player.trajectory.pos.y-camera.pos.y-5),2,2)
        }
        player.trajectory.apo = vPool[0].pos
        player.trajectory.peri = vPool[0].pos
        vPool.forEach(function(vp) {
            if(player.trajectory.apo.tmp > vp.tmp) {
                player.trajectory.apo = vp.pos
            }
            if(player.trajectory.peri.tmp < vp.tmp) {
                player.trajectory.peri = vp.pos
            }
        })
        // get apo and peri
        context.fillStyle = "#FFFFFF"
        context.moveTo(c.width/2+z(player.trajectory.peri.x-camera.pos.x+4),c.height/2+z(player.trajectory.peri.y-camera.pos.y-5))
        context.beginPath()
        context.moveTo(c.width/2+z(player.trajectory.peri.x-camera.pos.x+4) - 3,c.height/2+z(player.trajectory.peri.y-camera.pos.y-5))
        context.moveTo(c.width/2+z(player.trajectory.peri.x-camera.pos.x+4) + 3,c.height/2+z(player.trajectory.peri.y-camera.pos.y-5))
        context.moveTo(c.width/2+z(player.trajectory.peri.x-camera.pos.x+4),c.height/2+z(player.trajectory.peri.y-camera.pos.y-5)-6)
        context.closePath()
        context.fill()

        context.moveTo(c.width/2+z(player.trajectory.apo.x-camera.pos.x+4),c.height/2+z(player.trajectory.apo.y-camera.pos.y-5))
        context.beginPath()
        context.moveTo(c.width/2+z(player.trajectory.apo.x-camera.pos.x+4) - 3,c.height/2+z(player.trajectory.apo.y-camera.pos.y-5))
        context.moveTo(c.width/2+z(player.trajectory.apo.x-camera.pos.x+4) + 3,c.height/2+z(player.trajectory.apo.y-camera.pos.y-5))
        context.moveTo(c.width/2+z(player.trajectory.apo.x-camera.pos.x+4),c.height/2+z(player.trajectory.apo.y-camera.pos.y-5)+6)
        context.closePath()



    }

    function navBall(context){

        var a1 = new v2d(player.attratedBy.pos.x, player.attratedBy.pos.y)
        a1.sub(player.pos)
        var sheepH = Math.atan2(a1.y,a1.x) + Math.PI
        h = (player.heading - sheepH).m(2*Math.PI) / (Math.PI * 2) * 200
        //h += 25
        //h = h.m(100)
        context.save()
        context.rect(c.width/2 - 50,c.height - 100,100,100)

        context.clip()

        context.fillStyle = "#61C7FA"
        context.fillRect(c.width/2 - 50,c.height - h - 100,100,100)
        context.fillRect(c.width/2 - 50,c.height - h +100,100,100)
        context.fillStyle = "#6DDE70"
        context.fillRect(c.width/2 - 50,c.height - h,100,100)
        //context.fillRect(c.width/2 - 50,c.height - h - 150,100,50)
        //center
        context.fillStyle = "#FFE659"
        context.fillRect(c.width/2 - 50,c.height - 50,30,3)
        context.fillRect(c.width/2 + 20,c.height - 50,30,3)


        var playerAccHeading = Math.atan2(player.speed.y,player.speed.x)
        var r = player.heading - playerAccHeading + Math.PI / 2

        context.fillStyle = "#FFFFFF"
        r = r.m(2*Math.PI) / (Math.PI * 2) * 200

        context.drawImage(sprite, 43,132,15,15,c.width/2-8,c.height - r - 8,15,15)
        context.drawImage(sprite, 73,132,15,15,c.width/2-8,c.height - (r + 100 - 8).m(200),15,15)

        //context.fillRect(c.width/2-5,c.height - r,10,10)
        context.fillStyle = "#FF0000"
//      context.fillRect(c.width/2-5,c.height - (r + 100).m(200),10,10)

        context.fillStyle = "#ffffff"

        for(var i = 0;index<20;index++){
            // trace angle

            context.fillRect(c.width/2 - 5,c.height - (20 * index) - h + 200,10,1)
            context.fillRect(c.width/2 - 2,c.height - (20 * index + 10) - h + 200,4,1)
        }


        if(manover.state != 0) {

            var playerManoverHeading = Math.atan2(manover.deltaV.y,manover.deltaV.x)
            var d = player.heading - playerManoverHeading + Math.PI / 2

            context.fillStyle = "#C390D4"
            d = d.m(2*Math.PI) / (Math.PI * 2) * 200
            context.drawImage(sprite, 103,132,15,15,c.width/2-8,c.height - d - 8,15,15)

        }

        context.restore()
        // power
        context.save()
        context.rect(c.width/2 - 100,c.height - 100,8,100)
        context.clip()
        context.fillStyle = "#e3e3e3"
        context.fillRect(c.width/2 - 100,c.height - 100,8,100)
        context.fillStyle = "#131517"
        context.fillRect(c.width/2 - 100,c.height - player.thrust * 100,8,100)

        context.restore()


        if(player.stages[0].isOn) {
            context.fillStyle = "#2BC417"
        } else {
            context.fillStyle = "#0A5411"
        }
        context.beginPath()
        context.arc(c.width/2 - 96,c.height - 110,4,0,Math.PI*2)
        context.closePath()
        context.fill()

    }

    matsI.onclick = function(e) {
        if(state != 1) return

        var selected = parseInt(e.target.id.split('_')[1])
        for(var i=1; index <= 5; index++) {
            document.getElementById(`mats_${index}`).innerHTML = index <= selected ? '&#x25B6;' :'&#x25B7;'
        }
        switch(selected) {
            case 1:
                mats = 1
                break
            case 2:
                mats = 2
                break
            default:
                mats = Math.pow(10,selected-2)

        }
        matsL.innerHTML = `${mats} x`
        return false
        e.preventDefault()
    }



    function mouseToSpace() {



    }


    function drawManover(context,deltaT) {

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




    x=c.getContext('2d')
    x2=d.getContext('2d')
    d.width=c.width=innerWidth-8;d.height=c.height=innerHeight-8
    planets=[]
    camera = player
    planets[0]=new Planet(0.000,3800,null,40000,0,0,200000, 'blue', '#0000FF')
    planets[1]=new Planet(0.000,3250,null,116000,0,0,80000, 'red', '#FF0000')
    player.link(planets[0])
    prepareStar()

    var timer = new Date()
    //constant time for move
    function m(){
        var timer = new Date()

        delta = PHYSIC_STEP
        delta *= mats
        if(state==1) { // game
            player.controll(delta)
            player.move(delta)
            planets.forEach(function(planet) {
                planet.move(delta)
            })
        }


        timer = new Date() - timer
        //document.title = timer

    }

    setInterval(m,PHYSIC_STEP)

    function l(){
        c.width^=0
        if(state==1) { // game
            drawUnstableStars(x)


            planets.forEach(function(planet) {
                planet.draw(x)
            })

            player.draw(x)
            navBall(x)
            trajectory(x,delta)
            drawManover(x,delta)
        }
        requestAnimationFrame(l)
    }
    drawStars(x2)
    l()
}*/
/*
 Planet
 s self rotate speed
 S rotate speed
 d diameter
 ox origin x
 oy origin y
 r ressources
 D distance from origin
 */
/*

function Planet(speed,diameter,parent,distanceMinFromParent,distanceMaxFromParent,angle,G,name, color){
    this.speed=speed
    this.shadowPos=new v2d(0,0)
    this.stance = 0
    this.color = color
    this.G = G
    this.distanceMaxFromParent = distanceMaxFromParent
    this.distanceMinFromParent = distanceMinFromParent
    this.diameter=diameter
    this.angle=angle
    this.pos=new v2d(Math.cos(this.angle)*this.distanceMinFromParent,Math.sin(this.angle)*this.distanceMinFromParent)
    this.name=name
}

Planet.prototype.getSpeedVector = function() {

}


Planet.prototype.toString = function(){
    return this.name + ' | speed:' + this.speed.toString() + ' | pos:' + this.pos.toString()
}


Planet.prototype.drawSimple = function(context) {
    if(this.name === 'blue') {
        context.drawImage(sprite, 168,20,40,40,c.width/2+z(this.pos.x - camera.pos.x),c.height/2+z(this.pos.y - camera.pos.y),40,40)
    } else {
        context.drawImage(sprite, 30,79,40,40,c.width/2+z(this.pos.x - camera.pos.x),c.height/2+z(this.pos.y - camera.pos.y),40,40)
    }
}

Planet.prototype.draw=function(context){
    if(nz < 0.04) {
        this.drawSimple(context)
    } else {

        context.beginPath()
        //c.width/2+player.pos.x - camera.pos.x,c.height/2+player.pos.y - camera.pos.y
        context.arc(c.width/2+z(this.pos.x - camera.pos.x),c.height/2+z(this.pos.y - camera.pos.y),z(this.diameter),0,7)
        var skyDrg=context.createRadialGradient(c.width/2+z(this.pos.x - camera.pos.x),c.height/2+z(this.pos.y - camera.pos.y),10,c.width/2+z(this.pos.x - camera.pos.x),c.height/2+z(this.pos.y - camera.pos.y),z(this.diameter));

        if(this.name === 'blue') {
            var skyDrg=context.createRadialGradient(c.width/2+z(this.pos.x - camera.pos.x),c.height/2+z(this.pos.y - camera.pos.y),10,c.width/2+z(this.pos.x - camera.pos.x),c.height/2+z(this.pos.y - camera.pos.y),z(this.diameter));


            skyDrg.addColorStop(0.000, 'rgba(63, 172, 255, 1.000)');
            skyDrg.addColorStop(0.370, 'rgba(56, 145, 255, 1.000)');
            skyDrg.addColorStop(1.000, 'rgba(114, 195, 249, 1.000)');

        } else {
            var skyDrg=context.createLinearGradient(0, c.height/2+z(this.pos.y - camera.pos.y - this.diameter/2), 0, c.height   /2+z(this.pos.y - camera.pos.y + this.diameter/2));


            // Add colors
            skyDrg.addColorStop(0.000, 'rgba(153, 52, 18, 1.000)');
            skyDrg.addColorStop(0.151, 'rgba(219, 76, 19, 1.000)');
            skyDrg.addColorStop(0.168, 'rgba(191, 36, 36, 1.000)');
            skyDrg.addColorStop(0.348, 'rgba(114, 55, 25, 1.000)');
            skyDrg.addColorStop(0.372, 'rgba(255, 0, 0, 1.000)');
            skyDrg.addColorStop(0.536, 'rgba(142, 61, 21, 1.000)');
            skyDrg.addColorStop(0.564, 'rgba(216, 107, 17, 1.000)');
            skyDrg.addColorStop(0.724, 'rgba(255, 84, 0, 1.000)');
            skyDrg.addColorStop(0.737, 'rgba(237, 70, 4, 1.000)');
            skyDrg.addColorStop(0.877, 'rgba(191, 88, 28, 1.000)');
            skyDrg.addColorStop(0.888, 'rgba(206, 44, 12, 1.000)');
            skyDrg.addColorStop(1.000, 'rgba(175, 97, 24, 1.000)');
        }
        context.fillStyle = skyDrg;


        context.fill()
        context.closePath()
        //orbit
        context.beginPath()
        context.arc(c.width/2+z(this.pos.x - camera.pos.x),c.height/2+z(this.pos.y - camera.pos.y),z(this.diameter),0,7)
        // TODO sure ?        context.strokeStyle = '#2A2D2E'
        context.closePath()

        var shadowGrd = context.createLinearGradient(c.width/2+z(this.pos.x - camera.pos.x - this.diameter/2), 0, c.width/2+z(this.pos.x - camera.pos.x + this.diameter/2), 0);

        // Add colors
        shadowGrd.addColorStop(0.000, 'rgba(0, 0, 0, 0.400)');
        shadowGrd.addColorStop(0.352, 'rgba(0, 0, 0, 0.400)');
        shadowGrd.addColorStop(0.652, 'rgba(0, 0, 0, 0.000)');
        shadowGrd.addColorStop(1.000, 'rgba(0, 0, 0, 0.000)');

        context.fillStyle = shadowGrd;

        // dark
        context.beginPath()

        context.arc(c.width/2+z(this.pos.x - camera.pos.x),c.height/2+z(this.pos.y - camera.pos.y),z(this.diameter),0,7)
        //context.fillStyle = "#333";
        context.closePath()

        context.fill()



    }
}

Planet.prototype.move=function(delta){
    this.angle = this.angle+delta*this.speed/100
    this.pos.x=Math.cos(this.angle)*this.distanceMinFromParent
    this.pos.y=Math.sin(this.angle)*this.distanceMinFromParent

    this.shadowPos.setPoint(
        Math.cos(this.angle)*(this.distanceMinFromParent-this.diameter),
        Math.sin(this.angle)*(this.distanceMinFromParent-this.diameter))
}

Planet.prototype.getFuturePosition=function(delta){
    var angle = this.angle+delta*this.speed/100
    return new v2d(Math.cos(angle)*this.distanceMinFromParent,Math.sin(angle)*this.distanceMinFromParent)
}


function z(d){
    return (nz*d)/10
}


function drawStars(context2) {


}
function prepareStar() {

}
function drawSky(context) {

}

function drawUnstableStars(context3){
}
*/