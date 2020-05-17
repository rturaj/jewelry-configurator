import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ringTexture: 1,
    ringSize: 10,
    leftLightIntensity: 1,
    rightLightIntensity: 1,

  },
  getters: {
    getRingTexture: state => state.ringTexture,
    getRingSize: state => state.ringSize,
    getLeftLightIntensity: state => state.leftLightIntensity,
    getRightLightIntensity: state => state.rightLightIntensity,
  },
  mutations: {
    setRingTexture(state, texture) {
      state.ringTexture = texture
    },
    setRingSize(state, size) {
      state.ringSize = size;
    },
    setLightIntensity(state, { side, intensity }) {
      if (side == 'left') {
        state.leftLightIntensity = intensity
      } else if (side == 'right') {
        state.rightLightIntensity = intensity
      }
    }
  },

});
