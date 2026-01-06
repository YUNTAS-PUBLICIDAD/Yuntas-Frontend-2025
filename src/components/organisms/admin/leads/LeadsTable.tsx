'use client';

import { useState } from "react";
import { Lead, LeadInput } from "@/types/admin/lead";
import Modal from "@/components/atoms/Modal";
import LeadForm from "@/components/molecules/admin/leads/LeadForm";
import { useLeads } from "@/hooks/useLeads";
import IconButton from "@/components/atoms/IconButton";
import { IoMdTrash } from "react-icons/io";
import { FiEdit } from "react-icons/fi";

interface LeadsTableProps {
    leads: Lead[];
    getLeads: (perPage?: number) => Promise<void>;
}

export default function LeadsTable({ leads, getLeads }: LeadsTableProps) {
    const [selectedClient, setSelectedClient] = useState<LeadInput | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { updateLead, deleteLead, error, isLoading } = useLeads();

    const handleEditClick = (client: Lead) => {
        const data: LeadInput = {
            id: client.id,
            name: client.name || "",
            phone: client.phone || "",
            email: client.email || "",
            product_id: client.product_id || 0,
            source_id: client.source_id || 1,
        };
        setSelectedClient(data);
        setIsEditModalOpen(true);
    };

    const handleDeleteClient = async (id: number) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
        if (!confirmDelete) return;
        const success = await deleteLead(id);
        if (success) {
            alert("Cliente eliminado");
            await getLeads(200);
        } else {
            alert("Error al eliminar el cliente");
        }
    };

    const handleCloseModal = () => {
        setSelectedClient(null);
        setIsEditModalOpen(false);
    };

    // edit submit
    const handleEditClient = async (formData: LeadInput) => {
        if (!selectedClient) return;
        const success = await updateLead(selectedClient.id!, formData);
        if (success) {
            alert("Cliente actualizado");
            handleCloseModal();
            await getLeads(200);
        } else {
            alert(error);
        }
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        return dateString.split('T')[0];
    };

    return (
        <div className="w-full">

            <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                {['ID', 'NOMBRE', 'GMAIL', 'TELÉFONO', 'PRODUCTO', 'FECHA', 'ACCIÓN'].map((header) => (
                    <div
                        key={header}
                        className="bg-[#00C2CB] text-white font-bold py-2 px-1 rounded-md text-sm flex items-center justify-center uppercase"
                    >
                        {header}
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2">
                {leads.length > 0 ? (
                    leads.map((lead) => (
                        <div
                            key={lead.id}
                            className="grid grid-cols-7 gap-2 bg-[#F3F4F6] py-3 px-1 rounded-md items-center text-center text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                            <div className="font-bold text-gray-900">{lead.id}</div>

                            <div className="font-bold truncate px-1" title={lead.name}>
                                {lead.name}
                            </div>

                            <div className="truncate px-1 text-gray-600" title={lead.email}>
                                {lead.email}
                            </div>

                            <div className="font-bold text-gray-800">
                                {lead.phone || "-"}
                            </div>

                            <div className="font-bold text-gray-900 truncate px-1">
                                {lead.product?.name || "Sin producto"}
                            </div>

                            <div className="font-bold text-gray-900 text-xs">
                                {formatDate(lead.created_at || "")}
                            </div>

                            <div className="flex justify-center items-center gap-2">
                                <IconButton
                                    variant="edit"
                                    onClick={() => handleEditClick(lead)}
                                    tooltip="Editar"
                                >
                                    <FiEdit size={20} />
                                </IconButton>
                                <IconButton
                                    variant="delete"
                                    onClick={() => handleDeleteClient(lead.id)}
                                    tooltip="Eliminar"
                                >
                                    <IoMdTrash size={24} />
                                </IconButton>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-md">
                        No hay datos disponibles.
                    </div>
                )}
            </div>

            <Modal
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                title="EDITAR CLIENTE"
            >
                <LeadForm
                    onSubmit={handleEditClient}
                    onCancel={handleCloseModal}
                    isLoading={isLoading}
                    initialData={selectedClient}
                />
            </Modal>
        </div>
    );
}