function MissionLoader() {}

MissionLoader.load = function(scene){
    let sunGeometry = new THREE.SphereGeometry(40,40,40)
    let sunMaterial = new THREE.MeshBasicMaterial({color:0xffff00})

    let sun = new THREE.Mesh(sunGeometry, sunMaterial)

    scene.add(sun)
    
    
    let shipGeometry = new THREE.CubeGeometry(5,5,5)
    let shipMaterial = new THREE.MeshBasicMaterial({color:0xff0000})

    let shipMesh = new THREE.Mesh(shipGeometry, shipMaterial)
    let ship = new Ship(new v2d(100,100), shipMesh)
    shipMesh.position.set(ship.orbitalMechanic2DMobile.pos.x, ship.orbitalMechanic2DMobile.pos.y, 0)

    scene.add(sun)
    scene.add(shipMesh)
    
    sun.pos = new v2d(0,0)
    sun.G = 100
    sun.name = "SUN"
    return {planets : [sun], ship : ship}
        
}