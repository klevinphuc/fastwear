export function AnnouncementBar() {
  const items = [
    "Flash Deal cuối tuần — Còn 02:14:33",
    "Giảm 30% đơn thuê đầu tiên với mã: FASTWEAR30",
    "Miễn phí giao hàng đơn từ 500K",
  ];

  const renderItems = () =>
    Array.from({ length: 4 }).flatMap((_, groupIndex) =>
      items.map((item, itemIndex) => (
        <span className="announcement-item" key={`${groupIndex}-${itemIndex}`}>
          {item}
          <span className="announcement-star" aria-hidden="true">
            ✦
          </span>
        </span>
      )),
    );

  return (
    <div className="announcement-bar">
      <div className="announcement-track">
        <div className="announcement-content">{renderItems()}</div>
        <div className="announcement-content" aria-hidden="true">
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
