'use client';

import { useAdminTable } from "@/hooks/ui/admin/useAdminTable";

interface MonitoreoTableProps<T = any> {
    data: T[];
    minRows?: number;
}

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'NOMBRE' },
    { key: 'email_messages', label: 'MENSAJES EMAIL' },
    { key: 'email_messages_last', label: 'ÚLTIMO EMAIL' },
    { key: 'email_campaigns', label: 'CAMPAÑAS EMAIL' },
    { key: 'email_campaigns_last', label: 'ÚLTIMA CAMPAÑA EMAIL' },
    { key: 'whatsapp_messages', label: 'MENSAJES WHATSAPP' },
    { key: 'whatsapp_messages_last', label: 'ÚLTIMO WHATSAPP' },
    { key: 'whatsapp_campaigns', label: 'CAMPAÑAS WHATSAPP' },
    { key: 'whatsapp_campaigns_last', label: 'ÚLTIMA CAMPAÑA WHATSAPP' },
];

export default function MonitoreoTable({
    data,
    minRows = 5
}: MonitoreoTableProps) {

    const { rows } = useAdminTable({ data, minRows });

    return (
        <div className="w-full px-2 md:px-0">
            <table className="w-full block lg:table border-separate border-spacing-y-4 lg:border-spacing-y-2">

                {/* HEADER solo desktop */}
                <thead className="hidden lg:table-header-group">
                    <tr className="bg-[#0D1030]">
                        {columns.map(col => (
                            <th
                                key={col.key}
                                className={`text-white font-semibold text-sm py-3 px-3 text-center first:rounded-l-lg last:rounded-r-lg`}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="block lg:table-row-group">
                    {rows.map((row, index) => {
                        const isEmpty = row._empty === true;

                        return (
                            <tr key={row.id || index} >
                                {columns.map(col => {
                                    const isCount = ['email_messages', 'email_campaigns', 'whatsapp_messages', 'whatsapp_campaigns'].includes(col.key);
                                    const isDate = col.key.includes('_last');

                                    return (
                                        <td
                                            key={col.key}
                                            className={`
                                            py-2 lg:py-3 px-4 lg:px-3 text-center
                                            bg-[#F4F4F2] dark:bg-white
                                            first:rounded-l-lg
                                            last:rounded-r-lg
                                            ${col.key === "id" ? "font-bold text-[#0D1030]" : "text-[#0D1030]"}
                                            ${isCount ? "font-semibold" : ""}
                                            ${isDate ? "text-sm text-gray-600" : ""}
                                        `}
                                        >
                                            <span className="lg:hidden font-black uppercase text-xs text-[#0D1030]">
                                                {col.label}:
                                            </span>

                                            <span className="text-right lg:text-center ml-4 text-[#0D1030]">
                                                {isEmpty ? "" : row[col.key]}
                                            </span>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
