class GameScreen extends THREE.Object3D {

    createFloor (x, y, z) {
	   'use strict';
        this.geometry = new THREE.BoxGeometry(200, 1, 100);
        this.mesh = new THREE.Mesh(this.geometry, this.floorMaterial);
        this.mesh.position.set(x, y-0.5, z);
        this.add(this.mesh);
	}

	createWall (x, y, z, rot, comp) {
		'use strict';
		this.geometry = new THREE.BoxGeometry(comp, 0.1 * (Math.sqrt(100*100+200*200)), 1);
        this.mesh = new THREE.Mesh(this.geometry, this.wallMaterial);
        this.mesh.rotateY(rot);
        this.mesh.position.set(x, y + (0.05 * (Math.sqrt(100*100+200*200))), z);
        this.add(this.mesh);
	}

	constructor (x, y, z) {
	   'use strict';

        super();

        this.floorMaterial = new THREE.MeshBasicMaterial({ color: 0x2E8B57, wireframe: false });
        this.wallMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513, wireframe: false });

        this.createFloor(x, y, z);

        this.wallVector = [];

        this.createWall(x-100, y, z, (Math.PI) * 0.5, 100);
        this.createWall(x+100, y, z, (Math.PI) * 0.5, 100);
        this.createWall(x, y, z-50, 0, 200);
        this.createWall(x, y, z+50, 0, 200);

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
	}
}