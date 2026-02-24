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
import SearchBar from "@/components/molecules/SearchBar";
import { FaSearch } from "react-icons/fa";


export default function SeguimientoPage() {
    const router = useRouter();

    const [datosPaginados, setDatosPaginados] = useState<Lead[]>([]);
    const [leadsFiltered, setLeadsFiltered] = useState<Lead[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMonitoreoMode, setIsMonitoreoMode] = useState(false); 
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const { getLeads, leads, createLead, updateLead, deleteLead, error, isLoading } = useLeads();
    const { confirm, ConfirmDialog } = useConfirm();

    useEffect(() => {
        getLeads(200);
    }, []);

    useEffect(() => {
        setLeadsFiltered(leads);
    }, [leads]);

    // Filtrar leads por término de búsqueda
    const filteredLeads = useMemo(() => {
        if (!searchTerm.trim()) return leadsFiltered;

        const term = searchTerm.toLowerCase().trim();

        return leadsFiltered.filter((lead) => {
            const name = (lead.name || "").toLowerCase();
            const email = (lead.email || "").toLowerCase();
            const phone = (lead.phone || "").toLowerCase();
            const product = (lead.product_name || "").toLowerCase();
            const source = (lead.source_name || "").toLowerCase();
            const fechaRaw = (lead.created_at || "").toLowerCase();
            // Generar fecha en formato dd/mm/yyyy
            let fechaFormateada = "";
            if (fechaRaw) {
                const dateObj = new Date(lead.created_at!);
                if (!isNaN(dateObj.getTime())) {
                    const day = String(dateObj.getDate()).padStart(2, '0');
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const year = dateObj.getFullYear();
                    fechaFormateada = `${day}/${month}/${year}`;
                }
            }

            return (
                name.includes(term) ||
                email.includes(term) ||
                phone.startsWith(term) ||
                product.includes(term) ||
                source.includes(term) ||
                fechaRaw.includes(term) ||
                fechaFormateada.includes(term)
            );
        });
    }, [leadsFiltered, searchTerm]);

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

            {/* BUSCADOR */}
            <div className="mb-4 flex items-center gap-4 flex-wrap">
                <div className="relative flex-1 min-w-[250px] max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, email, teléfono, producto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#203565] focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="px-4 py-2 bg-[#E8F4F8] border-2 border-[#203565] rounded-full ml-auto">
                    <span className="text-[#203565] font-semibold">
                        {filteredLeads.length} REGISTROS ENCONTRADOS
                    </span>
                </div>
            </div>

            {/* BUSCADOR MONITOREO */}
            {isMonitoreoMode && (
                <div className="mb-4">
                    <SearchBar
                        items={leads}
                        onSearch={setLeadsFiltered}
                        placeholder="Buscar por ID o Nombre..."
                        searchKeys={['id', 'name']}
                        getDisplayValue={(item) => `${item.id} - ${item.name}`}
                    />
                </div>
            )}

            {/* TABLAS */}
            <div className="w-full overflow-x-auto">
                {isMonitoreoMode ? (
                    <MonitoreoTable
                        data={datosPaginados}
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
                    items={filteredLeads}
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