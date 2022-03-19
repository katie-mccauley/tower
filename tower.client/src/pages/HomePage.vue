<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 m-2 bg-white" v-for="t in towerEvents" :key="t.id">
        <Tower :tower="t" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { towerEventsService } from "../services/TowerEventsService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await towerEventsService.getAllEvents()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      towerEvents: computed(() => AppState.towerEvents)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
