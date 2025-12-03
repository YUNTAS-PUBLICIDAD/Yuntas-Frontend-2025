import { useState, useEffect, useMemo, useCallback } from "react";

interface PaginationOptions<T = any> {
  items: T[];
  pageSize: number;
  initialPage?: number;
  maxVisiblePages?: number;
}

interface PaginationReturn<T> {
  page: number;
  totalPages: number;
  totalItems: number;
  currentItems: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  visiblePages: number[];
  handlePageNext: () => void;
  handlePagePrev: () => void;
  handleSelectPage: (num: number) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  setPage: (page: number) => void;
}

export const usePagination = <T = any>({ 
  items, 
  pageSize,
  initialPage = 1,
  maxVisiblePages = 5
}: PaginationOptions<T>): PaginationReturn<T> => {
  const [page, setPage] = useState(initialPage);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    setPage(1);
  }, [items.length, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [page, items, pageSize]);

  const visiblePages = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages, maxVisiblePages]);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const handlePageNext = useCallback(() => {
    setPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const handlePagePrev = useCallback(() => {
    setPage((p) => Math.max(p - 1, 1));
  }, []);

  const handleSelectPage = useCallback((num: number) => {
    setPage(Math.max(1, Math.min(num, totalPages)));
  }, [totalPages]);

  const goToFirstPage = useCallback(() => {
    setPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setPage(totalPages);
  }, [totalPages]);

  return {
    page,
    totalPages,
    totalItems,
    currentItems,
    hasNextPage,
    hasPrevPage,
    visiblePages, 
    handlePageNext,
    handlePagePrev,
    handleSelectPage,
    goToFirstPage,
    goToLastPage,
    setPage,
  };
};