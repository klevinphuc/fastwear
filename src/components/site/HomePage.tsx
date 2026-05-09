import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Plus, Star } from "lucide-react";
import { products, formatVND } from "@/lib/products";

const HERO_LEFT = "https://images.unsplash.com/photo-1485518882345-15568b007407?auto=format&fit=crop&w=900&q=80";
const HERO_RIGHT = "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80";
const HOW_PHOTO = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80";

const occasions = [
  { label: "Tiệc Cưới", emoji: "💍" },
  { label: "Du Lịch", emoji: "🧳" },
  { label: "Công Sở", emoji: "💻" },
  { label: "Tiệc / Sự Kiện", emoji: "🪩" },
  { label: "Hàng Ngày", emoji: "👗" },
];

const brands = ["PEDRO", "URBAN REVIVO", "LOCAL BRAND", "MISCHA", "YODY", "NEM", "REFORMATION", "SIMKHAI", "VERONICA BEARD"];

const collections = [
  { label: "Đầm Dự Tiệc", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80" },
  { label: "Suit Nam", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80" },
  { label: "Áo Dài", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80" },
  { label: "Phụ Kiện", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80" },
];

const reviews = [
  { name: "Mai Anh", quote: "Đầm về thơm, đẹp y ảnh. Tiệc cưới của bạn mình thành công rực rỡ!", rating: 5 },
  { name: "Thiên Phúc", quote: "Suit fit dáng cực chuẩn, deposit hoàn nhanh. Sẽ quay lại.", rating: 5 },
  { name: "Linh Đan", quote: "Áo dài Tết mặc đẹp lung linh, giá thuê rẻ hơn mua nhiều.", rating: 5 },
  { name: "Thảo My", quote: "AI Fitting Room siêu vui, gợi ý outfit cực chuẩn gu mình.", rating: 4 },
];

function Countdown() {
  return (
    <div className="flex gap-2">
      {["02", "14", "33"].map((v, i) => (
        <div key={i} className="rounded-xl bg-primary px-3 py-2 text-primary-foreground">
          <div className="font-serif text-xl">{v}</div>
          <div className="text-[10px] uppercase opacity-75">{["Giờ","Phút","Giây"][i]}</div>
        </div>
      ))}
    </div>
  );
}

function HowItWorks() {
  const [open, setOpen] = useState(0);
  const steps = [
    {
      title: "Chọn món đồ bạn thích",
      desc: "Lựa chọn 5 món từ hàng trăm thương hiệu yêu thích cho mọi dịp & mọi điểm đến.",
      tint: "glass-subtle",
    },
    {
      title: "Mặc đi đâu cũng được",
      desc: "Đi tiệc, đi làm, đi chơi, đi du lịch — outfit luôn sẵn sàng trong tủ của bạn.",
      tint: "glass-subtle",
    },
    {
      title: "Trả đồ và lặp lại!",
      desc: "Trả qua bưu điện hoặc mang đến cửa hàng. Chúng tôi giặt sạch — bạn chọn món mới.",
      tint: "glass-subtle",
    },
  ];

  return (
    <section className="mx-auto mt-24 grid max-w-7xl overflow-hidden rounded-3xl glass md:grid-cols-2">
      {/* LEFT photo */}
      <div className="relative min-h-[520px] overflow-hidden">
        <img src={HOW_PHOTO} alt="Cách thuê đồ FASTWear" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="font-serif text-4xl md:text-5xl">Cách thuê đồ hoạt động</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/account" className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-primary hover:bg-white/90">
              Đăng Ký Ngay
            </Link>
            <Link to="/about" className="rounded-full border border-white px-6 py-2.5 text-sm font-medium text-white hover:bg-white/10">
              Tìm Hiểu Thêm
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT accordion */}
      <div className="p-6 md:p-10">
        <div className="space-y-4">
          {steps.map((s, i) => {
            const active = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl transition-all ${active ? "glass-strong" : s.tint}`}
              >
                <button
                  onClick={() => setOpen(active ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-2xl text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-xl md:text-2xl">{s.title}</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-primary transition-transform ${active ? "rotate-180" : ""}`} />
                </button>
                {active && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                    {i === 0 && <ClotheslineSVG />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClotheslineSVG() {
  return (
    <svg viewBox="0 0 600 200" className="mt-6 w-full text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="20" y1="40" x2="580" y2="50" />
      {/* Skirt */}
      <g transform="translate(80,40)">
        <rect x="-3" y="0" width="6" height="6" />
        <path d="M-25 12 L-35 90 L35 90 L25 12 Z" />
        <path d="M-25 12 L25 12" />
      </g>
      {/* Blazer */}
      <g transform="translate(200,42)">
        <rect x="-3" y="0" width="6" height="6" />
        <path d="M-30 12 L-40 95 L-10 95 L-10 30 L10 30 L10 95 L40 95 L30 12 Z" />
        <path d="M-30 12 L30 12" />
      </g>
      {/* Pants */}
      <g transform="translate(320,44)">
        <rect x="-3" y="0" width="6" height="6" />
        <path d="M-22 12 L-26 100 L-4 100 L0 50 L4 100 L26 100 L22 12 Z" />
      </g>
      {/* Shirt */}
      <g transform="translate(450,46)">
        <rect x="-3" y="0" width="6" height="6" />
        <path d="M-25 12 L-38 30 L-30 38 L-25 32 L-25 80 L25 80 L25 32 L30 38 L38 30 L25 12 Z" />
      </g>
      {/* Dress */}
      <g transform="translate(540,48)">
        <rect x="-3" y="0" width="6" height="6" />
        <path d="M-18 12 L-15 30 L-32 95 L32 95 L15 30 L18 12 Z" />
      </g>
    </svg>
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
        <p className="mt-4 max-w-md text-muted-foreground">
          Một thành viên FASTWear có hơn 200 outfit luân chuyển mỗi năm, tiết kiệm 70% so với mua mới.
        </p>
        <Link to="/about" className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground hover:opacity-90">
          Tìm hiểu thêm
        </Link>
      </div>
      <div className="space-y-3">
        {items.map((it, i) => {
          const active = open === i;
          return (
            <div key={i} className="rounded-2xl glass">
              <button
                onClick={() => setOpen(active ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-serif text-lg"
              >
                {it.t}
                <ChevronDown className={`h-5 w-5 text-primary transition-transform ${active ? "rotate-180" : ""}`} />
              </button>
              {active && <p className="px-6 pb-5 text-sm text-muted-foreground">{it.d}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function HomePage() {
  const flashItems = products.slice(0, 3);
  return (
    <div className="pb-12">
      {/* HERO */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 pt-10 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <div className="overflow-hidden rounded-3xl">
          <img src={HERO_LEFT} alt="" className="h-[420px] w-full object-cover md:h-[560px]" />
        </div>
        <div className="px-4 text-center">
          <h1 className="font-serif text-5xl leading-tight text-primary md:text-6xl">
            Mọi outfit,<br />mọi dịp
          </h1>
          <p className="mx-auto mt-4 max-w-xs text-muted-foreground">
            Từ những dịp đặc biệt đến outfit hàng ngày, biến ngày của bạn thành một ngày FASTWear.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/categories" className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground hover:opacity-90">
              Thuê Hàng Ngày
            </Link>
            <Link to="/categories" className="rounded-full border border-primary px-6 py-3 text-sm text-primary hover:bg-primary/5">
              Thuê Cho Sự Kiện
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl">
          <img src={HERO_RIGHT} alt="" className="h-[420px] w-full object-cover md:h-[560px]" />
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="mx-auto mt-24 max-w-7xl px-6 text-center md:px-8">
        <h2 className="font-serif text-4xl md:text-5xl">Tôi muốn mặc đến…</h2>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-5">
          {occasions.map((o) => (
            <Link key={o.label} to="/categories" className="group flex flex-col items-center gap-3">
              <div className="flex h-24 w-24 items-center justify-center rounded-full glass text-3xl transition group-hover:bg-primary group-hover:text-primary-foreground">
                {o.emoji}
              </div>
              <span className="text-xs uppercase tracking-wider">{o.label}</span>
            </Link>
          ))}
        </div>
        <Link to="/categories" className="mt-10 inline-block rounded-full bg-primary px-8 py-3 text-sm text-primary-foreground">
          Khám phá tất cả phong cách
        </Link>
      </section>

      {/* BRAND TICKER */}
      <section className="relative mt-24 overflow-hidden glass-subtle py-6">
        <div className="flex animate-marquee-fast whitespace-nowrap font-serif text-2xl text-foreground/90">
          {Array.from({ length: 3 }).flatMap((_, k) =>
            brands.map((b, i) => (
              <span key={`${k}-${i}`} className="px-8">{b}</span>
            ))
          )}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="mx-auto mt-24 max-w-7xl px-6 md:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-4xl md:text-5xl">Bộ sưu tập nổi bật</h2>
          <Link to="/categories" className="hidden text-sm text-primary underline md:block">Xem tất cả</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {collections.map((c) => (
            <Link key={c.label} to="/categories" className="group overflow-hidden rounded-2xl glass">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={c.img} alt={c.label} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-4 text-center font-serif text-lg">{c.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FLASH DEAL */}
      <section className="mx-auto mt-24 max-w-7xl rounded-3xl glass-strong px-6 py-12 md:px-12" style={{ background: "linear-gradient(135deg, rgba(107,26,51,0.55), rgba(242,196,206,0.15))" }}>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.3em] opacity-80">Flash Deal</div>
            <h2 className="font-serif text-4xl md:text-5xl">Giảm tới 40% — chỉ hôm nay</h2>
          </div>
          <Countdown />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {flashItems.map((p) => (
            <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="overflow-hidden rounded-2xl glass text-foreground">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.designer}</div>
                <div className="font-serif text-lg">{p.name}</div>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <span className="text-foreground">{formatVND(p.price)}/ngày</span>
                  <span className="text-muted-foreground line-through">{formatVND(Math.round(p.price * 1.4))}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY */}
      <WhyAccordion />

      {/* HOW IT WORKS — redesigned */}
      <HowItWorks />

      {/* REVIEWS */}
      <section className="mx-auto mt-24 max-w-7xl px-6 md:px-8">
        <h2 className="font-serif text-4xl md:text-5xl">Khách yêu nói gì</h2>
        <div className="mt-8 flex gap-5 overflow-x-auto pb-4">
          {reviews.map((r, i) => (
            <div key={i} className="min-w-[300px] rounded-2xl glass p-6">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 font-serif text-lg leading-relaxed">"{r.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full glass-subtle font-serif">
                  {r.name[0]}
                </div>
                <div className="text-sm">{r.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REFERRAL */}
      <section className="mx-auto mt-24 max-w-7xl overflow-hidden rounded-3xl glass-strong px-8 py-14 text-center md:px-16">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs uppercase tracking-widest text-primary">
          <Plus className="h-3 w-3" /> FASTCoin Loyalty
        </div>
        <h2 className="mt-4 font-serif text-4xl md:text-5xl">Giới thiệu bạn bè — nhận 50K FASTCoin</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Mỗi người bạn đăng ký, cả hai cùng nhận FASTCoin để đổi voucher hoặc giảm trực tiếp đơn thuê.
        </p>
        <Link to="/account" className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm text-primary-foreground">
          Lấy mã giới thiệu
        </Link>
      </section>
    </div>
  );
}
