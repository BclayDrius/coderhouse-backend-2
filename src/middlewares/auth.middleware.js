import passport from "passport";

/**
 * Verifica que el request tenga un JWT válido.
 * Adjunta req.user con los datos del usuario autenticado.
 */
export const autenticar = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: "No autenticado" });
    req.user = user;
    next();
  })(req, res, next);
};

/**
 * Middleware de autorización por rol.
 * Uso: autorizar('admin') o autorizar('usuario', 'admin')
 */
export const autorizar =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "No autenticado" });
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Acceso denegado: rol insuficiente" });
    }
    next();
  };
