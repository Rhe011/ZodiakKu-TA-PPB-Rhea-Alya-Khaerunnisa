// zodiak-api/src/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import zodiacRoutes from "./routes/zodiacRoutes.js";
import horoscopeRoutes from "./routes/horoscopeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Extra fix untuk preflight
app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "ZodiakKu API is running" });
});

app.use("/api/v1/zodiacs", zodiacRoutes);
app.use("/api/v1/horoscopes", horoscopeRoutes);

// fallback 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
