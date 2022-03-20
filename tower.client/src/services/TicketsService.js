import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"

class TicketsService {


  async addTicket(newTicket) {
    const res = await api.post('api/tickets', newTicket)
    logger.log(res.data)
    //add the spread operator in from gregslist
    const create = { ...res.data, name: res.data.name, picture: res.data.picture }
    AppState.peopleTickets.push(create)
  }
}

export const ticketsService = new TicketsService()