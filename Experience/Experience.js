import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";


export default class Experience {
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
    }

    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }
}