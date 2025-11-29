// zodiakku-pwa/src/hooks/useZodiacs.js
import { useState, useEffect, useCallback } from "react";
import zodiacService from "../services/zodiacService";

export function useZodiacs() {
  const [zodiacs, setZodiacs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchZodiacs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await zodiacService.getZodiacs();
      if (res.success) setZodiacs(res.data);
      else setError(res.message || "Gagal mengambil data zodiak");
    } catch (err) {
      setError(err.message);
      setZodiacs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchZodiacs();
  }, [fetchZodiacs]);

  return { zodiacs, loading, error, refetch: fetchZodiacs };
}
