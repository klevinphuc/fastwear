import { useState } from "react";
import { PillTabs } from "../PillTabs";
import { RentCard } from "../RentCard";
import { womenAccessories, menAccessories } from "@/lib/catalog";

const genderTabs = [
  { id: "nu", label: "👩 Nữ" },
  { id: "nam", label: "👨 Nam" },
];

const subCats = [
  { id: "all", label: "Tất cả" },
  { id: "tui", label: "👜 Túi" },
  { id: "trang-suc", label: "💎 Trang sức" },
  { id: "dong-ho", label: "⌚ Đồng hồ" },
  { id: "giay", label: "👠 Giày" },
  { id: "khac", label: "🧣 Khác" },
];

export function PhuKienTab() {
  const [g, setG] = useState("nu");
  const [sub, setSub] = useState("all");
  const source = g === "nu" ? womenAccessories : menAccessories;
  const items = sub === "all" ? source : source.filter((i) => i.cat === sub);
  const visibleSubs = g === "nu"
    ? subCats.filter((s) => s.id !== "dong-ho")
    : subCats.filter((s) => s.id !== "trang-suc");

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 md:px-6">
      <div className="glass-strong p-6 md:p-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B1A33]">FASTWEAR · ACCESSORIES</div>
            <h1 className="mt-1 font-serif text-4xl text-[#1C1410] md:text-5xl">Phụ kiện</h1>
            <p className="mt-2 text-[#1C1410]/65">Hoàn thiện outfit với túi, trang sức, giày, đồng hồ.</p>
          </div>
          <PillTabs layoutId="pk-gender" tabs={genderTabs} active={g} onChange={(id) => { setG(id); setSub("all"); }} size="sm" />
        </div>

        <div className="mb-6 overflow-x-auto pb-1">
          <PillTabs layoutId={`pk-sub-${g}`} tabs={visibleSubs} active={sub} onChange={setSub} size="sm" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((it) => (
            <RentCard
              key={it.id}
              item={{ id: it.id, name: it.name, brand: it.brand, price: it.price, deposit: it.deposit, image: it.image }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
