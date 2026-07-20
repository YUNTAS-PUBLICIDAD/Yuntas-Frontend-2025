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
import { Eye, MessageCircle, UserPlus } from "lucide-react";
import { getRole } from "@/utils/role";


export default function SeguimientoPage() {
    const router = useRouter();
    const role = getRole();

    useEffect(() => {
        if (role !== "admin") {
            router.replace("/admin");
        }
    }, [role, router]);

    const [datosPaginados, setDatosPaginados] = useState<Lead[]>([]);
    const [leadsFiltered, setLeadsFiltered] = useState<Lead[]>([]);
    const [originFilter, setOriginFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMonitoreoMode, setIsMonitoreoMode] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);


    const { getLeads, leads, createLead, updateLead, deleteLead, error, isLoading } = useLeads();
    const { confirm, ConfirmDialog } = useConfirm();
    const currentMode = useMemo(
        () => ({
            title: isMonitoreoMode ? "Monitoreo" : "Vista principal",
            description: isMonitoreoMode
                ? "Visualiza actividad por canal y último movimiento registrado."
                : "Administra clientes, edita datos y filtra seguimientos con rapidez.",
            titleTable: isMonitoreoMode ? "Monitoreo" : "seguimiento de clientes",
            descriptionTable: isMonitoreoMode
                ? "Monitoreo"
                : "Consulta y administra los clientes",
            searchPlaceholder: isMonitoreoMode
                ? "Buscar por ID o nombre..."
                : "Buscar por nombre, email, teléfono, producto...",
            searchKeys: isMonitoreoMode
                ? (['id', 'name'] as const)
                : (['id', 'name', 'email', 'phone', 'product_name', 'source_name', 'created_at'] as const),
            emptyMessage: isMonitoreoMode
                ? "No se encontraron registros de monitoreo"
                : "No se encontraron seguimientos",
            resetText: isMonitoreoMode
                ? "Ver todos los registros"
                : "Ver todos los seguimientos",
        }),
        [isMonitoreoMode]
    );

    useEffect(() => {
        getLeads(200);
    }, []);

    useEffect(() => {
        setLeadsFiltered(leads);
    }, [leads]);

    const originOptions = useMemo(() => {
        const allowedOrigins = ["Inicio", "Producto detalle", "Administración"];

        return Array.from(
            new Set(
                leads
                    .map((lead) => lead.source_name?.trim())
                    .filter((source): source is string => Boolean(source))
            )
        )
            .filter((source) => allowedOrigins.includes(source))
            .sort((a, b) => a.localeCompare(b));
    }, [leads]);

    const leadsByOrigin = useMemo(() => {
        if (!originFilter) return leadsFiltered;

        return leadsFiltered.filter((lead) => (lead.source_name ?? "").trim() === originFilter);
    }, [leadsFiltered, originFilter]);

    const totalRecords = leadsByOrigin.length;

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
            className: "flex-auto w-auto",
            icon: <MessageCircle className="h-4 w-4" />
        },
        {
            label: "MONITOREO",
            onClick: () => setIsMonitoreoMode(!isMonitoreoMode),
            variant: (isMonitoreoMode ? "primary" : "secondary") as "primary" | "secondary",
            className: "flex-auto w-auto",
            icon: <Eye className="h-4 w-4" />
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
        <div className="relative p-2 md:p-4 text-[#0D1030] dark:text-white transition-colors duration-300">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(35,193,222,0.18),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(32,53,101,0.16),_transparent_36%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(109,225,227,0.18),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(41,50,150,0.18),_transparent_36%)]" />

            {/* CABECERA */}
            <section className="mb-5 overflow-hidden rounded-[1.75rem] border border-[#D8E7F3] bg-white/90 p-5 shadow-[0_18px_40px_rgba(13,16,48,0.06)] backdrop-blur dark:border-white/10 dark:bg-[#1C2347]/90">
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="space-y-1 flex-1">
                        <h2 className="text-3xl font-bold tracking-tight text-[#0D1030] dark:text-white md:text-4xl">
                            {currentMode.title}
                        </h2>
                        <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-white/80 md:text-base">
                            {currentMode.description}
                        </p>
                    </div>

                    <ActionButtonGroup buttons={topButtons} className="w-full lg:w-auto" position="center" />
                </div>
            </section>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            <section className="mb-5 rounded-[1.75rem] border border-[#D8E7F3] bg-white/95 p-4 shadow-[0_14px_32px_rgba(13,16,48,0.05)] dark:border-white/10 dark:bg-[#1C2347]/95 md:p-5">
                <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
                    <div className="w-full min-w-0 2xl:flex-1">
                        <SearchBar
                            items={leads}
                            onSearch={setLeadsFiltered}
                            placeholder={currentMode.searchPlaceholder}
                            searchKeys={currentMode.searchKeys as any}
                            getDisplayValue={(item) => `${item.id} - ${item.name}`}
                        />
                    </div>

                    <div className="grid w-full gap-3 sm:grid-cols-2 2xl:w-[360px] 2xl:flex-none">
                        <div className="w-full min-w-0 rounded-2xl border border-[#E5EEF6] bg-[#F8FBFE] px-3 py-3 text-center dark:border-white/10 dark:bg-white/5 sm:px-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">Resultados</p>
                            <p className="mt-1 text-xl font-black leading-none text-[#203565] dark:text-white sm:text-2xl">
                                {totalRecords}
                            </p>
                        </div>
                        <div className="w-full min-w-0 rounded-2xl border border-[#E5EEF6] bg-[#F8FBFE] px-3 py-3 text-center dark:border-white/10 dark:bg-white/5 sm:px-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">Modo</p>
                            <p className="mt-1 text-sm font-semibold text-[#203565] dark:text-white">
                                {isMonitoreoMode ? "Monitoreo" : "Vista principal"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mb-4 flex flex-col gap-4 border-b border-[#E5EEF6] pb-4 px-5 dark:border-white/10 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h3 className="mt-1 mb-1 text-xl lg:text-3xl font-bold text-[#0D1030] dark:text-white/90">
                        {currentMode.titleTable.toUpperCase()}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-white/80 md:text-base">{currentMode.descriptionTable}</p>
                </div>

                <div className="flex w-full flex-col gap-2 lg:w-auto lg:items-end">
                    <label htmlFor="origin-filter" className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-white/50 lg:text-right">
                        Filtrar por origen
                    </label>
                    <select
                        id="origin-filter"
                        value={originFilter}
                        onChange={(event) => setOriginFilter(event.target.value)}
                        className="w-full rounded-xl border border-[#D8E7F3] bg-white px-3 py-2 text-sm font-medium text-[#0D1030] outline-none transition focus:border-[#23C1DE] dark:border-white/10 dark:bg-[#111936] dark:text-white lg:min-w-[220px] lg:w-auto"
                    >
                        <option value="">Todos los orígenes</option>
                        {originOptions.map((origin) => (
                            <option key={origin} value={origin}>
                                {origin}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                {isMonitoreoMode ? (
                    <MonitoreoTable
                        data={datosPaginados}
                        isLoading={isLoading}
                        emptyMessage={currentMode.emptyMessage}
                        resetSearchText={currentMode.resetText}
                        onResetSearch={() => {
                            setLeadsFiltered(leads);
                            setOriginFilter("");
                        }}
                    />
                ) : (
                    <AdminTable
                        data={datosPaginados}
                        columns={columns}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteLead}
                        isLoading={isLoading}
                        emptyMessage={currentMode.emptyMessage}
                        resetSearchText={currentMode.resetText}
                        onResetSearch={() => {
                            setLeadsFiltered(leads);
                            setOriginFilter("");
                        }}
                    />
                )}
            </div>

            <div className="mt-5 flex justify-center">
                <Pagination
                    pageSize={5}
                    items={leadsByOrigin}
                    setProductosPaginados={setDatosPaginados}
                />
            </div>

            <section className="mt-5 rounded-[1.5rem] border border-[#D8E7F3] bg-white/95 p-4 shadow-[0_12px_28px_rgba(13,16,48,0.05)] dark:border-white/10 dark:bg-[#1C2347]/95 md:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-white/50">Nuevo registro</p>
                        <h3 className="mt-1 text-lg font-black text-[#0D1030] dark:text-white">
                            Añade un cliente desde aquí
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-white/60">
                            Mantén actualizado el seguimiento sin salir de la vista actual.
                        </p>
                    </div>

                    <ActionButtonGroup
                        buttons={[
                            {
                                label: "Añadir Cliente",
                                onClick: () => setIsModalOpen(true),
                                variant: "tertiary",
                                icon: <UserPlus className="h-4 w-4" />
                            }
                        ]}
                    />
                </div>
            </section>

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