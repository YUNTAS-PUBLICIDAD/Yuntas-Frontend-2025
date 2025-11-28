import { IoMdTrash } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

interface Column {
    key: string;
    label: string;
}

interface AdminTableProps {
    columns: Column[];
    data: Record<string, any>[];
    minRows?: number;
    onDelete?: (id: string | number) => void;
    onApprove?: (id: string | number) => void;
}

export default function AdminTable({ columns, data, minRows = 10, onDelete, onApprove }: AdminTableProps) {

    // Se crean filas vacias
    const rows = [...data];
    while (rows.length < minRows) {
        rows.push({ _empty: true });
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-separate border-spacing-2">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="bg-[#0D1030] text-white font-semibold text-xl py-2 rounded-lg text-center"
                            >
                                {col.label}
                            </th>
                        ))}
                        <th className="bg-[#0D1030] text-white font-semibold text-xl py-2 px-4 rounded-lg text-center">
                            ACCIÓN
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        const isEmpty = row._empty === true;

                        return (
                            <tr key={row.id || `empty-${index}`}>
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={`bg-[#F4F4F2] py-2 px-4 ${col.key == 'id' ? "font-medium text-black" : "font-normal text-[#0D1030]"} text-xl rounded-lg text-center h-12`}
                                    >
                                        {col.key == 'id' ? (index + 1) : isEmpty ? "" : row[col.key]}
                                    </td>
                                ))}
                                <td className="bg-[#F4F4F2] py-2 px-4 rounded-lg text-center h-12">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => !isEmpty && onDelete?.(row.id)}
                                            className={`transition-colors ${isEmpty
                                                    ? "text-[#203565]/30 cursor-not-allowed"
                                                    : "text-[#203565] hover:text-[#0D1030]"
                                                }`}
                                            title="Eliminar"
                                            disabled={isEmpty}
                                        >
                                            <IoMdTrash size={22} />
                                            
                                        </button>
                                        <button
                                            onClick={() => onApprove?.(row.id)}
                                            className={`transition-colors ${
                                                isEmpty 
                                                    ? "text-[#23C1DE]/30 cursor-not-allowed" 
                                                    : "text-[#23C1DE] hover:text-[#1a9bb8]"
                                            }`}
                                            title="Aprobar"
                                            disabled={isEmpty}
                                        >
                                            <FaCheckCircle size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}