import { Link, useNavigate, useSearch, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { PillTabs } from "./PillTabs";

const tabs = [
  { id: "gioi-thieu", label: "Giới thiệu" },
  { id: "nu", label: "Nữ" },
  { id: "nam", label: "Nam" },
  { id: "phu-kien", label: "Phụ kiện" },
  { id: "lookbook", label: "Lookbook" },
  { id: "sale", label: "Sale" },
];

export function Navbar() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useSearch({ strict: false }) as { tab?: string };
  const onHome = pathname === "/";
  const activeTab = onHome ? (search.tab ?? "gioi-thieu") : "";

  return (
    <header className="sticky top-3 z-40 px-4">
      <div className="glass-strong mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5">
        <Link to="/" search={{ tab: "gioi-thieu" }} className="font-serif text-2xl tracking-tight text-[#1C1410]">
          FASTWear
        </Link>

        <div className="hidden md:block">
          <PillTabs
            layoutId="navbar-tab"
            active={activeTab}
            onChange={(id) => navigate({ to: "/", search: { tab: id } })}
            tabs={tabs}
          />
        </div>

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
