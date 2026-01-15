'use client';

import { useState, useEffect } from "react";
import Modal from "@/components/atoms/Modal";
import toast, { Toaster } from 'react-hot-toast';
import { useProductos } from "@/hooks/useProductos";
import Pagination from "@/components/molecules/Pagination";
import AdminTable from "@/components/organisms/admin/AdminTable";

const columns = [
    { key: "id", label: "ID" },
    { key: "fecha", label: "FECHA" },
    { key: "cliente", label: "CLIENTE" },
    { key: "documento", label: "DOCUMENTO" },
    { key: "producto", label: "PRODUCTO" },
    { key: "monto", label: "MONTO" },
    { key: "estado_visual", label: "ESTADO" },
];

const getToken = () => {
    const t1 = localStorage.getItem("token");
    const t2 = localStorage.getItem("auth_token");
    let token = t1 || t2;
    if (!token) return null;
    return token.replace(/"/g, '');
};

const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });
};

export default function ReclamacionesPage() {
    const [reclamos, setReclamos] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [paginatedData, setPaginatedData] = useState<any[]>([]);

    const { productos, getProductos } = useProductos();

    const [loading, setLoading] = useState(true);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedReclamo, setSelectedReclamo] = useState<any | null>(null);
    const [newStatusId, setNewStatusId] = useState<number>(1);
    const [isUpdating, setIsUpdating] = useState(false);

    // Carga inicial
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
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${isCompleto ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {isCompleto ? 'Completo' : 'Pendiente'}
                        </span>
                    )
                };
            });
            setTableData(formatted);
        } else {
            setTableData([]);
        }
    }, [reclamos, productos]);


    const fetchReclamos = async () => {
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
        }
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

            toast.success("Estado actualizado correctamente");

            setReclamos(prev => prev.map(r => {
                if (r.id === selectedReclamo.id) return { ...r, claim_status_id: newStatusId };
                return r;
            }));

            setIsDetailModalOpen(false);
        } catch (error: any) {
            toast.error("Error: " + error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) return <div className="p-10 text-center animate-pulse">Cargando datos...</div>;

    return (
        <div className="p-2 md:p-4">
            <Toaster position="top-right" />

            <div className="mb-4 md:mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-[#203565]">Libro de Reclamaciones</h1>
            </div>


            <AdminTable
                columns={columns}
                data={paginatedData}
                minRows={5}
                onEdit={onViewDetail}
            />

            <div className="flex justify-center mt-4">
                <Pagination
                    pageSize={10}
                    items={tableData}
                    setProductosPaginados={setPaginatedData}
                />
            </div>

            {/* MODAL */}
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
                                "{selectedReclamo.detail}"
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
                                * Seleccione "Completo" cuando haya terminado de atender al cliente.
                            </p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}