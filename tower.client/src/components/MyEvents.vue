<template>
  <router-link :to="{ name: 'EventDetails', params: { id: eventData.id } }">
    <div class="component text-dark">
      <div class="row justify-content-end">
        <div class="col-1">
          <button
            @click="deleteTicket()"
            type="button"
            class="btn-close btn-close-dark"
            aria-label="Close"
          ></button>
        </div>
      </div>

      <h3>{{ eventData.name }}</h3>
      <h3>
        The start date is
        {{
          new Date(
            eventData.startDate || eventData.event.startDate
          ).toLocaleDateString()
        }}
      </h3>

      <h3>There are {{ eventData.capacity }} seats left</h3>
      <h3>{{ eventData.location }}</h3>
      <div v-if="eventData.isCanceled" class="bg-warning">
        <h4>This is canceled</h4>
      </div>
      <div v-if="eventData.capacity <= 0" class="bg-danger">
        <h4>No more seats</h4>
      </div>
    </div>
  </router-link>
</template>


<script>
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { ticketsService } from "../services/TicketsService"
export default {
  props: {
    eventData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      async deleteTicket() {
        try {
          // ticket.eventId = route.params.eventId
          props.eventData.eventId = route.params.id
          await ticketsService.deleteTicket(AppState.tickets.ticketId)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>