import config from "../config/config.js";

let UserDAO, ProductDAO, CartDAO, TicketDAO;

const { PERSISTENCE } = config;

if (PERSISTENCE === "MONGO") {
  const { default: UserDAOMongo } = await import("./mongo/user.dao.js");
  const { default: ProductDAOMongo } = await import("./mongo/product.dao.js");
  const { default: CartDAOMongo } = await import("./mongo/cart.dao.js");
  const { default: TicketDAOMongo } = await import("./mongo/ticket.dao.js");

  UserDAO = UserDAOMongo;
  ProductDAO = ProductDAOMongo;
  CartDAO = CartDAOMongo;
  TicketDAO = TicketDAOMongo;
} else {
  // Implementación en memoria (para testing / desarrollo sin DB)
  const { default: UserDAOMem } = await import("./memory/user.dao.js");
  const { default: ProductDAOMem } = await import("./memory/product.dao.js");
  const { default: CartDAOMem } = await import("./memory/cart.dao.js");
  const { default: TicketDAOMem } = await import("./memory/ticket.dao.js");

  UserDAO = UserDAOMem;
  ProductDAO = ProductDAOMem;
  CartDAO = CartDAOMem;
  TicketDAO = TicketDAOMem;
}

export { UserDAO, ProductDAO, CartDAO, TicketDAO };
