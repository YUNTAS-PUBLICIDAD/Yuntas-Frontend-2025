'use client';

import { useState } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Pagination from '@/components/molecules/Pagination';
import Modal from "@/components/atoms/Modal";
import AddClientForm from "@/components/molecules/admin/AddClientForm";
import EditClientForm from "@/components/organisms/admin/EditClientForm"; 
import data from "@/data/admin/seguimientoData";
import { ClientData } from "@/hooks/ui/admin/useClientEdit";

const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "NOMBRE" },
    { key: "gmail", label: "GMAIL" },
    { key: "telefono", label: "TELÉFONO" },
    { key: "producto", label: "PRODUCTO" },
    { key: "fecha", label: "FECHA" },
];

export default function SeguimientoPage() {
    // --- Estados ---
    const [datosPaginados, setDatosPaginados] = useState<typeof data>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

    const onMensajes = () => console.log("Mensajes");
    const onMedioSeguimiento = () => console.log("Seguimiento");
    const onMonitoreo = () => console.log("Monitoreo");

    const onAdd = () => setIsAddModalOpen(true);
    const onAddClientSubmit = (d: any) => setIsAddModalOpen(false);

    const onEdit = (id: string | number) => {
        const client = data.find(c => c.id === id);
        if (client) {
            // @ts-ignore
            setSelectedClient(client);
            setIsEditModalOpen(true);
        }
    };

    const onDelete = (id: string | number) => console.log("Eliminar", id);

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
                onDelete={onDelete}
                onEdit={onEdit} 
            
            />

            <ActionButtonGroup
                buttons={[{ label: "Agregar Cliente", onClick: onAdd, variant: "tertiary" }]}
                className="mt-4"
            />
            
            <div className="col-span-full flex justify-center order-3 my-6">
                <Pagination pageSize={10} items={data} setProductosPaginados={setDatosPaginados} />
            </div>

            {/* Modales */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="AÑADIR CLIENTE">
                <AddClientForm onSubmit={onAddClientSubmit} onCancel={() => setIsAddModalOpen(false)} />
            </Modal>

            <EditClientForm 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)}
                client={selectedClient}
            />
        </div>
    );
}