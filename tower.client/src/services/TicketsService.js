import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"

class TicketsService {


  async createTicket(newTicket) {
    const res = await api.post('api/tickets', newTicket)
    logger.log(res.data)
    AppState.peopleTickets = res.data
  }
}

export const ticketsService = new TicketsService()