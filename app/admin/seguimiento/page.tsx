'use client';

import { useState } from "react";
// Data y Hooks
import data from "@/data/admin/seguimientoData";
import { ClientData } from "@/hooks/ui/admin/useClientEdit";

// Componentes Visuales
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Pagination from '@/components/molecules/Pagination';
import Modal from "@/components/atoms/Modal";
import AddClientForm from "@/components/molecules/admin/AddClientForm";

// Organismos (Las Tablas)
import LeadsTable from "@/components/organisms/admin/leads/LeadsTable";       // Interfaz 1: Producto/Fecha
import TrackingTable from "@/components/organisms/admin/leads/TrackingTable"; // Interfaz 2: Whatsapp/Gmail

export default function SeguimientoPage() {
    const [datosPaginados, setDatosPaginados] = useState<ClientData[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isTrackingMode, setIsTrackingMode] = useState(false);

    const topButtons = [
        { 
            label: "MENSAJES", 
            onClick: () => {}, 
            variant: "secondary" as const 
        },
        { 
            label: isTrackingMode ? "SEGUIMIENTO" : "MEDIO DE SEGUIMIENTO", 
            onClick: () => setIsTrackingMode(!isTrackingMode), 
            variant: "primary" as const 
        },
        { 
            label: "MONITOREO", 
            onClick: () => {}, 
            variant: "secondary" as const 
        },
    ];

    return (
        <div className="p-4 animate-fade-in">
            <div className="flex gap-2 mb-6">
                <ActionButtonGroup buttons={topButtons} />
            </div>
            
            <div className="animate-fade-in-up">
                {isTrackingMode ? (
                    <TrackingTable leads={datosPaginados} />
                ) : (
                    <LeadsTable leads={datosPaginados} />
                )}
            </div>

            <div className="mt-6 flex justify-start">
                 <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#1E3A8A] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#152C6B] transition-colors shadow-lg"
                >
                    Agregar Cliente
                </button>
            </div>
            
            <div className="flex justify-center mt-8">
                <Pagination 
                    pageSize={10} 
                    items={data} 
                    setProductosPaginados={setDatosPaginados} 
                />
            </div>

            <Modal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                title="AÑADIR CLIENTE"
            >
                <AddClientForm 
                    onSubmit={() => setIsAddModalOpen(false)} 
                    onCancel={() => setIsAddModalOpen(false)} 
                />
            </Modal>
        </div>
    );
}