<template>
  <router-link :to="{ name: 'EventDetails', params: { id: tower.id } }">
    <div class="lightcolor card selectable border border-3 rounded m-3 p-0">
      <img class="img-fluid cropped p-0" :src="tower.coverImg" alt="" />
      <div class="card-img-overlay pb-0 align-items-end m-0 filter">
        <div
          class="row justify-content-md-around box align-items-end h-100 p-0"
        >
          <div class="col-md-12 col-8 backgroundfix m-0 w-100 p-0">
            <div>
              <div class="p-1">
                <h4>{{ tower.name }}</h4>
                <h5>
                  {{
                    new Date(
                      tower.startDate || tower.event.startDate
                    ).toLocaleDateString()
                  }}
                </h5>
              </div>
              <div class="row p-1">
                <div class="col-8">
                  <h5>{{ tower.location }}</h5>
                </div>
                <div v-if="tower.capacity > 0" class="col-4">
                  <h5>{{ tower.capacity }} spots</h5>
                </div>
              </div>

              <div
                v-if="tower.isCanceled"
                class="text-dark yellow rounded mb-0"
              >
                <h5 class="mb-0">This is canceled</h5>
              </div>
              <div
                v-if="tower.capacity <= 0"
                class="bg-danger text-light rounded mb-0 pb-0"
              >
                <h5 class="mb-0">No more seats</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { computed } from "@vue/reactivity"
export default {
  props: {
    tower: {
      type: Object,
      required: true,
    }
  },
  setup() {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
.lightcolor {
  color: rgba(204, 243, 253, 1);
}
.cropped {
  height: 300px;
  position: center;
  display: cover;
  object-fit: cover;
}

.yellow {
  background-color: rgba(255, 212, 100, 1);
}

.filter {
  filter: drop-shadow(0 0 0.75rem crimson);
}

.backgroundfix {
  background: rgba(204, 243, 253, 0.2);
  border: 1px solid rgba(86, 199, 251, 0.2);
  box-sizing: border-box;
  backdrop-filter: blur(20px);
}
</style>