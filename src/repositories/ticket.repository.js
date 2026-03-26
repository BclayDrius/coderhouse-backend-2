export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async create(data) {
    return this.dao.create(data);
  }
  async getByCode(code) {
    return this.dao.getByCode(code);
  }
  async getByPurchaser(email) {
    return this.dao.getByPurchaser(email);
  }
}
