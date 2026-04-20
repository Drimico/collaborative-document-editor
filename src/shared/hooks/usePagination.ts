import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(0);
  const offset = 12;
  const start = page * offset;
  const end = start + offset - 1;
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };
  return {
    page,
    offset,
    start,
    end,
    nextPage,
    prevPage,
  };
};
