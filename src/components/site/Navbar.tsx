import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearch, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { AuthModal, type AuthMode } from "./AuthModal";
import { useCart } from "@/lib/cart";
import { getUserInitials, useAuth } from "@/lib/use-auth";

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
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const navRef = useRef<HTMLElement | null>(null);
  const [tabPill, setTabPill] = useState({
    height: 0,
    left: 0,
    top: 0,
    width: 0,
    visible: false,
  });
  const { count } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useSearch({ strict: false }) as { auth?: AuthMode; tab?: string };
  const onHome = pathname === "/";
  const activeTab = onHome ? (search.tab ?? "gioi-thieu") : "";

  useEffect(() => {
    if (search.auth === "login" || search.auth === "register") {
      setAuthMode(search.auth);
      setAuthOpen(true);
    }
  }, [search.auth]);

  const goToTab = (id: string) => {
    setMobileOpen(false);
    navigate({ to: "/", search: { tab: id } });
  };
  const moveTabPill = (button: HTMLButtonElement) => {
    const nav = navRef.current;
    if (!nav) return;

    const navRect = nav.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    setTabPill({
      height: buttonRect.height,
      left: buttonRect.left - navRect.left,
      top: buttonRect.top - navRect.top,
      width: buttonRect.width,
      visible: true,
    });
  };
  const hideTabPill = () => {
    setTabPill((current) => ({ ...current, visible: false }));
  };
  const openAuth = (mode: AuthMode) => {
    setMobileOpen(false);
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 px-3 pb-2 pt-3 sm:px-5 lg:pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-14 items-center justify-between gap-4 rounded-[1.35rem] border border-white/45 bg-white/45 px-3 shadow-[0_18px_45px_rgba(54,47,37,0.10)] backdrop-blur-2xl [-webkit-backdrop-filter:blur(24px)] sm:h-16 sm:px-5 lg:h-[4.25rem] lg:px-7">
            <Link
              to="/"
              search={{ tab: "gioi-thieu" }}
              onClick={() => setMobileOpen(false)}
              className="group flex shrink-0 flex-col leading-tight text-[#1c1a16]"
            >
              <span className="font-serif text-[1.35rem] font-semibold tracking-[0.02em] md:text-[1.55rem]">
                FASTWear
              </span>
              <span className="mt-0.5 hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8b7650] sm:block">
                THUÊ TRANG PHỤC CAO CẤP
              </span>
            </Link>

            <nav
              ref={navRef}
              className="relative hidden h-full flex-1 items-center justify-center gap-1 lg:flex"
              aria-label="Điều hướng chính"
              onMouseLeave={hideTabPill}
            >
              <span
                className="pointer-events-none absolute left-0 top-0 rounded-full border border-[#d8cdb5]/70 bg-[#fbf8ef]/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition-[opacity,transform,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  height: tabPill.height,
                  opacity: tabPill.visible ? 1 : 0,
                  width: tabPill.width,
                  transform: `translate3d(${tabPill.left}px, ${tabPill.top}px, 0)`,
                }}
                aria-hidden
              />
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => goToTab(tab.id)}
                    onFocus={(event) => moveTabPill(event.currentTarget)}
                    onMouseEnter={(event) => moveTabPill(event.currentTarget)}
                    onBlur={hideTabPill}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative z-10 inline-flex h-10 items-center rounded-full px-4 text-[15px] font-semibold transition-colors duration-200 ${
                      isActive ? "text-[#1f4e3d]" : "text-[#403b34] hover:text-[#1f4e3d]"
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/35 text-[#29251f] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition hover:border-[#d8cdb5] hover:bg-white/55 hover:text-[#1d4e3f]"
                aria-label="Tìm kiếm"
              >
                <Search className="h-4 w-4" />
              </Link>
              {isAuthenticated && user ? (
                <>
                  <Link
                    to="/cart"
                    className="hidden h-10 items-center gap-2 rounded-full border border-white/50 bg-white/35 px-3 text-[#29251f] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition hover:border-[#d8cdb5] hover:bg-white/55 hover:text-[#1d4e3f] sm:flex"
                    aria-label="Giỏ thuê"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span className="text-[11px] font-medium tabular-nums">{count}</span>
                  </Link>
                  <Link
                    to="/account"
                    className="hidden h-10 items-center gap-2 rounded-full border border-white/50 bg-white/35 py-1 pl-1 pr-3 text-[#29251f] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition hover:border-[#d8cdb5] hover:bg-white/55 hover:text-[#1d4e3f] lg:inline-flex"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5dedb]/90 text-xs font-bold text-[#1d4e3f]">
                      {getUserInitials(user)}
                    </span>
                    <span className="max-w-28 truncate text-xs font-semibold">{user.fullName}</span>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openAuth("login")}
                    className="group relative hidden h-10 items-center px-2 text-xs font-semibold text-[#403b34] transition-colors duration-200 hover:text-[#1f4e3d] lg:inline-flex"
                  >
                    <span>Đăng nhập</span>
                    <span className="absolute bottom-2 left-1/2 h-px w-[calc(100%-1rem)] origin-center -translate-x-1/2 scale-x-0 bg-[#1f4e3d] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuth("register")}
                    className="hidden h-10 items-center rounded-xl bg-[#1f4e3d] px-4 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(31,78,61,0.22)] transition duration-200 hover:bg-[#28634f] hover:shadow-[0_12px_28px_rgba(31,78,61,0.28)] lg:inline-flex"
                  >
                    Đăng ký
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/35 text-[#29251f] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition hover:border-[#d8cdb5] hover:bg-white/55 hover:text-[#1d4e3f] lg:hidden"
                aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="mt-2 rounded-[1.35rem] border border-white/45 bg-white/52 px-4 py-4 shadow-[0_18px_45px_rgba(54,47,37,0.10)] backdrop-blur-2xl [-webkit-backdrop-filter:blur(24px)] lg:hidden">
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
                {isAuthenticated && user ? (
                  <>
                    <Link
                      to="/account"
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8cdb5] bg-white/70 px-4 py-2.5 text-center text-sm font-semibold text-[#2d2a24]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5dedb] text-xs font-bold text-[#1d4e3f]">
                        {getUserInitials(user)}
                      </span>
                      <span className="truncate">{user.fullName}</span>
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1d4e3f] px-4 py-2.5 text-center text-sm font-semibold text-[#fbf8ef] transition hover:bg-[#173f34]"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Giỏ hàng ({count})
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => openAuth("login")}
                      className="group relative inline-flex justify-center px-4 py-2.5 text-center text-sm font-semibold text-[#565149] transition-colors hover:text-[#1f4e3d]"
                    >
                      <span>Đăng nhập</span>
                      <span className="absolute bottom-1.5 left-1/2 h-px w-16 origin-center -translate-x-1/2 scale-x-0 bg-[#1f4e3d] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openAuth("register")}
                      className="rounded-xl bg-[#1f4e3d] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_8px_18px_rgba(31,78,61,0.16)] transition duration-200 hover:bg-[#28634f] hover:shadow-[0_10px_22px_rgba(31,78,61,0.22)]"
                    >
                      Đăng ký
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        open={authOpen}
        mode={authMode}
        onOpenChange={setAuthOpen}
        onModeChange={setAuthMode}
        onSuccess={() => {
          if (pathname === "/" && search.auth) {
            navigate({ to: "/", search: { tab: search.tab ?? "gioi-thieu" }, replace: true });
          }
        }}
      />
    </>
  );
}
