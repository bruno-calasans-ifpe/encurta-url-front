import { User } from "@/types/User.type";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  accessToken: string;
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  accessToken: "",
  login(user, accessToken) {
    set(() => ({ user, accessToken }));
  },
  logout() {
    set(() => ({ user: null, accessToken: "" }));
    localStorage.removeItem("token");
  },
  setToken(token: string) {
    set(() => ({ accessToken: token }));
  },
  setUser(user) {
    set(() => ({ user }));
  },
}));

export default useAuthStore;
