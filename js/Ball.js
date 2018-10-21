class Ball extends THREE.Object3D {

	randomFromInterval(min,max) {
    	return Math.random()*(max-min)+min;
	}

	createBall (x, y, z) {
		'use strict';
    	this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y + this.radius, z);
        this.add(this.mesh);
	}

	createCamera(x, y, z) {
		this.camera3 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         100000000);
        this.camera3.position.x = x; // fica no centro da bola em relacao ao eixo dos xx
        this.camera3.position.y = y; //fica a altura do centro da bola (=radius)
        this.camera3.position.z = z + 15; // afasta-se 15 do centro
        this.camera3.lookAt(new THREE.Vector3(x, y, z)); // camara esta a apontar para o centro da bola
	}


	constructor (x, y, z, flag) {
		'use strict';

		super();

		this.radius = 0.025 * (Math.sqrt(100*100+200*200));

		this.material = new THREE.MeshBasicMaterial({ color: Math.floor(this.randomFromInterval(0, 0xffff00)), wireframe: true });

		this.xx = this.randomFromInterval(-99.5 + this.radius, 99.5 - this.radius);
		this.zz = this.randomFromInterval(-49.5 + this.radius, 49.5 - this.radius);
		
		this.createBall(this.xx, y, this.zz);

		this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        if (flag)
        	this.createCamera(this.xx, this.radius, this.zz);

	}

}