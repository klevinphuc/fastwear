import { useEffect, useState } from "react";
import { PillTabs } from "../PillTabs";
import { RentCard } from "../RentCard";
import { womenItems, menItems, fmtVND } from "@/lib/catalog";

const tabs = [
  { id: "nu", label: "👩 Nữ" },
  { id: "nam", label: "👨 Nam" },
];

function Countdown() {
  const [t, setT] = useState({ h: 5, m: 42, s: 18 });
  useEffect(() => {
    const id = setInterval(() => {
      setT((p) => {
        let { h, m, s } = p;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const cell = (v: number, l: string) => (
    <div className="glass-dark px-4 py-3 text-center text-white" style={{ borderRadius: 16 }}>
      <div className="font-mono text-3xl">{String(v).padStart(2, "0")}</div>
      <div className="font-mono text-[10px] uppercase opacity-75">{l}</div>
    </div>
  );
  return <div className="flex gap-2">{cell(t.h, "Giờ")}{cell(t.m, "Phút")}{cell(t.s, "Giây")}</div>;
}

export function SaleTab() {
  const [g, setG] = useState("nu");
  const source = g === "nu" ? womenItems : menItems;
  const sale = source.slice(0, 8).map((it, i) => ({
    ...it,
    oldPrice: it.price,
    price: Math.round(it.price * (i % 2 === 0 ? 0.7 : 0.5) / 1000) * 1000,
    badge: i % 2 === 0 ? "-30%" : "-50%",
  }));
  const clearance = source.slice(8, 14).map((it) => ({
    ...it,
    oldPrice: it.price,
    price: Math.round(it.price * 0.3 / 1000) * 1000,
    badge: "-70%",
  }));

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 pt-10 md:px-6">
      {/* Flash Sale */}
      <div className="glass-strong p-6 md:p-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#6B1A33]">🔥 FLASH SALE</div>
            <h1 className="mt-2 font-serif text-4xl text-[#1C1410] md:text-6xl">Flash Sale kết thúc sau</h1>
            <p className="mt-2 font-mono text-xs uppercase text-[#1C1410]/60">Giảm tới 50% · Số lượng có hạn</p>
          </div>
          <Countdown />
        </div>
      </div>

      <div className="glass-strong p-6 md:p-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl text-[#1C1410] md:text-4xl">Sale {g === "nu" ? "Nữ" : "Nam"}</h2>
          <PillTabs layoutId="sale-gender" tabs={tabs} active={g} onChange={setG} size="sm" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {sale.map((it) => (
            <RentCard key={it.id} item={{ id: it.id, name: it.name, brand: it.brand, price: it.price, oldPrice: it.oldPrice, image: it.image, sizes: it.sizes, badge: it.badge }} />
          ))}
        </div>
      </div>

      {/* Clearance */}
      <div className="glass-dark p-6 md:p-10 text-white" style={{ borderRadius: 24 }}>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#F2C4CE]">CLEARANCE</div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Thanh lý kho — đến -70%</h2>
            <p className="mt-2 text-sm opacity-75">Số lượng có hạn · Đã giảm sâu không hoàn trả</p>
          </div>
          <span className="font-mono text-xs uppercase opacity-75">Còn lại: {clearance.length} mẫu</span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {clearance.map((it) => (
            <div key={it.id} className="relative">
              <RentCard item={{ id: it.id, name: it.name, brand: it.brand, price: it.price, oldPrice: it.oldPrice, image: it.image, sizes: it.sizes, badge: it.badge }} />
              <span className="absolute right-3 top-14 rounded-full bg-black/80 px-2 py-1 font-mono text-[10px] text-white">Còn 2 cái</span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center font-mono text-xs opacity-60">
          Tổng tiết kiệm hôm nay: <span className="text-white">{fmtVND(2_450_000)}</span>
        </div>
      </div>
    </div>
  );
}
