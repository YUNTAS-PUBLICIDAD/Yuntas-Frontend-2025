import { useState, useEffect, useMemo } from "react";

interface PaginationOptions {
  items: any[];
  pageSize: number;
}

export const usePagination = ({ items, pageSize }: PaginationOptions) => {
  const [page, setPage] = useState(1);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [page, items]);

  const handlePageNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePagePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleSelectPage = (num: number) =>
    setPage(Math.max(1, Math.min(num, totalPages)));

  return {
    page,
    totalPages,
    currentItems,
    handlePageNext,
    handlePagePrev,
    handleSelectPage,
  };
};
