import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Star, LayoutGrid, List, ShoppingCart, CreditCard } from "lucide-react";
import { products, formatVND } from "@/lib/products";
import { NuTab } from "./tabs/NuTab";
import { NamTab } from "./tabs/NamTab";
import { PhuKienTab } from "./tabs/PhuKienTab";
import { LookbookTab } from "./tabs/LookbookTab";
import { SaleTab } from "./tabs/SaleTab";
import { GivesBackSection } from "./GivesBackSection";

const HERO_LEFT = "https://images.unsplash.com/photo-1485518882345-15568b007407?auto=format&fit=crop&w=900&q=80";
const HERO_RIGHT = "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80";
const HOW_PHOTO = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80";

const occasions = [
  { label: "Tiệc Cưới", emoji: "💍" },
  { label: "Du Lịch", emoji: "🧳" },
  { label: "Công Sở", emoji: "💻" },
  { label: "Sự Kiện", emoji: "🪩" },
  { label: "Hàng Ngày", emoji: "👗" },
];

const brands = ["PEDRO", "URBAN REVIVO", "LOCAL BRAND", "MISCHA", "YODY", "NEM", "REFORMATION", "SIMKHAI", "VERONICA BEARD"];

const reviews = [
  { name: "Mai Anh", quote: "Đầm về thơm, đẹp y ảnh. Tiệc cưới của bạn mình thành công rực rỡ!", rating: 5 },
  { name: "Thiên Phúc", quote: "Suit fit dáng cực chuẩn, deposit hoàn nhanh. Sẽ quay lại.", rating: 5 },
  { name: "Linh Đan", quote: "Áo dài Tết mặc đẹp lung linh, giá thuê rẻ hơn mua nhiều.", rating: 5 },
  { name: "Thảo My", quote: "AI Fitting Room siêu vui, gợi ý outfit cực chuẩn gu mình.", rating: 4 },
];

function Countdown() {
  return (
    <div className="flex gap-2 font-mono">
      {["02", "14", "33"].map((v, i) => (
        <div key={i} className="glass-dark px-3 py-2 text-center" style={{ borderRadius: 14 }}>
          <div className="text-xl">{v}</div>
          <div className="text-[10px] uppercase opacity-75">{["Giờ","Phút","Giây"][i]}</div>
        </div>
      ))}
    </div>
  );
}

function ProductCard({ p }: { p: typeof products[number] }) {
  return (
    <Link to="/product/$id" params={{ id: p.id }} className="glass-mid glass-card-hover relative block overflow-hidden">
      <div className="aspect-[4/5] overflow-hidden">
        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-x-3 bottom-3">
        <div className="glass-dark flex items-center justify-between px-4 py-2.5">
          <div>
            <div className="font-serif text-sm leading-tight">{p.name}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">{p.designer}</div>
          </div>
          <div className="font-mono text-sm">{formatVND(p.price)}</div>
        </div>
      </div>
    </Link>
  );
}

function HowItWorks() {
  const [open, setOpen] = useState(0);
  const steps = [
    { title: "Chọn món đồ bạn thích", desc: "Lựa chọn 5 món từ hàng trăm thương hiệu yêu thích cho mọi dịp & mọi điểm đến." },
    { title: "Mặc đi đâu cũng được", desc: "Đi tiệc, đi làm, đi chơi, đi du lịch — outfit luôn sẵn sàng trong tủ của bạn." },
    { title: "Trả đồ và lặp lại!", desc: "Trả qua bưu điện hoặc mang đến cửa hàng. Chúng tôi giặt sạch — bạn chọn món mới." },
  ];

  return (
    <section className="mx-auto mt-24 grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-6">
      <div className="glass-mid relative min-h-[480px] overflow-hidden">
        <img src={HOW_PHOTO} alt="Cách thuê đồ FASTWear" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="font-serif text-4xl md:text-5xl">Cách thuê đồ hoạt động</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/account" className="rounded-full bg-[#6B1A33] px-6 py-2.5 text-sm text-white hover:bg-[#8B2442]">Đăng Ký Ngay</Link>
            <Link to="/about" className="glass-soft px-6 py-2.5 text-sm text-white">Tìm Hiểu Thêm</Link>
          </div>
        </div>
      </div>

      <div className="glass-strong p-6 md:p-8">
        <div className="space-y-3">
          {steps.map((s, i) => {
            const active = open === i;
            return (
              <div key={i} className={active ? "glass-mid" : "glass-soft"} style={{ borderRadius: 20 }}>
                <button
                  onClick={() => setOpen(active ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-[#6B1A33]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-xl md:text-2xl">{s.title}</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-[#6B1A33] transition-transform ${active ? "rotate-180" : ""}`} />
                </button>
                {active && (
                  <div className="px-6 pb-6 text-sm text-[#1C1410]/65">{s.desc}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyAccordion() {
  const [open, setOpen] = useState(0);
  const items = [
    { t: "Luôn có điều gì đó mới", d: "Hàng trăm thiết kế cập nhật mỗi tuần — không bao giờ mặc lại trên feed." },
    { t: "Linh hoạt thay đổi theo phong cách", d: "Đổi outfit theo tâm trạng, theo dịp, theo mùa — không ràng buộc." },
    { t: "Thời trang bốn mùa, không tốn tủ", d: "Tủ đồ vô tận trong tay bạn — và không một món nào ngủ quên." },
  ];
  return (
    <section className="mx-auto mt-24 grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:px-8">
      <div>
        <h2 className="font-serif text-4xl md:text-5xl">Tại sao thuê từ FASTWear?</h2>
        <p className="mt-4 max-w-md text-[#1C1410]/65">
          Một thành viên FASTWear có hơn 200 outfit luân chuyển mỗi năm, tiết kiệm 70% so với mua mới.
        </p>
        <Link to="/about" className="mt-6 inline-block rounded-full bg-[#6B1A33] px-6 py-2.5 text-sm text-white hover:bg-[#8B2442]">
          Tìm hiểu thêm
        </Link>
      </div>
      <div className="space-y-3">
        {items.map((it, i) => {
          const active = open === i;
          return (
            <div key={i} className={active ? "glass-strong" : "glass-mid"}>
              <button
                onClick={() => setOpen(active ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-serif text-lg"
              >
                {it.t}
                <ChevronDown className={`h-5 w-5 text-[#6B1A33] transition-transform ${active ? "rotate-180" : ""}`} />
              </button>
              {active && <p className="px-6 pb-5 text-sm text-[#1C1410]/65">{it.d}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function HomePage() {
  const flashItems = products.slice(0, 3);
  const featured = products.slice(0, 4);
  return (
    <div className="pb-12">
      {/* HERO */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 pt-10 md:grid-cols-[1fr_auto_1fr] md:px-6">
        <div className="glass-mid overflow-hidden">
          <img src={HERO_LEFT} alt="" className="h-[420px] w-full object-cover md:h-[560px]" />
        </div>
        <div className="px-4 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B1A33]">FASTWEAR · 2026</div>
          <h1 className="mt-3 font-serif text-6xl leading-[1] text-[#1C1410] md:text-7xl">
            Mọi outfit,<br />mọi dịp
          </h1>
          <p className="mx-auto mt-4 max-w-xs text-[#1C1410]/65">
            Từ những dịp đặc biệt đến outfit hàng ngày, biến ngày của bạn thành một ngày FASTWear.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/categories" className="rounded-full bg-[#6B1A33] px-6 py-3 text-sm text-white hover:bg-[#8B2442]">
              Thuê Hàng Ngày
            </Link>
            <Link to="/categories" className="glass-strong px-6 py-3 text-sm text-[#1C1410]" style={{ borderRadius: 9999 }}>
              Thuê Cho Sự Kiện
            </Link>
          </div>
        </div>
        <div className="glass-mid overflow-hidden">
          <img src={HERO_RIGHT} alt="" className="h-[420px] w-full object-cover md:h-[560px]" />
        </div>
      </section>

      {/* OCCASIONS — VirtualFit-style panel */}
      <section className="mx-auto mt-20 max-w-7xl px-4 md:px-6">
        <div className="glass-strong p-8 md:p-12">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-serif text-3xl md:text-4xl">Tôi muốn mặc đến…</h2>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#1C1410]/60">SELECT OCCASION</span>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {occasions.map((o, i) => (
              <Link key={o.label} to="/categories" className={`glass-mid glass-card-hover flex flex-col items-center gap-3 px-3 py-6 text-center ${i === 0 ? "ring-1 ring-[#6B1A33]/30" : ""}`}>
                <div className="text-3xl">{o.emoji}</div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#1C1410]/80">{o.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND TICKER */}
      <section className="mt-20 px-4 md:px-6">
        <div className="glass-soft mx-auto max-w-7xl overflow-hidden py-5" style={{ borderRadius: 9999 }}>
          <div className="flex animate-marquee-fast whitespace-nowrap font-serif text-2xl text-[#1C1410]/80">
            {Array.from({ length: 3 }).flatMap((_, k) =>
              brands.map((b, i) => <span key={`${k}-${i}`} className="px-8">{b}</span>)
            )}
          </div>
        </div>
      </section>

      {/* FEATURED — VirtualFit panel */}
      <section className="mx-auto mt-20 max-w-7xl px-4 md:px-6">
        <div className="glass-strong p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B1A33]">FASTWEAR · COLLECTION</div>
              <h2 className="mt-1 font-serif text-3xl md:text-4xl">Nổi bật tuần này</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="glass-soft flex items-center gap-1 px-1 py-1">
                <button className="rounded-full bg-white/90 p-1.5 text-[#1C1410] shadow-sm"><LayoutGrid className="h-3.5 w-3.5" /></button>
                <button className="rounded-full p-1.5 text-[#1C1410]/60"><List className="h-3.5 w-3.5" /></button>
              </div>
              <Link to="/cart" className="glass-soft flex items-center gap-1.5 px-3 py-2 text-xs text-[#1C1410]/80">
                <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
              </Link>
              <Link to="/checkout" className="glass-soft flex items-center gap-1.5 px-3 py-2 text-xs text-[#1C1410]/80">
                <CreditCard className="h-3.5 w-3.5" /> Checkout
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featured.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* FLASH DEAL */}
      <section className="mx-auto mt-20 max-w-7xl px-4 md:px-6">
        <div className="glass-strong p-8 md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#6B1A33]">Flash Deal</div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1C1410]">Giảm tới 40% — chỉ hôm nay</h2>
            </div>
            <Countdown />
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {flashItems.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* WHY */}
      <WhyAccordion />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* REVIEWS */}
      <section className="mx-auto mt-24 max-w-7xl px-4 md:px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-[#1C1410]">Khách yêu nói gì</h2>
        <div className="mt-8 flex gap-5 overflow-x-auto pb-4">
          {reviews.map((r, i) => (
            <div key={i} className="glass-mid glass-card-hover min-w-[300px] p-6">
              <div className="flex gap-1 text-[#6B1A33]">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 font-serif text-lg leading-relaxed text-[#1C1410]">"{r.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="glass-soft flex h-10 w-10 items-center justify-center font-serif text-[#6B1A33]">
                  {r.name[0]}
                </div>
                <div className="text-sm text-[#1C1410]">{r.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REFERRAL */}
      <section className="mx-auto mt-24 max-w-7xl px-4 md:px-6">
        <div className="glass-strong px-8 py-14 text-center md:px-16">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#6B1A33]/10 px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-[#6B1A33]">
            <Plus className="h-3 w-3" /> FASTCoin Loyalty
          </div>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[#1C1410]">Giới thiệu bạn bè — nhận 50K FASTCoin</h2>
          <p className="mx-auto mt-3 max-w-xl text-[#1C1410]/65">
            Mỗi người bạn đăng ký, cả hai cùng nhận FASTCoin để đổi voucher hoặc giảm trực tiếp đơn thuê.
          </p>
          <Link to="/account" className="mt-6 inline-block rounded-full bg-[#6B1A33] px-8 py-3 text-sm text-white hover:bg-[#8B2442]">
            Lấy mã giới thiệu
          </Link>
        </div>
      </section>
    </div>
  );
}
