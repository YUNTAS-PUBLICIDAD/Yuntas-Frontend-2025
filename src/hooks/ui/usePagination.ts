import { usePathname, useSearchParams, useRouter  } from "next/navigation";
import { useEffect, useMemo, useCallback } from "react";

interface PaginationOptions<T = any> {
  items: T[];
  pageSize: number;
  initialPage?: number;
  maxVisiblePages?: number;
  historyMode?: 'push' | 'replace';
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

export const usePagination = <T,>({ 
  items, 
  pageSize,
  initialPage = 1,
  maxVisiblePages = 5,
  historyMode = 'replace'
}: PaginationOptions<T>): PaginationReturn<T> => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageFromUrl = Number(searchParams.get("page")) || initialPage;
  
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Derive page state from URL and ensure it stays within limits
  const page = Math.max(1, Math.min(pageFromUrl, totalPages));

  const setPage = useCallback((num: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (num === 1) {
      params.delete("page");
    } else {
      params.set("page", String(num));
    }
    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    if (historyMode === 'push') {
      router.push(nextUrl);
    } else {
      router.replace(nextUrl);
    }
  }, [historyMode, searchParams, router, pathname]);

  useEffect(() => { 
    if (pageFromUrl > totalPages) {
      setPage(totalPages);
    }
  }, [pageFromUrl, totalPages, setPage]);

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
    setPage(Math.min(page + 1, totalPages));
  }, [page, totalPages, setPage]);

  const handlePagePrev = useCallback(() => {
    setPage(Math.max(page - 1, 1));
  }, [page, setPage]);

  const handleSelectPage = useCallback((num: number) => {
    setPage(Math.max(1, Math.min(num, totalPages)));
  }, [totalPages, setPage]);

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