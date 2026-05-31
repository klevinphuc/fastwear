import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { products, formatVND } from "@/lib/products";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Danh mục — FASTWear" },
      {
        name: "description",
        content:
          "Tìm trang phục phù hợp cho tiệc cưới, sự kiện, prom, công sở, du lịch và những dịp quan trọng tại FASTWear.",
      },
    ],
  }),
  component: CategoriesPage,
});

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
const colors = ["#1A1A1A", "#6B1A33", "#F2C4CE", "#c9a27a", "#ffffff", "#3a2a1a", "#cfe3e2"];
const occasions = ["Cưới", "Prom", "Sinh nhật", "Event", "Chụp ảnh", "Công Sở", "Du Lịch"];
const sortOptions = ["Phổ biến nhất", "Giá tăng dần", "Mới nhất", "Đánh giá cao nhất"];

function CategoriesPage() {
  const [gender, setGender] = useState<string>("Tất cả");
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [priceMax, setPriceMax] = useState(600000);
  const [sort, setSort] = useState(sortOptions[0]);

  const filtered = products
    .filter((p) => (gender === "Tất cả" ? true : p.gender === gender))
    .filter((p) => p.price <= priceMax)
    .filter((p) => (activeSize ? p.sizes.includes(activeSize) : true))
    .sort((a, b) => {
      if (sort === "Giá tăng dần") return a.price - b.price;
      if (sort === "Đánh giá cao nhất") return b.rating - a.rating;
      return 0;
    });

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="text-xs text-muted-foreground">
          <Link to="/">Trang chủ</Link> / <span>Danh mục</span>
        </div>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">Tìm trang phục cho sự kiện của bạn</h1>

        <div className="mt-8 grid gap-8 md:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-6 text-sm">
            <FilterBlock title="Giới tính">
              {["Tất cả", "Nữ", "Nam", "Unisex"].map((g) => (
                <label key={g} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === g}
                    onChange={() => setGender(g)}
                  />
                  {g}
                </label>
              ))}
            </FilterBlock>
            <FilterBlock title="Danh mục">
              {[
                "Đầm Dự Tiệc",
                "Công sở",
                "Đi biển",
                "Áo Dài",
                "Suit Nam",
                "Áo",
                "Quần",
                "Giày",
                "Phụ kiện",
              ].map((c) => (
                <label key={c} className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" />
                  {c}
                </label>
              ))}
            </FilterBlock>
            <FilterBlock title={`Giá thuê: tối đa ${formatVND(priceMax)}`}>
              <input
                type="range"
                min={100000}
                max={600000}
                step={20000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[color:var(--primary)]"
              />
            </FilterBlock>
            <FilterBlock title="Size">
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveSize(activeSize === s ? null : s)}
                    className={`h-9 w-10 rounded-full border text-xs ${activeSize === s ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </FilterBlock>
            <FilterBlock title="Màu sắc">
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    className="h-7 w-7 rounded-full border border-border"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </FilterBlock>
            <FilterBlock title="Dịp">
              <div className="flex flex-wrap gap-2">
                {occasions.map((o) => (
                  <span key={o} className="rounded-full border border-border px-3 py-1 text-xs">
                    {o}
                  </span>
                ))}
              </div>
            </FilterBlock>
            <FilterBlock title="Ngày có sẵn">
              <input
                type="date"
                className="w-full rounded-md border border-border bg-background px-2 py-1.5"
              />
            </FilterBlock>
          </aside>

          {/* Grid */}
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-muted-foreground">{filtered.length} sản phẩm</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Sắp xếp:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-1.5"
                >
                  {sortOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {gender !== "Tất cả" && (
                <button
                  onClick={() => setGender("Tất cả")}
                  className="rounded-full bg-accent px-3 py-1 text-xs"
                >
                  {gender} ✕
                </button>
              )}
              {activeSize && (
                <button
                  onClick={() => setActiveSize(null)}
                  className="rounded-full bg-accent px-3 py-1 text-xs"
                >
                  Size {activeSize} ✕
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 font-serif text-base">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function ProductCard({ p }: { p: (typeof products)[number] }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: p.id }}
      className="group block overflow-hidden rounded-2xl bg-card transition hover:shadow-lg"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${p.available ? "bg-background/90 text-foreground" : "bg-foreground/80 text-background"}`}
        >
          {p.available ? "Còn hàng" : "Đã đặt"}
        </span>
      </div>
      <div className="p-4">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {p.designer}
        </div>
        <div className="font-serif text-base">{p.name}</div>
        <div className="mt-1 text-sm text-primary">{formatVND(p.price)} giá gốc</div>
      </div>
    </Link>
  );
}
