import { create } from "zustand";

type ConfirmState = {
  isOpen: boolean;
  message: string;
  resolve: ((value: boolean) => void) | null;
  requestConfirm: (message: string) => Promise<boolean>;
  close: (value: boolean) => void;
};

export const useConfirmStore = create<ConfirmState>((set, get) => ({
  isOpen: false,
  message: "",
  resolve: null,
  requestConfirm: (message) => {
    return new Promise((resolve) => {
      set({ isOpen: true, message, resolve });
    });
  },
  close: (value) => {
    const currentResolve = get().resolve;
    set({ isOpen: false, message: "", resolve: null });
    currentResolve?.(value);
  },
}));