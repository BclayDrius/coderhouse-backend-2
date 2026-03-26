import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_RESET_SECRET: process.env.JWT_RESET_SECRET,
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PASS: process.env.GMAIL_PASS,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:8080",
  PERSISTENCE: process.env.PERSISTENCE || "MONGO", // MONGO | MEMORY
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "adminCoder@coder.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "adminCod3r123",
};
