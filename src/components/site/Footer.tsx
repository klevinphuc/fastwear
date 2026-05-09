import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative mt-24 px-4 pb-6">
      <div className="glass-strong mx-auto max-w-7xl">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4 md:px-8">
        <div>
          <div className="font-serif text-xl tracking-[0.25em]">FASTWEAR</div>
          <p className="mt-3 text-sm text-muted-foreground">
            Mặc thời trang. Giảm rác thải. Cho phái đẹp & quý ông Việt 18–35.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Về FASTWear</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about">Câu chuyện thương hiệu</Link></li>
            <li><Link to="/policy">Chính sách thuê</Link></li>
            <li><Link to="/about">Tuyển dụng</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Hỗ trợ</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Hotline: 0909-FAST-WR</li>
            <li>support@fastwear.vn</li>
            <li><Link to="/policy">Câu hỏi thường gặp</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Theo dõi</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Instagram</li>
            <li>TikTok</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-[#1C1410]/60">
        © {new Date().getFullYear()} FASTWear. Made with love in Sài Gòn.
      </div>
      </div>
    </footer>
  );
}
