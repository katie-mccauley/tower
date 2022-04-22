<template>
  <div class="container-fluid">
    <div class="row justify-content-start ms-5">
      <div class="col-md-6 text-white">
        <h1 class="lightcolor">Events for {{ account.name }}</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div
        class="col-md-3 col-10 lightcolor rounded p-0 m-4"
        v-for="e in myAttending"
        :key="e.id"
      >
        <div class="card border border-3 rounded p-0 m-0">
          <img :src="e.coverImg" class="img-fluid p-0 cropped" alt="" />
          <div
            class="
              card-img-overlay
              p-0
              m-0
              text-dark
              filter
              lightcolor
              align-items-end
            "
          >
            <div
              class="
                row
                justify-content-md-around
                align-items-end
                h-100
                p-0
                m-0
              "
            >
              <!-- <div class="col-md-1">
              <button
                @click="deleteTicket(e.accountId, e.ticketId)"
                title="Delete Ticket"
                type="button"
                class="btn-close btn-close-white"
                aria-label="Close"
              ></button>
            </div> -->

              <div class="col-md-12 col-8 backgroundfix m-0 w-100 p-0">
                <div class="row p-0 m-0">
                  <div class="col-md-10 col-10 ps-0">
                    <h4 class="lightcolor">
                      {{ e.name }}
                    </h4>
                  </div>
                  <div class="col-md-1 col-2 ps-4">
                    <button
                      @click="deleteTicket(e.accountId, e.ticketId)"
                      title="Delete Ticket"
                      type="button"
                      class="btn-close btn-close-white"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>

                <h4 class="lightcolor">
                  {{
                    new Date(
                      e.startDate || e.event.startDate
                    ).toLocaleDateString()
                  }}
                </h4>
                <div class="row">
                  <div class="col-7">
                    <h5 class="lightcolor">{{ e.location }}</h5>
                  </div>
                  <div class="col-4">
                    <h5 class="lightcolor" v-if="e.capacity > 0">
                      {{ e.capacity }} spots
                    </h5>
                  </div>
                </div>
                <div v-if="e.isCanceled" class="bg-warning">
                  <h5>This is canceled</h5>
                </div>
                <div v-if="e.capacity <= 0" class="bg-danger">
                  <h5>No more seats</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { towerEventsService } from "../services/TowerEventsService"
import { accountService } from "../services/AccountService"
import { logger } from "../utils/Logger"
import { useRoute } from "vue-router"
import { ticketsService } from "../services/TicketsService"
import Pop from "../utils/Pop"
export default {

  name: 'Account',
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {

        await ticketsService.getAccountTickets()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      account: computed(() => AppState.account),
      // myEvents: computed(() => AppState.towerEvents.creatorId == AppState.account.id)
      myAttending: computed(() => AppState.attending),
      async deleteTicket(myId, ticketId) {
        try {
          // ticket.eventId = route.params.eventId
          // AppState.account.id = event.creatorId
          if (await Pop.confirm()) {
            await ticketsService.deleteTicket(myId, ticketId)
          }


        } catch (error) {
          logger.error(error)
        }
      }

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.bg-blue {
  background-color: rgba(71, 76, 97, 1);
  backdrop-filter: blur(30px);
}
.lightcolor {
  color: rgba(204, 243, 253, 1);
}
.cropped {
  height: 300px;
  max-width: 650px;
  position: center;
  display: cover;
  object-fit: cover;
}

.backgroundfix {
  background: rgba(204, 243, 253, 0.2);
  border: 1px solid rgba(86, 199, 251, 0.2);
  box-sizing: border-box;
  backdrop-filter: blur(20px);
}

.lightcolor {
  color: rgba(204, 243, 253, 1);
}

.filter {
  filter: drop-shadow(0 0 0.75rem crimson);
}
</style>
