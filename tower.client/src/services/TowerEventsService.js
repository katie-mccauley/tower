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

  async getConcert() {
    let concert = AppState.towerEvents.filter(t => t.type === 'sport' || 'Sport')
    AppState.towerEvents = concert
  }
}

export const towerEventsService = new TowerEventsService()