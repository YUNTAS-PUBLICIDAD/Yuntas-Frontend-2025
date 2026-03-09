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
}

export default function AdminTable({
    columns,
    data,
    minRows = 5,
    onDelete,
    onApprove,
    onEdit,
    isLoading = false,
    emptyMessage = "No se encontraron registros"
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
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg mt-4 w-full">
                <SearchXIcon />
                <h3 className="text-lg font-medium text-gray-900">{emptyMessage}</h3>
                <p className="text-gray-500 text-sm mt-1 text-center max-w-sm">
                    No hay resultados para tu búsqueda. Intenta con otro término o revisa la ortografía.
                </p>
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
                        <tr>
                            <td 
                                colSpan={columns.length + (role === "admin" ? 1 : 0)} 
                                className="py-10 text-center text-[#0D1030] font-semibold bg-[#F4F4F2] dark:bg-white rounded-lg"
                            >
                                <div className="flex justify-center items-center gap-2">
                                    <span className="animate-spin text-2xl">⏳</span>
                                    Cargando información...
                                </div>
                            </td>
                        </tr>
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
                                            bg-[#F4F4F2] dark:bg-white
                                            first:rounded-l-lg
                                            ${role !== "admin" ? "last:rounded-r-lg" : ""}
                                            ${col.key === "id" ? "font-bold text-[#0D1030]" : "text-[#0D1030]"}
                                        `}
                                    >
                                        {isEmpty ? <>&nbsp;</> : col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}

                                { role === "admin" && <td className="py-3 px-4 bg-[#F4F4F2] dark:bg-white rounded-r-lg">
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
                    <div className="bg-white border-2 border-[#0D1030] rounded-[1.5rem] p-6 text-center font-semibold text-[#0D1030]">
                        ⏳ Cargando información...
                    </div>
                ) : (
                rows.map((row, index) => {
                    const isEmpty = row._empty === true;

                    if (isEmpty) return null;

                    return (
                        <div
                            key={row.id || index}
                            className="bg-white border-2 border-[#0D1030] rounded-[1.5rem] p-6 shadow-sm"
                        >
                            {/* Contenido de la tarjeta - campos centrados */}
                            <div className="flex flex-col items-center text-center space-y-3">
                                {columns.map((col) => (
                                    <div key={col.key} className="w-full">
                                        <span className="font-bold text-[#0D1030] uppercase text-xs block mb-1">
                                            {col.label}
                                        </span>
                                        <span className="text-[#23C1DE] text-sm break-all block">
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Acciones centradas al final */}
                            {role === "admin" && <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
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