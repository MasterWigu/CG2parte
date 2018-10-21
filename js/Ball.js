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


	constructor (x, y, z) {
		'use strict';

		super();

		this.radius = 0.025 * (Math.sqrt(100*100+200*200));

		this.material = new THREE.MeshBasicMaterial({ color: Math.floor(this.randomFromInterval(0, 0xffff00)), wireframe: true });

		var zz = this.randomFromInterval(-50 + this.radius, 50 - this.radius);
		var xx = this.randomFromInterval(-100 + this.radius, 100 - this.radius);
		console.log (xx);
		console.log (zz);

		this.createBall(xx, y, zz);

		this.position.x = x;
        this.position.y = y;
        this.position.z = z;
	}


}