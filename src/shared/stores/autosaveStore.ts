import { create } from "zustand";

interface AutosaveStore {
  status: "saving" | "saved";
  lastUpdated: number;
  setStatus: (status: "saving" | "saved") => void;
  setLastUpdated: () => void;
}
export const useAutosaveStore = create<AutosaveStore>((set) => ({
  lastUpdated: 0,
  status: "saved",
  setStatus: (status) => set({ status }),
  setLastUpdated: () => set({ lastUpdated: Date.now() }),
}));
