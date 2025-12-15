'use client';

import { useState } from "react";
// Átomos
import Button from "@/components/atoms/Button";
// Molécula (Formulario)
import EditClientForm from "@/components/molecules/admin/leads/EditClientForm";
// Hook / Tipos
import { ClientData } from "@/hooks/ui/admin/useClientEdit";

interface LeadsTableProps {
    leads: ClientData[];
}

export default function LeadsTable({ leads }: LeadsTableProps) {
    const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = (client: ClientData) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedClient(null);
        setIsModalOpen(false);
    };

    
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
                            
                            <div className="font-bold truncate px-1" title={lead.nombre}>
                                {lead.nombre}
                            </div>
                            
                            <div className="truncate px-1 text-gray-600" title={lead.gmail}>
                                {lead.gmail}
                            </div>
                            
                            <div className="font-bold text-gray-800">
                                {lead.telefono}
                            </div>
                            
                            <div className="font-bold text-gray-900 truncate px-1">
                                {lead.producto}
                            </div>
                            
                            <div className="font-bold text-gray-900 text-xs">
                                {formatDate(lead.fecha)}
                            </div>
                            
                            <div className="flex justify-center items-center gap-2">
                                <Button 
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded w-8 h-8 flex items-center justify-center shadow-sm"
                                    onClick={() => alert("Función eliminar pendiente")}
                                >
                                    🗑️
                                </Button>

                                <Button 
                                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded w-8 h-8 flex items-center justify-center shadow-sm"
                                    onClick={() => handleEditClick(lead)}
                                >
                                    📝
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-md">
                        No hay datos disponibles.
                    </div>
                )}
            </div>

            {/* --- MODAL DE EDICIÓN --- */}
            {isModalOpen && selectedClient && (
                <EditClientForm 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    client={selectedClient}
                />
            )}
        </div>
    );
}