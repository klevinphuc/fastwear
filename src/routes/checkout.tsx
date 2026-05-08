import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { formatVND } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

const steps = ["Địa chỉ", "Giao hàng", "Trả hàng", "Thanh toán"];
const payments = [
  { id: "momo", label: "MoMo", color: "#a50064" },
  { id: "zalo", label: "ZaloPay", color: "#0068ff" },
  { id: "bank", label: "Chuyển khoản", color: "#1A1A1A" },
  { id: "cod", label: "COD", color: "#6B1A33" },
];

function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [pay, setPay] = useState("momo");
  const [agree, setAgree] = useState(false);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <h1 className="font-serif text-4xl md:text-5xl">Thanh toán</h1>

        <div className="mt-6 flex items-center gap-2 text-xs">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</div>
              <span className={i === step ? "font-medium" : "text-muted-foreground"}>{s}</span>
              {i < steps.length - 1 && <span className="mx-2 h-px w-6 bg-border" />}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_360px]">
          <div className="space-y-5 rounded-2xl bg-card p-6">
            {step === 0 && (
              <>
                <h2 className="font-serif text-2xl">Địa chỉ giao</h2>
                <Field label="Họ tên" />
                <Field label="Số điện thoại" type="tel" />
                <Field label="Địa chỉ" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Thành phố" />
                  <Field label="Quận / Huyện" />
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <h2 className="font-serif text-2xl">Phương thức nhận</h2>
                {[["Giao tận nơi","30,000₫ — 1-2 ngày"],["Đến cửa hàng lấy","Miễn phí — Sài Gòn / Hà Nội"]].map(([t, d]) => (
                  <label key={t} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 hover:border-primary">
                    <input type="radio" name="ship" defaultChecked={t === "Giao tận nơi"} className="mt-1" />
                    <div><div className="font-medium">{t}</div><div className="text-xs text-muted-foreground">{d}</div></div>
                  </label>
                ))}
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="font-serif text-2xl">Phương thức trả</h2>
                {[["Giao bưu điện đến","Free pickup"],["Mang đến cửa hàng","Tặng 5K FASTCoin"]].map(([t, d]) => (
                  <label key={t} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 hover:border-primary">
                    <input type="radio" name="ret" defaultChecked={t.startsWith("Giao")} className="mt-1" />
                    <div><div className="font-medium">{t}</div><div className="text-xs text-muted-foreground">{d}</div></div>
                  </label>
                ))}
                <Field label="Ngày trả dự kiến" type="date" />
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="font-serif text-2xl">Thanh toán</h2>
                <div className="grid grid-cols-2 gap-3">
                  {payments.map((p) => (
                    <button key={p.id} onClick={() => setPay(p.id)} className={`flex items-center gap-3 rounded-xl border p-4 text-left ${pay === p.id ? "border-primary bg-primary/5" : "border-border"}`}>
                      <div className="h-8 w-8 rounded-md" style={{ background: p.color }} />
                      <div className="text-sm font-medium">{p.label}</div>
                    </button>
                  ))}
                </div>
                <label className="flex items-start gap-2 text-sm">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
                  Tôi đã đọc và đồng ý <Link to="/policy" className="text-primary underline">Chính sách thuê</Link>.
                </label>
              </>
            )}
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                className="rounded-full border border-border px-5 py-2 text-sm"
                disabled={step === 0}
              >
                Quay lại
              </button>
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="rounded-full bg-primary px-6 py-2 text-sm text-primary-foreground">Tiếp tục</button>
              ) : (
                <button
                  onClick={() => {
                    if (!agree) return toast.error("Vui lòng đồng ý chính sách");
                    toast.success("Đặt thuê thành công 🎉", { description: "Mã đơn FW-2026-0501" });
                  }}
                  className="rounded-full bg-primary px-6 py-2 text-sm text-primary-foreground"
                >
                  Đặt thuê
                </button>
              )}
            </div>
          </div>

          <aside className="h-fit space-y-2 rounded-2xl bg-[color:var(--cream)] p-6 text-sm">
            <h3 className="font-serif text-xl">Đơn hàng</h3>
            <div className="flex justify-between"><span>3 món × 4 ngày</span><span>{formatVND(4760000)}</span></div>
            <div className="flex justify-between"><span>Phí giao</span><span>{formatVND(30000)}</span></div>
            <div className="flex justify-between"><span>Cọc (hoàn lại)</span><span>{formatVND(5300000)}</span></div>
            <div className="flex justify-between border-t border-border pt-2 font-serif text-lg"><span>Tổng</span><span className="text-primary">{formatVND(10090000)}</span></div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input type={type} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-primary" />
    </label>
  );
}
