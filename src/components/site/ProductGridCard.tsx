import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { formatVND } from "@/lib/products";
import { cn } from "@/lib/utils";

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
  imageFit?: "cover" | "contain";
  onTryOn?: () => void;
};

export function ProductGridCard({ item, imageFit = "cover", onTryOn }: ProductGridCardProps) {
  const isContain = imageFit === "contain";
  const handleTryOn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onTryOn?.();
  };

  return (
    <article className="group/product min-w-0 overflow-hidden rounded-[18px] border border-[#ded3bc]/85 bg-[#fffaf2] shadow-[0_10px_30px_rgba(28,20,16,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#cdbf9f] hover:shadow-[0_16px_34px_rgba(28,20,16,0.07)]">
      <div className="relative overflow-hidden bg-[#f4eadb]">
        <Link
          to="/product/$id"
          params={{ id: item.id }}
          className="block aspect-[4/5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00624f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffaf2]"
          aria-label={`Xem chi tiết ${item.name}`}
        >
          <img
            src={item.image}
            alt={item.name}
            className={cn(
              "h-full w-full transition duration-700 group-hover/product:scale-[1.018]",
              isContain ? "object-contain p-5 sm:p-7" : "object-cover object-center",
            )}
          />
        </Link>

        {item.badge ? (
          <span className="absolute left-4 top-4 z-10 rounded-full border border-[#eadcc5]/85 bg-white/92 px-3 py-1.5 text-[11px] font-semibold leading-none text-[#2d241f] shadow-[0_8px_18px_rgba(28,20,16,0.08)] backdrop-blur">
            {item.badge}
          </span>
        ) : null}

        <button
          type="button"
          onClick={handleTryOn}
          className="absolute right-4 top-4 z-10 hidden min-h-9 items-center gap-1.5 rounded-full border border-[#eadcc5]/90 bg-white/92 px-3 text-xs font-semibold text-[#00624f] opacity-0 shadow-[0_8px_18px_rgba(28,20,16,0.08)] backdrop-blur transition duration-300 hover:border-[#00624f]/30 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00624f] group-hover/product:opacity-100 group-focus-within/product:opacity-100 md:inline-flex"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Thử ảo
        </button>
      </div>

      <div className="flex min-h-[10.5rem] flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8a6d48]">{item.brand}</div>
        <Link
          to="/product/$id"
          params={{ id: item.id }}
          className="mt-2 block min-h-[3rem] break-words text-[17px] font-semibold leading-snug text-[#15120f] transition hover:text-[#00624f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00624f]"
        >
          {item.name}
        </Link>

        <div className="mt-4">
          <div className="text-[17px] font-bold leading-none text-[#00624f]">{formatVND(item.price)}</div>
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
