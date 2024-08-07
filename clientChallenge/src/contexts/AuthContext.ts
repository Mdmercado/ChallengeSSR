import { create } from "zustand";
import { AuthState } from "../types/auth";
import { UserPayload } from "../types/user";

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  hasSeenInactiveAlert: false,
  setAuth: (token: string, user: UserPayload) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user });
  },
  setHasSeenInactiveAlert: (hasSeen: boolean) => {
    set({ hasSeenInactiveAlert: hasSeen });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));
