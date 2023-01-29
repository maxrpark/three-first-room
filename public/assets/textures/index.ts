import * as THREE from "three";
const textureLoader = new THREE.TextureLoader();
// floor
const floorAmbientOcclusion = textureLoader.load(
    "/assets/textures/floor/floor_AmbientOcclusion.jpg"
);
const floorBaseColor = textureLoader.load(
    "/assets/textures/floor/floor_BaseColor.jpg"
);
const floorHeight = textureLoader.load(
    "/assets/textures/floor/floor_Height.jpg"
);
const floorNormal = textureLoader.load("/assets/textures/floor/Normal.jpg");
const floorRoughness = textureLoader.load(
    "/assets/textures/floor/floor_Roughness.jpg"
);

// gravel
const gravelAmbientOcclusion = textureLoader.load(
    "/assets/textures/gravel/Gravel_AmbientOcclusion.jpg"
);
const gravelBaseColor = textureLoader.load(
    "/assets/textures/gravel/Gravel_BaseColor.jpg"
);
const gravelHeight = textureLoader.load(
    "/assets/textures/gravel/Gravel_Height.jpg"
);
const gravelNormal = textureLoader.load(
    "/assets/textures/gravel/Gravel_Normal.jpg"
);
const gravelRoughness = textureLoader.load(
    "/assets/textures/gravel/Gravel_Roughness.jpg"
);

// wall
const wallAmbientOcclusion = textureLoader.load(
    "/assets/textures/wall/wall_ambientOcclusion.jpg"
);
const wallBaseColor = textureLoader.load(
    "/assets/textures/wall/wall_baseColor.jpg"
);
const wallHeight = textureLoader.load("/assets/textures/wall/wall_height.jpg");
const wallNormal = textureLoader.load("/assets/textures/wall/normal.jpg");
const wallRoughness = textureLoader.load(
    "/assets/textures/wall/wall_roughness.jpg"
);
const wallMetallic = textureLoader.load(
    "/assets/textures/wall/wall_metallic.jpg"
);
// carpet
const carpetAmbientOcclusion = textureLoader.load(
    "/assets/textures/carpet/carpet_ambientOcclusion.jpg"
);
const carpetBaseColor = textureLoader.load(
    "/assets/textures/carpet/carpet_basecolor.jpg"
);
const carpetHeight = textureLoader.load(
    "/assets/textures/carpet/carpet_height.jpg"
);
const carpetNormal = textureLoader.load("/assets/textures/carpet/normal.jpg");
const carpetRoughness = textureLoader.load(
    "/assets/textures/carpet/carpet_roughness.jpg"
);

// grass

const grassAmbientOcclusion = textureLoader.load(
    "/assets/textures/grass/grass_ambientOcclusion.jpg"
);
const grassBaseColor = textureLoader.load(
    "/assets/textures/grass/grass_basecolor.jpg"
);
const grassNormal = textureLoader.load("/assets/textures/grass/normal.jpg");
const grassRoughness = textureLoader.load(
    "/assets/textures/grass/roughness.jpg"
);

export {
    floorAmbientOcclusion,
    floorBaseColor,
    floorHeight,
    floorNormal,
    floorRoughness,
    gravelAmbientOcclusion,
    gravelBaseColor,
    gravelHeight,
    gravelNormal,
    gravelRoughness,
    wallAmbientOcclusion,
    wallBaseColor,
    wallHeight,
    wallNormal,
    wallRoughness,
    wallMetallic,
    carpetAmbientOcclusion,
    carpetBaseColor,
    carpetHeight,
    carpetNormal,
    carpetRoughness,
    grassAmbientOcclusion,
    grassBaseColor,
    grassNormal,
    grassRoughness,
};
