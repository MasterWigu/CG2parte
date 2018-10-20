var controls;

class Scene extends THREE.Scene {


    createScene() {
        'use strict';
    
        this.add(new THREE.AxisHelper(10));

        this.screen = new GameScreen (0, 0, 0);
        this.add(this.screen);

    }
    
    createCameras() {
        'use strict';
        var distance = 10;
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

        this.camera1 = new THREE.OrthographicCamera(-window.innerWidth / distance,
													window.innerWidth / distance,
													window.innerHeight / distance,
													-window.innerHeight / distance, 
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

        this.camera3 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         100000000);
        this.camera3.position.x = 0;
        this.camera3.position.y = 0;
        this.camera3.position.z = 150;
        this.camera3.lookAt(this.position); //ball


    }
    
    onResize() {
        'use strict';
    
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        if (window.innerHeight > 0 && window.innerWidth > 0) {
            this.camera0.aspect = window.innerWidth / window.innerHeight;
            this.camera0.updateProjectionMatrix();
        }
    
        this.camera1.update();
        this.camera2.update();
        this.camera3.update();

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
            this.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
        case 83:  //S
        case 115: //s
            
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
            this.renderer.render(this, this.camera3);
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
        requestAnimationFrame(this.animate.bind(this));
    }
}
