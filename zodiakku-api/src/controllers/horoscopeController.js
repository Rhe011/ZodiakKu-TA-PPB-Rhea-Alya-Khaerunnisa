// zodiakku-api/src/controllers/horoscopeController.js

import { HoroscopeModel } from "../models/horoscopeModel.js";

export const HoroscopeController = {
  async getTodayList(req, res) {
    try {
      const list = await HoroscopeModel.getTodayAll();
      res.json({ success: true, data: list });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Gagal mengambil data ramalan"
      });
    }
  },

  async getByZodiac(req, res) {
    const { slug } = req.params;

    try {
      const data = await HoroscopeModel.getByZodiacSlug(slug);
      res.json({ success: true, data });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Ramalan tidak ditemukan"
      });
    }
  }
};
