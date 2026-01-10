'use client';

import AdminTable from "@/components/organisms/admin/Products/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
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
    
    const onAdd = () => {}
    
    
    return (
        <div className="flex flex-col gap-6">
            
            
            <AdminTable
                columns={columns}
                data={data}
            />
            
            <ActionButtonGroup 
                buttons={[
                    { label: "Añadir datos", onClick: onAdd, variant: "primary" }
                ]} 
                className="self-start"
            />
        </div>
    );
}