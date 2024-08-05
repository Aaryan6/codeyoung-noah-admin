import { create } from "zustand";

type Store = {
  database_name: string | null;
  setDatabase: (value: string) => void;
};

const useDatabaseStore = create<Store>()((set) => ({
  database_name: null,
  setDatabase: (value) => set({ database_name: value }),
}));

export default useDatabaseStore;
