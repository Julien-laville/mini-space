function MissionLoader() {}

MissionLoader.load = function(scene){
    let sunGeometry = new THREE.SphereGeometry(40,40,40)
    let sunMaterial = new THREE.MeshBasicMaterial({color:0xffff00})

    let sun = new THREE.Mesh(sunGeometry, sunMaterial)

    scene.add(sun)
    
    
    
    let shipGeometry = new THREE.CubeGeometry(5,5,5)
    let shipMaterial = new THREE.MeshBasicMaterial({color:0xff0000})

    let ship = new THREE.Mesh(shipGeometry, shipMaterial)
    ship.position.set(100,0,0)

    scene.add(sun)
    scene.add(ship)
        
}