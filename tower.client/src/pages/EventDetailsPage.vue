<template>
  <div class="container-fluid">
    <div class="row m-3 ms-5 justify-content-center lightcolor text-shadow">
      <div class="col-md-6 m-0 p-0 bg-blue rounded shadow card">
        <div class="row">
          <div class="col-md-5">
            <img
              class="img-fluid rounded shadow crop"
              :src="activeEvent.coverImg"
              alt=""
            />
          </div>
          <div class="col-md-7">
            <div class="row justify-content-end">
              <div
                v-if="
                  account.id == activeEvent.creatorId && !activeEvent.isCanceled
                "
                class="col-md-1"
                title="edit event"
              >
                <i
                  data-bs-toggle="modal"
                  data-bs-target="#edit-event"
                  class="selectable mdi mdi-application-edit"
                ></i>
              </div>
              <div
                v-if="
                  account.id == activeEvent.creatorId && !activeEvent.isCanceled
                "
                class="col-md-1"
              >
                <button
                  @click="cancelEvent"
                  title="Cancel Event"
                  type="button"
                  class="btn-close btn-close-white"
                  aria-label="Close"
                ></button>
              </div>
            </div>

            <h2 class="m-2 pb-2">
              <div class="pt-2">
                {{ activeEvent.name }}
              </div>

              {{
                new Date(
                  activeEvent.startDate || activeEvent.startDate
                ).toLocaleDateString()
              }}
            </h2>
            <h3 class="m-2">{{ activeEvent.location }}</h3>
            <h6 class="me-5 m-2 mt-4">{{ activeEvent.description }}</h6>
            <div class="row m-3 justify-content-between">
              <div
                v-if="
                  activeEvent.capacity > 0 && activeEvent.isCanceled == false
                "
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
                <button
                  v-if="
                    activeEvent.capacity > 0 &&
                    !activeEvent.isCanceled &&
                    !hasTicket &&
                    account.id
                  "
                  @click="addTicket"
                  title="Attend"
                  class="btn yellow shadow"
                >
                  Attend <i class="mdi mdi-ticket"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row m-3 ms-5 justify-content-center">
      <div class="col-md-6 justify-content-center bg-blue rounded shadow">
        <div class="row p-2">
          <div class="col-3" v-for="t in people" :key="t.id">
            <Tickets :ticket="t" />
          </div>
        </div>
      </div>
    </div>

    <div class="row m-3 ms-5 justify-content-center">
      <div class="col-md-6 justify-content-center bg-blue rounded shadow">
        <div class="row" v-if="account.id">
          <div class="col-10">
            <CommentForm />
          </div>
        </div>
        <div class="row m-2" v-if="comments.length > 0">
          <div class="col-md-12" v-for="c in comments" :key="c.id">
            <Comment :comment="c" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal id="edit-event">
    <template #title> Edit Event </template>
    <template #body><EditTower /></template>
  </Modal>
</template>


<script>
import { computed, onMounted, watchEffect } from "@vue/runtime-core"
import { useRoute, useRouter } from "vue-router"
import { logger } from "../utils/Logger"
import { towerEventsService } from "../services/TowerEventsService"
import { AppState } from "../AppState"
import { ticketsService } from "../services/TicketsService"
import Pop from "../utils/Pop"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    // onMounted(async () => {
    //   try {

    //   } catch (error) {
    //     logger.error(error)
    //   }
    // })
    watchEffect(async () => {
      try {
        if (route.name == "EventDetails") {
          await towerEventsService.getEventById(route.params.id)
          await ticketsService.getEventTickets(route.params.id)
          await towerEventsService.getEventComments(route.params.id)
        }
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      people: computed(() => AppState.peopleTickets),
      activeEvent: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      hasTicket: computed(() => AppState.peopleTickets.find((t) => t.id == AppState.account.id)),
      async cancelEvent() {
        try {
          if (await Pop.confirm()) {
            await towerEventsService.cancelEvent(route.params.id)
            router.push({ name: 'Home' })
          }
        } catch (error) {
          logger.error(error)
        }
      },
      addTicket() {
        try {
          let newTicket = {
            accountId: AppState.account.id,
            eventId: AppState.activeEvent.id
          }
          ticketsService.addTicket(newTicket)
          // ticketsService.getEventTickets(route.params.id)
          // await ticketsService.addTicket({ eventId: route.params.id })

        } catch (error) {
          logger.error(error)
        }
      },
      account: computed(() => AppState.account),
      comment: computed(() => AppState.comments)
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
  height: 300px;
  max-width: 300px;
  // border: 1px solid rgba(204, 243, 253, 0.4);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: cover;
  object-fit: cover;
}

.yellow {
  background-color: rgba(255, 212, 100, 1);
}

.lightcolor {
  color: rgba(204, 243, 253, 1);
}
</style>