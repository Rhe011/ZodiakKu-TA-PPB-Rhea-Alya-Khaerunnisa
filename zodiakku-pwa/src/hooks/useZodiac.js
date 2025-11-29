//  zodiakku-pwa/src/hooks/useZodiac.js
import { useState, useEffect, useCallback } from "react";
import zodiacService from "../services/zodiacService";

export function useZodiac(slug) {
  const [zodiac, setZodiac] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchZodiac = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const res = await zodiacService.getZodiacBySlug(slug);
      if (res.success) setZodiac(res.data);
      else setError(res.message || "Gagal mengambil detail zodiak");
    } catch (err) {
      setError(err.message);
      setZodiac(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchZodiac();
  }, [fetchZodiac]);

  return { zodiac, loading, error, refetch: fetchZodiac };
}
