'use client';

import TableActions from "@/components/molecules/admin/TableActions";
import { useAdminTable } from "@/hooks/ui/admin/useAdminTable";
import { RiCloseLine, RiCheckLine } from "react-icons/ri";

interface TrackingTableProps<T = any> {
    data: T[];
    minRows?: number;
    onDelete?: (item: T) => void;
    onEdit?: (item: T) => void;
}

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'NOMBRE' },
    { key: 'whatsapp_status', label: 'WHATSAPP' },
    { key: 'whatsapp_response', label: 'RESPUESTA' },
    { key: 'email_status', label: 'GMAIL' },
    { key: 'email_response', label: 'RESPUESTA' },
];

export default function TrackingTable({
    data,
    minRows = 5,
    onDelete,
    onEdit
}: TrackingTableProps) {

    const { enabledActions, rows } = useAdminTable({ data, minRows, onDelete, onEdit });

    return (
        <div className="w-full px-2 md:px-0">
            <table className="w-full block lg:table border-separate border-spacing-y-4 lg:border-spacing-y-2">

                {/* HEADER solo desktop */}
                <thead className="hidden lg:table-header-group">
                    <tr className="bg-[#0D1030]">
                        {columns.map(col => (
                            <th
                                key={col.key}
                                className="text-white font-semibold text-lg py-3 px-4 text-center first:rounded-l-lg"
                            >
                                {col.label}
                            </th>
                        ))}
                        <th className="text-white font-semibold text-lg py-3 px-4 rounded-r-lg text-center w-40">
                            ACCIÓN
                        </th>
                    </tr>
                </thead>

                <tbody className="block lg:table-row-group">
                    {rows.map((row, index) => {
                        const isEmpty = row._empty === true;

                        return (
                            <tr
                                key={row.id || index}
                                className="block lg:table-row bg-white border-2 border-[#0D1030] lg:border-none rounded-[2rem] mb-6 p-4 lg:p-0 shadow-sm"
                            >
                                {columns.map(col => {
                                    const isStatus = col.key.includes('status');
                                    const isResponse = col.key.includes('response');

                                    return (
                                        <td
                                            key={col.key}
                                            className="flex justify-between items-center lg:table-cell py-2 px-4 border-b border-gray-100 lg:border-none lg:bg-[#F4F4F2]"
                                        >
                                            <span className="lg:hidden font-black uppercase text-xs text-[#0D1030]">
                                                {col.label}:
                                            </span>

                                            <span className="text-right lg:text-center ml-4 text-[#0D1030]">
                                                {isEmpty ? "" :
                                                    isStatus ? "ENVIADO" :
                                                        isResponse ? (
                                                            <div className="flex gap-3">
                                                                <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                                                                    <RiCloseLine size={22} />
                                                                </button>
                                                                <button className="w-8 h-8 rounded-full bg-[#D1FAE5] text-[#10B981] flex items-center justify-center">
                                                                    <RiCheckLine size={22} />
                                                                </button>
                                                            </div>
                                                        ) : row[col.key]
                                                }
                                            </span>
                                        </td>
                                    );
                                })}

                                {/* ACCIONES */}
                                <td className="flex justify-center lg:table-cell py-4 lg:py-3 lg:bg-[#F4F4F2] lg:rounded-r-lg">
                                    <TableActions
                                        item={row}
                                        isEmpty={isEmpty}
                                        onDelete={onDelete}
                                        onEdit={onEdit}
                                        actions={enabledActions}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
