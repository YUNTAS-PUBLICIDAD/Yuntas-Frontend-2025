'use client';

import { useMemo } from 'react';

interface UseAdminTableProps {
    data: Record<string, any>[];
    minRows: number;
    onDelete?: (id: string | number) => void;
    onApprove?: (id: string | number) => void;
    onEdit?: (id: string | number) => void;
}

export const useAdminTable = ({ 
    data, 
    minRows, 
    onDelete, 
    onEdit, 
    onApprove 
}: UseAdminTableProps) => {

    const enabledActions = useMemo(() => {
        const actions: ("delete" | "approve" | "edit")[] = [];
        
        if (onDelete) actions.push("delete");
        if (onEdit) actions.push("edit");
        if (onApprove) actions.push("approve");
        
        return actions;
    }, [onDelete, onEdit, onApprove]);

    const rows = useMemo(() => {
        const processedRows = [...data];
        
        while (processedRows.length < minRows) {
            processedRows.push({ 
                _empty: true, 
                id: `empty-${processedRows.length}` 
            });
        }
        
        return processedRows;
    }, [data, minRows]);

    return {
        enabledActions,
        rows
    };
};