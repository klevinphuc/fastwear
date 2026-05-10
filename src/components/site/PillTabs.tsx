import { motion } from "framer-motion";
import { useId } from "react";

export type PillTab = { id: string; label: string };

export function PillTabs({
  tabs,
  active,
  onChange,
  layoutId,
  size = "md",
}: {
  tabs: PillTab[];
  active: string;
  onChange: (id: string) => void;
  layoutId?: string;
  size?: "sm" | "md";
}) {
  const auto = useId();
  const lid = layoutId ?? `pill-${auto}`;
  const pad = size === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2 text-sm";
  return (
    <nav className="flex items-center gap-1 rounded-full border border-white/40 bg-white/20 p-1 backdrop-blur-md">
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative rounded-full font-medium transition-colors duration-200 ${pad}`}
            style={{ color: isActive ? "#1C1410" : "rgba(28,20,16,0.55)", zIndex: 1 }}
          >
            {isActive && (
              <motion.div
                layoutId={lid}
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
