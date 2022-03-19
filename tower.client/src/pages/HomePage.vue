<template>
  <div class="container-fluid">
    <ul class="nav">
      <li class="nav-item" @click="getAll">
        <a class="nav-link active" aria-current="page" href="#">All</a>
      </li>
      <li class="nav-item" @click="getConcert">
        <a class="nav-link" href="#">Concert</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"
          >Disabled</a
        >
      </li>
    </ul>
    <div class="row justify-content-around m-2 mb-4">
      <div
        class="col-3 m-2 bg-white rounded shadow"
        v-for="t in towerEvents"
        :key="t.id"
      >
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
    // onMounted(async () => {

    // })
    return {
      towerEvents: computed(() => AppState.towerEvents),
      async getAll() {
        try {
          await towerEventsService.getAllEvents()
        } catch (error) {
          logger.error(error)
        }
      },
      async getConcert() {
        try {
          await towerEventsService.getConcert()
        } catch (error) {
          logger.error(error)
        }
      }
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
