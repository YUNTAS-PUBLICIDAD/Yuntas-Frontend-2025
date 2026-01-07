'use client';

import TableActions from "@/components/molecules/admin/TableActions";
import { useAdminTable } from "@/hooks/ui/admin/useAdminTable";
import { RiCloseLine , RiCheckLine  } from "react-icons/ri";

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
        <div className="w-full overflow-x-auto rounded-xl bg-white shadow-sm border border-gray-100">
            <table className="w-full border-separate border-spacing-y-2 p-2">
                <thead>
                    <tr>
                        {columns.map((col) => {
                            return (
                                <th key={col.key} className="bg-[#0D1030] text-white font-semibold text-lg py-3 px-4 first:rounded-l-lg last:rounded-r-lg text-center whitespace-nowrap">
                                    {col.label}
                                </th>
                            )
                        })}
                        <th className="bg-[#0D1030] text-white font-semibold text-lg py-3 px-4 rounded-r-lg text-center w-40">
                            ACCIÓN
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        const isEmpty = row._empty === true;
                        return (
                            <tr key={row.id || index} className="group hover:bg-gray-50 transition-colors">
                                {columns.map((col) => {
                                    const isStatus = col.key === 'whatsapp_status' || col.key === 'email_status';
                                    const isResponse = col.key === 'whatsapp_response' || col.key === 'email_response';

                                    return (
                                        <td key={col.key} className={`bg-[#F4F4F2] py-3 px-4 text-center h-14 whitespace-nowrap first:rounded-l-lg
                                        ${col.key === 'id' || isStatus ?
                                                "font-bold text-black"
                                                :
                                                "text-[#0D1030]"}`}>
                                            {isEmpty ?
                                                ""
                                                :
                                                isStatus ?
                                                    "ENVIADO"
                                                    :
                                                    isResponse ?
                                                        <div className="flex justify-center gap-3">
                                                            {/** Estos botones solo seran hasta que sepamos para que sirven */}
                                                            <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 flex items-center justify-center font-bold">
                                                                <RiCloseLine  size={24} />
                                                            </button>
                                                            <button className="w-8 h-8 rounded-full bg-[#D1FAE5] text-[#10B981] hover:bg-[#A7F3D0] flex items-center justify-center font-bold">
                                                                <RiCheckLine size={24} />
                                                            </button>
                                                        </div>
                                                        :
                                                        row[col.key]}
                                        </td>
                                    )
                                })}
                                <td className="bg-[#F4F4F2] py-3 px-4 rounded-r-lg text-center h-14">
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