import {
  cartRepository,
  productRepository,
  ticketRepository,
} from "./index.js";

/**
 * Lógica de compra:
 * - Verifica stock de cada producto
 * - Descuenta stock de los que tienen suficiente
 * - Genera un ticket con los productos procesados
 * - Retorna los productos sin stock para informar al usuario
 */
export const procesarCompra = async (cartId, purchaserEmail) => {
  const carrito = await cartRepository.getById(cartId);
  if (!carrito) throw new Error("Carrito no encontrado");

  const productosConStock = [];
  const productosSinStock = [];

  for (const item of carrito.products) {
    const producto = await productRepository.getById(
      item.product._id || item.product,
    );

    if (!producto) {
      productosSinStock.push(item);
      continue;
    }

    if (producto.stock >= item.quantity) {
      // Hay stock suficiente
      await productRepository.update(producto._id, {
        stock: producto.stock - item.quantity,
      });
      productosConStock.push({
        product: producto._id,
        quantity: item.quantity,
        price: producto.price,
      });
    } else {
      productosSinStock.push(item);
    }
  }

  let ticket = null;

  if (productosConStock.length > 0) {
    const monto = productosConStock.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0,
    );

    ticket = await ticketRepository.create({
      amount: monto,
      purchaser: purchaserEmail,
      products: productosConStock,
    });
  }

  // Dejar en el carrito solo los productos sin stock
  await cartRepository.update(cartId, productosSinStock);

  return { ticket, productosSinStock };
};
