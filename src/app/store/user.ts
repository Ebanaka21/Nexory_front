import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser, registerUser, logoutUser } from "@/utils/auth";

interface UserState {
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      loading: false,

      login: async (email, password) => {
        set({ loading: true });
        const token = await loginUser(email, password);
        set({ token, loading: false });
      },

      register: async (email, password) => {
        set({ loading: true });
        const token = await registerUser(email, password);
        set({ token, loading: false });
      },

      logout: () => {
        logoutUser();
        set({ token: null });
      },
    }),
    { name: "nexory-user" }
  )
);
