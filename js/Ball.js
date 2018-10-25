class Ball extends THREE.Object3D {

	ballMovement(delta) {
		var mov2 = new THREE.Vector3();
		mov2.copy(this.movementVector);
		mov2.normalize();
		this.translateOnAxis(this.movementVector, this.speed * delta);

		this.rotationVector = new THREE.Vector3(this.movementVector.x, this.movementVector.y, this.movementVector.z);

		this.rotationVector.setX(this.rotationVector.z);
		this.rotationVector.setZ(this.rotationVector.x);
		this.rotationVector.normalize();
		this.obj.rotateOnAxis(this.rotationVector, (this.speed * delta)/(this.radius)*100);
	}

	ballMovementDist(dist) {
		var mov2 = new THREE.Vector3();
		mov2.copy(this.movementVector);
		mov2.normalize();
		this.translateOnAxis(mov2, dist);

		this.rotationVector = new THREE.Vector3(this.movementVector.x, this.movementVector.y, this.movementVector.z);

		this.rotationVector.setX(this.rotationVector.z);
		this.rotationVector.setZ(this.rotationVector.x);
		this.rotationVector.normalize();
		this.obj.rotateOnAxis(this.rotationVector, dist/(this.radius)*100);
	}

	updateBallMovement() {
		this.speed += 0.05;
	}

	createBall (x, y, z) {
		'use strict';
    	this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, z);
        this.obj = new THREE.Object3D();
        this.obj.position.set(x, y, z);
        this.obj.add(this.mesh);

        this.add(this.obj);
	}

	createCamera(x, y, z) {
		this.camera3 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         100000000);
        this.camera3.position.x = x; // fica no centro da bola em relacao ao eixo dos xx
        this.camera3.position.y = y; //fica a altura do centro da bola (=radius)
        this.camera3.position.z = z; // afasta-se 15 do centro
        this.camera3.lookAt(new THREE.Vector3(-10, 0, 0)); // camara esta a apontar para o centro da bola
        this.add(this.camera3); // camara fica efetivamente dentro da bola
	}

	constructor (x, y, z, flag) {
		'use strict';

		super();

		this.add(new THREE.AxisHelper(20));

		this.radius = 0.05 * (Math.sqrt(100*100+200*200));

		this.material = new THREE.MeshBasicMaterial({ color: Math.floor(THREE.Math.randFloat(0, 0xffff00)), wireframe: false });



		this.xx = THREE.Math.randFloat(-99.5 + this.radius, 99.5 - this.radius);
		this.zz = THREE.Math.randFloat(-49.5 + this.radius, 49.5 - this.radius);
		
		this.createBall(0, 0, 0);

		this.position.x = x + this.xx;
        this.position.y = y + this.radius;
        this.position.z = z + this.zz;

        if (flag)
        	this.createCamera(25, this.radius, 0);

        this.movementVector = new THREE.Vector3(this.xx, 0, this.zz);
        this.speed = THREE.Math.randFloat(0.5,1); 
	}
}