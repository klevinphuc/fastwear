import { Link, useNavigate, useSearch, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { PillTabs } from "./PillTabs";

const tabs = [
  { id: "gioi-thieu", label: "Giới thiệu" },
  { id: "nu", label: "Nữ" },
  { id: "nam", label: "Nam" },
  { id: "phu-kien", label: "Phụ kiện" },
  { id: "lookbook", label: "Phối đồ" },
  { id: "sale", label: "Ưu đãi" },
];

export function Navbar() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useSearch({ strict: false }) as { tab?: string };
  const onHome = pathname === "/";
  const activeTab = onHome ? (search.tab ?? "gioi-thieu") : "";

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8cdb5]/70 bg-[#fbf8ef]/88 px-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-3.5">
        <Link to="/" search={{ tab: "gioi-thieu" }} className="group flex flex-col leading-tight text-[#1c1a16]">
          <span className="font-serif text-[1.55rem] font-medium tracking-[0.02em]">FASTWear</span>
          <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.28em] text-[#8b7650] sm:block">
            Thuê trang phục cao cấp
          </span>
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
          <Link to="/account" className="hidden rounded-full px-3 py-2 text-xs font-medium text-[#565149] transition hover:text-[#1d4e3f] md:inline-block">
            Đăng nhập
          </Link>
          <Link
            to="/account"
            className="rounded-full bg-[#1d4e3f] px-4 py-2.5 text-xs font-semibold text-[#fbf8ef] transition hover:bg-[#173f34]"
          >
            Bắt đầu thuê
          </Link>
        </div>
      </div>

      <nav className="-mx-4 flex gap-2 overflow-x-auto border-t border-[#e7ddc8]/70 px-4 py-2 md:hidden">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigate({ to: "/", search: { tab: tab.id } })}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                isActive
                  ? "bg-[#1d4e3f] text-[#fbf8ef]"
                  : "border border-[#d8cdb5] bg-white/60 text-[#565149]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
