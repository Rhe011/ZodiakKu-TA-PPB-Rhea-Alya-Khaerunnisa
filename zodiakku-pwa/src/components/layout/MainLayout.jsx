// zodiakku-pwa/src/components/layout/MainLayout.jsx
import BottomNav from "./BottomNav";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen pb-24 md:pb-10 text-[#EEE9DF] relative overflow-hidden">

      {/* TWINKLE STAR LAYER */}
      <div className="twinkle-layer absolute inset-0 pointer-events-none"></div>

      {/* BIG GLOW STARS */}
      <div className="big-glow-stars absolute inset-0 pointer-events-none"></div>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-4 relative z-10">
        {children}
      </div>

      {/* BOTTOM NAV */}
      <BottomNav />
    </div>
  );
}
