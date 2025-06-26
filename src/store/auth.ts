import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/responses/Login";

export type AuthState = {
  token: string | null | undefined;
  setToken: (token: string) => void;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  validateToken: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token: string) => set({ token }),
      user: null,
      setUser: (user: User) => set({ user }),

      logout: async () => {
        set({ token: null, user: null });
      },
      validateToken: async () => {
        const token = get().token;
        if (!token) return false;

        try {
          const decoded = jwtDecode(token); // Mencoba mendekode token
          return !!decoded; // Jika berhasil, return true (token valid)
        } catch (err) {
          return false; // Jika gagal (token tidak valid), return false
        }
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
