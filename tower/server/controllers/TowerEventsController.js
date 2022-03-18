import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";


export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/tickets', this.getEventTickets)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.removeEvent)
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.createEvent(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getAll(req.query)
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getOne(req.params.id)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const towerEvent = await towerEventsService.editEvent(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async removeEvent(req, res, next) {
    try {
      const userId = req.userInfo.id
      const towerId = req.params.id
      await towerEventsService.removeEvent(towerId, userId)
      return res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }

  async getEventTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getEventTickets({ eventId: req.params.id })
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
}