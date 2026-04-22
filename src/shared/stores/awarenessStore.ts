import { create } from "zustand";
import { persist } from "zustand/middleware";
interface AwarenessStoreProps {
  color: string;
  changeColor: (color: string) => void;
}
export const useAwarenessStore = create<AwarenessStoreProps>()(
  persist(
    (set) => ({
      color:
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0"),
      changeColor: (color) => {
        set({ color: color });
      },
    }),
    { name: "awareness" },
  ),
);
