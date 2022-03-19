<template>
  <div class="component">
    <h3>{{ tower.name }}</h3>
    <h3>
      {{
        new Date(tower.startDate || tower.event.startDate).toLocaleDateString()
      }}
    </h3>

    <h3>{{ tower.capacity }}</h3>
    <h3>{{ tower.location }}</h3>
    <div v-if="tower.isCanceled" class="bg-warning">
      <h4>This is canceled</h4>
    </div>
    <div v-if="tower.capacity <= 0" class="bg-danger">
      <h4>No more seats</h4>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    tower: {
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