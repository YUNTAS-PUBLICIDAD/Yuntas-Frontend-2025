import { IoMdTrash } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

interface Column {
    key: string;
    label: string;
}

type ActionType = "delete" | "approve" | "edit";

interface ActionConfig {
    type: ActionType;
    onClick?: (id: string | number) => void;
}

interface AdminTableProps {
    columns: Column[];
    data: Record<string, any>[];
    minRows?: number;
    actions?: ActionConfig[];
}

const actionIcons: Record<ActionType, { 
    icon: React.ReactNode; 
    label: string;
    bgColor: string; 
    bgColorDisabled: string;
    textColor: string;
}> = {
    delete: {
        icon: <IoMdTrash size={18} />,
        label: "Eliminar",
        bgColor: "bg-[#DC3545] hover:bg-[#C82333]",
        bgColorDisabled: "bg-[#DC3545]/30",
        textColor: "text-white"
    },
    approve: {
        icon: <FaCheckCircle size={16} />,
        label: "Aprobar",
        bgColor: "bg-[#28A745] hover:bg-[#218838]",
        bgColorDisabled: "bg-[#28A745]/30",
        textColor: "text-white"
    },
    edit: {
        icon: <FiEdit size={16} />,
        label: "Editar",
        bgColor: "bg-[#23C1DE] hover:bg-[#1a9bb8]",
        bgColorDisabled: "bg-[#23C1DE]/30",
        textColor: "text-white"
    }
};

export default function AdminTable({ 
    columns, 
    data, 
    minRows = 10, 
    actions = [{ type: "delete" }, { type: "approve" }]
}: AdminTableProps) {

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
                        <th className="bg-[#0D1030] text-white font-semibold text-xl py-2 px-3 rounded-lg text-center">
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
                                        className={`bg-[#F4F4F2] py-2 px-3 ${
                                            col.key === 'id' ? "font-medium text-black" : "font-normal text-[#0D1030]"
                                        } text-xl rounded-lg text-center h-12`}
                                    >
                                        {isEmpty ? "" : row[col.key]}
                                    </td>
                                ))}
                                <td className="bg-[#F4F4F2] py-2 px-3 rounded-lg text-center h-12">
                                    <div className="flex items-center justify-center gap-2">
                                        {actions.map((action, actionIndex) => {
                                            const config = actionIcons[action.type];
                                            return (
                                                <button
                                                    key={actionIndex}
                                                    onClick={() => !isEmpty && action.onClick?.(row.id)}
                                                    className={`flex items-center gap-1 px-2 md:px-3 py-1 rounded-full transition-all ${config.textColor} ${
                                                        isEmpty
                                                            ? `${config.bgColorDisabled} cursor-not-allowed`
                                                            : `${config.bgColor}`
                                                    }`}
                                                    title={config.label}
                                                    disabled={isEmpty}
                                                >
                                                    {config.icon}
                                                    <span className="hidden md:inline text-sm font-medium">
                                                        {config.label}
                                                    </span>
                                                </button>
                                            );
                                        })}
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