import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";
import { DoubleSide } from "three";

// debug
const gui = new dat.GUI();

const params = {
    basicColor: "red",
};

// canvas

const canvas = document.querySelector("#webgl") as HTMLElement;

// Loader

const textureLoader = new THREE.TextureLoader();

const matcap = textureLoader.load("/assets/matcaps/3.png");

// Utils

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// scene

const scene = new THREE.Scene();

// camera

const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.01,
    100
);

camera.position.set(10, 3, -2);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// controls
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Materials
// const baseMaterial = new THREE.MeshBasicMaterial({
//     color: 0xff0000,
//     // wireframe: true,
// });
const baseMaterial = new THREE.MeshMatcapMaterial({
    matcap,
    // side: THREE.DoubleSide,
});

// room

const room = new THREE.Group();

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshStandardMaterial()
);

floor.rotation.x = -Math.PI * 0.5;
// floor.position.y = -2;

const wallOne = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 2),
    new THREE.MeshStandardMaterial({ side: DoubleSide })
);

const wallTwo = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 2),
    new THREE.MeshStandardMaterial({ side: DoubleSide })
);

wallOne.position.set(0, 1, 1.5);

wallTwo.position.set(-1.5, 1, 0);
wallTwo.rotation.y = -Math.PI * 0.5;

room.add(floor, wallOne, wallTwo);
scene.add(room);

// objects

// Lights

// AMBIENT LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);

scene.add(ambientLight);

// events

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// renderer

const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate

// const clock = new THREE.Clock();

const tick = () => {
    // const elapsedTime = clock.getElapsedTime();
    renderer.render(scene, camera);

    // animations

    controls.update();

    window.requestAnimationFrame(tick);
};

tick();
