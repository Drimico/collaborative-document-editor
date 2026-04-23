import { create } from "zustand";

interface AutosaveStore {
  status: "idle" | "saving" | "saved";
  setStatus: (status: "idle" | "saving" | "saved") => void;
}
export const useAutosaveStore = create<AutosaveStore>((set) => ({
  status: "idle",
  setStatus: (status) => set({ status }),
}));
