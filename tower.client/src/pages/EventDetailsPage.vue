<template>
  <div class="row m-3 ms-5 justify-content-center lightcolor text-shadow">
    <div class="col-6 m-0 p-0 bg-blue rounded shadow">
      <div class="row">
        <div class="col-4">
          <img
            class="img-fluid rounded shadow crop"
            :src="activeEvent.coverImg"
            alt=""
          />
        </div>
        <div class="col-6 mt-5 me-2">
          <h2 class="m-2">
            {{ activeEvent.name }}
            {{
              new Date(
                activeEvent.startDate || activeEvent.event.startDate
              ).toLocaleDateString()
            }}
          </h2>
          <h3 class="m-2">{{ activeEvent.location }}</h3>
          <h6 class="m-2 mt-4">{{ activeEvent.description }}</h6>
          <div class="row m-3 justify-content-between">
            <div
              v-if="activeEvent.capacity > 0 && activeEvent.isCanceled == false"
              class="col-3"
            >
              <p class="text-bold">{{ activeEvent.capacity }} spots left</p>
            </div>
            <div
              v-if="activeEvent.capacity <= 0"
              class="col-5 rounded shadow bg-danger"
            >
              <h5>There are no spots left</h5>
            </div>
            <div
              v-if="activeEvent.isCanceled"
              class="bg-warning col-5 rounded shadow"
            >
              <h5>This event is cancelled</h5>
            </div>
            <div class="col-4">
              <button class="btn yellow shadow">
                Attend <i class="mdi mdi-ticket"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, watchEffect } from "@vue/runtime-core"
import { useRoute, useRouter } from "vue-router"
import { logger } from "../utils/Logger"
import { towerEventsService } from "../services/TowerEventsService"
import { AppState } from "../AppState"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    watchEffect(async () => {
      try {
        if (route.name == "EventDetails") {
          await towerEventsService.getEventById(route.params.id)
        }
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      activeEvent: computed(() => AppState.activeEvent)
    }
  }
}
</script>


<style lang="scss" scoped>
.bg-blue {
  background-color: rgba(71, 76, 97, 1);
  backdrop-filter: blur(30px);
}
.crop {
  height: 350px;
  max-width: 350px;
  // border: 1px solid rgba(204, 243, 253, 0.4);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.yellow {
  background-color: rgba(255, 212, 100, 1);
}

.lightcolor {
  color: rgba(204, 243, 253, 1);
}
</style>