var controls;

class Scene extends THREE.Scene {

    movement() {
        this.delta = this.clock.getDelta();
        for (var i = 0; i <  this.ballVector.length; i++) {
            this.ballVector[i].ballMovement(this.delta);
        }
    }

    updateMovement(){
        for (var i = 0; i <  this.ballVector.length; i++) {
            this.ballVector[i].updateBallMovement();
        }
    }

    seeIfCollides(ball) {
        for (var i = 0; i < this.ballVector.length; i++) {
            var b = this.ballVector[i];
            if ((2 * ball.radius) >= Math.sqrt(Math.pow(ball.xx-b.xx, 2) + Math.pow(ball.zz-b.zz, 2))) {
                return true;
            }
        }
        return false;
    }

    colidesWall(){ 

        for (var i = 0; i < this.ballVector.length; i++) {
            var b = this.ballVector[i];
            if (b.position.x <= -100+b.radius+0.5) {
                b.movementVector.setX(Math.abs(b.movementVector.x));
            }
            if (b.position.x >= 100-b.radius-0.5) {
                b.movementVector.setX(-Math.abs(b.movementVector.x));
            }
            if (b.position.z <= -50+b.radius+0.5) {
                b.movementVector.setZ(Math.abs(b.movementVector.z));
            }
            if (b.position.z >= 50-b.radius-0.5) {
                b.movementVector.setZ(-Math.abs(b.movementVector.z));
            }
        }
    }

    colidesBall() {
        for (var i = 0; i < this.ballVector.length; i++) {
            var b1 = this.ballVector[i];
            for (var j = i-1; j >= 0 ; j--) {
                var b2 = this.ballVector[j];
                var dist =Math.sqrt(Math.pow(b1.position.x-b2.position.x, 2) + Math.pow(b1.position.z-b2.position.z, 2))
                if ((2 * b1.radius) >= dist) {
                    var c1 = new THREE.Vector3();
                    c1.copy(b1.position);
                    
                    var c2 = new THREE.Vector3();
                    c2.copy(b2.position);
                    
                    var v1 = new THREE.Vector3();
                    v1.copy(b1.movementVector);
                    
                    var v2 = new THREE.Vector3();
                    v2.copy(b2.movementVector);

                    var c1_c2 = new THREE.Vector3();
                    c1_c2.subVectors(c1,c2);

                    var v1_v2 = new THREE.Vector3();
                    v1_v2.subVectors(v1,v2);

                    var num = c1_c2.dot(v1_v2);
                    var den = Math.pow(c1.x - c2.x, 2) + Math.pow(c1.z - c2.z, 2);

                    c1_c2.multiplyScalar(num/den);

                    b1.movementVector.sub(c1_c2);
                    b2.movementVector.add(c1_c2);

                    b1.ballMovementDist((2*b1.radius - dist)/2);
                    b2.ballMovementDist((2*b1.radius - dist)/2);
                }
            }
        }
    }

    createScene() {
        'use strict';

        this.clock = new THREE.Clock();

        this.ballVector = [];
    
        this.add(new THREE.AxisHelper(10));

        this.screen = new GameScreen (0, 0, 0);
        this.add(this.screen);

        var ball;

        ball = new Ball (0, 0, 0, true);
        this.add(ball);
        this.ballVector[0] = ball;


        var i = 1;

        while (i < 10) {
            ball = new Ball (0, 0, 0, false);
            if (!this.seeIfCollides(ball)) {
                this.add(ball);
                this.ballVector[i] = ball;
                i++;
            }
        }

        window.setInterval(this.updateMovement.bind(this), 10000);
    }
    
    createCameras() {
        'use strict';
        this.distance = 10;
        this.activeCamera = 0;  //guarda qual a camara que estamos a usar (para o render) no onkeydown, de acordo com a tecla premida

        //Camera temporaria movível
        this.camera0 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         100000000);
        this.camera0.position.x = 125;
        this.camera0.position.y = 125;
        this.camera0.position.z = 125;
        this.camera0.lookAt(this.position);

        this.camera1 = new THREE.OrthographicCamera(-window.innerWidth / this.distance,
													window.innerWidth / this.distance,
													window.innerHeight / this.distance,
													-window.innerHeight / this.distance, 
													1, 
													1000);
        this.camera1.position.x = 0;
        this.camera1.position.y = 50;
        this.camera1.position.z = 0;
        this.camera1.lookAt(this.position);

        this.camera2 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         100000000);
        this.camera2.position.x = 125;
        this.camera2.position.y = 125;
        this.camera2.position.z = 125;
        this.camera2.lookAt(this.position);

    }
    
    onResize() {
        'use strict';
        //this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        this.camera0.aspect = window.innerWidth / window.innerHeight;
        this.camera0.updateProjectionMatrix();

        this.camera2.aspect = window.innerWidth / window.innerHeight;
        this.camera2.updateProjectionMatrix();

        this.ballVector[0].camera3.aspect = window.innerWidth / window.innerHeight;
        this.ballVector[0].camera3.updateProjectionMatrix();

        this.distance = 110;
        let aspect = window.innerWidth / window.innerHeight;
        this.camera1.left = -this.distance * aspect / 2;
        this.camera1.right = this.distance * aspect / 2;
        this.camera1.top = this.distance / 2;
        this.camera1.bottom = -this.distance / 2;
        this.camera1.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        


    }

    
    onKeyDown(e) {
        'use strict';
        switch (e.keyCode) {
        case 49:
            this.activeCamera = 1;
            break;
        case 50:
            this.activeCamera = 2;
            break;
        case 51:
            this.activeCamera = 3;
            break;
        case 52: //para camara movivel
            this.activeCamera = 0;
            break;

        case 65: //A
        case 97: //a
            this.screen.wallMaterial.wireframe = !this.screen.wallMaterial.wireframe;
            this.screen.floorMaterial.wireframe = !this.screen.floorMaterial.wireframe;
            for (var i = 0; i < this.ballVector.length; i++) {
                this.ballVector[i].material.wireframe = !this.ballVector[i].material.wireframe;
            }
            break;
        case 69:  //E
        case 101: //e
            this.traverse(function (node) {
                if (node instanceof THREE.AxisHelper) {
                    node.visible = !node.visible;
                }
            });
            break;
        }
    }
    
    render() {
        'use strict';
        if (this.activeCamera == 0)
            this.renderer.render(this, this.camera0); //camara movivel (apagar)
        if (this.activeCamera == 1)
            this.renderer.render(this, this.camera1);
        if (this.activeCamera == 2)
            this.renderer.render(this, this.camera2);
        if (this.activeCamera == 3)
            this.renderer.render(this, this.ballVector[0].camera3);
    }
    
    constructor() {
        'use strict';

        super();
        this.background = new THREE.Color( 0xfff7c4 );

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
       

        this.createScene();
        this.createCameras();
        
        this.controls = new THREE.TrackballControls(this.camera0); //para a camara movivel
        
        this.render();
        
        window.addEventListener("keydown", this.onKeyDown.bind(this)); //tem de se usar o bind() por ser uma classe ou wtv, apenas sei que funciona assim
        window.addEventListener("resize", this.onResize.bind(this));
    }
    
    animate() {
        'use strict';
        
        this.render();
        this.controls.update(); //para a camara movivel (apagar)
        this.movement();
        this.colidesWall();
        this.colidesBall();
        requestAnimationFrame(this.animate.bind(this));

    }
}
