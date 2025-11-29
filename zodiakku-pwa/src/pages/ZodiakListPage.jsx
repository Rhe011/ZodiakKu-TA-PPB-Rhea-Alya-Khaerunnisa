// zodiakku-pwa/src/pages/ZodiakListPage.jsx
import { Link } from "react-router-dom";
import { useZodiacs } from "../hooks/useZodiacs";

export default function ZodiakListPage() {
  const { zodiacs, loading, error } = useZodiacs();

  if (loading) return <p className="mt-8 text-center">Memuat zodiak...</p>;
  if (error) return <p className="mt-8 text-center text-red-300">{error}</p>;

  return (
    <div className="pt-2 pb-4 space-y-4">
      <div className="card-soft rounded-3xl p-4">
        <h1 className="text-2xl font-semibold text-[#1B2632]">Daftar Zodiak</h1>
        <p className="text-xs text-[#2C3B4D]/80 mt-1">
          Pilih salah satu zodiak untuk melihat kepribadian dan info lengkapnya.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {zodiacs.map((z) => (
          <Link
            key={z.id}
            to={`/zodiak/${z.slug}`}
            className="card-soft p-3 flex flex-col gap-1"
          >
            <p className="text-base font-semibold text-[#1B2632]">{z.name}</p>
            <p className="text-[11px] text-[#2C3B4D]/80">{z.date_range}</p>
            <p className="text-[11px] text-[#2C3B4D]/80 mt-1">
              Elemen: {z.element || "-"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
