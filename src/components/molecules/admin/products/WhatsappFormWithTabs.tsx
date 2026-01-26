'use client';

import { useState, useEffect } from 'react';
import Tabs from '@/components/atoms/Tabs';
import WhatsappConnection from './WhatsappConnection';
import SendWhatsappForm from './SendWhatsappForm';
import { Producto } from '@/types/admin/producto';

interface WhatsappFormWithTabsProps {
    onClose: () => void;
    products: Producto[];
    initialTab?: string;
}

export default function WhatsappFormWithTabs({ onClose, products, initialTab = "conexion" }: WhatsappFormWithTabsProps) {
    // Función para traducir lo que viene de la URL a los IDs de las pestañas
    const resolveTabId = (tabName: string) => {
        if (tabName === 'plantilla') return 'template';
        return 'connection';
    };

    const [activeTab, setActiveTab] = useState(resolveTabId(initialTab));
    const [isWhatsappConnected, setIsWhatsappConnected] = useState(false);

    
    useEffect(() => {
        setActiveTab(resolveTabId(initialTab));
    }, [initialTab]);

    const tabs = [
        { id: 'connection', label: 'Conexión'},
        { id: 'template', label: 'Plantilla'},
    ];

    return (
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
            {activeTab === 'connection' && (
                <WhatsappConnection 
                    onConnectionChange={setIsWhatsappConnected}
                />
            )}

            {activeTab === 'template' && (
                <SendWhatsappForm
                    products={products}
                    onClose={onClose}
                    isConnected={isWhatsappConnected}
                />
            )}
        </Tabs>
    );
}