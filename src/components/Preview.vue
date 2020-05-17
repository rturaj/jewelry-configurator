<template>
  <v-card class="preview" id="preview"></v-card>
</template>

<script>
import * as THREE from "three/build/three.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import goldTexture from "@/assets/gold.jpg";
import silverTexture from "@/assets/silver.jpg";
import floorTexture from "@/assets/floor.jpg";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      ring: null,
      leftLight: null,
      rightLight: null,
      controls: null,
      loader: null
    };
  },
  computed: {
    ...mapGetters([
      "getRingTexture",
      "getRingSize",
      "getLeftLightIntensity",
      "getRightLightIntensity"
    ])
  },
  watch: {
    getRingTexture(val) {
      this.changeRingTexture(val);
    },
    getRingSize(val) {
      this.changeRingSize(val);
    },
    getLeftLightIntensity(val) {
      this.changeLightIntensity("left", val);
    },
    getRightLightIntensity(val) {
      this.changeLightIntensity("right", val);
    }
  },
  methods: {
    init() {
      this.addLoader();
      this.addCamera();
      this.addScene();
      this.addLights();
      this.addFloor();
      this.addRing(this.getRingSize);
      this.addRenderer();
      this.addControls();
      document.getElementById("preview").appendChild(this.renderer.domElement);
    },
    addLoader() {
      this.loader = new THREE.TextureLoader();
    },
    addScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color("white");
    },
    addCamera() {
      this.camera = new THREE.PerspectiveCamera(
        70,
        (window.innerWidth * 0.8) / window.innerHeight,
        1,
        1000
      );
      this.camera.position.z = 25;
      this.camera.position.y = 15;
    },
    addLights() {
      this.leftLight = new THREE.DirectionalLight(0xffffff, 1);
      this.leftLight.position.set(-10, 10, 0);
      this.leftLight.castShadow = true;

      this.rightLight = this.leftLight.clone();
      this.rightLight.position.x = 10;

      this.scene.add(this.leftLight, this.rightLight);
    },
    addRing(size) {
      let geometry = new THREE.TorusGeometry(size / 2, size / 20, 32, 100);
      let material = new THREE.MeshLambertMaterial({
        map: this.loader.load(goldTexture)
      });

      this.ring = new THREE.Mesh(geometry, material);
      this.ring.castShadow = true;
      this.ring.receiveShadow = false;
      this.ring.position.y = 8;
      this.scene.add(this.ring);
    },
    addFloor() {
      let geometry = new THREE.CircleGeometry(50, 32);
      let material = new THREE.MeshLambertMaterial({
        map: this.loader.load(floorTexture)
      });
      let floor = new THREE.Mesh(geometry, material);
      floor.rotateX(-Math.PI / 2);
      floor.receiveShadow = true;
      this.scene.add(floor);
    },
    addRenderer() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    },
    addControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minDistance = 0;
      this.controls.maxDistance = 1000;
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.ring.rotation.y += 0.01;
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },

    screenResizeHandler() {
      this.camera.aspect = (window.innerWidth * 0.8) / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
    },
    changeRingTexture(texture) {
      this.ring.material.map = this.loader.load(
        texture == 1 ? goldTexture : silverTexture
      );
    },
    changeRingSize(size) {
      this.scene.remove(this.ring);
      this.addRing(size);
    },
    changeLightIntensity(side, intensity) {
      if (side == "left") {
        this.leftLight.intensity = intensity;
      } else if (side == "right") {
        this.rightLight.intensity = intensity;
      }
    }
  },
  mounted() {
    this.init();
    this.animate();
    window.addEventListener("resize", this.screenResizeHandler, false);
  }
};
</script>

<style scoped>
.preview {
  width: 80vw;
}
</style>