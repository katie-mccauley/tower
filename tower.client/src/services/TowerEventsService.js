import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerEventsService {

  async getAllEvents() {
    const res = await api.get('api/events')
    logger.log(res.data)
    AppState.towerEvents = res.data
  }

  async createEvent(newEvent) {
    const res = await api.post('api/events', newEvent)
    logger.log(res.data)
    AppState.towerEvents.unshift(res.data)
  }
}

export const towerEventsService = new TowerEventsService()