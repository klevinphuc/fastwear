import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2, LogIn, UserPlus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/use-auth";

export type AuthMode = "login" | "register";

type AuthModalProps = {
  open: boolean;
  mode: AuthMode;
  onOpenChange: (open: boolean) => void;
  onModeChange: (mode: AuthMode) => void;
  onSuccess?: () => void;
};

type LoginForm = {
  email: string;
  password: string;
};

type RegisterForm = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialLoginForm: LoginForm = {
  email: "",
  password: "",
};

const initialRegisterForm: RegisterForm = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function sanitizePhone(value: string) {
  return value.replace(/[^\d+\s]/g, "").slice(0, 16);
}

export function AuthModal({ open, mode, onOpenChange, onModeChange, onSuccess }: AuthModalProps) {
  const { login, register } = useAuth();
  const [loginForm, setLoginForm] = useState<LoginForm>(initialLoginForm);
  const [registerForm, setRegisterForm] = useState<RegisterForm>(initialRegisterForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!open) {
      setError("");
      setIsSubmitting(false);
      setShowPassword(false);
    }
  }, [open]);

  const title = mode === "login" ? "Đăng nhập" : "Đăng ký tài khoản";
  const description =
    mode === "login"
      ? "Đăng nhập để xem hồ sơ, đơn thuê và FASTCoin của bạn."
      : "Tạo tài khoản FASTWear để quản lý đơn thuê và nhận email xác nhận.";
  const passwordType = showPassword ? "text" : "password";
  const ctaLabel = useMemo(() => {
    if (isSubmitting) return mode === "login" ? "Đang đăng nhập..." : "Đang đăng ký...";
    return mode === "login" ? "Đăng nhập" : "Đăng ký";
  }, [isSubmitting, mode]);

  const switchMode = (nextMode: AuthMode) => {
    setError("");
    setShowPassword(false);
    onModeChange(nextMode);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!isEmail(loginForm.email)) {
      setError("Bạn nhập email hợp lệ giúp FASTWear nhé.");
      return;
    }

    if (!loginForm.password) {
      setError("Bạn chưa nhập mật khẩu.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(loginForm);
      toast.success("Đăng nhập thành công.");
      onOpenChange(false);
      onSuccess?.();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Chưa thể đăng nhập.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (registerForm.fullName.trim().length < 2) {
      setError("Bạn nhập họ tên đầy đủ giúp FASTWear nhé.");
      return;
    }

    if (registerForm.phone.trim().length < 9) {
      setError("Số điện thoại cần có ít nhất 9 chữ số.");
      return;
    }

    if (!isEmail(registerForm.email)) {
      setError("Email chưa đúng định dạng.");
      return;
    }

    if (registerForm.password.length < 6) {
      setError("Mật khẩu cần tối thiểu 6 ký tự.");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Mật khẩu nhập lại chưa khớp.");
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        fullName: registerForm.fullName,
        phone: registerForm.phone,
        email: registerForm.email,
        password: registerForm.password,
      });
      toast.success("Đăng ký thành công! FASTWear đã gửi email xác nhận đến hộp thư của bạn.");
      onOpenChange(false);
      onSuccess?.();
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : "Chưa thể đăng ký.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-[28rem] overflow-y-auto rounded-[1.5rem] border-[#ded3bd] bg-[#fffdfa] p-0 shadow-2xl">
        <div className="border-b border-[#eadfca] px-6 pb-5 pt-6">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-[#1c1a16]">{title}</DialogTitle>
            <DialogDescription className="leading-6 text-[#6a6258]">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 grid grid-cols-2 rounded-full bg-[#f3eee3] p-1">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`inline-flex h-10 items-center justify-center rounded-full text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-white text-[#1d4e3f] shadow-sm"
                  : "text-[#6a6258] hover:text-[#1d4e3f]"
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`inline-flex h-10 items-center justify-center rounded-full text-sm font-semibold transition ${
                mode === "register"
                  ? "bg-white text-[#1d4e3f] shadow-sm"
                  : "text-[#6a6258] hover:text-[#1d4e3f]"
              }`}
            >
              Đăng ký
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 pt-5">
          {mode === "login" ? (
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={loginForm.email}
                  onChange={(event) =>
                    setLoginForm((current) => ({ ...current, email: event.target.value }))
                  }
                  className="h-11 rounded-xl bg-white"
                  placeholder="ban@fastwear.vn"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={passwordType}
                    autoComplete="current-password"
                    value={loginForm.password}
                    onChange={(event) =>
                      setLoginForm((current) => ({ ...current, password: event.target.value }))
                    }
                    className="h-11 rounded-xl bg-white pr-11"
                    placeholder="Nhập mật khẩu"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#6a6258] hover:bg-[#f3eee3]"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1d4e3f] px-4 text-sm font-semibold text-[#fbf8ef] transition hover:bg-[#173f34] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                {ctaLabel}
              </button>

              <p className="text-center text-sm text-[#6a6258]">
                Chưa có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="font-semibold text-[#1d4e3f] hover:underline"
                >
                  Đăng ký ngay
                </button>
              </p>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="space-y-2">
                <Label htmlFor="register-full-name">Họ tên</Label>
                <Input
                  id="register-full-name"
                  autoComplete="name"
                  value={registerForm.fullName}
                  onChange={(event) =>
                    setRegisterForm((current) => ({ ...current, fullName: event.target.value }))
                  }
                  className="h-11 rounded-xl bg-white"
                  placeholder="Nguyễn Mai Linh"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-phone">SĐT</Label>
                <Input
                  id="register-phone"
                  inputMode="tel"
                  autoComplete="tel"
                  value={registerForm.phone}
                  onChange={(event) =>
                    setRegisterForm((current) => ({
                      ...current,
                      phone: sanitizePhone(event.target.value),
                    }))
                  }
                  className="h-11 rounded-xl bg-white"
                  placeholder="0909 123 456"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  value={registerForm.email}
                  onChange={(event) =>
                    setRegisterForm((current) => ({ ...current, email: event.target.value }))
                  }
                  className="h-11 rounded-xl bg-white"
                  placeholder="ban@fastwear.vn"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="register-password">Mật khẩu</Label>
                  <Input
                    id="register-password"
                    type={passwordType}
                    autoComplete="new-password"
                    value={registerForm.password}
                    onChange={(event) =>
                      setRegisterForm((current) => ({ ...current, password: event.target.value }))
                    }
                    className="h-11 rounded-xl bg-white"
                    placeholder="Tối thiểu 6 ký tự"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Nhập lại mật khẩu</Label>
                  <Input
                    id="register-confirm-password"
                    type={passwordType}
                    autoComplete="new-password"
                    value={registerForm.confirmPassword}
                    onChange={(event) =>
                      setRegisterForm((current) => ({
                        ...current,
                        confirmPassword: event.target.value,
                      }))
                    }
                    className="h-11 rounded-xl bg-white"
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#6a6258] hover:text-[#1d4e3f]"
              >
                {showPassword ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
                {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              </button>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1d4e3f] px-4 text-sm font-semibold text-[#fbf8ef] transition hover:bg-[#173f34] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                {ctaLabel}
              </button>

              <p className="text-center text-sm text-[#6a6258]">
                Đã có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-semibold text-[#1d4e3f] hover:underline"
                >
                  Đăng nhập
                </button>
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
