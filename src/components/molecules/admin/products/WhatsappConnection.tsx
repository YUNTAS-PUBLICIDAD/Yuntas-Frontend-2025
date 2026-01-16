'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';
import FormSection from '../FormSection';
import { useWhatsapp } from '@/hooks/useWhatsapp';
import { WHATSAPP_SOCKET_URL } from '@/config';

interface WhatsappConnectionProps {
    onConnectionChange?: (connected: boolean) => void;
}

export default function WhatsappConnection({ onConnectionChange }: WhatsappConnectionProps) {
    const { requestQR, resetSession, isRequesting } = useWhatsapp();
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(WHATSAPP_SOCKET_URL);

        newSocket.on('connect', () => {
            console.log('Socket conectado');
        });

        newSocket.on('qr-update', (data) => {
            setQrCode(data.qrData?.image || null);
            const connected = data.connectionStatus === 'connected';
            setIsConnected(connected);
            onConnectionChange?.(connected);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket desconectado');
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [onConnectionChange]);

    const handleRequestQR = async () => {
        await requestQR();
    };

    const handleResetSession = async () => {
        await resetSession();
    }

    return (
        <div>
            <FormSection title="Estado de Conexión WhatsApp">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                        <span className="font-medium">
                            {isConnected ? 'WhatsApp Conectado' : 'WhatsApp Desconectado'}
                        </span>
                    </div>

                    {isConnected ?
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={handleResetSession}
                            disabled={isRequesting}
                        >
                            {isRequesting ? (
                                <div className="flex items-center gap-2">
                                    <Loader size="sm" color="border-white" />
                                    <span>Reiniciando...</span>
                                </div>
                            ) : (
                                'Reiniciar Sesión'
                            )}
                        </Button>
                        :
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={handleRequestQR}
                            disabled={isRequesting}
                        >
                            {isRequesting ? (
                                <div className="flex items-center gap-2">
                                    <Loader size="sm" color="border-white" />
                                    <span>Generando...</span>
                                </div>
                            ) : (
                                'Generar QR'
                            )}
                        </Button>

                    }
                </div>

                {/* Mostrar QR Code */}
                {!isConnected && qrCode && (
                    <div className="p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg text-center">
                        <p className="text-sm text-gray-600 mb-4">
                            Escanea este código QR con WhatsApp:
                        </p>
                        <div className="flex justify-center">
                            <img
                                src={qrCode}
                                alt="QR WhatsApp"
                                className="w-64 h-64 border border-gray-200 rounded"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                            Abre WhatsApp → Menú → Dispositivos vinculados → Vincular dispositivo
                        </p>
                    </div>
                )}
            </FormSection>
        </div>
    );
}