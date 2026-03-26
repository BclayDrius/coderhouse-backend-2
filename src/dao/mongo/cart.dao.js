import CartModel from "../../models/cart.model.js";

export default class CartDAO {
  async getById(id) {
    return CartModel.findById(id).populate("products.product");
  }

  async create() {
    return CartModel.create({ products: [] });
  }

  async update(id, products) {
    return CartModel.findByIdAndUpdate(id, { products }, { new: true });
  }

  async addProduct(cartId, productId, quantity = 1) {
    const cart = await CartModel.findById(cartId);
    const index = cart.products.findIndex(
      (p) => p.product.toString() === productId,
    );
    if (index >= 0) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    return cart.save();
  }

  async removeProduct(cartId, productId) {
    return CartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { product: productId } } },
      { new: true },
    );
  }

  async clearCart(cartId) {
    return CartModel.findByIdAndUpdate(cartId, { products: [] }, { new: true });
  }

  async delete(id) {
    return CartModel.findByIdAndDelete(id);
  }
}
