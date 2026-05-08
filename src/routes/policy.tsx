import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/policy")({
  head: () => ({
    meta: [
      { title: "Chính sách thuê — FASTWear" },
      { name: "description", content: "Quy định thuê đồ, tiền cọc, phí trễ hạn và đổi trả tại FASTWear." },
    ],
  }),
  component: PolicyPage,
});

const sections = [
  { t: "Thời gian thuê", d: "Tối thiểu 4 ngày, tối đa 30 ngày. Có thể gia hạn online trong app." },
  { t: "Phí trễ hạn", d: "20% giá thuê/ngày trễ. Sau 7 ngày, tiền cọc sẽ được sử dụng để bù đắp." },
  { t: "Chính sách mất / hỏng", d: "Hư hỏng nhẹ: miễn phí. Hư hỏng nặng / mất: 100% giá trị sản phẩm trừ vào cọc." },
  { t: "Tiền cọc", d: "Cọc bằng 80% giá trị sản phẩm, hoàn lại sau khi sản phẩm về kho 1-2 ngày." },
  { t: "Hoàn cọc", d: "Hoàn vào MoMo / chuyển khoản trong 1-2 ngày làm việc." },
  { t: "Đổi / Trả", d: "Trong 24h đầu nếu sản phẩm không đúng mô tả — đổi ngay hoặc hoàn tiền 100%." },
];

const timeline = [
  "Đặt thuê online", "Chọn ngày & thanh toán", "FASTWear giao tận nơi", "Mặc & tỏa sáng",
  "Trả qua bưu điện hoặc cửa hàng", "Hoàn cọc trong 1–2 ngày",
];

function PolicyPage() {
  const [open, setOpen] = useState(0);
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
        <h1 className="font-serif text-4xl md:text-5xl">Chính sách thuê</h1>
        <p className="mt-3 text-muted-foreground">Minh bạch, công bằng — để bạn yên tâm trải nghiệm FASTWear.</p>

        <div className="mt-10 space-y-3">
          {sections.map((s, i) => {
            const active = open === i;
            return (
              <div key={i} className="rounded-2xl bg-card">
                <button onClick={() => setOpen(active ? -1 : i)} className="flex w-full items-center justify-between px-6 py-5 text-left font-serif text-lg">
                  {s.t}
                  <ChevronDown className={`h-5 w-5 text-primary transition-transform ${active ? "rotate-180" : ""}`} />
                </button>
                {active && <p className="px-6 pb-5 text-sm text-muted-foreground">{s.d}</p>}
              </div>
            );
          })}
        </div>

        <h2 className="mt-16 font-serif text-3xl">Quy trình thuê từ A → Z</h2>
        <ol className="mt-6 space-y-4 border-l-2 border-primary/30 pl-6">
          {timeline.map((t, i) => (
            <li key={i} className="relative">
              <div className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{i + 1}</div>
              <div className="font-serif text-lg">{t}</div>
            </li>
          ))}
        </ol>
      </div>
    </SiteShell>
  );
}
