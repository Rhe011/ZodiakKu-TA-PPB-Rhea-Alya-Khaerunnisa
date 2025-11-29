// zodiakku-pwa/src/pages/HomePage.jsx
import { Link, useNavigate } from "react-router-dom";
import {
  Star,
  Sun,
  Heart,
  Moon,
  Sparkles,
  User,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dailyMsg =
    "Energi semesta hari ini membawa ketenangan dan ruang untuk introspeksi.";

  const snapshot = [
    { label: "Mood", value: "Stabil" },
    { label: "Energi", value: "Sedang" },
    { label: "Fokus", value: "Hubungan" },
    { label: "Keselarasan", value: "Tinggi" },
  ];

  const funFacts = [
    "Galaksi Andromeda akan bertabrakan dengan Bima Sakti.",
    "Bulan menjauh 3.8 cm setiap tahun.",
  ];

  const news = [
    { title: "Meteor Leonid memuncak malam ini.", source: "SkyWatch" },
    { title: "Exoplanet metalik ditemukan.", source: "Astro Journal" },
  ];

  const affirmation = "Aku berada dalam proses menuju versi terbaikku.";
  const compatibility = { match: "Libra", score: "92%" };

  const savedPhoto = localStorage.getItem("profile_photo");

  // ====== REAL-TIME MOON PHASE ======
  const [moon, setMoon] = useState({
    label: "Memuat fase bulan...",
    emoji: "🌙",
  });

  useEffect(() => {
    const mapPhase = (name) => {
      if (!name) return { emoji: "🌙", label: "Tidak tersedia" };
      const p = name.toLowerCase();
      if (p.includes("new")) return { emoji: "🌑", label: "Bulan Baru" };
      if (p.includes("crescent") && p.includes("wax"))
        return { emoji: "🌒", label: "Sabit Awal" };
      if (p.includes("first") || (p.includes("quarter") && p.includes("wax")))
        return { emoji: "🌓", label: "Kuartal Awal" };
      if (p.includes("gibbous") && p.includes("wax"))
        return { emoji: "🌔", label: "Hampir Purnama" };
      if (p.includes("full")) return { emoji: "🌕", label: "Bulan Purnama" };
      if (p.includes("gibbous") && p.includes("wan"))
        return { emoji: "🌖", label: "Setelah Purnama" };
      if (p.includes("third") || (p.includes("quarter") && p.includes("wan")))
        return { emoji: "🌗", label: "Kuartal Akhir" };
      if (p.includes("crescent") && p.includes("wan"))
        return { emoji: "🌘", label: "Sabit Akhir" };
      return { emoji: "🌙", label: name };
    };

    const fetchMoon = async () => {
      try {
        const ts = Math.floor(Date.now() / 1000);
        const res = await fetch(
          `https://api.farmsense.net/v1/moonphases/?d=${ts}`
        );
        const data = await res.json();
        const phaseName =
          Array.isArray(data) && data[0]
            ? data[0].Phase || data[0].phase || data[0].moonPhase
            : null;
        setMoon(mapPhase(phaseName));
      } catch (e) {
        setMoon({ emoji: "🌙", label: "Fase bulan tidak tersedia" });
      }
    };

    fetchMoon();
  }, []);

  // ====== STATE EXPAND CARD ======
  const [open, setOpen] = useState({});
  const toggle = (key) =>
    setOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

  const Card = ({ id, title, preview, children, icon, span }) => (
    <div className={`${span} card-soft p-4`}>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggle(id)}
      >
        <p className="font-semibold text-[#1B2632] flex items-center gap-2">
          {icon}
          {title}
        </p>

        {open[id] ? (
          <ChevronUp className="text-[#A35139]" size={18} />
        ) : (
          <ChevronDown className="text-[#A35139]" size={18} />
        )}
      </div>

      <p className="text-xs text-[#2C3B4D]/80 mt-1">{preview}</p>

      <div
        className={`transition-all overflow-hidden ${
          open[id] ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div className="pt-4 pb-20">
      {/* HEADER BAR (title kiri, avatar kanan) */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#FFB162]">
            ZODIAKKU
          </p>
          <p className="text-sm text-[#EEE9DF]/80">Teman ramalan harianmu</p>
        </div>

        <button
          onClick={() => navigate("/profil")}
          className="w-11 h-11 rounded-full overflow-hidden bg-[#1B2632]
                     border border-[#FFB162]/60 shadow-[0_4px_14px_rgba(0,0,0,0.45)]
                     flex items-center justify-center hover:scale-105 transition"
        >
          {savedPhoto ? (
            <img src={savedPhoto} className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 text-[#FFB162]" />
          )}
        </button>
      </div>

      {/* GRID KONTEN UTAMA */}
      <div className="grid grid-cols-12 gap-5">
        {/* HERO */}
        <div className="col-span-12 md:col-span-8 card-hero p-7 h-fit">
          <h1 className="text-3xl font-semibold leading-normal">
            Baca Ramalan Bintangmu
          </h1>
          <p className="text-sm text-[#EEE9DF]/80 mt-2">
            Insight harian, hubungan, kepribadian, dan energi astral.
          </p>
          <p className="text-xs text-[#EEE9DF]/60 mt-3">{today}</p>
        </div>

        {/* MOON PHASE MINI CARD */}
        <div className="col-span-12 md:col-span-4 card-soft p-5 flex flex-col justify-center">
          <p className="text-xs font-semibold text-[#2C3B4D]/70 flex items-center gap-2">
            <Moon className="text-[#A35139]" size={16} />
            Fase Bulan
          </p>
          <p className="text-2xl mt-2">
            {moon.emoji}{" "}
            <span className="text-base text-[#1B2632]">{moon.label}</span>
          </p>
        </div>

        {/* PESAN HARI INI */}
        <Card
          id="daily"
          title="Pesan Hari Ini"
          preview={dailyMsg.slice(0, 65) + "..."}
          icon={<Sparkles className="text-[#A35139]" size={16} />}
          span="col-span-12 md:col-span-7"
        >
          <p className="text-sm text-[#1B2632]">{dailyMsg}</p>
        </Card>

        {/* AFFIRMATION */}
        <Card
          id="aff"
          title="Affirmation"
          preview={affirmation}
          icon={<Heart className="text-[#A35139]" size={16} />}
          span="col-span-12 md:col-span-5"
        >
          <p className="text-sm text-[#1B2632]">{affirmation}</p>
        </Card>

        {/* SNAPSHOT */}
        <Card
          id="snap"
          title="Snapshot Astral"
          preview="Ringkasan energi dominan hari ini."
          icon={<Zap className="text-[#A35139]" size={16} />}
          span="col-span-12 md:col-span-6"
        >
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            {snapshot.map((s, i) => (
              <div key={i} className="rounded-md bg-[#C9C1B1]/40 p-3">
                <p className="text-[11px] uppercase text-[#2C3B4D]/70">
                  {s.label}
                </p>
                <p className="font-semibold text-[#1B2632] mt-1">{s.value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* COMPATIBILITY */}
        <Card
          id="comp"
          title="Kecocokan Hari Ini"
          preview={`${compatibility.match} (${compatibility.score})`}
          icon={<HeartHandshake className="text-[#A35139]" size={16} />}
          span="col-span-12 md:col-span-6"
        >
          <p className="text-sm text-[#1B2632]">
            Kamu punya kecocokan energi tinggi dengan{" "}
            <b>{compatibility.match}</b> hari ini.
          </p>
        </Card>

        {/* FUN FACT */}
        <Card
          id="facts"
          title="Fun Fact Astronomi"
          preview={funFacts[0]}
          icon={<Sparkles className="text-[#A35139]" size={16} />}
          span="col-span-12 md:col-span-6"
        >
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#1B2632] mt-1">
            {funFacts.map((fact, idx) => (
              <li key={idx}>{fact}</li>
            ))}
          </ul>
        </Card>

        {/* NEWS */}
        <Card
          id="news"
          title="Berita Astronomi"
          preview={news[0].title}
          icon={<Star className="text-[#A35139]" size={16} />}
          span="col-span-12 md:col-span-6"
        >
          <div className="space-y-2 mt-1 text-sm">
            {news.map((n, idx) => (
              <div key={idx} className="bg-[#C9C1B1]/40 rounded-md p-2">
                <p className="font-medium">{n.title}</p>
                <p className="text-xs text-[#2C3B4D]/70">Sumber: {n.source}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* QUICK ACTIONS ROW (BIAR NGGAK DI TENGAH TERUS) */}
        <div className="col-span-12 flex flex-col md:flex-row gap-4 mt-2">
          <Link
            to="/ramalan"
            className="flex-1 card-soft p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-md bg-[#2C3B4D] flex items-center justify-center">
              <Star className="w-5 h-5 text-[#FFB162]" />
            </div>
            <div>
              <p className="font-semibold text-sm text-[#1B2632]">
                Ramalan Hari Ini
              </p>
              <p className="text-xs text-[#2C3B4D]/80">
                Lihat detail ramalan untuk semua zodiak.
              </p>
            </div>
          </Link>

          <Link
            to="/zodiak"
            className="flex-1 card-soft p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-md bg-[#2C3B4D] flex items-center justify-center">
              <Sun className="w-5 h-5 text-[#FFB162]" />
            </div>
            <div>
              <p className="font-semibold text-sm text-[#1B2632]">
                Daftar Zodiak
              </p>
              <p className="text-xs text-[#2C3B4D]/80">
                Pelajari elemen, planet, dan karakter.
              </p>
            </div>
          </Link>

          <Link
            to="/favorit"
            className="flex-1 card-soft p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-md bg-[#2C3B4D] flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#FFB162]" />
            </div>
            <div>
              <p className="font-semibold text-sm text-[#1B2632]">
                Ramalan Favorit
              </p>
              <p className="text-xs text-[#2C3B4D]/80">
                Kumpulan ramalan yang kamu simpan.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
