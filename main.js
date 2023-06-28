import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
// Set size of renderer
var canvas = document.getElementById('bg');
const canvasW = canvas.getBoundingClientRect().width;
const canvasH = canvas.getBoundingClientRect().height;
renderer.setSize(canvasW, canvasH);

// Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 7, 15);

const directionalLight = new THREE.DirectionalLight(0xffffff);
scene.add(pointLight, directionalLight);

// Camera
camera.position.setY(2);
camera.position.setZ(3);
camera.rotateX(-25);

renderer.render(scene, camera);

const loader = new GLTFLoader();

loader.load( '/models/Bedroom2.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

/*
const geometry = new THREE.TorusGeometry(10, 3 , 16, 100);

const material = new THREE.MeshBasicMaterial({color: 0xff6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    renderer.render(scene, camera);
}

animate()

/*
import "./style.css";
import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector(".experience-canvas"));
*/