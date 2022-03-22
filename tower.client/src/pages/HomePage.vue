<template>
  <div class="container-fluid">
    <ul class="nav">
      <li class="nav-item" @click="getAll">
        <a class="nav-link active" aria-current="page" href="#">All</a>
      </li>
      <li class="nav-item" @click="getConcert">
        <a class="nav-link active" href="#">Concert</a>
      </li>
      <li class="nav-item" @click="getSports">
        <a class="nav-link" href="#">Sports</a>
      </li>
      <li class="nav-item" @click="getConventions">
        <a class="nav-link" href="#">Convention</a>
      </li>
      <li class="nav-item" @click="getDigital">
        <a class="nav-link" href="#">Digital</a>
      </li>
      <li class="nav-item" @click="getExpos">
        <a class="nav-link" href="#">Expos</a>
      </li>
    </ul>
    <div class="row justify-content-around m-2 mb-4">
      <div
        class="
          col-md-3
          m-2
          mb-5
          bg-blue
          text-shadow
          rounded
          shadow
          picture-background
        "
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
    onMounted(async () => {
      try {
        await towerEventsService.getAllEvents()
      } catch (error) {
        logger.error(error)
      }
    })
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
      },
      async getSports() {
        try {
          await towerEventsService.getSports()
        } catch (error) {
          logger.error(error)

        }
      },
      async getConventions() {
        try {
          await towerEventsService.getConventions()
        } catch (error) {
          logger.error(error)
        }
      },
      async getDigital() {
        try {
          await towerEventsService.getDigital()
        } catch (error) {
          logger.error(error)
        }
      },
      async getExpos() {
        try {
          await towerEventsService.getExpos()
        } catch (error) {
          logger.error(error)
        }
      },
      pic: computed(() => `url('${AppState.towerEvents.coverImg}')`)

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

.bg-blue {
  background-color: rgba(71, 76, 97, 1);
  backdrop-filter: blur(30px);
}

.picture-background {
  background-image: v-bind(pic);
  background-position: center;
  background-size: cover;
}
</style>
