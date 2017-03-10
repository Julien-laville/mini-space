function MissionLoader() {}

MissionLoader.load = function(scene){
    let geometry = new THREE.SphereGeometry(1,1,1)
    let material = new THREE.MeshBasicMaterial({color:0x00ff00})

    let cube = new THREE.Mesh(geometry, material)

    scene.add(cube)
}