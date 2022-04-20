<template>
  <div class="container-fluid">
    <div class="row mt-2 mb-2 ms-1 me-1 justify-content-center">
      <div id="col-12">
        <img
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZlc3RpdmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          class="rounded shadow w-100 dimen"
          alt=""
        />
        <!-- <h1 class="text-transparent">Towe</h1> -->
      </div>
    </div>
    <nav
      class="
        navbar navbar-dark
        bg-dark
        navbar-expand-lg
        justify-content-between
        rounded
        shadow
      "
    >
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-tabs">
        <li class="nav-item me-5" @click="getAll">
          <a class="nav-link" aria-current="page" href="#"><h3>All</h3> </a>
        </li>
        <li class="nav-item me-5" @click="getConcert">
          <a class="nav-link" href="#"><h3>Concert</h3> </a>
        </li>
        <li class="nav-item me-5" @click="getSports">
          <a class="nav-link" href="#"><h3>Sports</h3> </a>
        </li>
        <li class="nav-item me-5" @click="getConventions">
          <a class="nav-link" href="#"><h3>Convention</h3></a>
        </li>
        <li class="nav-item me-5" @click="getDigital">
          <a class="nav-link" href="#"><h3>Digital</h3> </a>
        </li>
        <li class="nav-item me-5" @click="getExpos">
          <a class="nav-link" href="#"><h3>Expos</h3> </a>
        </li>
      </ul>
    </nav>
    <div class="row justify-content-around m-2 mb-4">
      <div class="col-md-3" v-for="t in towerEvents" :key="t.id">
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
  .filter {
    filter: drop-shadow(0 0 0.75rem crimson);
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

#back-img {
  height: 300px;
  object-fit: cover;
}

.dimen {
  height: 300px;
  object-fit: cover;
  object-position: center;
}

.nav-tabs.active {
  background-color: rgb(82, 207, 239);
}
</style>
