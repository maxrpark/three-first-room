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

const updateAllMaterials = () => {
    scene.traverse((child) => {
        if (
            child instanceof THREE.Mesh &&
            child.material instanceof THREE.MeshStandardMaterial
        ) {
            // ...

            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
};

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
    grassAmbientOcclusion,
    grassBaseColor,
    grassNormal,
    grassRoughness,
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

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// controls
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Plane

const floorOutside = new THREE.Group();
floorOutside.position.y = -0.01;
scene.add(floorOutside);

const plane = new THREE.Mesh(
    new THREE.CircleGeometry(2.5, 64),
    new THREE.MeshStandardMaterial({
        map: grassBaseColor,
        aoMap: grassAmbientOcclusion,
        aoMapIntensity: 1,
        normalMap: grassNormal,
        roughnessMap: grassRoughness,
        roughness: 1,
    })
);

plane.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
grassBaseColor.repeat.set(3, 3);
grassAmbientOcclusion.repeat.set(3, 3);
grassNormal.repeat.set(3, 3);
grassRoughness.repeat.set(3, 3);

grassBaseColor.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusion.wrapS = THREE.RepeatWrapping;
grassNormal.wrapS = THREE.RepeatWrapping;
grassRoughness.wrapS = THREE.RepeatWrapping;

grassBaseColor.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusion.wrapT = THREE.RepeatWrapping;
grassNormal.wrapT = THREE.RepeatWrapping;
grassRoughness.wrapT = THREE.RepeatWrapping;

plane.rotation.x = -Math.PI * 0.5;

floorOutside.add(plane);

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
    updateAllMaterials();
    room.add(gltf.scene);
});
let catTwoMixer: any = null;

gltfLoader.load("/assets/models/animated_bengal_cat/scene.gltf", (gltf) => {
    catTwoMixer = new THREE.AnimationMixer(gltf.scene);
    const action = catTwoMixer.clipAction(gltf.animations[0]);
    action.play();
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    updateAllMaterials();
    room.add(gltf.scene);
});

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
floor.receiveShadow = true;

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

// Lamp

const lampOne = new THREE.Group();

const lampOneStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.2, 32),
    new THREE.MeshStandardMaterial()
);

const lampOneBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 32, 64),
    new THREE.MeshStandardMaterial()
);

lampOneBall.position.y = 0.6;
lampOneStem.position.y = 0.3;
lampOne.position.y = 0.2;
lampOne.position.x = -1.2;
lampOne.position.z = 1.2;

const geometry = new THREE.CylinderGeometry(0.2, 0.1, 0.5, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const lampBase = new THREE.Mesh(geometry, material);

lampOne.add(lampOneStem, lampOneBall, lampBase);

lampOneBall.castShadow = true;
lampBase.castShadow = true;

room.add(lampOne);

// Lights

// AMBIENT LIGHT

const ambientLight = new THREE.AmbientLight(0xffffff, 1);

// Point Light

const pointLight = new THREE.PointLight(0xff9000, 1);
// const lightHelper = new THREE.PointLightHelper(pointLight, 0.6);
pointLight.position.copy(lampOne.position);
pointLight.position.y = 0.8;
pointLight.castShadow = true;

scene.add(pointLight, ambientLight);

gui.add(ambientLight, "intensity").min(0).max(5).step(0.001);

// Directional light
const directionalLight = new THREE.DirectionalLight("#ffffff", 0.7);
directionalLight.castShadow = true;
scene.add(directionalLight);

directionalLight.position.set(2, 3, 1);

gui.add(directionalLight, "intensity").min(0).max(1).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);

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

    alpha: true,
});
renderer.setClearColor("#00171F", 1);

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = true;

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
