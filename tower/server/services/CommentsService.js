import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CommentsService {
  async createComment(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    return comment
  }

  async getEventComments(query) {
    const comments = await dbContext.Comments.find(query).populate('creator')
    return comments
  }

  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId).populate('creator')
    if (comment.creatorId.toString() !== userId) {
      throw new BadRequest("can not delete this comment")
    }
    await comment.remove()
    return comment
  }


}

export const commentsService = new CommentsService()