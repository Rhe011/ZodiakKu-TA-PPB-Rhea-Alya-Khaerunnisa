//  zodiakku-pwa/src/hooks/useFavorites.js
import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "zodiakku_fav_ramalan";

function getInitialFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favoriteSlugs, setFavoriteSlugs] = useState(getInitialFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteSlugs));
    } catch {
      // ignore
    }
  }, [favoriteSlugs]);

  const toggleFavorite = useCallback((slug) => {
    setFavoriteSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const isFavorite = useCallback(
    (slug) => favoriteSlugs.includes(slug),
    [favoriteSlugs]
  );

  return { favoriteSlugs, toggleFavorite, isFavorite };
}
