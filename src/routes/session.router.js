import { Router } from "express";
import passport from "passport";
import { userRepository } from "../services/index.js";
import { generarToken } from "../utils/jwt.js";
import { hashPassword } from "../utils/bcrypt.js";
import { cartRepository } from "../services/index.js";
import { autenticar } from "../middlewares/auth.middleware.js";
import UserDTO from "../dto/user.dto.js";

const router = Router();

// POST /api/sesiones/registro
router.post("/registro", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const existe = await userRepository.getByEmailRaw(email);
    if (existe)
      return res.status(400).json({ error: "El email ya está registrado" });

    const carrito = await cartRepository.create();
    const hashedPass = await hashPassword(password);

    await userRepository.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPass,
      cart: carrito._id,
      role: "usuario",
    });

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/sesiones/login
router.post("/login", (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .json({ error: info?.message || "Credenciales inválidas" });

    const token = generarToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
    res
      .cookie("jwt", token, { httpOnly: true })
      .json({ mensaje: "Login exitoso", token });
  })(req, res, next);
});

// POST /api/sesiones/logout
router.post("/logout", (req, res) => {
  res.clearCookie("jwt").json({ mensaje: "Sesión cerrada" });
});

// GET /api/sesiones/current  — solo info no sensible via DTO
router.get("/current", autenticar, (req, res) => {
  const dto = new UserDTO(req.user);
  res.json({ usuario: dto });
});

export default router;
