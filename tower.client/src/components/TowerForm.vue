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
        type="number"
        min="0"
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
        type="date"
        min="2022-03-23"
        class="form-control"
        aria-describedby="helpId"
        placeholder="startDate....."
      />
    </div>
    <!-- <div class="col-md-4 mb-2">
      <label for="" class="form-label">type: </label>
      <input
        v-model="editable.type"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="type....."
      />
    </div> -->
    <label for="" class="form-label">Choose Type: </label>
    <div class="btn-group m-2">
      <select required name="" id="" class="px-2" v-model="editable.type">
        <option value="concert">
          <a class="dropdown-item" href="#">Concert</a>
        </option>
        <option value="sport">
          <a class="dropdown-item" href="#">Sport</a>
        </option>
        <option value="convention">
          <a class="dropdown-item" href="#">Convention</a>
        </option>
        <option value="digital">
          <a class="dropdown-item" href="#">Digital</a>
        </option>
        <option value="expos">
          <a class="dropdown-item" href="#">Expos</a>
        </option>
      </select>
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">create</button>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { towerEventsService } from "../services/TowerEventsService"
import { logger } from "../utils/Logger"
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
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
          Pop.toast('error')
        }
      },
      towerEvents: computed(() => AppState.towerEvents.type),
    }
  }
}
</script>


<style lang="scss" scoped>
</style>