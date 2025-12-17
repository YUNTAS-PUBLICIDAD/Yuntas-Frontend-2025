import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import ItemPagination from "../atoms/ItemPagination";
import { PaginationMeta, PaginationLinks } from "@/types/admin/producto";

interface PaginationServerProps {
    meta: PaginationMeta;
    links: PaginationLinks | null;
    onPrevPage: () => void;
    onNextPage: () => void;
    isLoading?: boolean;
}

export default function PaginationServer({ 
    meta, 
    links,
    onPrevPage,
    onNextPage,
    isLoading = false 
}: PaginationServerProps) {
    const { current_page, last_page } = meta;

    const hasPrev = links?.prev !== null;
    const hasNext = links?.next !== null;

    const handlePrev = () => {
        if (hasPrev && !isLoading) {
            onPrevPage();
        }
    };

    const handleNext = () => {
        if (hasNext && !isLoading) {
            onNextPage();
        }
    };

    if (last_page <= 1) return null;

    return (
        <div className={`flex gap-3 ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
            <ItemPagination 
                onClick={handlePrev}
                disabled={!hasPrev}
            >
                <MdOutlineNavigateBefore className="text-3xl" />
            </ItemPagination>

            <span className="text-[#203565] font-medium px-4">
                Página {current_page} de {last_page}
            </span>

            <ItemPagination 
                onClick={handleNext}
                disabled={!hasNext}
            >
                <MdOutlineNavigateNext className="text-3xl" />
            </ItemPagination>
        </div>
    );
}