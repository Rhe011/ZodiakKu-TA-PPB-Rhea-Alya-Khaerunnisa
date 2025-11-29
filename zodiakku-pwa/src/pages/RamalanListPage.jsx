// zodiakku-pwa/src/pages/RamalanListPage.jsx
import { Link } from "react-router-dom";
import { useHoroscopes } from "../hooks/useHoroscopes";

export default function RamalanListPage() {
  const { horoscopes, loading, error } = useHoroscopes();

  if (loading) return <p className="mt-8 text-center">Memuat ramalan...</p>;
  if (error) return <p className="mt-8 text-center text-red-300">{error}</p>;

  return (
    <div className="pt-2 pb-4 space-y-4">
      <div className="card-soft rounded-3xl p-4">
        <h1 className="text-2xl font-semibold text-[#1B2632]">Ramalan Harian</h1>
        <p className="text-xs text-[#2C3B4D]/80 mt-1">
          Berdasarkan tanggal hari ini. Pilih zodiak untuk detail lengkap.
        </p>
      </div>

      <div className="space-y-2">
        {horoscopes.map((h) => (
          <Link
            key={h.id}
            to={`/ramalan/${h.zodiacs.slug}`}
            className="card-soft p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-sm text-[#1B2632]">
                {h.zodiacs.name}
              </p>
              <p className="text-[11px] text-[#2C3B4D]/80 line-clamp-1">
                {h.mood || "Mood hari ini"}
              </p>
            </div>
            <span className="text-[11px] text-[#A35139] underline">
              Detail &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
