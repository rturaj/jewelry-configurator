<template>
  <v-app>
    <v-content>
      <v-card class="app">
        <preview />
        <sidebar />
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import Preview from "@/components/Preview";
import Sidebar from "@/components/Sidebar";

export default {
  name: "App",

  components: {
    Preview,
    Sidebar
  }
};
</script>
<style scoped>
.app {
  height: 100vh;
  width: 100vw;
  display: flex;
}
</style>
