'use client';

import TableActions from "@/components/molecules/admin/TableActions";
import { useAdminTable } from "@/hooks/ui/admin/useAdminTable";
import { getRole } from "@/utils/role";

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
}

export default function AdminTable({
    columns,
    data,
    minRows = 5,
    onDelete,
    onApprove,
    onEdit
}: AdminTableProps) {

    const { enabledActions, rows } = useAdminTable({
        data,
        minRows,
        onDelete,
        onApprove,
        onEdit
    });

    const role = getRole();

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
                    {rows.map((row, index) => {
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
                                    {isEmpty ? <>&nbsp;</> : (
                                        <TableActions
                                            item={row}
                                            isEmpty={isEmpty}
                                            onDelete={onDelete}
                                            onApprove={onApprove}
                                            onEdit={onEdit}
                                            actions={enabledActions}
                                        />
                                    )}
                                </td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* MÓVIL: Tarjetas responsive */}
            <div className="lg:hidden flex flex-col gap-6">
                {rows.map((row, index) => {
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
                })}
            </div>
        </div>
    );
}