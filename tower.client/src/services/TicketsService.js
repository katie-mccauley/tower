import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"

class TicketsService {

  async getEventTickets(id) {
    const res = await api.get('api/events/' + id + '/tickets')
    logger.log("this is tickets", res.data)
    AppState.peopleTickets = res.data
    if (AppState.user.isAuthenticated) {
      await this.getAccountTickets()
    }
  }
  async addTicket(newTicket) {
    const res = await api.post('api/tickets', newTicket)
    logger.log(res.data)
    //add the spread operator in from gregslist
    const create = { ...res.data, name: res.data.name, picture: res.data.picture }
    AppState.peopleTickets.push(create)
    AppState.activeEvent.capacity = AppState.activeEvent.capacity - 1

  }

  async getAccountTickets() {
    const res = await api.get('account/tickets')
    logger.log("my events that I am going to", res.data)
    AppState.attending = res.data
  }

  async deleteTicket(eventId, ticketId) {
    const res = await api.delete('api/tickets/' + ticketId)
    logger.log("deleting ticket", res.data)
  }
}

export const ticketsService = new TicketsService()