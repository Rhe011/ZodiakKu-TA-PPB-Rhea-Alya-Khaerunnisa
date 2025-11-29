// zodiakku-pwa/src/pages/ProfilePage.jsx
import { useState } from "react";

const ZODIACS = [
  { name: "Aries", from: "03-21", to: "04-19" },
  { name: "Taurus", from: "04-20", to: "05-20" },
  { name: "Gemini", from: "05-21", to: "06-20" },
  { name: "Cancer", from: "06-21", to: "07-22" },
  { name: "Leo", from: "07-23", to: "08-22" },
  { name: "Virgo", from: "08-23", to: "09-22" },
  { name: "Libra", from: "09-23", to: "10-22" },
  { name: "Scorpio", from: "10-23", to: "11-21" },
  { name: "Sagittarius", from: "11-22", to: "12-21" },
  { name: "Capricorn", from: "12-22", to: "01-19" },
  { name: "Aquarius", from: "01-20", to: "02-18" },
  { name: "Pisces", from: "02-19", to: "03-20" },
];

function getZodiac(dateStr) {
  if (!dateStr) return "";
  const [, month, day] = dateStr.split("-");
  const md = `${month}-${day}`;
  for (const z of ZODIACS) {
    if (z.from <= md && md <= z.to) return z.name;
    if (z.name === "Capricorn" && (md >= "12-22" || md <= "01-19"))
      return "Capricorn";
  }
  return "";
}

export default function ProfilePage() {
  const savedPhoto = localStorage.getItem("profile_photo") || "";
  const savedName = localStorage.getItem("profile_name") || "";
  const savedBio = localStorage.getItem("profile_bio") || "";
  const savedBirth = localStorage.getItem("profile_birth") || "";
  const savedZodiac =
    localStorage.getItem("profile_zodiac") || getZodiac(savedBirth);

  const [photo, setPhoto] = useState(savedPhoto);
  const [name, setName] = useState(savedName);
  const [bio, setBio] = useState(savedBio);
  const [birth, setBirth] = useState(savedBirth);
  const [zodiac, setZodiac] = useState(savedZodiac);
  const [isEditing, setIsEditing] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleBirthChange = (e) => {
    const newDate = e.target.value;
    setBirth(newDate);
    const autoZ = getZodiac(newDate);
    setZodiac(autoZ);
  };

  const saveProfile = () => {
    localStorage.setItem("profile_photo", photo);
    localStorage.setItem("profile_name", name);
    localStorage.setItem("profile_bio", bio);
    localStorage.setItem("profile_birth", birth);
    localStorage.setItem("profile_zodiac", zodiac);
    setIsEditing(false);
  };

  return (
    <div className="pt-4 pb-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold text-center">Profil Kamu</h1>

      {/* AVATAR */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#FFB162]/35 blur-xl" />
          <img
            src={photo || "/default-avatar.png"}
            className="relative w-32 h-32 rounded-full border border-[#EEE9DF]/60 object-cover shadow-2xl"
          />
        </div>

        {isEditing && (
          <label className="btn-secondary px-4 py-2 !shadow-md cursor-pointer">
            Ganti Foto
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* VIEW MODE */}
      {!isEditing && (
        <div className="card-soft rounded-3xl p-6 space-y-4">
          <div>
            <p className="text-xs text-[#2C3B4D]/80">Nama</p>
            <p className="font-semibold text-lg text-[#1B2632]">
              {name || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#2C3B4D]/80">Deskripsi</p>
            <p className="text-sm leading-relaxed text-[#2C3B4D]">
              {bio || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#2C3B4D]/80">Tanggal Lahir</p>
            <p className="font-semibold text-sm text-[#1B2632]">
              {birth || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#2C3B4D]/80">Zodiak</p>
            <p className="font-semibold text-sm text-[#A35139]">
              {zodiac || "-"}
            </p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary w-full mt-2"
          >
            Edit Profil
          </button>
        </div>
      )}

      {/* EDIT MODE */}
      {isEditing && (
        <div className="card-soft rounded-3xl p-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-[#1B2632]">
              Nama
            </label>
            <input
              className="w-full bg-[#EEE9DF] rounded-lg p-2 mt-1 text-sm text-[#1B2632]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama..."
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#1B2632]">
              Deskripsi
            </label>
            <textarea
              className="w-full bg-[#EEE9DF] rounded-lg p-2 mt-1 text-sm text-[#1B2632]"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tentang kamu..."
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#1B2632]">
              Tanggal Lahir
            </label>
            <input
              type="date"
              className="w-full bg-[#EEE9DF] rounded-lg p-2 mt-1 text-sm text-[#1B2632]"
              value={birth}
              onChange={handleBirthChange}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#1B2632]">
              Zodiak
            </label>
            <select
              className="w-full bg-[#EEE9DF] rounded-lg p-2 mt-1 text-sm text-[#1B2632]"
              value={zodiac}
              onChange={(e) => setZodiac(e.target.value)}
            >
              <option value="">Pilih zodiak</option>
              {ZODIACS.map((z) => (
                <option key={z.name} value={z.name}>
                  {z.name}
                </option>
              ))}
            </select>
          </div>

          <button onClick={saveProfile} className="btn-primary w-full mt-2">
            Simpan Profil
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="btn-secondary w-full mt-2"
          >
            Batal
          </button>
        </div>
      )}
    </div>
  );
}
