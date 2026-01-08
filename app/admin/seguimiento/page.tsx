'use client';

import { useEffect, useState } from "react";
import { LeadInput, Lead } from "@/types/admin/lead";

import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Pagination from '@/components/molecules/Pagination';
import Modal from "@/components/atoms/Modal";

import TrackingTable from "@/components/organisms/admin/leads/TrackingTable";

import { useLeads } from "@/hooks/useLeads";
import LeadForm from "@/components/molecules/admin/leads/LeadForm";
import AdminTable from "@/components/organisms/admin/AdminTable";

export default function SeguimientoPage() {

    const [datosPaginados, setDatosPaginados] = useState<Lead[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTrackingMode, setIsTrackingMode] = useState(false);
    const [selectedLead, setSelectedLead] = useState<LeadInput | null>(null);
    const { getLeads, leads, createLead, updateLead, deleteLead, error, isLoading } = useLeads();

    useEffect(() => {
        getLeads(200);
    }, [])

    // Aqui se prepara los datos para mostrarlos en el modal de editar (cuando se hace click en el icono de editar)
    const handleEditClick = (client: Lead) => {
        const data: LeadInput = {
            id: client.id,
            name: client.name || "",
            phone: client.phone || "",
            email: client.email || "",
            product_id: client.product_id || 0,
            source_id: client.source_id || 1,
        };
        setSelectedLead(data);
        setIsModalOpen(true);
    };

    const handleCreateLead = async (formData: LeadInput) => {
        if (formData.product_id === 0) {
            delete formData.product_id
        }

        const success = await createLead(formData);
        if (success) {
            handleCloseModal();
            await getLeads(200);
            alert("Cliente creado");
        } else {
            alert(error);
        }
    }

    const handleEditLead = async (formData: LeadInput) => {
        if (!selectedLead) return;
        const success = await updateLead(selectedLead.id!, formData);
        if (success) {
            handleCloseModal();
            await getLeads(200);
            alert("Cliente actualizado");
        } else {
            alert(error);
        }
    }

    const handleDeleteLead = async (client: Lead) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
        if (!confirmDelete) return;
        const success = await deleteLead(client.id!);
        if (success) {
            await getLeads(200);
            alert("Cliente eliminado");
        } else {
            alert("Error al eliminar el cliente");
        }
    };

    const handleCloseModal = () => {
        setSelectedLead(null);
        setIsModalOpen(false);
    };

    const topButtons = [
        {
            label: "MENSAJES",
            onClick: () => { },
            variant: "secondary" as const
        },
        {
            label: isTrackingMode ? "SEGUIMIENTO" : "MEDIO DE SEGUIMIENTO",
            onClick: () => setIsTrackingMode(!isTrackingMode),
            variant: "primary" as const
        },
        {
            label: "MONITOREO",
            onClick: () => { },
            variant: "secondary" as const
        },
    ];

    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "NOMBRE" },
        { key: "email", label: "EMAIL" },
        { key: "phone", label: "TELÉFONO" },
        { key: "product_name", label: "PRODUCTO" },
        { key: "created_at", label: "FECHA" }
    ];

    return (
        <div className="p-4">
            <div className="flex gap-2 mb-4">
                <ActionButtonGroup buttons={topButtons} />
            </div>

            {isTrackingMode ? (
                <TrackingTable
                    data={datosPaginados}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteLead}
                />
            ) : (
                <AdminTable
                    data={datosPaginados}
                    columns={columns}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteLead}
                />
            )}

            <div className="flex justify-center mt-4">
                <Pagination
                    pageSize={10}
                    items={leads}
                    setProductosPaginados={setDatosPaginados}
                />
            </div>

            <div className="mt-6 flex justify-start">
                <ActionButtonGroup buttons={[{ label: "Añadir Cliente", onClick: () => setIsModalOpen(true), variant: "tertiary" }]} />
            </div>


            {/** Modal para crear y editar cliente */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={!selectedLead ? "Añadir Cliente" : "Editar Cliente"}
            >
                <LeadForm
                    onSubmit={!selectedLead ? handleCreateLead : handleEditLead}
                    onCancel={handleCloseModal}
                    isLoading={isLoading}
                    initialData={selectedLead}
                />
            </Modal>
        </div>
    );
}