<template>
  <v-card class="sidebar">
    <h2>Options</h2>
    <div class="sidebar-item">
      <v-select :items="ringTextureOptions" label="Ring material" v-model="ringTexture"></v-select>
    </div>
    <div class="sidebar-item">
      <v-slider v-model="ringSize" label="Ring size" :min="3" :max="15" thumb-label="always"></v-slider>
    </div>
    <div class="sidebar-item">
      <v-slider
        v-model="leftLightIntensity"
        label="Left light"
        :min="0"
        :max="10"
        thumb-label="always"
      ></v-slider>
    </div>
    <div class="sidebar-item">
      <v-slider
        v-model="rightLightIntensity"
        label="Right light"
        :min="0"
        :max="10"
        thumb-label="always"
      ></v-slider>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      ringTextureOptions: [
        { text: "Gold", value: 1 },
        { text: "Silver", value: 2 }
      ]
    };
  },
  computed: {
    ringTexture: {
      get() {
        return this.$store.getters.getRingTexture;
      },
      set(value) {
        this.$store.commit("setRingTexture", value);
      }
    },
    ringSize: {
      get() {
        return this.$store.getters.getRingSize;
      },
      set(value) {
        this.$store.commit("setRingSize", value);
      }
    },
    leftLightIntensity: {
      get() {
        return this.$store.getters.getLeftLightIntensity * 10;
      },
      set(val) {
        this.$store.commit("setLightIntensity", {
          side: "left",
          intensity: val / 10
        });
      }
    },
    rightLightIntensity: {
      get() {
        return this.$store.getters.getRightLightIntensity * 10;
      },
      set(val) {
        this.$store.commit("setLightIntensity", {
          side: "right",
          intensity: val / 10
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 20vw;
  padding: 20px;
  h2 {
    text-align: center;
  }
  &-item {
    padding: 10px 0;
  }
}
</style>