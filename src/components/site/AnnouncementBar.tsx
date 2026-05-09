export function AnnouncementBar() {
  const text = "Giảm 30% đơn thuê đầu tiên với mã: FASTWEAR30 ✦ Miễn phí giao hàng đơn từ 500K ✦ Flash Deal cuối tuần — Còn 02:14:33";
  return (
    <div className="overflow-hidden bg-[color:var(--blush)] text-foreground">
      <div className="flex animate-marquee whitespace-nowrap py-2 text-xs font-medium tracking-wide">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="px-8">{text}</span>
        ))}
      </div>
    </div>
  );
}
