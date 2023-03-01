<script setup lang="ts">
// import FetchDemo from "./components/FetchDemo.vue";
// import HelloWorld from "./components/HelloWorld.vue";
// import TestPluginDemo from "./components/TestPluginDemo.vue";
// import TestMd from './components/TestMd/index.vue'
import CommonPage from "./views/commonPage/index.vue";
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <!-- <FetchDemo foo="hello"/> -->
  <!-- <TestPluginDemo/> -->
  <!-- <TestMd/> -->
  <CommonPage />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
