import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const gltfLoader = new GLTFLoader();

const catOne = async () =>
    await gltfLoader.load(
        "/assets/models/an_animated_cat/scene.gltf",
        (gltf) => {
            return gltf.scene;
        }
    );

export { catOne };
