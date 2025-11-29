// zodiakku-pwa/src/hooks/useHoroscopes.js

import { useState, useEffect, useCallback } from "react";
import horoscopeService from "../services/horoscopeService";

export function useHoroscopes(date) {
  const [horoscopes, setHoroscopes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await horoscopeService.getTodayHoroscopes(date);
      if (res.success) setHoroscopes(res.data);
      else setError(res.message || "Gagal mengambil data ramalan");
    } catch (err) {
      setError(err.message);
      setHoroscopes([]);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { horoscopes, loading, error, refetch: fetchData };
}

export function useHoroscope(slug, date) {
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOne = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const res = await horoscopeService.getHoroscopeBySlug(slug, date);
      if (res.success) setHoroscope(res.data);
      else setError(res.message || "Gagal mengambil detail ramalan");
    } catch (err) {
      setError(err.message);
      setHoroscope(null);
    } finally {
      setLoading(false);
    }
  }, [slug, date]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return { horoscope, loading, error, refetch: fetchOne };
}
