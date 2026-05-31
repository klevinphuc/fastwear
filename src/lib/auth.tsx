import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AuthContext,
  type AuthContextValue,
  type AuthUser,
  type LoginInput,
  type RegisterInput,
} from "@/lib/auth-context";

const AUTH_SESSION_KEY = "fastwear.auth.session.v1";
const AUTH_USERS_KEY = "fastwear.auth.users.v1";

type StoredUser = AuthUser & {
  password: string;
};

type RegisterResponse = {
  user?: AuthUser;
  mailSent?: boolean;
  message?: string;
};

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function createFallbackId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `user-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeUser(value: unknown): AuthUser | null {
  if (!isRecord(value)) return null;

  if (
    !hasText(value.id) ||
    !hasText(value.fullName) ||
    !hasText(value.phone) ||
    !hasText(value.email)
  ) {
    return null;
  }

  return {
    id: value.id,
    fullName: value.fullName,
    phone: value.phone,
    email: normalizeEmail(value.email),
    fastCoin:
      typeof value.fastCoin === "number" && Number.isFinite(value.fastCoin) ? value.fastCoin : 0,
  };
}

function normalizeStoredUser(value: unknown): StoredUser | null {
  const user = normalizeUser(value);
  if (!user || !isRecord(value) || !hasText(value.password)) return null;

  return {
    ...user,
    password: value.password,
  };
}

function readStoredUsers() {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(AUTH_USERS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((item) => {
      const normalized = normalizeStoredUser(item);
      return normalized ? [normalized] : [];
    });
  } catch {
    return [];
  }
}

function writeStoredUsers(users: StoredUser[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function readSessionUser() {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    return normalizeUser(JSON.parse(raw));
  } catch {
    return null;
  }
}

function writeSessionUser(user: AuthUser | null) {
  if (!isBrowser()) return;

  if (!user) {
    window.localStorage.removeItem(AUTH_SESSION_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
}

function toPublicUser(user: StoredUser): AuthUser {
  return {
    id: user.id,
    fullName: user.fullName,
    phone: user.phone,
    email: user.email,
    fastCoin: user.fastCoin,
  };
}

async function readJsonResponse(response: Response): Promise<RegisterResponse> {
  try {
    return (await response.json()) as RegisterResponse;
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(readSessionUser());
    setIsReady(true);
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const email = normalizeEmail(input.email);
    const password = input.password;
    const matchedUser = readStoredUsers().find(
      (storedUser) => storedUser.email === email && storedUser.password === password,
    );

    if (!matchedUser) {
      throw new Error("Email hoặc mật khẩu chưa đúng.");
    }

    const publicUser = toPublicUser(matchedUser);
    writeSessionUser(publicUser);
    setUser(publicUser);
    return publicUser;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const existingUsers = readStoredUsers();
    const email = normalizeEmail(input.email);

    if (existingUsers.some((storedUser) => storedUser.email === email)) {
      throw new Error("Email này đã được đăng ký.");
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: input.fullName.trim(),
        phone: input.phone.trim(),
        email,
        password: input.password,
      }),
    });

    const payload = await readJsonResponse(response);

    if (!response.ok) {
      throw new Error(payload.message || "Chưa thể đăng ký tài khoản. Bạn thử lại sau nhé.");
    }

    const registeredUser = normalizeUser(payload.user) ?? {
      id: createFallbackId(),
      fullName: input.fullName.trim(),
      phone: input.phone.trim(),
      email,
      fastCoin: 0,
    };
    const storedUser: StoredUser = {
      ...registeredUser,
      password: input.password,
    };

    writeStoredUsers([...existingUsers, storedUser]);
    writeSessionUser(registeredUser);
    setUser(registeredUser);
    return registeredUser;
  }, []);

  const logout = useCallback(() => {
    writeSessionUser(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [isReady, login, logout, register, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
