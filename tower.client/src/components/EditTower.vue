<template>
  <form
    class="
      bg-grey
      darken-20
      justify-content-center
      elevation-3
      shadow
      col-8
      p-2
      m-5
    "
    @submit.prevent="editEvent"
  >
    <h2>Create Project</h2>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Name: </label>
      <input
        v-model="editable.name"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Name....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Description: </label>
      <input
        v-model="editable.description"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Description....."
      />
    </div>
    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">Edit</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import { towerEventsService } from "../services/TowerEventsService"
import { Modal } from "bootstrap"
import { watchEffect } from "@vue/runtime-core"
import { AppState } from "../AppState"
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...AppState.activeEvent }
    })
    return {
      editable,
      async editEvent() {
        try {

          // props.editData.id = route.params.id
          await towerEventsService.editEvent(editable.value)
          Modal.getOrCreateInstance(document.getElementById('edit-event')).hide()
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