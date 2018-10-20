class Camera extends THREE.OrthographicCamera {
	
	constructor(scene, x, y, z) {
		var distance = 20 //este numero e inversamente proporcional a distancia aparente da camara

		super(-window.innerWidth / distance,
			 window.innerWidth / distance,
			 window.innerHeight / distance,
			 -window.innerHeight / distance, 
			 1, 
			 1000);

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.lookAt(scene.position);

	}

	update() {	
		var distance = 20 //este numero e inversamente proporcional a distancia aparente da camara
		this.left = -window.innerWidth / distance;
        this.right = window.innerWidth / distance;
        this.top = window.innerHeight / distance;
        this.bottom = -window.innerHeight / distance;
        this.updateProjectionMatrix();
	}

}