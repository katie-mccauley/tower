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