import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:id', this.removeTicket)
    // .get('api/events/:id/tickets', this.getEvents)
    // .delete('api/tickets/:id', this.getTickets)
  }
  async removeTicket(req, res, next) {
    try {
      const userId = req.userInfo.id
      const ticketId = req.params.id
      await ticketsService.removeTicket(ticketId, userId)
    } catch (error) {
      next(error)
    }
  }
  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.createTicket(req.body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  // getEvents(arg0, getEvents) {
  //   throw new Error("Method not implemente'd.");
  // }
  // getAccount(arg0, getAccount) {
  //   throw new Error("Method not implemented.");
  // }

}