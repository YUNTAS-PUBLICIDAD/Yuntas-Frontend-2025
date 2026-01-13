import TableActions from "@/components/molecules/admin/TableActions";
import { useAdminTable } from "@/hooks/ui/admin/useAdminTable";

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

    return (
        <div className="w-full overflow-x-auto rounded-xl">
            <table className="w-full border-separate border-spacing-y-2 p-2">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="
                                    bg-[#0D1030] dark:bg-[#293296]
                                    text-white font-semibold text-lg
                                    py-3 px-4 text-center whitespace-nowrap
                                    first:rounded-l-lg last:rounded-r-lg
                                "
                            >
                                {col.label}
                            </th>
                        ))}
                        <th
                            className="
                                bg-[#0D1030] dark:bg-[#293296]
                                text-white font-semibold text-lg
                                py-3 px-4 rounded-r-lg text-center w-40
                            "
                        >
                            ACCIÓN
                        </th>
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
                                            py-3 px-4 h-14 text-center whitespace-nowrap
                                            first:rounded-l-lg
                                            bg-[#F4F4F2] dark:bg-white
                                            ${col.key === "id"
                                                ? "font-bold text-black"
                                                : "text-[#0D1030]"
                                            }
                                        `}
                                    >
                                        {isEmpty
                                            ? ""
                                            : col.render
                                            ? col.render(row[col.key], row)
                                            : row[col.key]
                                        }
                                    </td>
                                ))}

                                <td
                                    className="
                                        py-3 px-4 h-14 rounded-r-lg text-center
                                        bg-[#F4F4F2] dark:bg-white
                                    "
                                >
                                    <TableActions
                                        item={row}
                                        isEmpty={isEmpty}
                                        onDelete={onDelete}
                                        onApprove={onApprove}
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
