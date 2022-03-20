<template>
  <header>
    <Navbar />
  </header>
  <main class="background">
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.background {
  background-color: #2a2d3a;
}
</style>
