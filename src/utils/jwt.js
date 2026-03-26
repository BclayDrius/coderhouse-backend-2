import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generarToken = (payload) =>
  jwt.sign(payload, config.JWT_SECRET, { expiresIn: "1d" });

export const verificarToken = (token) => jwt.verify(token, config.JWT_SECRET);

export const generarTokenReset = (payload) =>
  jwt.sign(payload, config.JWT_RESET_SECRET, { expiresIn: "1h" });

export const verificarTokenReset = (token) =>
  jwt.verify(token, config.JWT_RESET_SECRET);
