import { Url } from "@/types/Url.type";
import { create } from "zustand";

type AuthState = {
  url: Url | null;
  setUrl: (url: Url | null) => void;
};

const useUrlStore = create<AuthState>()((set) => ({
  url: null,
  setUrl(url) {
    set(() => ({ url }));
  },
}));

export default useUrlStore;
