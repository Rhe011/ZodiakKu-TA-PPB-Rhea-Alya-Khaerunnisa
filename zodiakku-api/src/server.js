// zodiak-api/src/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import zodiacRoutes from "./routes/zodiacRoutes.js";
import horoscopeRoutes from "./routes/horoscopeRoutes.js";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight fix
app.options("*", cors());

app.use(express.json());

// Root test
app.get("/", (req, res) => {
  res.json({ message: "ZodiakKu API is running" });
});

// Routes
app.use("/api/v1/zodiacs", zodiacRoutes);
app.use("/api/v1/horoscopes", horoscopeRoutes);

// Fallback 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// ❗ WAJIB untuk Vercel – JANGAN pakai app.listen()
export default app;
