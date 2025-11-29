// zodiakku-pwa/src/services/zodiacService.js
import { apiClient } from "../config/api";

class ZodiacService {
  async getZodiacs() {
    return apiClient.get("/api/v1/zodiacs");
  }

  async getZodiacBySlug(slug) {
    return apiClient.get(`/api/v1/zodiacs/${slug}`);
  }
}

export default new ZodiacService();
