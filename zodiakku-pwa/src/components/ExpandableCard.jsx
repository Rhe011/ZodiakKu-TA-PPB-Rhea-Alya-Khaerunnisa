import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ExpandableCard({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card-soft p-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <p className="font-semibold text-[#1B2632]">{title}</p>
        {open ? (
          <ChevronUp className="text-[#A35139]" size={18} />
        ) : (
          <ChevronDown className="text-[#A35139]" size={18} />
        )}
      </button>

      <div
        className={`transition-all overflow-hidden ${
          open ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
