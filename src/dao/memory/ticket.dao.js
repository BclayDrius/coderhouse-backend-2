import { v4 as uuidv4 } from "uuid";

export default class TicketDAOMemory {
  constructor() {
    this.tickets = [];
  }

  async create(data) {
    const ticket = {
      _id: uuidv4(),
      code: uuidv4(),
      purchase_datetime: new Date(),
      ...data,
    };
    this.tickets.push(ticket);
    return ticket;
  }

  async getByCode(code) {
    return this.tickets.find((t) => t.code === code) || null;
  }

  async getByPurchaser(email) {
    return this.tickets.filter((t) => t.purchaser === email);
  }
}
