<template>
  <router-link :to="{ name: 'EventDetails', params: { id: tower.id } }">
    <div class="lightcolor">
      <div class="p-2">
        <img
          class="img-fluid card-img-top cropped rounded"
          :src="tower.coverImg"
          alt=""
        />
      </div>
      <div class="card-body">
        <h3>{{ tower.name }}</h3>
        <h3>
          The start date is
          {{
            new Date(
              tower.startDate || tower.event.startDate
            ).toLocaleDateString()
          }}
        </h3>

        <h3>There are {{ tower.capacity }} seats left</h3>
        <h3>{{ tower.location }}</h3>
        <div v-if="tower.isCanceled" class="bg-warning">
          <h4>This is canceled</h4>
        </div>
        <div v-if="tower.capacity <= 0" class="bg-danger">
          <h4>No more seats</h4>
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
}
</style>