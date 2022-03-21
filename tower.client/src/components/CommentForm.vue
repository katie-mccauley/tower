<template>
  <form action="" @submit.prevent="createComment">
    <div class="mb-3 m-2">
      <label for="exampleFormControlTextarea1" class="form-label lightcolor"
        >Make a comment</label
      >
      <textarea
        v-model="editable.body"
        maxlength="50"
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
    <div class="col-12 d-flex justify-content-end mb-3">
      <button class="btn green-button">create</button>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { commentsService } from "../services/CommentsService"
import { AppState } from "../AppState"
export default {
  // props:{
  //   commentData:{
  //     type: Object, 
  //     required: false
  //   }
  // },

  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async createComment() {
        editable.value.eventId = route.params.id
        await commentsService.createComment(editable.value)
        editable.value = {}
      },
      account: computed(() => AppState.account)
    }

  }
}
</script>


<style lang="scss" scoped>
.lightcolor {
  color: rgba(204, 243, 253, 1);
}

.green-button {
  background-color: rgba(121, 231, 171, 1);
}
</style>