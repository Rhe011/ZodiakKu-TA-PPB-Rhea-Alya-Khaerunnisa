// zodiakku-pwa/src/services/horoscopeService.js
import { apiClient } from "../config/api";

class HoroscopeService {
  async getTodayHoroscopes(date) {
    const params = date ? { date } : {};
    return apiClient.get("/api/v1/horoscopes", { params });
  }

  async getHoroscopeBySlug(slug, date) {
    const params = date ? { date } : {};
    return apiClient.get(`/api/v1/horoscopes/${slug}`, { params });
  }
}

export default new HoroscopeService();
