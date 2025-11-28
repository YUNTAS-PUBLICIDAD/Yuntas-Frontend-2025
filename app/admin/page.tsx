'use client'

import AdminTable from "@/components/organisms/admin/AdminTable";
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

    const onAdd = () => {
        // se añade mas datos
    }
    
    const onDelete = (id: string | number) => {
        // se elimina el dato
    }

    const onApprove = (id: string | number) => {
        // se aprueba el dato o no se
    }

    return (
        <div>
            <AdminTable
                columns={columns}
                data={data}
                actions={[
                    { type: "delete", onClick: onDelete },
                    { type: "approve", onClick: onApprove }
                ]}
            />
            
            <ActionButtonGroup 
                buttons={[{ label: "Añadir datos", onClick: onAdd, variant: "tertiary" }]} 
                className="mt-4" 
            />
        </div>
    );
}