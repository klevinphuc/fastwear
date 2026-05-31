import { Link } from "@tanstack/react-router";

const footerBadges = ["Vệ sinh chuẩn", "Tư vấn size", "Giao nhận hẹn giờ"];

export function Footer() {
  return (
    <footer className="relative mt-28 border-t border-[#d8cdb5]/70 bg-[#f7f1e5]/82 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-16">
          <div className="max-w-sm">
            <div className="font-serif text-2xl font-medium tracking-[0.12em] text-[#1c1a16]">
              FASTWear
            </div>
            <p className="mt-4 text-sm leading-6 text-[#5f625c]">
              Hệ sinh thái thời trang O2O giúp bạn thuê trang phục phù hợp cho những dịp quan trọng,
              với thông tin rõ ràng từ online đến showroom.
            </p>
            <p className="mt-4 text-sm font-medium leading-6 text-[#403b34]">
              Địa chỉ: 15, D5, phường Thạnh Mỹ Tây, TP.HCM
            </p>
            <p className="mt-2 text-sm font-medium leading-6 text-[#403b34]">
              Email: fastwear.rent@contact.com
            </p>
            <div className="footer-badge-grid">
              {footerBadges.map((badge) => (
                <div className="footer-badge" key={badge}>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#8b7650]">
              FASTWear
            </h4>
            <ul className="space-y-3 text-sm text-[#5f625c]">
              <li>
                <Link className="transition hover:text-[#1d4e3f]" to="/about">
                  Câu chuyện thương hiệu
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#1d4e3f]" to="/categories">
                  Tìm trang phục cho sự kiện
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-[#1d4e3f]" to="/policy">
                  Chính sách thuê
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#8b7650]">
              Hỗ trợ
            </h4>
            <ul className="space-y-3 text-sm text-[#5f625c]">
              <li>Hotline: 0909-FAST-WR</li>
              <li>fastwear.rent@contact.com</li>
              <li>support@fastwear.vn</li>
              <li>
                <Link className="transition hover:text-[#1d4e3f]" to="/policy">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#8b7650]">
              Theo dõi
            </h4>
            <ul className="space-y-3 text-sm text-[#5f625c]">
              <li>Instagram</li>
              <li>TikTok</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#d8cdb5]/70 py-5 text-xs text-[#6d675c] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} FASTWear. Thành lập tại Sài Gòn.</span>
          <span>Thuê đẹp hơn, dùng lâu hơn, lãng phí ít hơn.</span>
        </div>
      </div>
    </footer>
  );
}
