export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getAll(options) {
    return this.dao.getAll(options);
  }

  async getById(id) {
    return this.dao.getById(id);
  }

  async create(data) {
    return this.dao.create(data);
  }

  async update(id, data) {
    return this.dao.update(id, data);
  }

  async delete(id) {
    return this.dao.delete(id);
  }
}
