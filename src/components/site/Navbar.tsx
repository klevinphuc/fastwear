import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User } from "lucide-react";

const navLinks = [
  { to: "/categories", label: "Tất Cả" },
  { to: "/categories?c=new", label: "Mới Về" },
  { to: "/categories?c=dam-du-tiec", label: "Đầm Dự Tiệc" },
  { to: "/categories?c=cong-so", label: "Công Sở" },
  { to: "/categories?c=ao-dai", label: "Áo Dài" },
  { to: "/categories?c=suit-nam", label: "Suit Nam" },
  { to: "/categories?c=phu-kien", label: "Phụ Kiện" },
  { to: "/policy", label: "Chính Sách" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 glass border-x-0 border-t-0 rounded-none">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <Link to="/about" className="hidden text-sm text-foreground/70 hover:text-primary md:inline">
            Cách hoạt động
          </Link>
          <Link to="/search" className="rounded-full p-2 hover:bg-accent" aria-label="Tìm kiếm">
            <Search className="h-4 w-4" />
          </Link>
        </div>
        <Link to="/" className="font-serif text-2xl tracking-[0.25em] text-foreground">
          FASTWEAR
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/cart" className="rounded-full p-2 hover:bg-accent" aria-label="Giỏ">
            <ShoppingBag className="h-4 w-4" />
          </Link>
          <Link
            to="/account"
            className="hidden rounded-full p-2 hover:bg-accent md:inline-flex"
            aria-label="Tài khoản"
          >
            <User className="h-4 w-4" />
          </Link>
          <Link
            to="/account"
            className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            Đăng Ký
          </Link>
        </div>
      </div>
      <nav className="border-t border-white/10">
        <ul className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-3 text-xs uppercase tracking-wider md:px-8">
          {navLinks.map((l) => (
            <li key={l.to + l.label} className="whitespace-nowrap">
              <Link
                to={l.to}
                className="text-foreground/80 transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
