import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";
import { DoubleSide } from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// debug
const gui = new dat.GUI();

// canvas

const canvas = document.querySelector("#webgl") as HTMLElement;

// Loader

import {
    floorAmbientOcclusion,
    floorBaseColor,
    floorHeight,
    floorNormal,
    floorRoughness,
    // gravelAmbientOcclusion,
    // gravelBaseColor,
    // gravelHeight,
    // gravelNormal,
    // gravelRoughness,
    carpetAmbientOcclusion,
    carpetBaseColor,
    carpetHeight,
    carpetNormal,
    carpetRoughness,
    wallAmbientOcclusion,
    wallBaseColor,
    wallHeight,
    wallMetallic,
    wallNormal,
    wallRoughness,
} from "../public/assets/textures";

// Utils

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// scene

const scene = new THREE.Scene();

// Models

const gltfLoader = new GLTFLoader();

// camera

const camera = new THREE.PerspectiveCamera(
    70,
    sizes.width / sizes.height,
    0.01,
    100
);

camera.position.set(3, 1.5, -2);
// camera.position.set(10, 3, -2);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// controls
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// room

const room = new THREE.Group();
// room.position.y = -1;
let catOneMixer: any = null;
gltfLoader.load("/assets/models/an_animated_cat/scene.gltf", (gltf) => {
    catOneMixer = new THREE.AnimationMixer(gltf.scene);
    const action = catOneMixer.clipAction(gltf.animations[0]);
    action.play();
    gltf.scene.scale.set(0.02, 0.02, 0.02);
    gltf.scene.position.set(0.5, 0, 0);
    room.add(gltf.scene);
});
let catTwoMixer: any = null;

gltfLoader.load("/assets/models/animated_bengal_cat/scene.gltf", (gltf) => {
    catTwoMixer = new THREE.AnimationMixer(gltf.scene);
    const action = catTwoMixer.clipAction(gltf.animations[0]);
    action.play();
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    room.add(gltf.scene);
});

// const underFloor = new THREE.Mesh(
//     new THREE.SphereGeometry(1.5, 32, 64, 0, 3.14),
//     new THREE.MeshStandardMaterial({
//         map: gravelBaseColor,
//         aoMap: gravelAmbientOcclusion,
//         aoMapIntensity: 1,
//         normalMap: gravelNormal,
//         roughnessMap: gravelRoughness,
//         roughness: 1,
//         displacementMap: gravelHeight,
//         displacementScale: 0.001,
//     })
// );

// underFloor.rotation.x = Math.PI * 0.5;

// underFloor.geometry.setAttribute(
//     "uv2",
//     new THREE.Float32BufferAttribute(underFloor.geometry.attributes.uv.array, 2)
// );

// gravelBaseColor.repeat.set(4, 4);
// gravelAmbientOcclusion.repeat.set(4, 4);
// gravelNormal.repeat.set(4, 4);
// gravelRoughness.repeat.set(4, 4);
// gravelHeight.repeat.set(4, 4);

// gravelBaseColor.wrapS = THREE.RepeatWrapping;
// gravelAmbientOcclusion.wrapS = THREE.RepeatWrapping;
// gravelNormal.wrapS = THREE.RepeatWrapping;
// gravelRoughness.wrapS = THREE.RepeatWrapping;
// gravelHeight.wrapS = THREE.RepeatWrapping;

// gravelBaseColor.wrapT = THREE.RepeatWrapping;
// gravelAmbientOcclusion.wrapT = THREE.RepeatWrapping;
// gravelNormal.wrapT = THREE.RepeatWrapping;
// gravelRoughness.wrapT = THREE.RepeatWrapping;
// gravelHeight.wrapT = THREE.RepeatWrapping;

// room.add(underFloor);

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3, 10, 10),
    new THREE.MeshStandardMaterial({
        map: floorBaseColor,
        aoMap: floorAmbientOcclusion,
        aoMapIntensity: 1,
        normalMap: floorNormal,
        roughnessMap: floorRoughness,
        roughness: 1,
        displacementMap: floorHeight,
        displacementScale: 0.001,
    })
);

floor.rotation.x = -Math.PI * 0.5;

floor.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

// carpet

const carpet = new THREE.Mesh(
    new THREE.CircleGeometry(0.7, 64),
    new THREE.MeshStandardMaterial({
        map: carpetBaseColor,
        aoMap: carpetAmbientOcclusion,
        aoMapIntensity: 1,
        normalMap: carpetNormal,
        roughnessMap: carpetRoughness,
        roughness: 1,
        displacementMap: carpetHeight,
        displacementScale: 0.1,
    })
);

carpet.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(carpet.geometry.attributes.uv.array, 2)
);

carpetBaseColor.repeat.set(3, 3);
carpetAmbientOcclusion.repeat.set(3, 3);
carpetNormal.repeat.set(3, 3);
carpetHeight.repeat.set(3, 3);

carpetBaseColor.wrapS = THREE.RepeatWrapping;
carpetAmbientOcclusion.wrapS = THREE.RepeatWrapping;
carpetNormal.wrapS = THREE.RepeatWrapping;
carpetHeight.wrapS = THREE.RepeatWrapping;

carpetBaseColor.wrapT = THREE.RepeatWrapping;
carpetAmbientOcclusion.wrapT = THREE.RepeatWrapping;
carpetNormal.wrapT = THREE.RepeatWrapping;
carpetHeight.wrapT = THREE.RepeatWrapping;

carpet.position.y = 0.01;
carpet.rotation.x = -Math.PI * 0.5;

const wallMaterial = new THREE.MeshStandardMaterial({
    side: DoubleSide,
    map: wallBaseColor,
    aoMap: wallAmbientOcclusion,
    aoMapIntensity: 1,
    normalMap: wallNormal,
    roughness: 1,
    roughnessMap: wallRoughness,
    metalness: 0,
    metalnessMap: wallMetallic,
    displacementMap: wallHeight,
    displacementScale: 1,
});

const wallOne = new THREE.Mesh(new THREE.PlaneGeometry(3, 2), wallMaterial);
const wallTwo = new THREE.Mesh(new THREE.PlaneGeometry(3, 2), wallMaterial);

wallOne.position.set(0, 1, 1.5);

wallTwo.position.set(-1.5, 1, 0);
wallTwo.rotation.y = -Math.PI * 0.5;

room.add(floor, wallOne, wallTwo, carpet);
scene.add(room);

wallOne.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(wallOne.geometry.attributes.uv.array, 2)
);
wallTwo.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(wallTwo.geometry.attributes.uv.array, 2)
);

// objects

// Plants

const plantOne = new THREE.Group();

const plantOneStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.2, 32),
    new THREE.MeshStandardMaterial()
);

const plantOneBush = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 32, 64),
    new THREE.MeshStandardMaterial()
);

plantOneBush.position.y = 0.3;
plantOne.position.y = 0.3;

plantOne.add(plantOneStem, plantOneBush);

room.add(plantOne);

// Lights

// AMBIENT LIGHT
// const ambientLight = new THREE.AmbientLight(0xffffff, 0);
const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);

// Point Light

const pointLight = new THREE.PointLight(0xff9000, 0.9);

scene.add(
    pointLight,
    ambientLight
    // directionalLight,
);

gui.add(ambientLight, "intensity").min(0).max(5).step(0.001);

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

const clock = new THREE.Clock();

const tick = () => {
    // const elapsedTime = clock.getElapsedTime();
    renderer.render(scene, camera);

    // animations
    let deltaTime = clock.getDelta();
    if (catOneMixer) {
        catOneMixer.update(deltaTime);
    }
    if (catTwoMixer) {
        catTwoMixer.update(deltaTime);
    }

    controls.update();

    window.requestAnimationFrame(tick);
};

tick();
