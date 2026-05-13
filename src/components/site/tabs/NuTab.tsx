import { useState } from "react";
import { PillTabs } from "../PillTabs";
import { RentCard } from "../RentCard";
import { womenItems, type CatalogItem } from "@/lib/catalog";

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "cong-so", label: "💼 Công sở" },
  { id: "moi-ngay", label: "☀️ Mỗi ngày" },
  { id: "du-lich", label: "✈️ Du lịch" },
  { id: "du-tiec", label: "🥂 Dự tiệc" },
  { id: "cuoi-hoi", label: "💍 Cưới hỏi" },
];

export function NuTab() {
  const [cat, setCat] = useState("all");
  const items = cat === "all" ? womenItems : womenItems.filter((i: CatalogItem) => i.cat === cat);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 md:px-6">
      <div className="glass-strong p-6 md:p-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B1A33]">FASTWEAR · WOMEN</div>
            <h1 className="mt-1 font-serif text-4xl text-[#1C1410] md:text-5xl">Bộ sưu tập Nữ</h1>
            <p className="mt-2 text-[#1C1410]/65">Thuê outfit cho mọi dịp — công sở, dạo phố, dự tiệc, cưới hỏi.</p>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#1C1410]/60">{items.length} items</span>
        </div>

        <div className="mb-6 overflow-x-auto pb-1">
          <PillTabs layoutId="nu-cat" tabs={categories} active={cat} onChange={setCat} size="sm" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {items.map((it) => (
            <RentCard
              key={it.id}
              item={{ id: it.id, name: it.name, brand: it.brand, price: it.price, deposit: it.deposit, image: it.image, sizes: it.sizes }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
