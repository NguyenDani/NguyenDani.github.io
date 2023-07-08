import * as THREE from "three";
import Experience from "../Experience.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;


        this.setSunlight();
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(4096, 4096);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(-1, 3, -2);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientLight);
    }

    resize() {}

    update() {

    }
}