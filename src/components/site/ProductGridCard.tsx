import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { formatVND } from "@/lib/products";

const FASTWEAR_AR_QR_SRC = "/ar-qr/fastwear-ar-qr.jpg";

export type ProductGridItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  deposit?: number;
  image: string;
  badge?: string;
};

type ProductGridCardProps = {
  item: ProductGridItem;
  onTryOn?: () => void;
};

export function ProductGridCard({ item, onTryOn }: ProductGridCardProps) {
  const handleTryOn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onTryOn?.();
  };

  return (
    <article className="group/product min-w-0 overflow-hidden rounded-[24px] border border-[#ded3bc]/85 bg-[#fffaf2] shadow-[0_10px_30px_rgba(28,20,16,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#cdbf9f] hover:shadow-[0_16px_34px_rgba(28,20,16,0.07)]">
      <div className="relative overflow-hidden bg-[#f7f4ef]">
        <Link
          to="/product/$id"
          params={{ id: item.id }}
          className="block aspect-[3/4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00624f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffaf2]"
          aria-label={`Xem chi tiết ${item.name}`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover object-center transition duration-700 group-hover/product:scale-[1.018]"
          />
        </Link>

        <div
          className="pointer-events-none absolute inset-0 z-10 hidden bg-[linear-gradient(135deg,rgba(255,250,242,0.12),rgba(28,20,16,0.2)_58%,rgba(28,20,16,0.34))] opacity-0 transition-opacity duration-300 group-hover/product:opacity-100 group-focus-within/product:opacity-100 md:block"
          aria-hidden="true"
        />

        {item.badge ? (
          <span className="absolute left-4 top-4 z-20 rounded-full border border-[#eadcc5]/85 bg-white/92 px-3 py-1.5 text-[11px] font-semibold leading-none text-[#2d241f] shadow-[0_8px_18px_rgba(28,20,16,0.08)] backdrop-blur">
            {item.badge}
          </span>
        ) : null}

        <button
          type="button"
          onClick={handleTryOn}
          className="absolute right-4 top-4 z-30 hidden min-h-9 translate-y-[-6px] items-center gap-1.5 rounded-full border border-[#eadcc5]/90 bg-white/94 px-3 text-xs font-semibold text-[#00624f] opacity-0 shadow-[0_10px_22px_rgba(28,20,16,0.12)] backdrop-blur-md transition duration-300 hover:border-[#00624f]/30 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00624f] group-hover/product:translate-y-0 group-hover/product:opacity-100 group-focus-within/product:translate-y-0 group-focus-within/product:opacity-100 md:inline-flex"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Thử ảo
        </button>

        <div className="pointer-events-none absolute bottom-4 right-4 z-20 hidden translate-y-2 scale-[0.98] opacity-0 transition duration-300 group-hover/product:translate-y-0 group-hover/product:scale-100 group-hover/product:opacity-100 group-focus-within/product:translate-y-0 group-focus-within/product:scale-100 group-focus-within/product:opacity-100 md:block">
          <div className="rounded-[14px] border border-white/80 bg-white p-1.5 shadow-[0_14px_30px_rgba(28,20,16,0.18)]">
            <img
              src={FASTWEAR_AR_QR_SRC}
              alt=""
              className="h-[88px] w-[88px] rounded-[10px] object-contain lg:h-[104px] lg:w-[104px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="flex min-h-[10.5rem] flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8a6d48]">
          {item.brand}
        </div>
        <Link
          to="/product/$id"
          params={{ id: item.id }}
          className="mt-2 block min-h-[3rem] break-words text-[17px] font-semibold leading-snug text-[#15120f] transition hover:text-[#00624f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00624f]"
        >
          {item.name}
        </Link>

        <div className="mt-4">
          <div className="text-[17px] font-bold leading-none text-[#00624f]">
            {formatVND(item.price)}
          </div>
          <div className="mt-1 text-xs text-[#1c1410]/58">/ ngày thuê</div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <button
            type="button"
            onClick={handleTryOn}
            className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#ded3bc] bg-white/55 px-3 text-xs font-semibold text-[#00624f] transition hover:border-[#00624f]/35 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00624f] md:hidden"
          >
            Thử ảo
          </button>
          <Link
            to="/product/$id"
            params={{ id: item.id }}
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#15120f] transition hover:text-[#00624f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00624f]"
          >
            Xem chi tiết
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
