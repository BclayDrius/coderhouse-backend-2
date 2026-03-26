import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import config from "./config.js";
import { userRepository } from "../services/index.js";
import { comparePassword } from "../utils/bcrypt.js";

const initializePassport = () => {
  // ── Estrategia local (login) ──────────────────────────────────────────────
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // Caso admin hardcodeado
          if (
            email === config.ADMIN_EMAIL &&
            password === config.ADMIN_PASSWORD
          ) {
            return done(null, {
              _id: "admin",
              email,
              role: "admin",
              first_name: "Admin",
              last_name: "",
            });
          }

          const user = await userRepository.getByEmailRaw(email);
          if (!user)
            return done(null, false, { message: "Usuario no encontrado" });

          const valido = await comparePassword(password, user.password);
          if (!valido)
            return done(null, false, { message: "Contraseña incorrecta" });

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  // ── Estrategia JWT (rutas protegidas) ─────────────────────────────────────
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          (req) => req?.cookies?.jwt || null,
          ExtractJwt.fromAuthHeaderAsBearerToken(),
        ]),
        secretOrKey: config.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          // Admin no está en DB
          if (payload.role === "admin") return done(null, payload);

          const user = await userRepository.getByEmailRaw(payload.email);
          if (!user) return done(null, false);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
};

export default initializePassport;
