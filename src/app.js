import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";

import config from "./config/config.js";
import connectDB from "./config/dbConnection.js";
import initializePassport from "./config/passport.config.js";

import sessionRouter from "./routes/session.router.js";
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();

// ── Middlewares globales ──────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Passport ──────────────────────────────────────────────────────────────────
initializePassport();
app.use(passport.initialize());

// ── Rutas ─────────────────────────────────────────────────────────────────────
app.use("/api/sesiones", sessionRouter);
app.use("/api/usuarios", userRouter);
app.use("/api/productos", productRouter);
app.use("/api/carritos", cartRouter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) =>
  res.json({ estado: "Servidor funcionando correctamente" }),
);

// ── Manejo de errores ─────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// ── Inicio ────────────────────────────────────────────────────────────────────
if (config.PERSISTENCE === "MONGO") {
  await connectDB();
}

app.listen(config.PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${config.PORT}`);
  console.log(`📦 Persistencia: ${config.PERSISTENCE}`);
});

export default app;
