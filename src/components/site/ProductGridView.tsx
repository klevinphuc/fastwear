import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
  items: ProductGridItem[];
  tab: string;
  title: string;
  viewLinks: ProductGridViewLink[];
};

type FilterKey = "occasion" | "size" | "price" | "color";

const filterGroups: Array<{
  id: FilterKey;
  label: string;
  options: Array<{ label: string; value: string; swatch?: string }>;
}> = [
  {
    id: "occasion",
    label: "Dịp",
    options: [
      { label: "Tiệc cưới", value: "Tiệc cưới" },
      { label: "Dạ hội", value: "Dạ hội" },
      { label: "Dạo phố", value: "Dạo phố" },
      { label: "Chụp ảnh", value: "Chụp ảnh" },
    ],
  },
  {
    id: "size",
    label: "Kích cỡ",
    options: [
      { label: "S", value: "S" },
      { label: "M", value: "M" },
      { label: "L", value: "L" },
      { label: "XL", value: "XL" },
    ],
  },
  {
    id: "price",
    label: "Khoảng giá",
    options: [
      { label: "Dưới 500k", value: "under-500" },
      { label: "500k - 1M", value: "500-1m" },
      { label: "Trên 1M", value: "above-1m" },
    ],
  },
  {
    id: "color",
    label: "Màu sắc",
    options: [
      { label: "Đen", value: "Đen", swatch: "#1A1A1A" },
      { label: "Trắng", value: "Trắng", swatch: "#FFFFFF" },
      { label: "Pastel", value: "Pastel", swatch: "#F2C4CE" },
      { label: "Đỏ đô", value: "Đỏ đô", swatch: "#6B1A33" },
    ],
  },
];

const emptyFilters: Record<FilterKey, string[]> = {
  occasion: [],
  size: [],
  price: [],
  color: [],
};

const colorGroupsByHex: Record<string, string[]> = {
  "#1a1a1a": ["Đen"],
  "#2f3438": ["Đen"],
  "#3a3a3a": ["Đen"],
  "#3a2a1a": ["Đen"],
  "#ffffff": ["Trắng"],
  "#fff8f1": ["Trắng", "Pastel"],
  "#f4f1ea": ["Trắng", "Pastel"],
  "#f4efe7": ["Trắng", "Pastel"],
  "#f6d7df": ["Pastel"],
  "#f1cbd6": ["Pastel"],
  "#f2c4ce": ["Pastel"],
  "#ead1bd": ["Pastel"],
  "#d8ccb7": ["Pastel"],
  "#d7c2a7": ["Pastel"],
  "#c9bea8": ["Pastel"],
  "#c9a27a": ["Pastel"],
  "#c5a67e": ["Pastel"],
  "#76c7b7": ["Pastel"],
  "#6b1a33": ["Đỏ đô"],
  "#b86f66": ["Đỏ đô", "Pastel"],
};

const priceRangeMatches = (price: number, range: string) => {
  if (range === "under-500") return price < 500000;
  if (range === "500-1m") return price >= 500000 && price <= 1000000;
  if (range === "above-1m") return price > 1000000;
  return true;
};

const productColorGroups = (product: Product) =>
  Array.from(
    new Set(product.colors.flatMap((color) => colorGroupsByHex[color.toLowerCase()] ?? [])),
  );

const productMatchesFilters = (product: Product, filters: Record<FilterKey, string[]>) => {
  if (
    filters.occasion.length > 0 &&
    !filters.occasion.some((occasion) => product.occasion.includes(occasion))
  ) {
    return false;
  }

  if (filters.size.length > 0 && !filters.size.some((size) => product.sizes.includes(size))) {
    return false;
  }

  if (
    filters.price.length > 0 &&
    !filters.price.some((range) => priceRangeMatches(product.price, range))
  ) {
    return false;
  }

  const colorGroups = productColorGroups(product);
  if (filters.color.length > 0 && !filters.color.some((color) => colorGroups.includes(color))) {
    return false;
  }

  return true;
};

export function ProductGridView({
  activeId,
  description,
  eyebrow,
  items,
  tab,
  title,
  viewLinks,
}: ProductGridViewProps) {
  const [selectedARProduct, setSelectedARProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<Record<FilterKey, string[]>>(emptyFilters);
  const productById = useMemo(
    () => new Map(products.map((product) => [product.id, product] as const)),
    [],
  );

  const hasActiveFilters = Object.values(filters).some((values) => values.length > 0);
  const filteredItems = items.filter((item) => {
    const matchedProduct = productById.get(item.id);
    return matchedProduct ? productMatchesFilters(matchedProduct, filters) : true;
  });

  const toggleFilter = (group: FilterKey, value: string) => {
    setFilters((current) => {
      const selected = current[group];
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      return { ...current, [group]: next };
    });
  };

  return (
    <section
      className="mx-auto max-w-[1480px] px-4 pb-20 pt-10 md:px-6 lg:px-10"
      aria-labelledby={`${tab}-grid-title`}
    >
      <div className="mb-7 flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-[#1d4e3f]">{eyebrow}</div>
            <h1
              id={`${tab}-grid-title`}
              className="mt-2 text-4xl font-extrabold uppercase leading-tight text-[#11100e] md:text-5xl"
            >
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#1c1410]/68 md:text-base">
              {description}
            </p>
          </div>
          <div className="text-xs font-bold uppercase text-[#1c1410]/58">
            {filteredItems.length}/{items.length} sản phẩm
          </div>
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
        </div>
      </div>

      <div className="product-grid-layout">
        <aside className="product-filter-sidebar" aria-label="Bộ lọc sản phẩm">
          <div className="product-filter-heading">
            <span>Bộ lọc</span>
            {hasActiveFilters ? (
              <button type="button" onClick={() => setFilters(emptyFilters)}>
                Xóa lọc
              </button>
            ) : null}
          </div>

          <div className="product-filter-groups">
            {filterGroups.map((group) => (
              <fieldset className="product-filter-group" key={group.id}>
                <legend>{group.label}</legend>
                <div>
                  {group.options.map((option) => {
                    const checked = filters[group.id].includes(option.value);

                    return (
                      <label className="product-filter-option" key={option.value}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleFilter(group.id, option.value)}
                        />
                        {option.swatch ? (
                          <span
                            className="product-filter-swatch"
                            style={{ backgroundColor: option.swatch }}
                            aria-hidden="true"
                          />
                        ) : null}
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        </aside>

        <div className="product-grid-results">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredItems.map((item) => {
                const matchedProduct = productById.get(item.id);

                return (
                  <ProductGridCard
                    key={item.id}
                    item={item}
                    onTryOn={() => {
                      if (matchedProduct) setSelectedARProduct(matchedProduct);
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="product-grid-empty">
              <h2>Chưa có sản phẩm phù hợp</h2>
              <p>Hãy bỏ bớt bộ lọc hoặc chuyển sang nhóm sản phẩm khác để xem thêm lựa chọn.</p>
              <button type="button" onClick={() => setFilters(emptyFilters)}>
                Xóa toàn bộ bộ lọc
              </button>
            </div>
          )}
        </div>
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
