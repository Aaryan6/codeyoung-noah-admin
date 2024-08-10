import { create } from "zustand";

type Store = {
  userid: string | null;
  setUser: (value: string) => void;
};

const useUserStore = create<Store>()((set) => ({
  userid: "TFwkXyjDPQ",
  setUser: (value) => set({ userid: value }),
}));

export default useUserStore;
