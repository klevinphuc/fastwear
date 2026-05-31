import { useEffect } from "react";
import { Camera, Sparkles, UserRound, X } from "lucide-react";
import type { Product } from "@/lib/products";

const QR_IMAGE_SRC = "/ar-qr/fastwear-ar-qr.jpg";

const steps = [
  {
    icon: Camera,
    title: "Mở camera điện thoại",
    description: "Quét mã QR bằng camera hoặc Zalo để mở trải nghiệm",
  },
  {
    icon: Sparkles,
    title: "Cho phép truy cập camera",
    description: "Cấp quyền truy cập để thử đồ chính xác hơn",
  },
  {
    icon: UserRound,
    title: "Hướng camera vào người",
    description: "Đứng thẳng, đủ sáng để xem outfit phù hợp với bạn",
  },
];

export function ARTryOn({ open, onClose, product }: { open: boolean; onClose: () => void; product: Product }) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ar-try-on-title"
    >
      <div
        className="relative w-full max-w-3xl rounded-[28px] border border-[#eadcc5] bg-[#fffaf2] p-6 text-[#1C1410] shadow-2xl shadow-black/20 md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[#1C1410] transition hover:bg-white"
          aria-label="Đóng thử đồ AR"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-12 text-center">
          <h2 id="ar-try-on-title" className="font-serif text-3xl font-semibold md:text-4xl">
            Thử outfit bằng AR
          </h2>
          <p className="mt-2 text-sm text-[#1C1410]/65">
            Trải nghiệm trang phục ngay trên điện thoại của bạn
          </p>
        </div>

        <div className="mt-7 grid gap-7 md:grid-cols-[0.9fr_1fr] md:items-center">
          <div className="flex flex-col items-center">
            <div className="rounded-2xl border border-[#eadcc5] bg-white p-4 shadow-sm">
              <img
                src={QR_IMAGE_SRC}
                alt={`QR thử đồ AR cho ${product.name}`}
                className="h-48 w-48 object-contain md:h-56 md:w-56"
              />
            </div>
            <p className="mt-4 max-w-64 text-center text-sm leading-6 text-[#1C1410]/70">
              Quét mã QR để bắt đầu trải nghiệm thử đồ ảo
            </p>
          </div>

          <div className="space-y-5 border-t border-[#eadcc5] pt-6 md:border-l md:border-t-0 md:pl-7 md:pt-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#eadcc5] bg-white text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-[#1C1410]/60">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-7 flex gap-3 rounded-xl border border-[#eadcc5] bg-[#fff5df] px-4 py-3 text-sm leading-6 text-[#8a5b13]">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            Đây là bản demo thử đồ bằng AR trên thiết bị di động. Trải nghiệm tốt nhất trên điện
            thoại.
          </p>
        </div>
      </div>
    </div>
  );
}
