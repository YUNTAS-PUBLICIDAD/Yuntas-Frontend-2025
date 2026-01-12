'use client';

import { useState, useEffect } from "react";
import Modal from "@/components/atoms/Modal";
import toast, { Toaster } from 'react-hot-toast';

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
    const [loading, setLoading] = useState(true);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedReclamo, setSelectedReclamo] = useState<any | null>(null);
    
    // Estado para el selector (1=Pendiente, 2=Completo)
    const [newStatusId, setNewStatusId] = useState<number>(1);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchReclamos();
    }, []);

    const fetchReclamos = async () => {
        try {
            const token = getToken();
            if (!token) { setLoading(false); return; }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/claims`, {
                headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error(`Error ${res.status}`);
            const json = await res.json();
            setReclamos(Array.isArray(json.data) ? json.data : json.data?.data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
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
                body: JSON.stringify({
                    status_id: newStatusId
                }),
            });

            if (!res.ok) throw new Error("Error al actualizar estado");

            toast.success("Estado actualizado correctamente");

            setReclamos(prev => prev.map(r => {
                if (r.id === selectedReclamo.id) {
                    return { ...r, claim_status_id: newStatusId };
                }
                return r;
            }));

            setIsDetailModalOpen(false);

        } catch (error: any) {
            toast.error("Error: " + error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) return <div className="flex justify-center mt-20"><p>Cargando...</p></div>;

    return (
        <div className="p-4">
            <Toaster position="top-right" />
            <h1 className="text-2xl font-bold text-[#203565] mb-6">Libro de Reclamaciones</h1>

            <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-white uppercase bg-[#203565]">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Documento</th>
                            {/* NUEVA COLUMNA CORREO */}
                            <th className="px-6 py-4">Contacto</th> 
                            <th className="px-6 py-4">Monto</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reclamos.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                                    No hay reclamos registrados.
                                </td>
                            </tr>
                        ) : (
                            reclamos.map((item) => {
                                const isCompleto = item.claim_status_id === 2;
                                return (
                                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-bold text-[#203565]">#{item.id}</td>
                                        <td className="px-6 py-4">{formatDate(item.purchase_date || item.created_at)}</td>
                                        
                                        {/* COLUMNA CLIENTE (Solo nombre) */}
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {item.first_name} {item.last_name}
                                        </td>

                                        {/* COLUMNA DOCUMENTO */}
                                        <td className="px-6 py-4">
                                            {item.document_number}
                                            <span className="text-xs text-gray-400 ml-1">
                                                ({item.document_type_id === 1 ? 'DNI' : 'Pasaporte'})
                                            </span>
                                        </td>

                                        {/* NUEVA COLUMNA CONTACTO (Correo + Teléfono) */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-700">{item.email}</span>
                                                <span className="text-xs text-gray-400">{item.phone || 'Sin telf.'}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 font-medium">
                                            {item.claimed_amount ? `S/. ${item.claimed_amount}` : '-'}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${isCompleto ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {isCompleto ? 'Completo' : 'Pendiente'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button onClick={() => onViewDetail(item)} className="text-white bg-[#23C1DE] hover:bg-[#1faac4] px-3 py-1 rounded-md text-xs transition-colors">
                                                Gestionar
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title={`Reclamo #${selectedReclamo?.id}`}>
                {selectedReclamo && (
                    <div className="flex flex-col gap-4 p-2">
                        <div className="bg-blue-50 p-3 rounded-lg text-sm grid grid-cols-2 gap-4">
                             <div>
                                <p className="text-gray-500 text-xs">Cliente</p>
                                <p className="font-bold">{selectedReclamo.first_name} {selectedReclamo.last_name}</p>
                             </div>
                             <div>
                                <p className="text-gray-500 text-xs">Teléfono</p>
                                <p className="font-bold">{selectedReclamo.phone || '-'}</p>
                             </div>
                             <div>
                                <p className="text-gray-500 text-xs">Email</p>
                                <p className="font-bold break-all">{selectedReclamo.email}</p>
                             </div>
                             <div>
                                <p className="text-gray-500 text-xs">Documento</p>
                                <p className="font-bold">
                                    {selectedReclamo.document_number} 
                                    <span className="text-gray-500 font-normal ml-1">
                                        ({selectedReclamo.document_type_id === 1 ? 'DNI' : 'Pasaporte'})
                                    </span>
                                </p>
                             </div>
                             {/* Agregamos también producto y monto en el modal para tener todo a la mano */}
                             <div>
                                <p className="text-gray-500 text-xs">Producto ID</p>
                                <p className="font-bold">{selectedReclamo.product_id || 'General'}</p>
                             </div>
                             <div>
                                <p className="text-gray-500 text-xs">Monto Reclamado</p>
                                <p className="font-bold text-red-600">{selectedReclamo.claimed_amount ? `S/. ${selectedReclamo.claimed_amount}` : '-'}</p>
                             </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Detalle del reclamo</p>
                            <div className="bg-gray-50 p-3 rounded border text-sm h-32 overflow-y-auto mt-1">
                                {selectedReclamo.detail}
                            </div>
                        </div>

                        <div className="border-t pt-4 mt-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Estado del Caso
                            </label>
                            
                            <div className="flex gap-4 items-center">
                                <select 
                                    value={newStatusId}
                                    onChange={(e) => setNewStatusId(Number(e.target.value))}
                                    className="border border-gray-300 rounded p-2 text-sm w-full focus:ring-2 focus:ring-[#23C1DE] outline-none"
                                >
                                    <option value={1}>🟡 Pendiente</option>
                                    <option value={2}>🟢 Completo</option>
                                </select>

                                <button 
                                    onClick={handleUpdateStatus}
                                    disabled={isUpdating}
                                    className={`px-4 py-2 rounded text-white font-semibold whitespace-nowrap transition-colors
                                        ${isUpdating ? 'bg-gray-400' : 'bg-[#23C1DE] hover:bg-[#1faac4]'}`}
                                >
                                    {isUpdating ? 'Guardando...' : 'Actualizar Estado'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}