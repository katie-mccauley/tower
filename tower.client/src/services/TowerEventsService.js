import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerEventsService {

  async getAllEvents() {
    const res = await api.get('api/events')
    logger.log(res.data)
    AppState.towerEvents = res.data
  }

  async getEventById(id) {
    const res = await api.get('api/events/' + id)
    logger.log(res.data)
    AppState.activeEvent = res.data
  }

  async createEvent(newEvent) {
    const res = await api.post('api/events', newEvent)
    logger.log(res.data)
    AppState.towerEvents.unshift(res.data)
  }

  async cancelEvent(id) {
    const res = await api.delete('api/events/' + id)
    logger.log(res.data)
    AppState.towerEvents = AppState.towerEvents.filter(e => e.id !== id)
  }

  async editEvent(body, id) {
    const res = await api.put('api/events/' + id, body)
    logger.log(res.data)
  }

  async getEventTickets(id) {
    const res = await api.get('api/events/' + id + '/tickets')
    logger.log("this is tickets", res.data)
    AppState.peopleTickets = res.data
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