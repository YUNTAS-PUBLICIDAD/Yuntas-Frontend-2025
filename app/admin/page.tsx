'use client'

import AdminTable from "@/components/organisms/admin/AdminTable";
import Button from "@/components/atoms/Button";

import data from "@/data/admin/inicioData";

const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "NOMBRE" },
    { key: "gmail", label: "GMAIL" },
    { key: "telefono", label: "TELÉFONO" },
    { key: "seccion", label: "SECCIÓN" },
    { key: "fecha", label: "FECHA" },
];

export default function AdminPage() {

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
                onDelete={onDelete}
                onApprove={onApprove}
            />
            <Button size="sm" variant="tertiary" className="bg-[#0D1030] py-1 mt-4" onClick={onAdd}>
                <p className="font-semibold text-xl">Añadir datos</p>
            </Button>
        </div>
    );
}