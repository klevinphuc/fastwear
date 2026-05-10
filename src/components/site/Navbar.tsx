import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { PillTabs } from "./PillTabs";

const tabs = [
  { id: "nu", label: "Nữ", to: "/categories", q: "nu" },
  { id: "nam", label: "Nam", to: "/categories", q: "nam" },
  { id: "phu-kien", label: "Phụ kiện", to: "/categories", q: "phu-kien" },
  { id: "lookbook", label: "Lookbook", to: "/about", q: undefined as string | undefined },
  { id: "sale", label: "Sale", to: "/categories", q: "sale" },
];

export function Navbar() {
  const [activeTab, setActiveTab] = useState("nu");
  const navigate = useNavigate();

  return (
    <header className="sticky top-3 z-40 px-4">
      <div className="glass-strong mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5">
        <Link to="/" className="font-serif text-2xl tracking-tight text-[#1C1410]">
          FASTWear
        </Link>

        <div className="hidden md:block">
          <PillTabs
            layoutId="navbar-tab"
            active={activeTab}
            onChange={(id) => {
              setActiveTab(id);
              const t = tabs.find((x) => x.id === id);
              if (t) navigate({ to: t.to });
            }}
            tabs={tabs.map(({ id, label }) => ({ id, label }))}
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
