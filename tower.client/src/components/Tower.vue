<template>
  <div class="component">
    <h3>
      {{ tower.name }} || {{ tower.startDate }} || {{ tower.capacity }} ||
      {{ tower.location }}
    </h3>
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