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
    await this.getAllEvents()
    let concert = AppState.towerEvents.filter(t => t.type === 'concert')
    logger.log(concert)
    AppState.towerEvents = concert
  }

  async getSports() {
    await this.getAllEvents()
    let sports = AppState.towerEvents.filter(t => t.type === 'sport')
    logger.log(sports)
    AppState.towerEvents = sports
  }

  async getConventions() {
    await this.getAllEvents()
    let conventions = AppState.towerEvents.filter(t => t.type === 'convention')
    logger.log(conventions)
    AppState.towerEvents = conventions
  }

  async getDigital() {
    await this.getAllEvents()
    let digital = AppState.towerEvents.filter(t => t.type === 'digital')
    logger.log(digital)
    AppState.towerEvents = digital
  }

  async getExpos() {
    await this.getAllEvents()
    let expos = AppState.towerEvents.filter(t => t.type === 'expos')
    logger.log(expos)
    AppState.towerEvents = expos
  }
}

export const towerEventsService = new TowerEventsService()