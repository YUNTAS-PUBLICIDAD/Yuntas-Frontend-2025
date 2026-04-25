'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { LeadInput, Lead } from "@/types/admin/lead";

import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Pagination from '@/components/molecules/Pagination';
import Modal from "@/components/atoms/Modal";
import { showToast } from "@/utils/showToast";
import { useConfirm } from "@/hooks/useConfirm";
import MonitoreoTable from "@/components/organisms/admin/leads/MonitoreoTable";
import AdminTable from "@/components/organisms/admin/AdminTable";
import { useLeads } from "@/hooks/useLeads";
import LeadForm from "@/components/molecules/admin/leads/LeadForm";
import SearchBar from "@/components/molecules/admin/SearchBar";



export default function SeguimientoPage() {
    const router = useRouter();

    const [datosPaginados, setDatosPaginados] = useState<Lead[]>([]);
    const [leadsFiltered, setLeadsFiltered] = useState<Lead[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMonitoreoMode, setIsMonitoreoMode] = useState(false); 
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    

    const { getLeads, leads, createLead, updateLead, deleteLead, error, isLoading } = useLeads();
    const { confirm, ConfirmDialog } = useConfirm();

    useEffect(() => {
        getLeads(200);
    }, []);

    useEffect(() => {
        setLeadsFiltered(leads);
    }, [leads]);

    // Filtrar leads por término de búsqueda

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
            showToast.success("Cliente creado");
        } else {
            showToast.error(response.message || "Error al crear el cliente");
        }
    };

    const handleEditLead = async (formData: LeadInput) => {
        if (!selectedLead) return;

        const response = await updateLead(selectedLead.id!, formData);
        if (response.success) {
            handleCloseModal();
            await getLeads(200);
            showToast.success("Cliente actualizado");
        } else {
            showToast.error(response.message || "Error al actualizar el cliente");
        }
    };

    const handleDeleteLead = async (client: Lead) => {
        const confirmDelete = await confirm({ message: "¿Estás seguro de que deseas eliminar este cliente?" });
        if (!confirmDelete) return;

        const response = await deleteLead(client.id!);
        if (response.success) {
            await getLeads(200);
            showToast.success("Cliente eliminado");
        } else {
            showToast.error(response.message || "Error al eliminar el cliente");
        }
    };

    const handleCloseModal = () => {
        setSelectedLead(null);
        setIsModalOpen(false);
    };

    const topButtons = [
        {
            label: "MENSAJES",
            onClick: () => { 
                router.push('/admin/productos?modal=whatsapp&tab=plantilla');
            },
            variant: "secondary" as const,
            className: "flex-auto w-auto"
        },
        {
            label: "MONITOREO",
            onClick: () => setIsMonitoreoMode(!isMonitoreoMode),
            variant: (isMonitoreoMode ? "primary" : "secondary") as "primary" | "secondary",
            className: "flex-auto w-auto"
        }
    ];

    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "NOMBRE" },
        { key: "email", label: "EMAIL" },
        { key: "phone", label: "TELÉFONO" },
        { key: "product_name", label: "PRODUCTO" },
        { key: "source_name", label: "ORIGEN" }, 
        { key: "created_at", label: "FECHA DE INICIO" }
    ];

    return (
        <div className="p-2 md:p-4 text-[#0D1030] dark:text-white transition-colors duration-300">

            {/* BOTONES SUPERIORES */}
            <div className="mb-4 flex flex-row flex-wrap gap-2">
                <ActionButtonGroup buttons={topButtons} className="w-full" />
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {/* BUSCADOR */}

            {!isMonitoreoMode && (
                <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                    
                   
                    <div className="w-full md:flex-1">
                        <SearchBar
                            items={leads}
                            onSearch={setLeadsFiltered}
                            placeholder="Buscar por nombre, email, teléfono, producto..."
                            searchKeys={[
                                'id',
                                'name',
                                'email',
                                'phone',
                                'product_name',
                                'source_name',
                                'created_at'
                            ]}
                            getDisplayValue={(item) => `${item.id} - ${item.name}`}
                        />
                    </div>

                   
                    <div className="w-full md:w-auto px-4 py-2 bg-[#E8F4F8] dark:bg-[#1C2347] border-2 border-[#203565] dark:border-white/10 rounded-full text-center transition-colors duration-300">
                        <span className="text-[#203565] dark:text-white font-semibold text-sm md:text-base">
                            {leadsFiltered.length} REGISTROS ENCONTRADOS
                        </span>
                    </div>

                </div>
            )}
            {/* BUSCADOR MONITOREO */}
            {isMonitoreoMode && (
                <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">

                    <div className="w-full md:flex-1">
                        <SearchBar
                        items={leads}
                        onSearch={setLeadsFiltered}
                        placeholder="Buscar por ID o Nombre..."
                        searchKeys={['id', 'name']}
                        getDisplayValue={(item) => `${item.id} - ${item.name}`}
                        />
                   </div>
                   {/*Contador para Monitoreo */}
                   <div className="w-full md:w-auto px-4 py-2 bg-[#E8F4F8] dark:bg-[#1C2347] border-2 border-[#203565] dark:border-white/10 rounded-full text-center transition-colors duration-300">
                        <span className="text-[#203565] dark:text-white font-semibold text-sm md:text-base">
                            {leadsFiltered.length} REGISTROS ENCONTRADOS
                        </span>
                    </div>
                </div>
            )}

            {/* TABLAS */}
            <div className="w-full overflow-x-auto">
                {isMonitoreoMode ? (
                    <MonitoreoTable
                        data={datosPaginados}
                        isLoading={isLoading}
                        emptyMessage="No se encontraron registros de monitoreo"
                        resetSearchText="Ver todos los registros"
                        onResetSearch={() => setLeadsFiltered(leads)}
                    />
                ) : (
                    <AdminTable
                        data={datosPaginados}
                        columns={columns}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteLead}
                        isLoading={isLoading}
                        emptyMessage="No se encontraron seguimientos"
                        resetSearchText="Ver todos los seguimientos"
                        onResetSearch={() => setLeadsFiltered(leads)}
                    />
                )}
            </div>

            {/* PAGINACIÓN */}
            <div className="flex justify-center mt-4 w-full overflow-x-hidden">
                <Pagination
                    pageSize={5}
                    items={leadsFiltered}
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
            <ConfirmDialog />

        </div>
    );
}