import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.GMAIL_USER,
    pass: config.GMAIL_PASS,
  },
});

export const enviarEmailRecuperacion = async (destinatario, token) => {
  const enlace = `${config.CLIENT_URL}/api/usuarios/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Ecommerce Coder" <${config.GMAIL_USER}>`,
    to: destinatario,
    subject: "Recuperación de contraseña",
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Hiciste una solicitud para restablecer tu contraseña.</p>
      <p>Este enlace expira en <strong>1 hora</strong>.</p>
      <a href="${enlace}" style="
        display:inline-block;
        padding:10px 20px;
        background:#4f46e5;
        color:#fff;
        border-radius:6px;
        text-decoration:none;
        font-weight:bold;
      ">Restablecer contraseña</a>
      <p>Si no solicitaste esto, ignorá este correo.</p>
    `,
  });
};
