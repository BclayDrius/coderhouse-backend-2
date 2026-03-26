import { v4 as uuidv4 } from "uuid";

export default class ProductDAOMemory {
  constructor() {
    this.products = [];
  }

  async getAll({ limit = 10, page = 1 } = {}) {
    const start = (page - 1) * limit;
    const docs = this.products.slice(start, start + limit);
    return {
      docs,
      totalDocs: this.products.length,
      page,
      totalPages: Math.ceil(this.products.length / limit),
    };
  }

  async getById(id) {
    return this.products.find((p) => p._id === id) || null;
  }

  async create(data) {
    const product = { _id: uuidv4(), ...data };
    this.products.push(product);
    return product;
  }

  async update(id, data) {
    const idx = this.products.findIndex((p) => p._id === id);
    if (idx < 0) return null;
    this.products[idx] = { ...this.products[idx], ...data };
    return this.products[idx];
  }

  async delete(id) {
    const idx = this.products.findIndex((p) => p._id === id);
    if (idx < 0) return null;
    return this.products.splice(idx, 1)[0];
  }
}
