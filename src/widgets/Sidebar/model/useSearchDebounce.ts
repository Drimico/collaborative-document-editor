import { useEffect, useState } from "react";

export const useSearchDebounce = (search: string) => {
  const [debounced, setDebounced] = useState(search);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounced(search);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);
  return { debounced };
};
