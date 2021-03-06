import { query } from "express"
import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"

class TicketsService {

  async removeTicket(ticketId, userId) {
    const t = await dbContext.Tickets.findById(ticketId)
    if (t.accountId.toString() !== userId) {
      throw new BadRequest("can't delete")
    }
    await t.remove()
    const ticketEvent = await towerEventsService.getOne(t.eventId)
    ticketEvent.capacity++
    ticketEvent.save()
    return t

  }
  async getEventTickets(query) {
    const tickets = await dbContext.Tickets.find(query).populate('account')
    return tickets.map(mongooseDocument => {
      const ticket = mongooseDocument.toJSON()
      return {
        ticketId: ticket.id,
        eventId: ticket.eventId,
        ...ticket.account
      }
    })
  }


  async createTicket(body) {

    const event = await dbContext.TowerEvents.findById(body.eventId)
    event.capacity -= 1
    if (event.capacity <= 0) {
      throw new BadRequest('there is no capcity')
    }
    const ticket = await dbContext.Tickets.create(body)
    await event.save()
    // await event.populate('account', 'towerEvent')

    return ticket
  }

  //ticket info and event info
  async getAccountTickets(query) {
    const tickets = await dbContext.Tickets.find(query).populate('towerEvent')
    return tickets.map(mongooseDocument => {
      const ticket = mongooseDocument.toJSON()
      return {
        ticketId: ticket.id,
        accountId: ticket.accountId,
        ...ticket.towerEvent
      }
    })
  }
}

export const ticketsService = new TicketsService()