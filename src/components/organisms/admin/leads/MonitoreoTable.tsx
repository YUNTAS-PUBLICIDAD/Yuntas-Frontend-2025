'use client';

import { useAdminTable } from "@/hooks/ui/admin/useAdminTable";

interface MonitoreoTableProps<T = any> {
    data: T[];
    minRows?: number;
}

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'NOMBRE' },
    { key: 'whatsapp_status', label: 'WHATSAPP' },
    { key: 'email_status', label: 'GMAIL' },
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
                                className={`text-white font-semibold text-lg py-3 px-4 text-center first:rounded-l-lg last:rounded-r-lg`}
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
                                    const isStatus = col.key.includes('status');

                                    return (
                                        <td
                                            className={`
                                            py-3 px-4 text-center
                                            bg-[#F4F4F2] dark:bg-white
                                            first:rounded-l-lg
                                            last:rounded-r-lg
                                            ${col.key === "id" ? "font-bold text-[#0D1030]" : "text-[#0D1030]"}
                                        `}
                                        >
                                            <span className="lg:hidden font-black uppercase text-xs text-[#0D1030]">
                                                {col.label}:
                                            </span>

                                            <span className="text-right lg:text-center ml-4 text-[#0D1030]">
                                                {isEmpty ? "" :
                                                    isStatus ? "ENVIADO" : row[col.key]
                                                }
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
