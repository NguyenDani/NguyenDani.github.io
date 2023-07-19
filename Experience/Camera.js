import * as THREE from "three";
import gsap from "gsap";

import Experience from "./Experience.js";
import Navigation from "../navigation.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.navigation = new Navigation();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.btnREl = document.querySelector('.art-nav-right');
        this.btnLEl = document.querySelector('.art-nav-left');
        this.aboutButton = document.querySelector('.aboutButton');
        this.experienceButton = document.querySelector('.experienceButton');

        this.buttonPress = this.cameraUpdate.bind(this);

        this.btnREl.addEventListener('click', this.buttonPress);
        this.btnLEl.addEventListener('click', this.buttonPress);
        this.aboutButton.addEventListener('click', this.buttonPress);
        this.experienceButton.addEventListener('click', this.buttonPress);

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
        this.cameraUpdate();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        //this.perspectiveCamera.position.z = -4;
    }

    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -50,
            50
        );

        this.orthographicCamera.rotation.x = -Math.PI / 6;

        this.setOrthographicZoom(1.5);

        this.scene.add(this.orthographicCamera);
    }

    setOrthographicZoom(zoomFactor) {
        //this.orthographicCamera.zoom = zoomFactor;
        //this.orthographicCamera.updateProjectionMatrix();
        gsap.to(this.orthographicCamera, {
            duration: 1.5,
            zoom: zoomFactor,
            onUpdate: () => {
                this.orthographicCamera.updateProjectionMatrix();
            }
        });
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }

    cameraUpdate(){
        if(this.navigation.activeIndex == 1){
            gsap.to(this.orthographicCamera.position, {
                x: .4,
                y: 1,
                duration: 1.5,
            });
            this.setOrthographicZoom(4);
        }
        else{
            gsap.to(this.orthographicCamera.position, {
                x: 0,
                y: 0.9,
                duration: 1.5,
            });
            this.setOrthographicZoom(1.5);
        }
    }

    resize() {
        // Updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        // Updating Orthographic Camera on Resize
        this.orthographicCamera.left =
            (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right =
            (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}