import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Shirt } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { lookbooks, type Lookbook } from "@/lib/catalog";
import { formatVND, products, type Product } from "@/lib/products";

const productById = new Map(products.map((product) => [product.id, product] as const));

const getLookbookProducts = (productIds: string[]) =>
  productIds.flatMap((id) => {
    const product = productById.get(id);
    return product ? [product] : [];
  });

function LookbookPalette({ palette }: { palette: Lookbook["palette"] }) {
  return (
    <div className="flex items-center gap-2" aria-label="Bảng màu">
      {palette.map((color) => (
        <span
          key={color.name}
          className="h-5 w-5 rounded-full border border-white/70 shadow-[0_4px_12px_rgba(28,20,16,0.18)]"
          style={{ backgroundColor: color.hex }}
          title={color.name}
        />
      ))}
    </div>
  );
}

function LookbookCollectionCard({
  collection,
  onOpen,
}: {
  collection: Lookbook;
  onOpen: () => void;
}) {
  return (
    <motion.article
      layout
      className="group overflow-hidden rounded-[24px] border border-[#ded3bc]/85 bg-[#fffaf2] shadow-[0_10px_30px_rgba(28,20,16,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#cdbf9f] hover:shadow-[0_18px_40px_rgba(28,20,16,0.08)]"
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4e3f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf8ef]"
        aria-label={`Mở lookbook ${collection.title}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f7f4ef]">
          <img
            src={collection.coverImage}
            alt={collection.alt}
            className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11100e]/82 via-[#11100e]/16 to-transparent" />
          <div className="absolute inset-x-5 bottom-5 text-[#fbf8ef]">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#fbf8ef]/75">
              {collection.subtitle}
            </div>
            <h2 className="mt-2 font-serif text-4xl font-medium leading-none md:text-5xl">
              {collection.title}
            </h2>
            <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-6 text-[#fbf8ef]/82">
              {collection.description}
            </p>
          </div>
        </div>

        <div className="flex min-h-[6.5rem] flex-col px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a6d48]">
                {collection.eyebrow}
              </div>
            </div>
            <LookbookPalette palette={collection.palette} />
          </div>

          <div className="mt-auto flex justify-end pt-5">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15120f] transition group-hover:text-[#1d4e3f]">
              Xem phối đồ
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function ProductMiniCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group/product grid grid-cols-[76px_minmax(0,1fr)] gap-3 rounded-[18px] border border-[#ded3bc]/85 bg-white/58 p-2 transition hover:border-[#1d4e3f]/35 hover:bg-white"
    >
      <div className="aspect-[3/4] overflow-hidden rounded-[14px] bg-[#f7f4ef]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover/product:scale-[1.03]"
        />
      </div>
      <div className="min-w-0 py-1">
        <div className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-[#8a6d48]">
          {product.designer}
        </div>
        <h4 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[#15120f]">
          {product.name}
        </h4>
        <div className="mt-2 text-sm font-bold leading-none text-[#1d4e3f]">
          {formatVND(product.price)}
        </div>
        <div className="mt-1 text-[11px] text-[#1c1410]/58">/ ngày thuê</div>
      </div>
    </Link>
  );
}

function LookbookCollectionDialog({
  collection,
  open,
  onOpenChange,
}: {
  collection: Lookbook | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const collectionProducts = useMemo(
    () => (collection ? getLookbookProducts(collection.productIds) : []),
    [collection],
  );

  if (!collection) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-24px)] w-[min(1120px,calc(100vw-24px))] max-w-none overflow-y-auto border-[#ded3bc] bg-[#fffaf2] p-0 shadow-[0_28px_80px_rgba(28,20,16,0.26)] sm:rounded-[24px] [&>button]:right-5 [&>button]:top-5 [&>button]:rounded-full [&>button]:border [&>button]:border-white/70 [&>button]:bg-white/90 [&>button]:p-2 [&>button]:text-[#11100e] [&>button]:shadow-[0_10px_24px_rgba(28,20,16,0.18)] [&>button]:backdrop-blur">
        <DialogHeader className="sr-only">
          <DialogTitle>{collection.title}</DialogTitle>
          <DialogDescription>{collection.description}</DialogDescription>
        </DialogHeader>

        <div className="relative min-h-[360px] overflow-hidden bg-[#11100e] md:min-h-[520px]">
          <img
            src={collection.coverImage}
            alt={collection.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11100e]/88 via-[#11100e]/28 to-[#11100e]/10" />
          <div className="relative z-10 flex min-h-[360px] flex-col justify-end p-6 pr-14 text-[#fbf8ef] md:min-h-[520px] md:p-10 md:pr-16">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/28 bg-white/16 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur">
                {collection.eyebrow}
              </span>
              <span className="rounded-full border border-white/22 bg-white/12 px-3 py-1.5 text-[11px] font-semibold backdrop-blur">
                {collection.occasionLabel}
              </span>
            </div>
            <h2 className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-none md:text-7xl">
              {collection.title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#fbf8ef]/82 md:text-base md:leading-7">
              {collection.description}
            </p>
          </div>
        </div>

        <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6d48]">
                  Editorial frames
                </div>
                <h3 className="mt-1 text-2xl font-extrabold uppercase leading-tight text-[#11100e]">
                  Moodboard bộ phối
                </h3>
              </div>
              <LookbookPalette palette={collection.palette} />
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {collection.galleryImages.map((image, index) => (
                <div
                  key={image}
                  className="overflow-hidden rounded-[20px] border border-[#ded3bc]/80 bg-[#f7f4ef] shadow-[0_10px_24px_rgba(28,20,16,0.04)]"
                >
                  <img
                    src={image}
                    alt={`${collection.title} hình ${index + 1}`}
                    className="aspect-[4/5] h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[22px] border border-[#ded3bc]/85 bg-white/45 p-4 shadow-[0_10px_30px_rgba(28,20,16,0.04)] md:p-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1d4e3f] text-[#fbf8ef]">
                <Shirt className="h-4 w-4" />
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6d48]">
                  Thuê theo look
                </div>
                <h3 className="mt-1 text-xl font-bold leading-tight text-[#11100e]">
                  {collection.itemCount} món gợi ý
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#1c1410]/62">
                  Chọn từng món phù hợp với size, lịch hẹn và mức độ trang trọng bạn cần.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {collectionProducts.map((product) => (
                <ProductMiniCard key={product.id} product={product} />
              ))}
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function LookbookTab() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedCollection = lookbooks.find((collection) => collection.id === selectedId) ?? null;

  return (
    <section
      className="mx-auto max-w-[1480px] px-4 pb-20 pt-10 md:px-6 lg:px-10"
      aria-labelledby="lookbook-title"
    >
      <div className="mb-7 flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-[#1d4e3f]">
              L'OFFICIEL x FASTWear
            </div>
            <h1
              id="lookbook-title"
              className="mt-2 text-4xl font-extrabold uppercase leading-tight text-[#11100e] md:text-5xl"
            >
              Phối đồ
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#1c1410]/68 md:text-base">
              Những bộ sưu tập được biên tập kỹ lưỡng, lấy cảm hứng từ những dịp đặc biệt trong năm, giúp bạn dễ dàng chọn lựa và thuê trang phục phù hợp cho mọi sự kiện.
            </p>
          </div>
          <div className="text-xs font-bold uppercase text-[#1c1410]/58">
            {lookbooks.length}/{lookbooks.length} bộ phối
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-7 gap-y-10 md:grid-cols-2">
        {lookbooks.map((collection) => (
          <LookbookCollectionCard
            key={collection.id}
            collection={collection}
            onOpen={() => setSelectedId(collection.id)}
          />
        ))}
      </div>

      <LookbookCollectionDialog
        collection={selectedCollection}
        open={Boolean(selectedCollection)}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      />
    </section>
  );
}
