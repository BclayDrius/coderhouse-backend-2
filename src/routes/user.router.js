import { Router } from "express";
import { userRepository } from "../services/index.js";
import { generarTokenReset, verificarTokenReset } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { enviarEmailRecuperacion } from "../utils/mailer.js";

const router = Router();

// POST /api/usuarios/recuperar-password
// Envía email con link de recuperación (expira en 1h)
router.post("/recuperar-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userRepository.getByEmailRaw(email);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const token = generarTokenReset({ email: user.email });
    await enviarEmailRecuperacion(user.email, token);

    res.json({
      mensaje: "Email de recuperación enviado. El enlace expira en 1 hora.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/usuarios/reset-password?token=...
// Restablece la contraseña (no puede ser igual a la anterior)
router.post("/reset-password", async (req, res) => {
  try {
    const { token } = req.query;
    const { nuevaPassword } = req.body;

    let payload;
    try {
      payload = verificarTokenReset(token);
    } catch {
      return res
        .status(400)
        .json({ error: "El enlace es inválido o ha expirado" });
    }

    const user = await userRepository.getByEmailRaw(payload.email);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const mismaPassword = await comparePassword(nuevaPassword, user.password);
    if (mismaPassword) {
      return res
        .status(400)
        .json({
          error: "La nueva contraseña no puede ser igual a la anterior",
        });
    }

    const hashedPass = await hashPassword(nuevaPassword);
    await userRepository.update(user._id, { password: hashedPass });

    res.json({ mensaje: "Contraseña actualizada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
