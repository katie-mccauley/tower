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
    @submit.prevent="createEvent"
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
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Cover Image: </label>
      <input
        v-model="editable.coverImg"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Cover Image....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">location: </label>
      <input
        v-model="editable.location"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="location....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Capacity: </label>
      <input
        v-model="editable.capacity"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="capacity....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">startDate: </label>
      <input
        v-model="editable.startDate"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="startDate....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">type: </label>
      <input
        v-model="editable.type"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="type....."
      />
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">create</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { towerEventsService } from "../services/TowerEventsService"
import { logger } from "../utils/Logger"
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
import { AppState } from "../AppState"
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      async createEvent() {
        try {
          Modal.getOrCreateInstance(document.getElementById('create-event')).hide()

          await towerEventsService.createEvent(editable.value)
          editable.value = {}
          router.push({ name: 'EventDetails', params: { id: AppState.towerEvents[0].id } })
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