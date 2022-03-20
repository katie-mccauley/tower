<template>
  <router-link :to="{ name: 'EventDetails', params: { id: tower.id } }">
    <div class="component text-dark">
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
  </router-link>
</template>


<script>
export default {
  props: {
    tower: {
      type: Object,
      required: true,
    }
  },
  props: {
    myEvents: {
      type: Object,
      required: true,
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>