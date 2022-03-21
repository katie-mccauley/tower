<template>
  <div class="row">
    <div class="col-1 me-0">
      <button
        v-if="account.id == comment.creatorId"
        @click="deleteComment"
        type="button"
        class="btn-close btn-close-white"
        aria-label="Close"
      ></button>
    </div>
    <div class="col-11">
      <img :src="comment.creator.picture" class="img-fluid cropped" alt="" />
      <h5 class="lightcolor">{{ comment.creator.name }}: {{ comment.body }}</h5>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { commentsService } from "../services/CommentsService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      async deleteComment() {
        try {
          props.comment.eventId = route.params.id
          if (await Pop.confirm()) {
            await commentsService.deleteComment(props.comment.id)
          }

        } catch (error) {
          logger.error(error)
        }
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
.cropped {
  height: 50px;
  max-width: 50px;
  position: center;
  border-radius: 50%;
}
</style>