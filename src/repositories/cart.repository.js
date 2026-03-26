export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getById(id) {
    return this.dao.getById(id);
  }
  async create() {
    return this.dao.create();
  }
  async update(id, products) {
    return this.dao.update(id, products);
  }
  async addProduct(cartId, productId, quantity) {
    return this.dao.addProduct(cartId, productId, quantity);
  }
  async removeProduct(cartId, productId) {
    return this.dao.removeProduct(cartId, productId);
  }
  async clearCart(cartId) {
    return this.dao.clearCart(cartId);
  }
  async delete(id) {
    return this.dao.delete(id);
  }
}
