import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { ARTryOn } from "@/components/site/ARTryOn";
import { useCart } from "@/lib/cart";
import { products, formatVND } from "@/lib/products";
import { Star, ChevronDown, Sparkles } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <ProductNotFound id={id} />;
  }

  return <ProductDetail product={product} />;
}

function ProductNotFound({ id }: { id: string }) {
  return (
    <SiteShell>
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center md:px-8">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Không tìm thấy sản phẩm</div>
        <h1 className="mt-4 font-serif text-4xl">Sản phẩm này chưa có trong bộ sưu tập</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Mã sản phẩm "{id}" không tồn tại hoặc đã được gỡ khỏi FASTWear.
        </p>
        <Link
          to="/categories"
          className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Quay lại bộ sưu tập
        </Link>
      </div>
    </SiteShell>
  );
}

function ProductDetail({ product }: { product: typeof products[number] }) {
  const { addItem } = useCart();
  const gallery = product.images ?? [product.image, product.image, product.image];
  const [active, setActive] = useState(gallery[0]);
  const [showSize, setShowSize] = useState(false);
  const [openCare, setOpenCare] = useState(false);
  const [openReturnPolicy, setOpenReturnPolicy] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "Free");
  const today = new Date();
  const [start, setStart] = useState<string>(today.toISOString().slice(0, 10));
  const [end, setEnd] = useState<string>(new Date(today.getTime() + 4 * 86400000).toISOString().slice(0, 10));

  const days = Math.max(1, Math.ceil((+new Date(end) - +new Date(start)) / 86400000));

  const combos = products.filter((p) => p.id !== product.id).slice(0, 3);
  const handleAddToCart = () => {
    const cartItem = addItem({
      productId: product.id,
      name: product.name,
      designer: product.designer,
      image: product.image,
      price: product.price,
      deposit: product.deposit,
      selectedSize: selectedSize || product.sizes[0] || "Free",
      selectedColor: product.colors[0],
      rentalDays: days,
      rentalStartDate: start,
      rentalEndDate: end,
      quantity: 1,
    });

    toast.success("Đã thêm vào giỏ thuê 🎉", {
      description: `${cartItem.name} — ${cartItem.rentalDays} ngày`,
    });
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="text-xs text-muted-foreground">
          <Link to="/">Trang chủ</Link> / <Link to="/categories">{product.category}</Link> /{" "}
          <span>{product.name}</span>
        </div>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-3xl bg-card">
              <img src={active} alt={product.name} className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="mt-4 flex gap-3">
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setActive(g)} className={`overflow-hidden rounded-xl border ${active === g ? "border-primary" : "border-border"}`}>
                  <img src={g} className="h-20 w-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{product.designer}</div>
            <h1 className="mt-1 font-serif text-4xl">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" /> {product.rating} · 128 đánh giá
            </div>

            <div className="mt-6 flex items-end gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Giá thuê / ngày</div>
                <div className="font-serif text-3xl text-primary">{formatVND(product.price)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Tiền cọc</div>
                <div className="text-lg">{formatVND(product.deposit)}</div>
              </div>
              <span className="ml-auto rounded-full bg-[color:var(--blush)] px-3 py-1 text-xs">Mới 95%</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Ngày bắt đầu</label>
                <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Ngày trả</label>
                <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{days} ngày × {formatVND(product.price)} = <strong className="text-foreground">{formatVND(days * product.price)}</strong></div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Size</span>
                <button onClick={() => setShowSize(true)} className="text-xs text-primary underline">Bảng size</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`h-10 min-w-10 rounded-full border px-3 text-sm transition hover:border-primary ${
                      selectedSize === s ? "border-primary bg-primary text-primary-foreground" : "border-border"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-full bg-primary py-4 text-primary-foreground hover:opacity-90"
              >
                Thêm vào giỏ — {formatVND(days * product.price)}
              </button>
              <button
                onClick={() => setShowAR(true)}
                className="flex items-center gap-2 rounded-full border-2 border-[#6B1A33] bg-transparent px-5 py-4 text-sm font-medium text-[#6B1A33] transition hover:bg-[#6B1A33] hover:text-white"
              >
                <Sparkles className="h-4 w-4" /> Thử đồ ảo
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-border">
              <button onClick={() => setOpenCare(!openCare)} className="flex w-full items-center justify-between px-5 py-4 font-serif text-lg">
                Chất liệu & cách bảo quản
                <ChevronDown className={`h-5 w-5 transition-transform ${openCare ? "rotate-180" : ""}`} />
              </button>
              {openCare && (
                <p className="px-5 pb-5 text-sm text-muted-foreground">
                  Lụa silk pha viscose. Không cần giặt — FASTWear sẽ giặt khô chuyên nghiệp sau khi bạn trả.
                </p>
              )}
            </div>

            <div className="mt-3 rounded-2xl border border-border">
              <button onClick={() => setOpenReturnPolicy(!openReturnPolicy)} className="flex w-full items-center justify-between px-5 py-4 font-serif text-lg">
                Hướng dẫn đổi trả
                <ChevronDown className={`h-5 w-5 transition-transform ${openReturnPolicy ? "rotate-180" : ""}`} />
              </button>
              {openReturnPolicy && (
                <div className="space-y-4 px-5 pb-5 text-sm leading-6 text-muted-foreground">
                  <p>- Trong 24h đầu nếu sản phẩm không đúng mô tả - đổi ngay hoặc hoàn tiền 100%.</p>
                  <p>
                    Chi tiết hơn khách hàng có thể liên hệ FASTWear qua hotline{" "}
                    <span className="font-semibold text-primary">028.3512.7254</span> hoặc tại trang{" "}
                    <Link to="/policy" className="font-medium text-primary underline underline-offset-4">
                      Chính sách đổi trả
                    </Link>{" "}
                    tại web.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Combos */}
        <section className="mt-16">
          <h2 className="font-serif text-3xl">Kết hợp cùng với…</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {combos.map((c) => (
              <Link key={c.id} to="/product/$id" params={{ id: c.id }} className="group overflow-hidden rounded-2xl bg-card">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={c.image} className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="font-serif text-base">{c.name}</div>
                  <div className="text-sm text-primary">{formatVND(c.price)}/ngày</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-16">
          <h2 className="font-serif text-3xl">Đánh giá khách hàng</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { n: "Hà Phương", t: "Đẹp y ảnh!", q: "Tôi mặc size S, cao 1m62 nặng 48kg — vừa vặn, không cần chỉnh.", r: 5 },
              { n: "Diệu Linh", t: "Đáng tiền", q: "Vải mát, đường may đẹp. Sẽ thuê lại lần sau.", r: 5 },
            ].map((rv, i) => (
              <div key={i} className="rounded-2xl bg-card p-5">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: rv.r }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <div className="mt-2 font-serif text-lg">{rv.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{rv.q}</p>
                <div className="mt-3 text-xs text-muted-foreground">— {rv.n}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showSize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowSize(false)}>
          <div className="w-full max-w-lg rounded-2xl bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-2xl">Bảng size</h3>
            <table className="mt-4 w-full text-sm">
              <thead><tr className="text-left text-muted-foreground"><th>Size</th><th>Ngực</th><th>Eo</th><th>Hông</th></tr></thead>
              <tbody>
                {[["XS","78","60","84"],["S","82","64","88"],["M","86","68","92"],["L","90","72","96"]].map((r) => (
                  <tr key={r[0]} className="border-t border-border"><td className="py-2">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ARTryOn open={showAR} onClose={() => setShowAR(false)} product={product} />
    </SiteShell>
  );
}
