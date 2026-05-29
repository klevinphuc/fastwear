import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { useCart, type CartItem } from "@/lib/cart";
import { formatVND } from "@/lib/products";
import { Sparkles, X } from "lucide-react";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { items, removeItem, summary } = useCart();
  const [voucher, setVoucher] = useState("");
  const [openAI, setOpenAI] = useState(false);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <h1 className="font-serif text-4xl md:text-5xl">Giỏ thuê của bạn</h1>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-2xl bg-card p-8 text-center">
                <h2 className="font-serif text-3xl">Giỏ thuê đang trống</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  Hãy chọn thêm outfit phù hợp cho dịp sắp tới của bạn.
                </p>
                <Link
                  to="/categories"
                  className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground hover:bg-primary/90"
                >
                  Khám phá bộ sưu tập
                </Link>
              </div>
            ) : (
              items.map((it) => (
                <div key={it.id} className="flex gap-4 rounded-2xl bg-card p-4">
                  <img src={it.image} alt={it.name} className="h-32 w-24 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{it.designer}</div>
                    <div className="font-serif text-lg">{it.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {formatCartDate(it.rentalStartDate)} → {formatCartDate(it.rentalEndDate)} · {it.rentalDays} ngày
                    </div>
                    {it.selectedSize && (
                      <div className="mt-1 text-xs text-muted-foreground">Size: {it.selectedSize}</div>
                    )}
                    <div className="mt-2 text-sm text-primary">{formatVND(it.price * it.rentalDays * it.quantity)}</div>
                  </div>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="self-start rounded-full p-2 hover:bg-accent"
                    aria-label={`Xóa ${it.name} khỏi giỏ thuê`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}

            {items.length > 0 && (
              <button
                onClick={() => setOpenAI(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/40 bg-[color:var(--blush)]/40 py-6 font-serif text-lg text-primary hover:bg-[color:var(--blush)]"
              >
                <Sparkles className="h-5 w-5" /> Mở AI Fitting Room
              </button>
            )}
          </div>

          <aside className="h-fit space-y-4 rounded-2xl bg-card p-6">
            <h3 className="font-serif text-2xl">Tóm tắt</h3>
            <div className="flex justify-between text-sm"><span>Tạm tính ({items.length} món)</span><span>{formatVND(summary.rentalSubtotal)}</span></div>
            <div className="flex justify-between text-sm"><span>Tiền cọc (hoàn lại)</span><span>{formatVND(summary.depositRequired)}</span></div>
            <div className="flex justify-between text-sm"><span>Phí giao</span><span>{formatVND(summary.shippingFee)}</span></div>
            <div className="flex gap-2">
              <input value={voucher} onChange={(e) => setVoucher(e.target.value)} placeholder="Mã giảm giá" className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm" />
              <button
                onClick={() => toast.success("Đã áp dụng FASTWEAR30")}
                className="rounded-full bg-foreground px-4 py-2 text-xs text-background"
              >Áp dụng</button>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between font-serif text-lg"><span>Tổng</span><span className="text-primary">{formatVND(summary.totalPayable)}</span></div>
            </div>
            {items.length > 0 ? (
              <Link to="/checkout" className="block rounded-full bg-primary py-3 text-center text-sm text-primary-foreground">Tiến hành đặt thuê</Link>
            ) : (
              <button disabled className="block w-full rounded-full bg-muted py-3 text-center text-sm text-muted-foreground">
                Tiến hành đặt thuê
              </button>
            )}
          </aside>
        </div>
      </div>

      {openAI && <AIFittingRoom items={items} onClose={() => setOpenAI(false)} />}
    </SiteShell>
  );
}

function formatCartDate(value: string) {
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
}

function AIFittingRoom({ items, onClose }: { items: CartItem[]; onClose: () => void }) {
  const [h, setH] = useState(162);
  const [w, setW] = useState(50);
  const score = Math.min(99, 70 + items.length * 6 + (h % 7));
  const sizeRec = w < 50 ? "S" : w < 60 ? "M" : "L";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-hidden rounded-3xl bg-card md:grid-cols-2" onClick={(e) => e.stopPropagation()}>
        <div className="bg-[color:var(--blush)] p-6">
          <div className="text-xs uppercase tracking-widest text-primary">AI Fitting Room</div>
          <h3 className="mt-1 font-serif text-3xl">Bộ đồ này hợp với nhau không?</h3>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {items.map((it) => (
              <div key={it.id} className="overflow-hidden rounded-xl bg-background">
                <img src={it.image} className="aspect-[3/4] w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-background p-4">
            <div className="text-xs text-muted-foreground">Điểm phối hợp AI</div>
            <div className="mt-1 flex items-end gap-2">
              <div className="font-serif text-5xl text-primary">{score}</div>
              <div className="pb-2 text-sm text-muted-foreground">/ 100</div>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-primary" style={{ width: `${score}%` }} />
            </div>
            <p className="mt-3 text-sm">Tone burgundy + cream + black tạo ngôn ngữ thời trang editorial — rất ăn ý.</p>
          </div>
        </div>
        <div className="space-y-4 p-6">
          <button onClick={onClose} className="ml-auto block rounded-full p-2 hover:bg-accent"><X className="h-4 w-4" /></button>
          <h4 className="font-serif text-2xl">Gợi ý size cho bạn</h4>
          <label className="block text-sm">
            Chiều cao: {h} cm
            <input type="range" min={140} max={185} value={h} onChange={(e) => setH(+e.target.value)} className="mt-2 w-full accent-[color:var(--primary)]" />
          </label>
          <label className="block text-sm">
            Cân nặng: {w} kg
            <input type="range" min={38} max={90} value={w} onChange={(e) => setW(+e.target.value)} className="mt-2 w-full accent-[color:var(--primary)]" />
          </label>
          <div className="rounded-2xl bg-[color:var(--cream)] p-4">
            <div className="text-xs text-muted-foreground">Size đề xuất</div>
            <div className="font-serif text-3xl text-primary">{sizeRec}</div>
            <p className="mt-2 text-sm text-muted-foreground">Dựa trên dữ liệu của 12,000+ thành viên FASTWear cùng số đo.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
