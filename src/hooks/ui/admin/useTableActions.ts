'use client';

import { useState } from 'react';

export const useTableActions = () => {
    const [isProcessing, setIsProcessing] = useState<string | number | null>(null);

    const handleDelete = async (id: string | number) => {
        const confirm = window.confirm(`¿Estás seguro de eliminar el registro #${id}?`);
        
        if (confirm) {
            setIsProcessing(id);
            console.log(`🗑️ Eliminando registro ${id}...`);
            
            setTimeout(() => {
                console.log(`✅ Registro ${id} eliminado.`);
                setIsProcessing(null);
            }, 1000);
        }
    };

    const handleApprove = async (id: string | number) => {
        setIsProcessing(id);
        console.log(`✅ Aprobando registro ${id}...`);
        
        setTimeout(() => {
            console.log(`Registro ${id} aprobado.`);
            setIsProcessing(null);
        }, 1000);
    };

    return {
        handleDelete,
        handleApprove,
        isProcessing
    };
};