import ProductModel from "../../models/product.model.js";

export default class ProductDAO {
  async getAll({ limit = 10, page = 1, sort, query } = {}) {
    const filter = query ? { category: query } : {};
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
      lean: true,
    };
    return ProductModel.paginate(filter, options);
  }

  async getById(id) {
    return ProductModel.findById(id);
  }

  async create(data) {
    return ProductModel.create(data);
  }

  async update(id, data) {
    return ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return ProductModel.findByIdAndDelete(id);
  }
}
