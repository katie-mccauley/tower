<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-6">
        <h1>Events for {{ account.name }}</h1>
      </div>
    </div>
    <div class="row">
      <div
        class="col bg-white shadow rounded"
        v-for="e in myEvents"
        :key="e.id"
      >
        {{ e.name }}>
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
export default {

  name: 'Account',
  setup() {
    onMounted(async () => {
      try {
        await accountService.getAccountTickets()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      account: computed(() => AppState.account),
      // myEvents: computed(() => AppState.towerEvents.creatorId == AppState.account.id)
      myEvents: computed(() => AppState.towerEvents)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
