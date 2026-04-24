'use client';

import { useState, useEffect, useRef } from "react";
import Modal from "@/components/atoms/Modal";
import { showToast } from "@/utils/showToast";
import { useProductos } from "@/hooks/useProductos";
import Pagination from "@/components/molecules/Pagination";
import AdminTable from "@/components/organisms/admin/AdminTable";
import { getToken } from "@/utils/token";
import SearchBar from "@/components/molecules/SearchBar";

// Icono para el estado de error
const AlertCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 mb-2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);

const columns = [
    { key: "id", label: "ID" },
    { key: "fecha", label: "FECHA" },
    { key: "cliente", label: "CLIENTE" },
    { key: "documento", label: "DOCUMENTO" },
    { key: "producto", label: "PRODUCTO" },
    { key: "monto", label: "MONTO" },
    { key: "estado_visual", label: "ESTADO" },
];

const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });
};

const ESTADO_OPTIONS = [
    { value: "todos", label: "👤 Todos los estados" },
    { value: "pendiente", label: "🟡 Pendiente" },
    { value: "completo", label: "🟢 Completo" },
];

export default function ReclamacionesPage() {
    const [estadoFiltro, setEstadoFiltro] = useState("todos");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [searchTerm, setSearchTerm] = useState(""); 
    
    const [reclamos, setReclamos] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [paginatedData, setPaginatedData] = useState<any[]>([]);

    const { productos, getProductos } = useProductos();

    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedReclamo, setSelectedReclamo] = useState<any | null>(null);
    const [newStatusId, setNewStatusId] = useState<number>(1);
    const [isUpdating, setIsUpdating] = useState(false);


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    useEffect(() => {
        const init = async () => {
            await Promise.all([fetchReclamos(), getProductos(200)]);
            setLoading(false);
        };
        init();
    }, []);

    const getProductName = (id?: number) => {
        if (!id) return "General";
        const productoEncontrado = productos.find(p => p.id === id);
        return productoEncontrado ? productoEncontrado.name : `Producto ID: ${id}`;
    };


    useEffect(() => {
        if (reclamos.length > 0) {
            const formatted = reclamos.map(item => {
                const isCompleto = item.claim_status_id === 2;
                return {
                    ...item,
                    fecha: formatDate(item.purchase_date || item.created_at),
                    cliente: `${item.first_name} ${item.last_name}`,
                    documento: `${item.document_number} (${item.document_type_id === 1 ? 'DNI' : 'Pasaporte'})`,
                    producto: getProductName(item.product_id),
                    monto: item.claimed_amount ? `S/. ${item.claimed_amount}` : '-',
                    estado_visual: (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide ${isCompleto ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {isCompleto ? 'Completo' : 'Pendiente'}
                        </span>
                    ),
                    
                    claim_status_id: item.claim_status_id 
                };
            });
            setTableData(formatted);
            // Inicializamos paginatedData con todo
            setPaginatedData(formatted);
        } else {
            setTableData([]);
            setPaginatedData([]);
        }
    }, [reclamos, productos]);


    useEffect(() => {
        let filtered = tableData;

        // Filtrado por texto 
        if (searchTerm.trim() !== "") {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(item =>
                item.id?.toString().includes(term) ||
                item.cliente?.toLowerCase().includes(term) ||
                item.documento?.toLowerCase().includes(term) ||
                item.producto?.toLowerCase().includes(term)
            );
        }

        //  Filtrado por Estado
        if (estadoFiltro !== "todos") {
            const estadoId = estadoFiltro === "pendiente" ? 1 : 2;
            filtered = filtered.filter(item => item.claim_status_id === estadoId);
        }

        setPaginatedData(filtered);
    }, [searchTerm, estadoFiltro, tableData]);


    const fetchReclamos = async () => {
        setFetchError(false);
        try {
            const token = getToken();
            if (!token) return;
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/claims`, {
                headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const json = await res.json();
            setReclamos(Array.isArray(json.data) ? json.data : json.data?.data || []);
        } catch (e) {
            console.error(e);
            setFetchError(true);
        }
    };

    const handleRetry = async () => {
        setLoading(true);
        await Promise.all([fetchReclamos(), getProductos(200)]);
        setLoading(false);
    };

    const handleResetFilters = () => {
        setEstadoFiltro("todos");
        setSearchTerm("");
        setPaginatedData(tableData);
    };

    const onViewDetail = (reclamo: any) => {
        setSelectedReclamo(reclamo);
        setNewStatusId(reclamo.claim_status_id);
        setIsDetailModalOpen(true);
    };

    const handleUpdateStatus = async () => {
        setIsUpdating(true);
        const token = getToken();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/claims/${selectedReclamo.id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status_id: newStatusId }),
            });
            if (!res.ok) throw new Error("Error al actualizar estado");
            showToast.success("Estado actualizado correctamente");
            setReclamos(prev => prev.map(r =>
                r.id === selectedReclamo.id ? { ...r, claim_status_id: newStatusId } : r
            ));
            setIsDetailModalOpen(false);
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const selectedLabel = ESTADO_OPTIONS.find(o => o.value === estadoFiltro)?.label ?? "";

    return (
        <div className="p-2 md:p-4 w-full max-w-full overflow-hidden">
            {fetchError ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 bg-red-50 border-2 border-dashed border-red-200 rounded-lg mt-4">
                    <AlertCircleIcon />
                    <h3 className="text-lg font-semibold text-red-700">Error al cargar las reclamaciones</h3>
                    <p className="text-red-500 text-sm mt-1 text-center max-w-sm">
                        No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.
                    </p>
                    <button
                        onClick={handleRetry}
                        className="mt-5 px-6 py-2 bg-[#23C1DE] hover:bg-[#1faac4] text-white text-sm font-bold rounded-full shadow transition-transform active:scale-95"
                    >
                        Reintentar carga
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex flex-col md:flex-row gap-3 mb-4 w-full">
                        
                        {/* 1. BUSCADOR */}
                        <div className="w-full md:flex-1">
                            <SearchBar
                                items={tableData}
                               
                                onSearch={(filteredItems) => {
                                    
                                    if (estadoFiltro !== "todos") {
                                         const estadoId = estadoFiltro === "pendiente" ? 1 : 2;
                                         const combined = filteredItems.filter((item: any) => item.claim_status_id === estadoId);
                                         setPaginatedData(combined);
                                    } else {
                                        setPaginatedData(filteredItems);
                                    }
                                }}
                                placeholder="Buscar cliente, documento..."
                                searchKeys={['id', 'cliente', 'documento', 'producto']}
                                getDisplayValue={(item) => `${item.id} - ${item.cliente}`}
                            />
                        </div>

                        {/* 2. DROPDOWN DE FILTRO */}
                        <div className="w-full md:w-56 relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setDropdownOpen(prev => !prev)}
                                className="w-full h-[42px] px-4 rounded-full border border-[#23C1DE] bg-white
                                           text-gray-700 text-sm font-medium flex items-center justify-between
                                           focus:ring-2 focus:ring-[#23C1DE] outline-none cursor-pointer shadow-sm"
                            >
                                <span>{selectedLabel}</span>
                                <svg
                                    className={`w-4 h-4 text-[#23C1DE] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none" viewBox="0 0 20 20"
                                >
                                    <path stroke="currentColor" strokeLinecap="round"
                                        strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <ul className="absolute z-50 mt-1 left-0 right-0 bg-white border border-[#23C1DE]
                                               rounded-2xl shadow-lg overflow-hidden">
                                    {ESTADO_OPTIONS.map(opt => (
                                        <li
                                            key={opt.value}
                                            onClick={() => {
                                                setEstadoFiltro(opt.value);
                                                setDropdownOpen(false);
                                            }}
                                            className={`px-4 py-2.5 text-sm cursor-pointer transition-colors
                                                ${estadoFiltro === opt.value
                                                    ? 'bg-[#d0f3fa] font-bold text-[#23C1DE]'
                                                    : 'text-gray-700 hover:bg-[#e8f9fc]'
                                                }`}
                                        >
                                            {opt.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto text-sm">
                        <AdminTable
                            columns={columns}
                            data={paginatedData}
                            minRows={5}
                            onEdit={onViewDetail}
                            isLoading={loading && reclamos.length === 0}
                            emptyMessage="No se encontraron reclamaciones"
                            onResetSearch={handleResetFilters}
                            resetSearchText="Ver todas las reclamaciones"
                        />
                    </div>

                    {!loading && paginatedData.length > 0 && (
                        <div className="flex justify-center mt-4">
                            <Pagination
                                pageSize={10}
                                items={tableData}
                                setProductosPaginados={setPaginatedData}
                            />
                        </div>
                    )}

                    <Modal
                        isOpen={isDetailModalOpen}
                        onClose={() => setIsDetailModalOpen(false)}
                        title={`Gestión de Reclamo #${selectedReclamo?.id}`}
                        size="lg"
                    >
                        {selectedReclamo && (
                            <div className="flex flex-col gap-6 p-1 w-full">
                                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 pb-1 border-b">Información del Cliente</h3>
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                        <div>
                                            <p className="text-gray-500 text-xs">Cliente</p>
                                            <p className="font-bold text-[#203565] text-base">{selectedReclamo.first_name} {selectedReclamo.last_name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs">Documento</p>
                                            <p className="font-medium">{selectedReclamo.document_number}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs">Email</p>
                                            <p className="text-gray-700 break-all">{selectedReclamo.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs">Teléfono</p>
                                            <p className="text-gray-700">{selectedReclamo.phone || '-'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#F3F6F9] border border-blue-100 rounded-lg p-5">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-[#23C1DE] uppercase mb-1">Producto Reclamado</p>
                                            <p className="font-bold text-xl text-[#203565] leading-tight">{getProductName(selectedReclamo.product_id)}</p>
                                            <p className="text-xs text-gray-400 mt-1">ID interno: {selectedReclamo.product_id || 'N/A'}</p>
                                        </div>
                                        <div className="bg-white px-4 py-2 rounded border border-gray-200 shadow-sm whitespace-nowrap">
                                            <p className="text-gray-500 text-xs text-right">Monto</p>
                                            <p className="font-bold text-lg text-red-500">{selectedReclamo.claimed_amount ? `S/. ${selectedReclamo.claimed_amount}` : '-'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Descripción del Problema</p>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm h-32 overflow-y-auto text-gray-700 italic">
                                        &quot;{selectedReclamo.detail}&quot;
                                    </div>
                                </div>

                                <div className="border-t pt-5 mt-2">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-3">
                                        <div className="text-xs text-gray-400">
                                            Registrado el: <span className="font-medium text-gray-600">{formatDate(selectedReclamo.created_at)}</span>
                                        </div>
                                        <div className="flex gap-3 items-center w-full sm:w-auto bg-gray-50 p-2 rounded-lg">
                                            <span className="text-sm font-bold text-gray-700 hidden sm:block px-2">Estado:</span>
                                            <select
                                                value={newStatusId}
                                                onChange={(e) => setNewStatusId(Number(e.target.value))}
                                                className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#23C1DE] outline-none bg-white min-w-[140px]"
                                            >
                                                <option value={1}>🟡 Pendiente</option>
                                                <option value={2}>🟢 Completo</option>
                                            </select>
                                            <button
                                                onClick={handleUpdateStatus}
                                                disabled={isUpdating}
                                                className={`px-5 py-2 rounded text-white font-bold shadow transition-transform active:scale-95
                                                    ${isUpdating ? 'bg-gray-400' : 'bg-[#23C1DE] hover:bg-[#1faac4]'}`}
                                            >
                                                {isUpdating ? 'Guardando...' : 'Actualizar'}
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 text-right w-full italic">
                                        * Seleccione &quot;Completo&quot; cuando haya terminado de atender al cliente.
                                    </p>
                                </div>
                            </div>
                        )}
                    </Modal>
                </>
            )}
        </div>
    );
}
