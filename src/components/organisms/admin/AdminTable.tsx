import { IoMdTrash } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

interface Column {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;

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

const actionIcons: Record<ActionType, { icon: React.ReactNode; color: string; disabledColor: string; hoverColor: string; title: string }> = {
    delete: {
        icon: <IoMdTrash size={22} />,
        color: "text-[#203565]",
        disabledColor: "text-[#203565]/30",
        hoverColor: "hover:text-[#0D1030]",
        title: "Eliminar"
    },
    approve: {
        icon: <FaCheckCircle size={20} />,
        color: "text-[#23C1DE]",
        disabledColor: "text-[#23C1DE]/30",
        hoverColor: "hover:text-[#1a9bb8]",
        title: "Aprobar"
    },
    edit: {
        icon: <FiEdit size={20} />,
        color: "text-[#23C1DE]",
        disabledColor: "text-[#23C1DE]/30",
        hoverColor: "hover:text-[#1a9bb8]",
        title: "Editar"
    }
};

export default function AdminTable({ 
    columns, 
    data, 
    minRows = 10, 
    actions = [{ type: "delete" }, { type: "approve" }]
}: AdminTableProps) {

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
                                        className={`bg-[#F4F4F2] py-2 px-4 ${
                                            col.key === 'id' ? "font-medium text-black" : "font-normal text-[#0D1030]"
                                        } text-xl rounded-lg text-center h-12`}
                                    >
                                        {isEmpty? "": col.render? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                                <td className="bg-[#F4F4F2] py-2 px-4 rounded-lg text-center h-12">
                                    <div className="flex items-center justify-center gap-3">
                                        {actions.map((action, actionIndex) => {
                                            const config = actionIcons[action.type];
                                            return (
                                                <button
                                                    key={actionIndex}
                                                    onClick={() => !isEmpty && action.onClick?.(row.id)}
                                                    className={`transition-colors ${
                                                        isEmpty
                                                            ? `${config.disabledColor} cursor-not-allowed`
                                                            : `${config.color} ${config.hoverColor}`
                                                    }`}
                                                    title={config.title}
                                                    disabled={isEmpty}
                                                >
                                                    {config.icon}
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