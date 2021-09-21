import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three/build/three.module.js';

export default class App 
{
    camera : THREE.Camera
    renderer : THREE.WebGLRenderer
    controls: THREE.OrbitControls
    scene: THREE.Scene

    run() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xcccccc );
        this.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
        this.camera.position.set( 400, 200, 0 );

        // controls

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.listenToKeyEvents( window ); // optional

        //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.05;

        this.controls.screenSpacePanning = false;

        this.controls.minDistance = 100;
        this.controls.maxDistance = 500;

        this.controls.maxPolarAngle = Math.PI / 2;

        // world

        const geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
        const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

        for ( let i = 0; i < 500; i ++ ) {

            const mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = Math.random() * 1600 - 800;
            mesh.position.y = 0;
            mesh.position.z = Math.random() * 1600 - 800;
            mesh.updateMatrix();
            mesh.matrixAutoUpdate = false;
            this.scene.add( mesh );

        }

        // lights

        const dirLight1 = new THREE.DirectionalLight( 0xffffff );
        dirLight1.position.set( 1, 1, 1 );
        this.scene.add( dirLight1 );

        const dirLight2 = new THREE.DirectionalLight( 0x002288 );
        dirLight2.position.set( - 1, - 1, - 1 );
        this.scene.add( dirLight2 );

        const ambientLight = new THREE.AmbientLight( 0x222222 );
        this.scene.add( ambientLight );

        //

        window.addEventListener( 'resize', this.onWindowResize );
    }

    onWindowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

    }

    animate() {

        requestAnimationFrame( this.animate );

        this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

        this.render();

    }

    render() {

        this.renderer.render( this.scene, this.camera );

    }
}