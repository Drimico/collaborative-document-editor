import { create } from "zustand";

interface DocumentInvalidationStore {
  version: number;
  invalidate: () => void;
}

export const useDocumentInvalidationStore = create<DocumentInvalidationStore>((set) => ({
  version: 0,
  invalidate: () => set((state) => ({ version: state.version + 1 })),
}));
