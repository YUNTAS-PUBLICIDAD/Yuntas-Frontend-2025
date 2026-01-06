'use client';

import { useEffect, useState } from "react";
// Data y Hooks
import { LeadInput, Lead } from "@/types/admin/lead";

// Componentes Visuales
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Pagination from '@/components/molecules/Pagination';
import Modal from "@/components/atoms/Modal";

// Organismos (Las Tablas)
import LeadsTable from "@/components/organisms/admin/leads/LeadsTable";       // Interfaz 1: Producto/Fecha
import TrackingTable from "@/components/organisms/admin/leads/TrackingTable"; // Interfaz 2: Whatsapp/Gmail

import { useLeads } from "@/hooks/useLeads";
import LeadForm from "@/components/molecules/admin/leads/LeadForm";

export default function SeguimientoPage() {
    
    const [datosPaginados, setDatosPaginados] = useState<Lead[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isTrackingMode, setIsTrackingMode] = useState(false);
    const { getLeads, leads, createLead, error, isLoading } = useLeads();

    useEffect(()=> {
        getLeads(200);
    }, [])

    const handleEditClient = async (formData: LeadInput) => {
        if (formData.product_id === 0) {
            delete formData.product_id
        }

        const success = await createLead(formData); 
        if (success) {
            alert("Cliente creado");
            setIsAddModalOpen(false)
            await getLeads(200);
        } else {
            alert(error);
        }
    }  

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
                    <LeadsTable leads={datosPaginados} getLeads={getLeads} />
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
                    items={leads} 
                    setProductosPaginados={setDatosPaginados} 
                />
            </div>

            <Modal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                title="AÑADIR CLIENTE"
            >
                <LeadForm 
                    onSubmit={handleEditClient} 
                    onCancel={() => setIsAddModalOpen(false)} 
                    isLoading={isLoading}
                />
            </Modal>
        </div>
    );
}