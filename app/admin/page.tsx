'use client';

import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import { useTableActions } from "@/hooks/ui/admin/useTableActions"; // Importamos tu Hook
import data from "@/data/admin/inicioData";

const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "NOMBRE" },
    { key: "gmail", label: "GMAIL" },
    { key: "telefono", label: "TELÉFONO" },
    { key: "seccion", label: "SECCIÓN" },
    { key: "fecha", label: "FECHA" },
];

export default function InicioPage() {
    
    const { handleDelete, handleApprove, isProcessing } = useTableActions();

    const onAdd = () => {
        console.log("Navegar a formulario de añadir...");
    }

    return (
        <div className="flex flex-col gap-6">
            
            {/* 2. Pasamos las funciones directamente. 
                El Organismo AdminTable sabrá qué botones pintar basándose en si existe la función o no. */}
            <AdminTable
                columns={columns}
                data={data}
                onDelete={handleDelete}
                onApprove={handleApprove}
                // onEdit={handleEdit} // Si quisieras editar, solo descomentas y pasas la función
            />
            
            <ActionButtonGroup 
                buttons={[
                    { label: "Añadir datos", onClick: onAdd, variant: "primary" }
                ]} 
                className="self-start" // Ajuste de Tailwind para alinear
            />
        </div>
    );
}