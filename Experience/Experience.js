import * as THREE from '../node_modules/three/build/three.module.js';

import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Resources from './Utils/Resources.js';
import Assets from './Utils/Assets.js';

import Camera from './Camera.js';
import Renderer from './Renderer.js';

import World from './World/World.js';

export default class Experience{
    static instance;
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this
        
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();

        this.resources = new Resources(Assets);

        this.world = new World();

        this.time.on("update", ()=>{
            this.update();
        });

        this.sizes.on("resize", ()=>{
            this.resize();
        });
    }

    update(){
        this.camera.update();
        this.renderer.update();
    }

    resize(){
        this.camera.resize();
        this.renderer.resize();
    }
}