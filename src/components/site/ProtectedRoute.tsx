import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { useAuth } from "@/lib/use-auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      navigate({ to: "/", search: { auth: "login" }, replace: true });
    }
  }, [isAuthenticated, isReady, navigate]);

  if (!isReady) {
    return (
      <div className="mx-auto flex min-h-[42vh] max-w-7xl items-center justify-center px-4 py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d8cdb5] border-t-[#1d4e3f]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto flex min-h-[42vh] max-w-7xl items-center justify-center px-4 py-16">
        <div className="max-w-sm rounded-2xl border border-[#eadfca] bg-white/75 p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f3eee3] text-[#1d4e3f]">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <h1 className="mt-4 font-serif text-2xl">Cần đăng nhập</h1>
          <p className="mt-2 text-sm leading-6 text-[#6a6258]">
            FASTWear đang chuyển bạn về form đăng nhập để bảo vệ thông tin tài khoản.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
