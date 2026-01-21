'use client';

import { useEffect, useState } from "react";
import { LeadInput, Lead } from "@/types/admin/lead";

import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Pagination from '@/components/molecules/Pagination';
import Modal from "@/components/atoms/Modal";

import TrackingTable from "@/components/organisms/admin/leads/TrackingTable";
import AdminTable from "@/components/organisms/admin/AdminTable";

import { useLeads } from "@/hooks/useLeads";
import LeadForm from "@/components/molecules/admin/leads/LeadForm";

export default function SeguimientoPage() {

    const [datosPaginados, setDatosPaginados] = useState<Lead[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTrackingMode, setIsTrackingMode] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    const { getLeads, leads, createLead, updateLead, deleteLead, error, isLoading } = useLeads();

    useEffect(() => {
        getLeads(200);
    }, []);

    const handleEditClick = (client: Lead) => {
        setSelectedLead(client);
        setIsModalOpen(true);
    };

    const handleCreateLead = async (formData: LeadInput) => {
        if (formData.product_id === 0) {
            delete formData.product_id;
        }

        const response = await createLead(formData);
        if (response.success) {
            handleCloseModal();
            await getLeads(200);
            alert("Cliente creado");
        } else {
            alert(response.message);
        }
    };

    const handleEditLead = async (formData: LeadInput) => {
        if (!selectedLead) return;

        const response = await updateLead(selectedLead.id!, formData);
        if (response.success) {
            handleCloseModal();
            await getLeads(200);
            alert("Cliente actualizado");
        } else {
            alert(response.message);
        }
    };

    const handleDeleteLead = async (client: Lead) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
        if (!confirmDelete) return;

        const response = await deleteLead(client.id!);
        if (response.success) {
            await getLeads(200);
            alert("Cliente eliminado");
        } else {
            alert(response.message);
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
            variant: "secondary" as const,
            className: "flex-auto w-auto"
        },
        {
            label: isTrackingMode ? "SEGUIMIENTO" : "MEDIO DE SEGUIMIENTO",
            onClick: () => setIsTrackingMode(!isTrackingMode),
            variant: "primary" as const,

            className: "flex-auto w-auto"
        },
        {
            label: "MONITOREO",
            onClick: () => { },
            variant: "secondary" as const,
            className: "flex-auto w-auto"
        }
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
        <div className="p-2 md:p-4">

            {/* BOTONES SUPERIORES */}
            <div className="mb-4 flex flex-row flex-wrap gap-2">
                <ActionButtonGroup buttons={topButtons} className="w-full" />
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {/* TABLAS */}
            <div className="w-full overflow-x-auto">
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
            </div>

            {/* PAGINACIÓN */}
            <div className="flex justify-center mt-4 w-full overflow-x-hidden">
                <Pagination
                    pageSize={5}
                    items={leads}
                    setProductosPaginados={setDatosPaginados}
                />
            </div>

            {/* BOTÓN AÑADIR */}
            <div className="mt-6 flex justify-start">
                <ActionButtonGroup
                    buttons={[
                        {
                            label: "Añadir Cliente",
                            onClick: () => setIsModalOpen(true),
                            variant: "tertiary"
                        }
                    ]}
                />
            </div>

            {/* MODAL */}
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
