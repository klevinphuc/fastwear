export function AnnouncementBar() {
  const text = "Tư vấn chọn size và phối đồ miễn phí · Giao nhận nội thành trong ngày cho lịch thuê phù hợp · Vệ sinh chuẩn chăm sóc trang phục cao cấp";

  return (
    <div className="relative z-30 border-b border-[#d8cdb5]/70 bg-[#fbf8ef]/85 px-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-center py-2 text-center text-[11px] font-medium leading-5 tracking-[0.08em] text-[#5f625c]">
        <span>{text}</span>
      </div>
    </div>
  );
}
