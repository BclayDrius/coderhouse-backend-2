import TicketModel from "../../models/ticket.model.js";

export default class TicketDAO {
  async create(data) {
    return TicketModel.create(data);
  }

  async getByCode(code) {
    return TicketModel.findOne({ code });
  }

  async getByPurchaser(email) {
    return TicketModel.find({ purchaser: email });
  }
}
