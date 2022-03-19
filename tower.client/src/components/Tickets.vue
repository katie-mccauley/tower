<template>
  <img
    :src="ticket.picture"
    class="img-fluid cropped"
    :title="ticket.name"
    alt=""
  />
</template>


<script>
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.cropped {
  height: 50px;
  max-width: 50px;
  position: center;
  border-radius: 50%;
}
</style>