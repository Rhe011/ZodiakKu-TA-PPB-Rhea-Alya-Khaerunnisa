//  zodiakku-api/src/controllers/zodiacController.js

import { ZodiacModel } from "../models/zodiacModel.js";

export const ZodiacController = {
  async getAll(req, res) {
    try {
      const zodiacs = await ZodiacModel.getAll();
      res.json({ success: true, data: zodiacs });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Gagal mengambil data zodiak"
      });
    }
  },

  async getDetail(req, res) {
    const { slug } = req.params;
    try {
      const zodiac = await ZodiacModel.getBySlug(slug);
      res.json({ success: true, data: zodiac });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Zodiak tidak ditemukan"
      });
    }
  }
};
