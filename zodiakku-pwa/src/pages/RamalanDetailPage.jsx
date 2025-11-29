// zodiakku-pwa/src/pages/RamalanDetailPage.jsx
import { Link, useParams } from "react-router-dom";
import { useHoroscope } from "../hooks/useHoroscopes";

export default function RamalanDetailPage() {
  const { slug } = useParams();
  const { horoscope, loading, error } = useHoroscope(slug);

  if (loading) return <p className="mt-8 text-center">Memuat detail ramalan...</p>;
  if (error) return <p className="mt-8 text-center text-red-300">{error}</p>;
  if (!horoscope)
    return <p className="mt-8 text-center">Ramalan tidak ditemukan.</p>;

  const z = horoscope.zodiacs;

  return (
    <div className="pt-2 pb-4 space-y-4">
      <div className="flex items-center justify-between mb-1 text-xs text-[#EEE9DF]/80">
        <Link to="/ramalan" className="underline">
          &larr; Kembali
        </Link>
        <p>
          {new Date(horoscope.date).toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="card-soft rounded-3xl p-5 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2632]">
            Ramalan {z.name}
          </h1>
          <p className="text-xs text-[#2C3B4D]/80 mt-1">{z.date_range}</p>
        </div>

        <div className="grid gap-3 text-sm text-[#2C3B4D]">
          <div className="rounded-2xl bg-[#C9C1B1]/40 p-3">
            <p className="font-semibold mb-1">Cinta</p>
            <p>{horoscope.love || "Belum ada ramalan cinta."}</p>
          </div>
          <div className="rounded-2xl bg-[#C9C1B1]/40 p-3">
            <p className="font-semibold mb-1">Karier</p>
            <p>{horoscope.career || "Belum ada ramalan karier."}</p>
          </div>
          <div className="rounded-2xl bg-[#C9C1B1]/40 p-3">
            <p className="font-semibold mb-1">Keuangan</p>
            <p>{horoscope.finance || "Belum ada ramalan keuangan."}</p>
          </div>
          <div className="rounded-2xl bg-[#C9C1B1]/40 p-3 flex justify-between items-center">
            <div>
              <p className="font-semibold">Mood</p>
              <p>{horoscope.mood || "-"}</p>
            </div>
            <div className="text-right text-[11px] text-[#2C3B4D]/90">
              <p>Angka hoki: {horoscope.lucky_number || "-"}</p>
              <p>Warna hoki: {horoscope.lucky_color || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
