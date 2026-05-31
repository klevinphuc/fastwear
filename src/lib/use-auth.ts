import { useContext } from "react";
import { AuthContext, type AuthUser } from "@/lib/auth-context";

export function getUserInitials(user: Pick<AuthUser, "fullName" | "email">) {
  const words = user.fullName.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return user.email.charAt(0).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
