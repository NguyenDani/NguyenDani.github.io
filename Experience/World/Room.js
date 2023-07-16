import * as THREE from "three";
import Experience from "../Experience.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.rotation = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            if(child.name === "MonitorLScreen"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

        });

        this.actualRoom.rotation.y = 3;
        this.scene.add(this.actualRoom);
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation.target = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth * 0.05;
            this.update();
        });
    }
    
    resize() {}
    
    update() {
        this.rotation.current += (this.rotation.target - this.rotation.current) * this.rotation.ease;
        this.actualRoom.rotation.y = this.rotation.current + 3;
    }
}