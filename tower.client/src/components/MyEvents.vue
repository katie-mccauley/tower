<template></template>


<script>
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { ticketsService } from "../services/TicketsService"
import { logger } from "../utils/Logger"
export default {
  props: {
    eventData: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
</style>