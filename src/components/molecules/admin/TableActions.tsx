'use client';

import { IoMdTrash } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import IconButton from "@/components/atoms/IconButton";

interface TableActionsProps {
    id: string | number;
    actions?: ("delete" | "approve" | "edit")[];
    onDelete?: (id: string | number) => void;
    onApprove?: (id: string | number) => void;
    onEdit?: (id: string | number) => void;
    isEmpty?: boolean;
}

const TableActions = ({ 
    id, 
    actions = ["delete", "approve"], 
    onDelete, 
    onApprove, 
    onEdit,
    isEmpty = false
}: TableActionsProps) => {

    if (isEmpty) return <div className="h-8 w-8" />; 
    return (
        <div className="flex items-center justify-center gap-3">
            
            {/* Botón Eliminar */}
            {actions.includes("delete") && (
                <IconButton 
                    variant="delete" 
                    onClick={() => onDelete?.(id)}
                    tooltip="Eliminar"
                >
                    <IoMdTrash size={22} />
                </IconButton>
            )}

            {/* Botón Editar */}
            {actions.includes("edit") && (
                <IconButton 
                    variant="edit" 
                    onClick={() => onEdit?.(id)}
                    tooltip="Editar"
                >
                    <FiEdit size={20} />
                </IconButton>
            )}

            {/* Botón Aprobar */}
            {actions.includes("approve") && (
                <IconButton 
                    variant="approve" 
                    onClick={() => onApprove?.(id)}
                    tooltip="Aprobar"
                >
                    <FaCheckCircle size={20} />
                </IconButton>
            )}
        </div>
    );
};

export default TableActions;