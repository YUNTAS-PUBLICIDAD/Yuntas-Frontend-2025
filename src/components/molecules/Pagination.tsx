import React, { useEffect } from 'react'
import ItemPagination from '../atoms/ItemPagination'
import { usePagination } from '@/hooks/ui/usePagination'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

type PaginationProps = {
  pageSize: number;
  items: any[];
  setProductosPaginados: (items: any[]) => void;
  maxVisiblePages?: number;
  onPageChange?: () => void;
  historyMode?: 'push' | 'replace';
}

const Pagination = ({ pageSize, items, setProductosPaginados, maxVisiblePages = 5, onPageChange, historyMode = 'replace' }: PaginationProps) => {
  const {
    page,
    currentItems,
    totalPages,
    hasNextPage,
    hasPrevPage,
    visiblePages,
    handlePageNext,
    handlePagePrev,
    handleSelectPage
  } = usePagination({
    pageSize,
    items,
    maxVisiblePages,
    historyMode
  });

  useEffect(() => {
    setProductosPaginados(currentItems);
  }, [currentItems, setProductosPaginados]);

  const onClickPrev = () => {
    handlePagePrev();
    onPageChange?.();
  };

  const onClickNext = () => {
    handlePageNext();
    onPageChange?.();
  };

  const onClickPage = (num: number) => {
    handleSelectPage(num);
    onPageChange?.();
  };

  if (totalPages <= 1) return null;

  return (
    <div className='flex gap-3 items-center'>
      <ItemPagination onClick={onClickPrev} disabled={!hasPrevPage} aria-label="Página anterior">
        <MdOutlineNavigateBefore className='text-3xl' />
      </ItemPagination>

      {visiblePages[0] > 1 && (
        <>
          <ItemPagination onClick={() => onClickPage(1)} aria-label="Página 1">
            1
          </ItemPagination>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {visiblePages.map((num) => (
        <ItemPagination
          key={num}
          onClick={() => onClickPage(num)}
          active={num === page}
          aria-label={`Página ${num}`}
        >
          {String(num)}
        </ItemPagination>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <ItemPagination onClick={() => onClickPage(totalPages)} aria-label={`Página ${totalPages}`}>
            {totalPages}
          </ItemPagination>
        </>
      )}

      <ItemPagination onClick={onClickNext} disabled={!hasNextPage} aria-label="Página siguiente">
        <MdOutlineNavigateNext className='text-3xl' />
      </ItemPagination>
    </div>
  );
};

export default Pagination;