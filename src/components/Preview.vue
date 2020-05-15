<template>
  <v-card class="preview" id="preview"></v-card>
</template>

<script>
import * as THREE from "three/build/three.module.js";

export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      geometry: null,
      material: null,
      mesh: null,
      light1: null
    };
  },
  methods: {
    init() {
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10
      );
      this.camera.position.z = 1;

      this.scene = new THREE.Scene();

      this.light1 = new THREE.PointLight(new THREE.Color(1, 1, 1), 10, 100);
      this.light1.position.set(50, 50, 50);
      this.scene.add(this.light1);

      this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      this.material = new THREE.MeshLambertMaterial();
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
      const preview = document.getElementById("preview");
      preview.appendChild(this.renderer.domElement);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.light1.rotation.z = 0.1;

      this.renderer.render(this.scene, this.camera);
    },

    screenResizeHandler() {
      this.camera.aspect = (window.innerWidth * 0.8) / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
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