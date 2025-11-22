import React,{useEffect} from 'react'
import ItemPagination from '../atoms/ItemPagination'
import { usePagination } from '@/hooks/ui/usePagination'
import { MdOutlineNavigateBefore } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Producto } from '@/types/producto';

type PaginationProps={
  pageSize: number;
  items: any[];
  setProductosPaginados:(e:any[])=>void
}

const Pagination = ({pageSize,items,setProductosPaginados}:PaginationProps) => {
    const {
        page,
        currentItems,
        totalPages,
        handlePageNext,
        handlePagePrev,
        handleSelectPage
    }=usePagination({pageSize:pageSize,items:items})

    useEffect(()=>{
        setProductosPaginados(currentItems)
    },[currentItems,items])
    
    useEffect(()=>{
        handleSelectPage(1)
    },[items])

    return (
        <div className='flex gap-3'>
            <ItemPagination onClick={handlePagePrev} ><MdOutlineNavigateBefore className='text-3xl'/></ItemPagination>
            
            {[...Array(totalPages)].map((_, i) => {
                const num = i + 1
                return (
                <ItemPagination
                    key={num}
                    onClick={() => handleSelectPage(num)}
                    active={num===page}
                >{String(num)}</ItemPagination>
                )
            })}
            <ItemPagination  onClick={handlePageNext}><MdOutlineNavigateNext className='text-3xl' /></ItemPagination>
        </div>
  )
}

export default Pagination