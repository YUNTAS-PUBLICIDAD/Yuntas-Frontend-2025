'use client'

import { useState } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Pagination from '@/components/molecules/Pagination';
import data from "@/data/admin/seguimientoData";

const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "NOMBRE" },
    { key: "gmail", label: "GMAIL" },
    { key: "telefono", label: "TELÉFONO" },
    { key: "producto", label: "PRODUCTO" },
    { key: "fecha", label: "FECHA" },
];

export default function SeguimientoPage() {
    const [datosPaginados, setDatosPaginados] = useState<typeof data>([]);

    const onMensajes = () => {
        // para los mensajes
    };

    const onMedioSeguimiento = () => {
        // para el medio de seguimiento
    };

    const onMonitoreo = () => {
        // para el monitoreo
    };

    const onAdd = () => {
        // para añadir datos
    };

    const onDelete = (id: string | number) => {
        // para eliminar datos
    };

    const onEdit = (id: string | number) => {
        // para editar datos
    };

    const topButtons = [
        { label: "Mensajes", onClick: onMensajes },
        { label: "Medio de seguimiento", onClick: onMedioSeguimiento },
        { label: "Monitoreo", onClick: onMonitoreo },
    ];

    return (
        <div>
            <ActionButtonGroup buttons={topButtons} className="mb-4 mt-4" />

            <AdminTable
                columns={columns}
                data={datosPaginados}
                minRows={10}
                actions={[
                    { type: "delete", onClick: onDelete },
                    { type: "edit", onClick: onEdit }
                ]}
            />

            <ActionButtonGroup
                buttons={[{ label: "Agregar Cliente", onClick: onAdd, variant: "tertiary" }]}
                className="mt-4"
            />
            <div className="col-span-full  flex justify-center order-3 my-6">
                <Pagination pageSize={10} items={data} setProductosPaginados={setDatosPaginados} />
            </div>
        </div>
    );
}