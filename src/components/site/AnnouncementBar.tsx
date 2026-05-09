export function AnnouncementBar() {
  const text = "Giảm 30% đơn thuê đầu tiên với mã: FASTWEAR30 ✦ Miễn phí giao hàng đơn từ 500K ✦ Flash Deal cuối tuần — Còn 02:14:33";
  return (
    <div className="relative z-30 px-4 pt-3">
      <div className="glass-soft mx-auto max-w-6xl overflow-hidden" style={{ borderRadius: 9999 }}>
        <div className="flex animate-marquee whitespace-nowrap py-1.5 text-[11px] font-medium tracking-wide text-[#1C1410]/80">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="px-8">{text}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
