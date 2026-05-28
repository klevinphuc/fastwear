import type { Product } from "@/lib/products";

const QR_IMAGE_SRC = "/ar-qr/qr-demo-ar-try-on.png";

export function ARQrBadge({ product, onClick }: { product: Product; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex max-w-[8.5rem] items-center gap-2 rounded-lg border border-[#eadcc5]/90 bg-[#fffaf2]/95 p-2 text-left text-[#1C1410] shadow-[0_10px_28px_rgba(28,20,16,0.16)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1A33] focus-visible:ring-offset-2 sm:max-w-none sm:p-2.5"
      aria-label={`Mở mã QR thử đồ AR cho ${product.name}`}
    >
      <span className="rounded-md border border-[#eadcc5] bg-white p-1 shadow-sm">
        <img
          src={QR_IMAGE_SRC}
          alt=""
          aria-hidden="true"
          className="h-14 w-14 object-contain sm:h-16 sm:w-16"
        />
      </span>
      <span className="hidden min-w-0 sm:block">
        <span className="block text-xs font-semibold leading-4">Quét QR</span>
        <span className="mt-0.5 block text-[11px] leading-4 text-[#1C1410]/62">Thử trên điện thoại</span>
      </span>
      <span className="block min-w-0 sm:hidden">
        <span className="block text-[11px] font-semibold leading-3">Quét QR</span>
        <span className="mt-0.5 block text-[10px] leading-3 text-[#1C1410]/62">Thử trên điện thoại</span>
      </span>
    </button>
  );
}
