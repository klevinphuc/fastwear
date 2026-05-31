import { createContext } from "react";

export type AuthUser = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  fastCoin: number;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
};

export type AuthContextValue = {
  user: AuthUser | null;
  isReady: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
