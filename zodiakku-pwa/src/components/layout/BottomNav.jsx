// zodiakku-pwa/src/components/layout/BottomNav.jsx
import { NavLink } from "react-router-dom";
import { Home, Star, Sun, Heart, User } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/zodiak", label: "Zodiak", icon: Sun },
  { to: "/ramalan", label: "Ramalan", icon: Star },
  { to: "/favorit", label: "Favorit", icon: Heart },
  { to: "/profil", label: "Profil", icon: User },
];

export default function BottomNav() {
  return (
    <nav
      className="
        fixed bottom-3 left-1/2 -translate-x-1/2 z-50
        bg-[#1B2632]/96 backdrop-blur-xl
        border border-[#2C3B4D]
        shadow-[0_14px_38px_rgba(0,0,0,0.9)]
        rounded-2xl px-6 py-3
      "
    >
      <div className="flex gap-6 text-[#EEE9DF]">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `
                flex flex-col items-center text-[11px] font-medium
                transition-colors
                ${
                  isActive
                    ? "text-[#FFB162]"
                    : "text-[#EEE9DF]/80"
                }
              `
            }
          >
            <Icon className="w-5 h-5 mb-1" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
