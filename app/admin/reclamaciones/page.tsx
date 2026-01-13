'use client';

import { useState, useEffect } from "react";
import Modal from "@/components/atoms/Modal";
import toast, { Toaster } from 'react-hot-toast';
import { useProductos } from "@/hooks/useProductos"; 

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
    

    const { productos, getProductos } = useProductos(); 
    
    const [loading, setLoading] = useState(true);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedReclamo, setSelectedReclamo] = useState<any | null>(null);
    const [newStatusId, setNewStatusId] = useState<number>(1);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const init = async () => {
            
            await Promise.all([fetchReclamos(), getProductos(200)]);
            setLoading(false);
        };
        init();
    }, []);

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

    
    const getProductName = (id?: number) => {
        if (!id) return "General";
        const productoEncontrado = productos.find(p => p.id === id);
        return productoEncontrado ? productoEncontrado.name : `Producto ID: ${id}`;
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

    if (loading) return <div className="flex justify-center mt-20"><p>Cargando datos...</p></div>;

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
                            <th className="px-6 py-4">Contacto</th> 
                            <th className="px-6 py-4">Monto</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reclamos.length === 0 ? (
                            <tr><td colSpan={8} className="px-6 py-8 text-center text-gray-500">No hay reclamos.</td></tr>
                        ) : (
                            reclamos.map((item) => {
                                const isCompleto = item.claim_status_id === 2;
                                return (
                                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-bold text-[#203565]">#{item.id}</td>
                                        <td className="px-6 py-4">{formatDate(item.purchase_date || item.created_at)}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.first_name} {item.last_name}</td>
                                        <td className="px-6 py-4">
                                            {item.document_number}
                                            <span className="text-xs text-gray-400 ml-1">({item.document_type_id === 1 ? 'DNI' : 'Pasaporte'})</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-700">{item.email}</span>
                                                <span className="text-xs text-gray-400">{item.phone || 'Sin telf.'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{item.claimed_amount ? `S/. ${item.claimed_amount}` : '-'}</td>
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
                                    <p className="font-medium">
                                        {selectedReclamo.document_number} 
                                        <span className="text-gray-400 text-xs ml-1 font-normal">
                                            ({selectedReclamo.document_type_id === 1 ? 'DNI' : 'Pasaporte'})
                                        </span>
                                    </p>
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
                                    <p className="font-bold text-xl text-[#203565] leading-tight">
                                        {getProductName(selectedReclamo.product_id)}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">ID interno: {selectedReclamo.product_id || 'N/A'}</p>
                                </div>
                                <div className="bg-white px-4 py-2 rounded border border-gray-200 shadow-sm whitespace-nowrap">
                                    <p className="text-gray-500 text-xs text-right">Monto</p>
                                    <p className="font-bold text-lg text-red-500">
                                        {selectedReclamo.claimed_amount ? `S/. ${selectedReclamo.claimed_amount}` : '-'}
                                    </p>
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
                            
                           
                            <p className="text-xs text-gray-600 text-right w-full italic">
                                * Seleccione "Completo" cuando haya terminado de atender al cliente.
                            </p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}