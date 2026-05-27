import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ARTryOn } from "./ARTryOn";
import { ProductGridCard, type ProductGridItem } from "./ProductGridCard";
import { products, type Product } from "@/lib/products";

export type ProductGridViewLink = {
  id: string;
  label: string;
};

type ProductGridViewProps = {
  activeId: string;
  description: string;
  eyebrow: string;
  imageFit?: "cover" | "contain";
  items: ProductGridItem[];
  landingLinkLabel: string;
  tab: string;
  title: string;
  viewLinks: ProductGridViewLink[];
};

export function ProductGridView({
  activeId,
  description,
  eyebrow,
  imageFit = "cover",
  items,
  landingLinkLabel,
  tab,
  title,
  viewLinks,
}: ProductGridViewProps) {
  const [selectedARProduct, setSelectedARProduct] = useState<Product | null>(null);

  return (
    <section className="mx-auto max-w-[1480px] px-4 pb-20 pt-10 md:px-6 lg:px-10" aria-labelledby={`${tab}-grid-title`}>
      <div className="mb-7 flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-[#1d4e3f]">{eyebrow}</div>
            <h1 id={`${tab}-grid-title`} className="mt-2 text-4xl font-extrabold uppercase leading-tight text-[#11100e] md:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#1c1410]/68 md:text-base">{description}</p>
          </div>
          <div className="text-xs font-bold uppercase text-[#1c1410]/58">{items.length} sản phẩm</div>
        </div>

        <div className="flex flex-wrap gap-3">
          {viewLinks.map((option) => {
            const active = activeId === option.id;

            return (
              <Link
                key={option.id}
                to="/"
                search={{ tab, view: option.id }}
                className={`inline-flex min-h-10 items-center justify-center rounded-full border px-5 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4e3f] ${
                  active
                    ? "border-[#1d4e3f] bg-[#1d4e3f] text-[#fbf8ef]"
                    : "border-[#d8cdb5] bg-white/44 text-[#4b453c] hover:border-[#1d4e3f] hover:text-[#1d4e3f]"
                }`}
              >
                {option.label}
              </Link>
            );
          })}
          <Link
            to="/"
            search={{ tab }}
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#d8cdb5] bg-white/28 px-5 py-2 text-sm font-semibold text-[#4b453c] transition hover:border-[#1d4e3f] hover:text-[#1d4e3f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4e3f]"
          >
            {landingLinkLabel}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const matchedProduct = products.find((product) => product.id === item.id);

          return (
            <ProductGridCard
              key={item.id}
              item={item}
              imageFit={imageFit}
              onTryOn={() => {
                if (matchedProduct) setSelectedARProduct(matchedProduct);
              }}
            />
          );
        })}
      </div>

      {selectedARProduct ? (
        <ARTryOn
          open={true}
          onClose={() => setSelectedARProduct(null)}
          product={selectedARProduct}
        />
      ) : null}
    </section>
  );
}
