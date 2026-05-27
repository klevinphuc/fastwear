import { Link } from "@tanstack/react-router";
import { ShoppingBag, Sparkles } from "lucide-react";
import { formatVND } from "@/lib/products";
import { cn } from "@/lib/utils";

export type ProductGridItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  deposit?: number;
  image: string;
};

type ProductGridCardProps = {
  item: ProductGridItem;
  imageFit?: "cover" | "contain";
  onTryOn?: () => void;
};

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 px-2 first:pl-0 last:pr-0">
      <dt className="text-[11px] font-medium text-[#1c1410]/58">{label}</dt>
      <dd className="mt-1 break-words text-[12px] font-semibold leading-snug text-[#1c1410] sm:text-[13px]">
        {value}
      </dd>
    </div>
  );
}

export function ProductGridCard({ item, imageFit = "cover", onTryOn }: ProductGridCardProps) {
  const isContain = imageFit === "contain";
  const deposit = item.deposit === undefined ? "Liên hệ" : formatVND(item.deposit);
  const handleTryOn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onTryOn?.();
  };

  return (
    <article className="group/product min-w-0">
      <div className="relative overflow-hidden rounded-md border border-[#ded3bc]/80 bg-[#f6efe1]">
        <Link
          to="/product/$id"
          params={{ id: item.id }}
          className="block aspect-[3/4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6b1a33] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf8ef]"
          aria-label={`Xem chi tiết ${item.name}`}
        >
          <img
            src={item.image}
            alt={item.name}
            className={cn(
              "h-full w-full transition duration-700 group-hover/product:scale-[1.025]",
              isContain ? "object-contain p-6 sm:p-8" : "object-cover object-center",
            )}
          />
        </Link>

        <div
          className="pointer-events-none absolute inset-0 hidden bg-black/0 transition duration-300 group-hover/product:bg-black/38 group-focus-within/product:bg-black/38 md:block"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center px-6 opacity-0 transition duration-300 group-hover/product:opacity-100 group-focus-within/product:opacity-100 md:flex">
          <div className="flex w-full max-w-[15rem] flex-col gap-3">
            <Link
              to="/cart"
              className="pointer-events-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#6b1a33] px-5 py-3 text-sm font-bold text-[#fffaf3] shadow-[0_12px_28px_rgba(44,18,25,0.25)] transition hover:bg-[#7b203c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf3]"
            >
              <ShoppingBag className="h-4 w-4" />
              Thuê ngay
            </Link>
            <button
              type="button"
              onClick={handleTryOn}
              className="pointer-events-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#fffaf3]/58 bg-[#7b6a5f]/34 px-5 py-3 text-sm font-bold text-[#fffaf3] backdrop-blur-md transition hover:border-[#fffaf3]/85 hover:bg-[#7b6a5f]/46 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fffaf3]"
            >
              <Sparkles className="h-4 w-4" />
              Thử ảo
            </button>
          </div>
        </div>
      </div>

      <div className="pt-3">
        <Link
          to="/product/$id"
          params={{ id: item.id }}
          className="block break-words text-[15px] font-extrabold uppercase leading-snug text-[#14110e] transition hover:text-[#6b1a33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6b1a33]"
        >
          {item.name}
        </Link>

        <dl className="mt-3 grid grid-cols-3 divide-x divide-[#d8cdb5]">
          <MetaCell label="Thương hiệu" value={item.brand} />
          <MetaCell label="Tiền cọc" value={deposit} />
          <MetaCell label="Giá" value={formatVND(item.price)} />
        </dl>

        <div className="mt-4 grid grid-cols-2 gap-2 md:hidden">
          <Link
            to="/cart"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#6b1a33] px-3 py-2 text-xs font-bold text-[#fffaf3]"
          >
            Thuê ngay
          </Link>
          <button
            type="button"
            onClick={handleTryOn}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#c9bba0] bg-white/32 px-3 py-2 text-xs font-bold text-[#2d241f]"
          >
            Thử ảo
          </button>
        </div>
      </div>
    </article>
  );
}
