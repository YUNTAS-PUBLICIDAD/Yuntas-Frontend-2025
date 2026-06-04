'use client';

import TableActions from "@/components/molecules/admin/TableActions";
import { useAdminTable } from "@/hooks/ui/admin/useAdminTable";
import { getRole } from "@/utils/role";
import { RotateCcw } from "lucide-react";

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
                            className="py-3 px-4 bg-[#F4F4F2] dark:bg-[#151A3D] first:rounded-l-lg"
                        >
                            <div className="h-4 w-full max-w-[9rem] mx-auto rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                        </td>
                    ))}
                    {includeActions && (
                        <td className="py-3 px-4 bg-[#F4F4F2] dark:bg-[#151A3D] rounded-r-lg">
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
                    className="bg-white dark:bg-[#151A3D] border-2 border-[#0D1030] dark:border-white/10 rounded-[1.5rem] p-6 shadow-sm transition-colors duration-300"
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
    const primaryColumn =
        columns.find((col) =>
            ![
                "id",
                "created_at",
                "fecha",
                "gallery",
                "estado_visual",
                "status",
                "image",
                "icon",
            ].includes(col.key)
        ) ?? columns.find((col) => col.key !== "id") ?? columns[0];

    const mobileColumns = columns.filter(
        (col) => col.key !== primaryColumn?.key && col.key !== "id"
    );

    /* El componente Admin Table ahora se encarga de saber si tiene datos o no y en base a eso mostrar el mensaje
       de que no hay resultados .
    */
    const isDataEmpty = data.length === 0;

    if (!isLoading && isDataEmpty) {
        return (
            <div className="w-full rounded-[1.75rem] border border-[#D8E7F3] bg-white/95 p-3 shadow-[0_18px_40px_rgba(13,16,48,0.07)] dark:border-white/10 dark:bg-[#1C2347]/95 md:p-5">
                <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50/50 dark:bg-[#1C2347]/50 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-lg mt-4 w-full transition-colors duration-300">
                    <SearchXIcon />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{emptyMessage}</h3>
                    <p className="text-gray-500 dark:text-gray-300 text-sm mt-1 text-center max-w-sm">
                        No hay resultados para tu búsqueda. Intenta con otro término o revisa la ortografía.
                    </p>
                    {onResetSearch && (
                        <button
                            onClick={onResetSearch}
                            className="mt-4 inline-flex items-center gap-2 text-sm text-[#203565] dark:text-[#6DE1E3] font-semibold hover:underline"
                        >
                            <RotateCcw className="h-4 w-4" />
                            {resetSearchText}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full rounded-[1.75rem] border border-[#D8E7F3] bg-white/95 p-3 shadow-[0_18px_40px_rgba(13,16,48,0.07)] dark:border-white/10 dark:bg-[#1C2347]/95 md:p-5">
        <div className="w-full px-2 md:px-0 overflow-x-auto">
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
                                            bg-[#F4F4F2] dark:bg-[#151A3D]
                                            first:rounded-l-lg
                                            ${role !== "admin" ? "last:rounded-r-lg" : ""}
                                            ${col.key === "id" ? "font-bold text-[#0D1030] dark:text-white" : "text-[#0D1030] dark:text-white"}
                                        `}
                                    >
                                        {isEmpty ? <>&nbsp;</> : col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}

                                { role === "admin" && <td className="py-3 px-4 bg-[#F4F4F2] dark:bg-[#151A3D] rounded-r-lg">
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

                    const primaryValue = primaryColumn
                        ? primaryColumn.render
                            ? primaryColumn.render(row[primaryColumn.key], row)
                            : row[primaryColumn.key]
                        : null;

                    return (
                        <div
                            key={row.id || index}
                            className="bg-white dark:bg-[#151A3D] border border-[#E5EEF6] dark:border-[#4A6FD8] rounded-2xl p-4 shadow-sm transition-colors duration-300"
                        >
                            {/* Header: primary field with ID */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    {primaryColumn && (
                                        <>
                                            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-[#B0C4DE]">
                                                {primaryColumn.label}
                                            </span>
                                            <h4 className="text-lg font-black text-[#0D1030] dark:text-white truncate">
                                                {primaryValue ?? "-"}
                                            </h4>
                                        </>
                                    )}
                                </div>

                                <div className="flex flex-col items-end text-right text-xs text-slate-500 dark:text-[#B0C4DE]">
                                    <span className="font-mono text-[#203565] dark:text-[#E0E7FF]">#{row.id}</span>
                                </div>
                            </div>

                            {/* Body: generic field grid */}
                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-[#203565] dark:text-[#E0E7FF]">
                                {mobileColumns.map((col) => {
                                    const value = col.render ? col.render(row[col.key], row) : row[col.key];

                                    return (
                                        <div
                                            key={col.key}
                                            className="min-w-0 rounded-xl border border-[#E5EEF6] bg-[#F8FBFE] px-3 py-2 dark:border-white/10 dark:bg-white/5"
                                        >
                                            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-[#B0C4DE]">
                                                {col.label}
                                            </div>
                                            <div className="mt-1 break-words font-medium text-[#203565] dark:text-[#E0E7FF]">
                                                {isEmpty ? "" : value}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Actions aligned to the right */}
                            {role === "admin" && (
                                <div className="flex justify-end mt-4 pt-3 border-t border-gray-100 dark:border-[#4A6FD8]">
                                    <TableActions
                                        item={row}
                                        isEmpty={isEmpty}
                                        onDelete={onDelete}
                                        onApprove={onApprove}
                                        onEdit={onEdit}
                                        actions={enabledActions}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })
            )}
            </div>
        </div>
        </div>
    );
}