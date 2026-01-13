import React from "react";
import { FaTrash, FaEdit, FaCheck, FaEye } from "react-icons/fa";

export interface TableAction {
  type: "delete" | "edit" | "view" | "approve" | "custom";
  label?: string;
  onClick: (id: string | number) => void;
  icon?: React.ReactNode;
  className?: string;
}

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface AdminTableProps {
  columns: Column[];
  data: Record<string, any>[];
  minRows?: number;
  actions?: TableAction[];
}

export default function AdminTable({
  columns,
  data,
  minRows = 5,
  actions = [],
}: AdminTableProps) {
  const rows = [...data];
  while (rows.length < minRows) {
    rows.push({ _empty: true, id: `empty-${rows.length}` });
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <table className="w-full border-separate border-spacing-y-2 p-2">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="
                  py-3 px-4 text-center text-lg font-semibold whitespace-nowrap
                  first:rounded-l-lg last:rounded-r-lg
                  bg-[#0D1030] text-white
                  dark:bg-[#293296]
                "
              >
                {col.label}
              </th>
            ))}
            {actions.length > 0 && (
              <th
                className="
                  py-3 px-4 text-center text-lg font-semibold w-40
                  rounded-r-lg
                  bg-[#0D1030] text-white
                  dark:bg-[#293296]
                "
              >
                ACCIÓN
              </th>
            )}
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
                      bg-gray-100
                      ${
                        col.key === "id"
                          ? "font-bold text-black"
                          : "text-[#0D1030]"
                      }
                    `}
                  >
                    {isEmpty
                      ? ""
                      : col.render
                      ? col.render(row[col.key], row)
                      : row[col.key]}
                  </td>
                ))}

                {actions.length > 0 && (
                  <td className="py-3 px-4 h-14 rounded-r-lg bg-white text-center">
                    {!isEmpty && (
                      <div className="flex justify-center gap-2">
                        {actions.map((action, idx) => (
                          <ActionButton
                            key={idx}
                            action={action}
                            id={row.id}
                          />
                        ))}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const ActionButton = ({ action, id }: { action: TableAction; id: string | number }) => {
  let icon = action.icon;
  let baseClass = "p-2 rounded-full transition";
  let colorClass = "text-gray-600 hover:bg-gray-200";

  switch (action.type) {
    case "delete":
      icon = icon || <FaTrash />;
      colorClass = "text-red-500 hover:bg-red-50";
      break;
    case "edit":
      icon = icon || <FaEdit />;
      colorClass = "text-blue-500 hover:bg-blue-50";
      break;
    case "approve":
      icon = icon || <FaCheck />;
      colorClass = "text-green-500 hover:bg-green-50";
      break;
    case "view":
      icon = icon || <FaEye />;
      colorClass = "text-gray-500 hover:bg-gray-100";
      break;
  }

  return (
    <button
      onClick={() => action.onClick(id)}
      className={`${baseClass} ${colorClass} ${action.className || ""}`}
      title={action.label}
    >
      {icon}
    </button>
  );
};
