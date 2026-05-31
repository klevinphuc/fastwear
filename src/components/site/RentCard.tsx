import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export type RentItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  deposit?: number;
  image: string;
  sizes?: string[];
  category?: string;
  badge?: string;
  oldPrice?: number;
};

const fmt = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";

export function RentCard({ item, onTryOn }: { item: RentItem; onTryOn?: () => void }) {
  const handleTryOn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onTryOn?.();
  };

  return (
    <div className="glass-mid glass-card-hover group relative overflow-hidden">
      <Link
        to="/product/$id"
        params={{ id: item.id }}
        className="block aspect-[4/5] overflow-hidden"
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Top-left: Gives Back badge */}
      <div className="absolute left-3 top-3 flex flex-col gap-1.5">
        <span
          className="glass-dark px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white/90"
          style={{ borderRadius: 999 }}
        >
          💚 5% → Gây quỹ
        </span>
        {item.badge && (
          <span className="rounded-full bg-[#6B1A33] px-2 py-1 font-mono text-[10px] font-bold text-white">
            {item.badge}
          </span>
        )}
      </div>

      {item.category && (
        <span
          className="absolute right-3 top-3 glass-soft px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-[#1C1410]/80"
          style={{ borderRadius: 999 }}
        >
          {item.category}
        </span>
      )}

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#1C1410]/55">
              {item.brand}
            </div>
            <div className="truncate font-serif text-base text-[#1C1410]">{item.name}</div>
          </div>
          <div className="text-right">
            {item.oldPrice && (
              <div className="font-mono text-[10px] text-[#1C1410]/40 line-through">
                {fmt(item.oldPrice)}
              </div>
            )}
            <div className="font-mono text-sm text-[#6B1A33]">{fmt(item.price)}</div>
            <div className="font-mono text-[9px] uppercase text-[#1C1410]/50">giá gốc</div>
          </div>
        </div>

        {item.sizes && (
          <div className="mt-2 flex gap-1">
            {item.sizes.map((s) => (
              <span
                key={s}
                className="glass-soft flex h-6 min-w-[24px] items-center justify-center px-1.5 font-mono text-[10px] text-[#1C1410]/70"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {item.deposit !== undefined && (
          <div className="mt-2 font-mono text-[10px] text-[#1C1410]/55">
            Cọc: {fmt(item.deposit)}
          </div>
        )}

        <div className="mt-3 flex gap-1.5">
          <button
            type="button"
            onClick={handleTryOn}
            className="glass-soft flex flex-1 items-center justify-center gap-1 px-2 py-2 text-[11px] text-[#1C1410]/80 hover:text-[#6B1A33]"
          >
            <Sparkles className="h-3 w-3" /> Thử ảo
          </button>
          <Link
            to="/cart"
            className="flex flex-1 items-center justify-center rounded-full bg-primary px-2 py-2 text-[11px] text-primary-foreground hover:bg-primary/90"
          >
            Thuê ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
