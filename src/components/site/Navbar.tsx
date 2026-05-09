import { Link, useLocation } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";

const tabs = [
  { to: "/categories", label: "Nữ", q: "nu" },
  { to: "/categories", label: "Nam", q: "nam" },
  { to: "/categories", label: "Phụ kiện", q: "phu-kien" },
  { to: "/about", label: "Lookbook" },
  { to: "/categories", label: "Sale", q: "sale" },
];

export function Navbar() {
  const loc = useLocation();
  return (
    <header className="sticky top-3 z-40 px-4">
      <div className="glass-strong mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5">
        <Link to="/" className="font-serif text-2xl tracking-tight text-[#1C1410]">
          FASTWear
        </Link>

        <nav className="hidden items-center gap-1 rounded-full bg-white/30 p-1 md:flex">
          {tabs.map((t) => {
            const active = loc.pathname === t.to && (!t.q || loc.search?.includes(t.q));
            return (
              <Link
                key={t.label}
                to={t.to}
                className="pill-tab"
                data-active={active ? "true" : "false"}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/search" className="glass-soft flex h-9 w-9 items-center justify-center text-[#1C1410]/80 hover:text-[#6B1A33]" aria-label="Tìm kiếm">
            <Search className="h-4 w-4" />
          </Link>
          <Link to="/cart" className="glass-soft flex h-9 items-center gap-2 px-3 text-[#1C1410]/80 hover:text-[#6B1A33]" aria-label="Giỏ">
            <ShoppingBag className="h-4 w-4" />
            <span className="font-mono text-[11px]">0</span>
          </Link>
          <Link to="/account" className="hidden rounded-full px-3 py-1.5 text-xs text-[#1C1410]/80 hover:text-[#6B1A33] md:inline-block">
            Đăng nhập
          </Link>
          <Link
            to="/account"
            className="rounded-full bg-[#6B1A33] px-4 py-2 text-xs font-medium text-white shadow-md transition hover:bg-[#8B2442]"
          >
            Tham gia
          </Link>
        </div>
      </div>
    </header>
  );
}
