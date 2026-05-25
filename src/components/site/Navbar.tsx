import { useState } from "react";
import { Link, useNavigate, useSearch, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";

const tabs = [
  { id: "gioi-thieu", label: "Giới thiệu" },
  { id: "nu", label: "Nữ" },
  { id: "nam", label: "Nam" },
  { id: "phu-kien", label: "Phụ kiện" },
  { id: "lookbook", label: "Phối đồ" },
  { id: "sale", label: "Ưu đãi" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useSearch({ strict: false }) as { tab?: string };
  const onHome = pathname === "/";
  const activeTab = onHome ? (search.tab ?? "gioi-thieu") : "";
  const goToTab = (id: string) => {
    setMobileOpen(false);
    navigate({ to: "/", search: { tab: id } });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8cdb5]/70 bg-[#fbf8ef]/95 px-4 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5 lg:h-20">
        <Link
          to="/"
          search={{ tab: "gioi-thieu" }}
          onClick={() => setMobileOpen(false)}
          className="group flex shrink-0 flex-col leading-tight text-[#1c1a16]"
        >
          <span className="font-serif text-[1.55rem] font-medium tracking-[0.02em] md:text-[1.7rem]">
            FASTWear
          </span>
          <span className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8b7650] sm:block">
            THUÊ TRANG PHỤC CAO CẤP
          </span>
        </Link>

        <nav className="hidden h-full flex-1 items-stretch justify-center gap-8 xl:gap-10 lg:flex" aria-label="Điều hướng chính">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => goToTab(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative inline-flex h-full items-center text-[15px] font-medium transition-colors after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:origin-left after:bg-[#043927] after:transition-transform after:duration-200 ${
                  isActive
                    ? "text-[#043927] after:scale-x-100"
                    : "text-[#565149] after:scale-x-0 hover:text-[#043927] hover:after:scale-x-100"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/search"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8cdb5] bg-white/70 text-[#29251f] transition hover:border-[#b99a55] hover:text-[#1d4e3f]"
            aria-label="Tìm kiếm"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            to="/cart"
            className="flex h-10 items-center gap-2 rounded-full border border-[#d8cdb5] bg-white/70 px-3 text-[#29251f] transition hover:border-[#b99a55] hover:text-[#1d4e3f]"
            aria-label="Giỏ thuê"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="text-[11px] font-medium tabular-nums">0</span>
          </Link>
          <Link
            to="/account"
            className="hidden rounded-full px-3 py-2 text-xs font-medium text-[#565149] transition hover:text-[#1d4e3f] lg:inline-block"
          >
            Đăng nhập
          </Link>
          <Link
            to="/account"
            className="hidden rounded-full bg-[#1d4e3f] px-4 py-2.5 text-xs font-semibold text-[#fbf8ef] transition hover:bg-[#173f34] lg:inline-flex"
          >
            Bắt đầu thuê
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8cdb5] bg-white/70 text-[#29251f] transition hover:border-[#b99a55] hover:text-[#1d4e3f] lg:hidden"
            aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="-mx-4 border-t border-[#e7ddc8]/80 bg-[#fbf8ef]/98 px-4 py-4 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Điều hướng di động">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => goToTab(tab.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between border-b border-[#e7ddc8]/75 py-3 text-left text-sm font-medium transition ${
                    isActive ? "text-[#1d4e3f]" : "text-[#565149] hover:text-[#1d4e3f]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && <span className="h-px w-8 bg-[#1d4e3f]" />}
                </button>
              );
            })}
          </nav>

          <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-2 sm:flex-row">
            <Link
              to="/account"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-[#d8cdb5] bg-white/60 px-4 py-2.5 text-center text-sm font-medium text-[#565149]"
            >
              Đăng nhập
            </Link>
            <Link
              to="/account"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-[#1d4e3f] px-4 py-2.5 text-center text-sm font-semibold text-[#fbf8ef] transition hover:bg-[#173f34]"
            >
              Bắt đầu thuê
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
