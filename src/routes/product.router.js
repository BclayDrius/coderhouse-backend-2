import { Router } from "express";
import { productRepository } from "../services/index.js";
import { autenticar, autorizar } from "../middlewares/auth.middleware.js";

const router = Router();

// GET /api/productos  — público
router.get("/", async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;
    const resultado = await productRepository.getAll({
      limit,
      page,
      sort,
      query,
    });
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/productos/:pid  — público
router.get("/:pid", async (req, res) => {
  try {
    const producto = await productRepository.getById(req.params.pid);
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/productos  — solo admin
router.post("/", autenticar, autorizar("admin"), async (req, res) => {
  try {
    const producto = await productRepository.create(req.body);
    res.status(201).json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/productos/:pid  — solo admin
router.put("/:pid", autenticar, autorizar("admin"), async (req, res) => {
  try {
    const actualizado = await productRepository.update(
      req.params.pid,
      req.body,
    );
    if (!actualizado)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/productos/:pid  — solo admin
router.delete("/:pid", autenticar, autorizar("admin"), async (req, res) => {
  try {
    const eliminado = await productRepository.delete(req.params.pid);
    if (!eliminado)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
