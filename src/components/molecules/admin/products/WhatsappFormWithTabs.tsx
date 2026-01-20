'use client';

import { useState } from 'react';
import Tabs from '@/components/atoms/Tabs';
import WhatsappConnection from './WhatsappConnection';
import SendWhatsappForm from './SendWhatsappForm';
import { Producto } from '@/types/admin/producto';

interface WhatsappFormWithTabsProps {
    onClose: () => void;
    products: Producto[];
}

export default function WhatsappFormWithTabs({ onClose, products }: WhatsappFormWithTabsProps) {
    const [activeTab, setActiveTab] = useState('connection');
    const [isWhatsappConnected, setIsWhatsappConnected] = useState(false);

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