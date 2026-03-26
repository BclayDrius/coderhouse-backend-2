import { v4 as uuidv4 } from "uuid";

export default class CartDAOMemory {
  constructor() {
    this.carts = [];
  }

  async getById(id) {
    return this.carts.find((c) => c._id === id) || null;
  }

  async create() {
    const cart = { _id: uuidv4(), products: [] };
    this.carts.push(cart);
    return cart;
  }

  async update(id, products) {
    const idx = this.carts.findIndex((c) => c._id === id);
    if (idx < 0) return null;
    this.carts[idx].products = products;
    return this.carts[idx];
  }

  async addProduct(cartId, productId, quantity = 1) {
    const cart = this.carts.find((c) => c._id === cartId);
    if (!cart) return null;
    const idx = cart.products.findIndex((p) => p.product === productId);
    if (idx >= 0) {
      cart.products[idx].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    return cart;
  }

  async removeProduct(cartId, productId) {
    const cart = this.carts.find((c) => c._id === cartId);
    if (!cart) return null;
    cart.products = cart.products.filter((p) => p.product !== productId);
    return cart;
  }

  async clearCart(cartId) {
    const cart = this.carts.find((c) => c._id === cartId);
    if (!cart) return null;
    cart.products = [];
    return cart;
  }

  async delete(id) {
    const idx = this.carts.findIndex((c) => c._id === id);
    if (idx < 0) return null;
    return this.carts.splice(idx, 1)[0];
  }
}
