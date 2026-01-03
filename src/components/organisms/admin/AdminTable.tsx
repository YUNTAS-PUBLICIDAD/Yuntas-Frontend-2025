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
        <div className="w-full overflow-x-auto rounded-xl bg-white shadow-sm border border-gray-100">
            <table className="w-full border-separate border-spacing-y-2 p-2">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="bg-[#0D1030] text-white font-semibold text-lg py-3 px-4 first:rounded-l-lg last:rounded-r-lg text-center whitespace-nowrap">
                                {col.label}
                            </th>
                        ))}
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
                                {columns.map((col) => (
                                    <td key={col.key} className={`bg-[#F4F4F2] py-3 px-4 text-center h-14 whitespace-nowrap first:rounded-l-lg ${col.key === 'id' ? "font-bold text-black" : "text-[#0D1030]"}`}>
                                        {isEmpty ? "" : col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                                <td className="bg-[#F4F4F2] py-3 px-4 rounded-r-lg text-center h-14">
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