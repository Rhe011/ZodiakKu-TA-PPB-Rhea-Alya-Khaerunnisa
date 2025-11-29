// zodiakku-pwa/src/pages/ZodiakDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { useZodiac } from "../hooks/useZodiac";
import { useFavorites } from "../hooks/useFavorites";
import { Heart } from "lucide-react";

export default function ZodiakDetailPage() {
  const { slug } = useParams();
  const { zodiac, loading, error } = useZodiac(slug);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) return <p className="mt-8 text-center">Memuat detail...</p>;
  if (error) return <p className="mt-8 text-center text-red-300">{error}</p>;
  if (!zodiac) return <p className="mt-8 text-center">Zodiak tidak ditemukan.</p>;

  const favorite = isFavorite(zodiac.slug);

  return (
    <div className="pt-2 pb-4 space-y-4">
      <div className="flex items-center justify-between mb-1 text-xs">
        <Link to="/zodiak" className="underline text-[#EEE9DF]/80">
          &larr; Kembali
        </Link>
        <button
          onClick={() => toggleFavorite(zodiac.slug)}
          className="flex items-center gap-1 text-[#EEE9DF]/90"
        >
          <Heart
            className={`w-4 h-4 ${
              favorite
                ? "fill-[#FFB162] text-[#FFB162]"
                : "text-[#EEE9DF]"
            }`}
          />
          <span>{favorite ? "Favorit" : "Jadikan Favorit"}</span>
        </button>
      </div>

      <div className="card-soft rounded-3xl p-5 space-y-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2632]">{zodiac.name}</h1>
          <p className="text-xs text-[#2C3B4D]/80 mt-1">{zodiac.date_range}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px] mt-1">
          <span className="chip-pill bg-[#2C3B4D] text-[#EEE9DF]">
            Elemen: {zodiac.element || "-"}
          </span>
          <span className="chip-pill bg-[#2C3B4D] text-[#EEE9DF]">
            Planet: {zodiac.planet || "-"}
          </span>
        </div>

        <div className="mt-3 text-sm leading-relaxed text-[#2C3B4D]">
          {zodiac.description || "Belum ada deskripsi untuk zodiak ini."}
        </div>
      </div>
    </div>
  );
}
