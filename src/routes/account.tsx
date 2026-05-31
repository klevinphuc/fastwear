import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ProtectedRoute } from "@/components/site/ProtectedRoute";
import { getUserInitials, useAuth } from "@/lib/use-auth";
import { calculateRentalPrice, products, formatVND } from "@/lib/products";

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const active = products.slice(0, 2);
  const history = products.slice(2, 5);

  return (
    <SiteShell>
      <ProtectedRoute>
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <h1 className="font-serif text-4xl md:text-5xl">Tài khoản của tôi</h1>

          {user && (
            <div className="mt-8 grid gap-8 md:grid-cols-[280px_1fr]">
              <aside className="space-y-4 rounded-2xl bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--blush)] font-serif text-primary">
                    {getUserInitials(user)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-serif text-lg">{user.fullName}</div>
                    <div className="truncate text-xs text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="rounded-xl bg-[color:var(--cream)] p-4">
                  <div className="text-xs text-muted-foreground">FASTCoin</div>
                  <div className="font-serif text-3xl text-primary">
                    {new Intl.NumberFormat("vi-VN").format(user.fastCoin)}
                  </div>
                </div>
                <ul className="space-y-1 text-sm">
                  {["Hồ sơ", "Đơn đang thuê", "Lịch sử", "Tiền cọc", "Wishlist"].map((m) => (
                    <li key={m} className="rounded-md px-3 py-2 hover:bg-accent">
                      {m}
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        navigate({ to: "/", search: { tab: "gioi-thieu" }, replace: true });
                      }}
                      className="w-full rounded-md px-3 py-2 text-left transition hover:bg-accent"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </aside>

              <div className="space-y-8">
                <section className="rounded-2xl bg-card p-6">
                  <h2 className="font-serif text-2xl">Hồ sơ</h2>
                  <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                    <Field label="Họ tên" v={user.fullName} />
                    <Field label="SĐT" v={user.phone} />
                    <Field label="Email" v={user.email} />
                    <Field label="Hạng thành viên" v="FASTWear Member" />
                    <Field label="Ngân hàng" v="Chưa cập nhật" />
                    <Field label="Số tài khoản" v="Chưa cập nhật" />
                  </div>
                </section>

                <section className="rounded-2xl bg-card p-6">
                  <h2 className="font-serif text-2xl">Đang thuê</h2>
                  <div className="mt-4 space-y-3">
                    {active.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-4 rounded-xl border border-border p-3"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-serif">{p.name}</div>
                          <div className="text-xs text-muted-foreground">Trả trong 3 ngày</div>
                        </div>
                        <span className="rounded-full bg-[color:var(--blush)] px-3 py-1 text-xs text-primary">
                          Đang giao
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl bg-card p-6">
                  <h2 className="font-serif text-2xl">Lịch sử thuê</h2>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[520px] text-sm">
                      <thead className="text-left text-muted-foreground">
                        <tr>
                          <th className="py-2">Sản phẩm</th>
                          <th>Ngày</th>
                          <th>Tổng</th>
                          <th>Cọc</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((h) => (
                          <tr key={h.id} className="border-t border-border">
                            <td className="py-3">{h.name}</td>
                            <td>04/2026</td>
                            <td>{formatVND(calculateRentalPrice(h.price, 4))}</td>
                            <td className="text-primary">Đã hoàn</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </ProtectedRoute>
    </SiteShell>
  );
}

function Field({ label, v }: { label: string; v: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div>{v}</div>
    </div>
  );
}
