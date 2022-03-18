import { query } from "express"
import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class TicketsService {
  async removeTicket(ticketId, userId) {
    const t = await dbContext.TowerEvents.findById(ticketId)
    if (t.creatorId.toString() !== userId) {
      throw new BadRequest("can't delete")
    }
    await t.remove()
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
    const ticket = await dbContext.Tickets.create(body)
    const event = await dbContext.TowerEvents.findById(body.eventId)
    event.capacity -= 1
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