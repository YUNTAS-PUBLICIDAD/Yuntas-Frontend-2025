'use client';

import TableActions from "@/components/molecules/admin/TableActions";
import { useAdminTable } from "@/hooks/ui/admin/useAdminTable";
import { getRole } from "@/utils/role";

 // icono directamente para poder reusarlo
const SearchXIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
        <path d="m13.5 8.5-5 5"></path>
        <path d="m8.5 8.5 5 5"></path>
    </svg>
);

interface Column {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
}

interface AdminTableProps<T = any> {
    columns: Column[];
    data: T[];
    minRows?: number;
    onDelete?: (item: T) => void;
    onApprove?: (item: T) => void;
    onEdit?: (item: T) => void;
    isLoading?: boolean;
    emptyMessage?: string;
    onResetSearch?: () => void;   // Función para limpiar búsqueda
    resetSearchText?: string;     // Texto del botón ("Ver todos los...")
}

function DesktopTableSkeleton({
    columnsCount,
    includeActions,
    rows = 5
}: {
    columnsCount: number;
    includeActions: boolean;
    rows?: number;
}) {
    return (
        <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={`desktop-skeleton-${rowIndex}`}>
                    {Array.from({ length: columnsCount }).map((__, colIndex) => (
                        <td
                            key={`desktop-skeleton-${rowIndex}-${colIndex}`}
                            className="py-3 px-4 bg-[#F4F4F2] dark:bg-[#1C2347] first:rounded-l-lg"
                        >
                            <div className="h-4 w-full max-w-[9rem] mx-auto rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                        </td>
                    ))}
                    {includeActions && (
                        <td className="py-3 px-4 bg-[#F4F4F2] dark:bg-[#1C2347] rounded-r-lg">
                            <div className="flex justify-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
                                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
                            </div>
                        </td>
                    )}
                </tr>
            ))}
        </>
    );
}

function MobileCardSkeleton({
    rows = 3,
    includeActions
}: {
    rows?: number;
    includeActions: boolean;
}) {
    return (
        <>
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={`mobile-skeleton-${index}`}
                    className="bg-white dark:bg-[#1C2347] border-2 border-[#0D1030] dark:border-white/10 rounded-[1.5rem] p-6 shadow-sm transition-colors duration-300"
                >
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="h-3 w-24 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                        <div className="h-4 w-40 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                        <div className="h-3 w-24 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                        <div className="h-4 w-32 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                        <div className="h-3 w-24 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                        <div className="h-4 w-44 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                    </div>

                    {includeActions && (
                        <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default function AdminTable({
    columns,
    data,
    minRows = 5,
    onDelete,
    onApprove,
    onEdit,
    isLoading = false,
    emptyMessage = "No se encontraron registros",
    onResetSearch,
    resetSearchText = "Ver todos"
}: AdminTableProps) {

    const { enabledActions, rows } = useAdminTable({
        data,
        minRows,
        onDelete,
        onApprove,
        onEdit
    });

    const role = getRole();

    /* El componente Admin Table ahora se encarga de saber si tiene datos o no y en base a eso mostrar el mensaje
       de que no hay resultados .
    */
    const isDataEmpty = data.length === 0;

    if (!isLoading && isDataEmpty) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 dark:bg-[#1C2347] border-2 border-dashed border-gray-300 dark:border-white/10 rounded-lg mt-4 w-full transition-colors duration-300">
                <SearchXIcon />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{emptyMessage}</h3>
                <p className="text-gray-500 dark:text-gray-300 text-sm mt-1 text-center max-w-sm">
                    No hay resultados para tu búsqueda. Intenta con otro término o revisa la ortografía.
                </p>
                {onResetSearch && (
                    <button
                        onClick={onResetSearch}
                        className="mt-4 text-sm text-[#203565] dark:text-[#6DE1E3] font-semibold hover:underline"
                    >
                        {resetSearchText}
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="w-full px-2 md:px-0">
            {/* DESKTOP: Tabla normal */}
            <table className="w-full hidden lg:table border-separate border-spacing-y-2">
                <thead>
                    <tr className="bg-[#0D1030] dark:bg-[#293296]">
                        {columns.map((col) => (
                            <th key={col.key} className={`text-white font-semibold text-lg py-3 px-4 text-center first:rounded-l-lg ${role !== "admin" ? "last:rounded-r-lg" : ""}`}>
                                {col.label}
                            </th>
                        ))}
                        { role === "admin" && <th className="text-white font-semibold text-lg py-3 px-4 rounded-r-lg text-center w-40">
                            ACCIÓN
                        </th>}
                    </tr>
                </thead>

                <tbody>
                    { /* Lógica de Carga */}
                    { isLoading ? (
                        <DesktopTableSkeleton
                            columnsCount={columns.length}
                            includeActions={role === "admin"}
                            rows={minRows}
                        />
                    ) : (
                    rows.map((row, index) => { 
                        const isEmpty = row._empty === true;

                        return (
                            <tr key={row.id || index}>
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={`
                                            py-3 px-4 text-center
                                            bg-[#F4F4F2] dark:bg-[#1C2347]
                                            first:rounded-l-lg
                                            ${role !== "admin" ? "last:rounded-r-lg" : ""}
                                            ${col.key === "id" ? "font-bold text-[#0D1030] dark:text-white" : "text-[#0D1030] dark:text-white"}
                                        `}
                                    >
                                        {isEmpty ? <>&nbsp;</> : col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}

                                { role === "admin" && <td className="py-3 px-4 bg-[#F4F4F2] dark:bg-[#1C2347] rounded-r-lg">
                                    <TableActions
                                        item={row}
                                        isEmpty={isEmpty}
                                        onDelete={onDelete}
                                        onApprove={onApprove}
                                        onEdit={onEdit}
                                        actions={enabledActions}
                                    />
                                </td>}
                            </tr>
                        );
                        })
                    )}
                </tbody>
            </table>

            {/* MÓVIL: Tarjetas responsive */}
            <div className="lg:hidden flex flex-col gap-6">
                {isLoading ? (
                    <MobileCardSkeleton
                        rows={Math.max(2, Math.min(minRows, 4))}
                        includeActions={role === "admin"}
                    />
                ) : (
                rows.map((row, index) => {
                    const isEmpty = row._empty === true;

                    if (isEmpty) return null;

                    return (
                        <div
                            key={row.id || index}
                            className="bg-white dark:bg-[#1C2347] border-2 border-[#0D1030] dark:border-white/10 rounded-[1.5rem] p-6 shadow-sm transition-colors duration-300"
                        >
                            {/* Contenido de la tarjeta - campos centrados */}
                            <div className="flex flex-col items-center text-center space-y-3">
                                {columns.map((col) => (
                                    <div key={col.key} className="w-full">
                                        <span className="font-bold text-[#0D1030] dark:text-gray-200 uppercase text-xs block mb-1">
                                            {col.label}
                                        </span>
                                        <span className="text-[#23C1DE] dark:text-[#6DE1E3] text-sm break-all block">
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Acciones centradas al final */}
                            {role === "admin" && <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
                                <TableActions
                                    item={row}
                                    isEmpty={isEmpty}
                                    onDelete={onDelete}
                                    onApprove={onApprove}
                                    onEdit={onEdit}
                                    actions={enabledActions}
                                />
                            </div>}
                        </div>
                    );
                })
            )}
            </div>
        </div>
    );
}