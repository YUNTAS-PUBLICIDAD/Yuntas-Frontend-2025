'use client';

import { IoMdTrash } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import IconButton from "@/components/atoms/IconButton";

interface TableActionsProps<T = any> {
    item: T;
    actions?: ("delete" | "approve" | "edit")[];
    onDelete?: (item: T) => void;
    onApprove?: (item: T) => void;
    onEdit?: (item: T) => void;
    isEmpty?: boolean;
}

const TableActions = <T,>({
    item,
    actions = ["delete", "approve"],
    onDelete,
    onApprove,
    onEdit,
    isEmpty = false
}: TableActionsProps<T>) => {

    if (isEmpty) return <div className="h-8 w-8" />;

    return (
        <div className="flex items-center justify-center gap-3">

            {/* Eliminar */}
            {actions.includes("delete") && (
                <IconButton
                    variant="delete"
                    onClick={() => onDelete?.(item)}
                    tooltip="Eliminar"
                >
                    <IoMdTrash size={22} />
                </IconButton>
            )}

            {/* Editar */}
            {actions.includes("edit") && (
                <IconButton
                    variant="edit"
                    onClick={() => onEdit?.(item)}
                    tooltip="Editar"
                >
                    <FiEdit size={20} />
                </IconButton>
            )}

            {/* Aprobar */}
            {actions.includes("approve") && (
                <IconButton
                    variant="approve"
                    onClick={() => onApprove?.(item)}
                    tooltip="Aprobar"
                >
                    <FaCheckCircle size={20} />
                </IconButton>
            )}
        </div>
    );
};

export default TableActions;
