import React, { useEffect } from 'react'
import ItemPagination from '../atoms/ItemPagination'
import { usePagination } from '@/hooks/ui/usePagination'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

type PaginationProps = {
  pageSize: number;
  items: any[];
  setProductosPaginados: (items: any[]) => void;
  maxVisiblePages?: number;  
}

const Pagination = ({ pageSize, items, setProductosPaginados, maxVisiblePages = 5 }: PaginationProps) => {
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
    maxVisiblePages 
  });

  useEffect(() => {
    setProductosPaginados(currentItems);
  }, [currentItems, setProductosPaginados]);

  if (totalPages <= 1) return null;

  return (
    <div className='flex gap-3 items-center'>
      <ItemPagination onClick={handlePagePrev} disabled={!hasPrevPage}>
        <MdOutlineNavigateBefore className='text-3xl'/>
      </ItemPagination>
      
      {visiblePages[0] > 1 && (
        <>
          <ItemPagination onClick={() => handleSelectPage(1)}>
            1
          </ItemPagination>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {visiblePages.map((num) => (
        <ItemPagination
          key={num}
          onClick={() => handleSelectPage(num)}
          active={num === page}
        >
          {String(num)}
        </ItemPagination>
      ))}
      
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <ItemPagination onClick={() => handleSelectPage(totalPages)}>
            {totalPages}
          </ItemPagination>
        </>
      )}

      <ItemPagination onClick={handlePageNext} disabled={!hasNextPage}>
        <MdOutlineNavigateNext className='text-3xl' />
      </ItemPagination>
    </div>
  );
};

export default Pagination;