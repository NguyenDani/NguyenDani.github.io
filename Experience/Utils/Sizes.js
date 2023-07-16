import { EventEmitter } from "events";

export default class Sizes extends EventEmitter{
    constructor(){
        super();
        const canvasContainer = document.getElementById('canvasContainer');
        this.width = canvasContainer.clientWidth;
        this.height = canvasContainer.clientHeight;
        this.aspect = this.width/this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.frustrum = 5;

        window.addEventListener("resize", ()=>{
            this.width = canvasContainer.clientWidth;
            this.height = canvasContainer.clientHeight;
            this.aspect = this.width/this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.emit("resize");
        })
    }
}