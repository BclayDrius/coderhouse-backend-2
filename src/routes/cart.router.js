import { Router } from "express";
import { cartRepository } from "../services/index.js";
import { procesarCompra } from "../services/cart.service.js";
import { autenticar, autorizar } from "../middlewares/auth.middleware.js";

const router = Router();

// POST /api/carritos  — crear carrito
router.post("/", autenticar, async (req, res) => {
  try {
    const carrito = await cartRepository.create();
    res.status(201).json(carrito);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/carritos/:cid
router.get("/:cid", autenticar, async (req, res) => {
  try {
    const carrito = await cartRepository.getById(req.params.cid);
    if (!carrito)
      return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(carrito);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/carritos/:cid/productos/:pid  — solo usuario
router.post(
  "/:cid/productos/:pid",
  autenticar,
  autorizar("usuario"),
  async (req, res) => {
    try {
      const { quantity = 1 } = req.body;
      const carrito = await cartRepository.addProduct(
        req.params.cid,
        req.params.pid,
        Number(quantity),
      );
      res.json(carrito);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

// DELETE /api/carritos/:cid/productos/:pid  — solo usuario
router.delete(
  "/:cid/productos/:pid",
  autenticar,
  autorizar("usuario"),
  async (req, res) => {
    try {
      const carrito = await cartRepository.removeProduct(
        req.params.cid,
        req.params.pid,
      );
      res.json(carrito);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

// PUT /api/carritos/:cid  — reemplazar productos del carrito
router.put("/:cid", autenticar, autorizar("usuario"), async (req, res) => {
  try {
    const { products } = req.body;
    const carrito = await cartRepository.update(req.params.cid, products);
    res.json(carrito);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/carritos/:cid  — vaciar carrito
router.delete("/:cid", autenticar, autorizar("usuario"), async (req, res) => {
  try {
    await cartRepository.clearCart(req.params.cid);
    res.json({ mensaje: "Carrito vaciado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/carritos/:cid/compra  — procesar compra (solo usuario)
router.post(
  "/:cid/compra",
  autenticar,
  autorizar("usuario"),
  async (req, res) => {
    try {
      if (!req.user.email) {
        return res.status(400).json({ error: "Usuario sin email asociado" });
      }
      const { ticket, productosSinStock } = await procesarCompra(
        req.params.cid,
        req.user.email,
      );

      res.json({
        mensaje: ticket
          ? "Compra procesada correctamente"
          : "Ningún producto tenía stock disponible",
        ticket,
        productosSinStock,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

export default router;
