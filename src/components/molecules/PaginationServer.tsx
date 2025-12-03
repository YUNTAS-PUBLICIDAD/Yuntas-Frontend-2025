import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import ItemPagination from "@/components/atoms/ItemPagination";

interface PaginationMeta {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}

interface PaginationServerProps {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

export default function PaginationServer({ 
    meta, 
    onPageChange, 
    isLoading = false 
}: PaginationServerProps) {

    const { current_page, last_page } = meta;

    const handlePrev = () => {
        if (current_page > 1 && !isLoading) {
            onPageChange(current_page - 1);
        }
    };

    const handleNext = () => {
        if (current_page < last_page && !isLoading) {
            onPageChange(current_page + 1);
        }
    };

    const handleSelectPage = (page: number) => {
        if (page !== current_page && !isLoading) {
            onPageChange(page);
        }
    };

    // generamos un rango de paginas para mostrar
    const getPageNumbers = (): number[] => {
        const pages: number[] = [];
        const maxVisible = 5;
        
        let start = Math.max(1, current_page - Math.floor(maxVisible / 2));
        let end = Math.min(last_page, start + maxVisible - 1);
        
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    if (last_page <= 1) return null;

    return (
        <div className={`flex gap-3 ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
            <ItemPagination 
                onClick={handlePrev}
                disabled={current_page === 1}
            >
                <MdOutlineNavigateBefore className="text-2xl" />
            </ItemPagination>

            {getPageNumbers().map((num) => (
                <ItemPagination
                    key={num}
                    onClick={() => handleSelectPage(num)}
                    active={num === current_page}
                >
                    {String(num)}
                </ItemPagination>
            ))}

            <ItemPagination 
                onClick={handleNext}
                disabled={current_page === last_page}
            >
                <MdOutlineNavigateNext className="text-2xl" />
            </ItemPagination>
        </div>
    );
}