<template>
  <div class="container-fluid">
    <div class="row justify-content-start ms-5">
      <div class="col-md-6 text-white">
        <h1 class="lightcolor">Events for {{ account.name }}</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div
        class="col-md-3 col-10 m-2 bg-blue shadow rounded"
        v-for="e in myAttending"
        :key="e.id"
      >
        <img
          :src="e.coverImg"
          class="img-fluid rounded card-img-top cropped mt-2"
          alt=""
        />
        <div class="card-body text-dark">
          <div class="row justify-content-end">
            <div class="col-md-1">
              <button
                @click="deleteTicket(e.accountId, e.ticketId)"
                title="Delete Ticket"
                type="button"
                class="btn-close btn-close-white"
                aria-label="Close"
              ></button>
            </div>
          </div>

          <div class="lightcolor">
            <h3>{{ e.name }}</h3>
            <h3>
              The start date is
              {{
                new Date(e.startDate || e.event.startDate).toLocaleDateString()
              }}
            </h3>

            <h3 v-if="e.capacity > 0">There are {{ e.capacity }} seats left</h3>
            <h3>{{ e.location }}</h3>
            <div v-if="e.isCanceled" class="bg-warning">
              <h4>This is canceled</h4>
            </div>
            <div v-if="e.capacity <= 0" class="bg-danger">
              <h4>No more seats</h4>
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

.lightcolor {
  color: rgba(204, 243, 253, 1);
}
</style>
