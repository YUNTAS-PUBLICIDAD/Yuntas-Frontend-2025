'use client'

import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
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
                data={data}
                actions={[
                    { type: "delete", onClick: onDelete },
                    { type: "edit", onClick: onEdit }
                ]}
            />

            <ActionButtonGroup
                buttons={[{ label: "Agregar Cliente", onClick: onAdd, variant: "tertiary" }]}
                className="mt-4"
            />
        </div>
    );
}