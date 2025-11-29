// zodiakku-pwa/src/pages/FavoritPage.jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useHoroscopes } from "../hooks/useHoroscopes";

export default function FavoritPage() {
  const { favoriteSlugs } = useFavorites();
  const { horoscopes, loading, error } = useHoroscopes();

  if (loading) return <p className="mt-8 text-center">Memuat ramalan...</p>;
  if (error) return <p className="mt-8 text-center text-red-300">{error}</p>;

  const favoriteList = horoscopes.filter((h) =>
    favoriteSlugs.includes(h.zodiacs.slug)
  );

  return (
    <div className="pt-2 pb-24 space-y-4">
      <div className="card-soft rounded-3xl p-4">
        <h1 className="text-2xl font-semibold text-[#1B2632]">
          Ramalan Favorit
        </h1>
        <p className="text-xs text-[#2C3B4D]/80 mt-1">
          Kumpulkan ramalan dari zodiak yang paling sering kamu cek.
        </p>
      </div>

      {favoriteList.length === 0 ? (
        <p className="text-sm text-[#EEE9DF]/90 px-1">
          Belum ada ramalan favorit. Buka halaman detail ramalan lalu klik{" "}
          <span className="font-semibold text-[#FFB162]">
            Jadikan Favorit
          </span>
          .
        </p>
      ) : (
        <div className="space-y-3 px-1">
          {favoriteList.map((h) => (
            <Link
              key={h.id}
              to={`/ramalan/${h.zodiacs.slug}`}
              className="card-soft p-4 rounded-2xl block"
            >
              <p className="font-semibold text-sm text-[#1B2632]">
                {h.zodiacs.name}
              </p>
              <p className="text-[11px] text-[#2C3B4D]/80 line-clamp-1 mt-1">
                {h.mood || "Mood hari ini"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
