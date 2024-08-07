import { create } from "zustand";

type Store = {
  from: Date | undefined;
  to: Date | undefined;
  setDates: (value: { from: Date | undefined; to: Date | undefined }) => void;
  resetDates: () => void;
};

const useDateRange = create<Store>()((set) => ({
  from: undefined,
  to: undefined,
  setDates: (value) => set(value),
  resetDates: () => set({ from: undefined, to: undefined }),
}));

export default useDateRange;
