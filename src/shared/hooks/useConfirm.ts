import { useConfirmStore } from "../stores/confirmStore";

export const useConfirm = () => {
  const requestConfirm = useConfirmStore((state) => state.requestConfirm);
  return { confirm: requestConfirm };
};