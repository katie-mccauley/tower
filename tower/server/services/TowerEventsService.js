import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TowerEventsService {

  async getOne(id) {
    const towerEvent = await dbContext.TowerEvents.findById(id).populate('creator')
    if (!towerEvent) {
      throw new BadRequest("this is the wrong event")
    }
    return towerEvent
  }

  async createEvent(body) {
    const towerEvent = await dbContext.TowerEvents.create(body)
    await towerEvent.populate('creator')
    return towerEvent
  }

  async getAll(query = {}) {
    const towerEvents = await dbContext.TowerEvents.find(query).populate('creator')
    return towerEvents
  }

  async editEvent(update) {
    const original = await this.getOne(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden("this is not your event")
    }
    if (update.isCanceled) {


      original.name = update.name ? update.name : original.name
      original.description = update.description ? update.description : original.description
      // original.coverImg = update.coverImg ? update.coverImg : original.coverImg
      // original.location = update.location ? update.location : original.location
      // original.startDate = update.startDate ? update.startDate : original.startDate
      // original.type = update.type ? update.type : original.type
    } else {
      throw new BadRequest("can't edit something if been deleted")
    }

    await original.save()
    await original.populate('creator')
    return original
  }

  async removeEvent(towerId, userId) {
    const remove = await dbContext.TowerEvents.findById(towerId)
    if (remove.creatorId.toString() !== userId) {
      throw new BadRequest("this is not your event")
    }
    remove.isCanceled = false
    await remove.save()
    await remove.populate('creator')
    return remove
  }


}
export const towerEventsService = new TowerEventsService()