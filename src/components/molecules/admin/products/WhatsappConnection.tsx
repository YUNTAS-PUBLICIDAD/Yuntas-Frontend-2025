'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { showToast } from '@/utils/showToast';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';
import FormSection from '../FormSection';
import { useWhatsapp } from '@/hooks/useWhatsapp';
import { useConfirm } from "@/hooks/useConfirm";
import { WHATSAPP_SOCKET_URL } from '@/config';

interface WhatsappConnectionProps {
    onConnectionChange?: (connected: boolean) => void;
}

export default function WhatsappConnection({ onConnectionChange }: WhatsappConnectionProps) {
    const { confirm, ConfirmDialog } = useConfirm();
    const { requestQR, resetSession, isRequesting } = useWhatsapp();
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [socketStatus, setSocketStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
    const [isWaitingQR, setIsWaitingQR] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(WHATSAPP_SOCKET_URL);

        socketRef.current = newSocket;

        newSocket.on('connect', () => {
            console.log('Socket conectado');
            setSocketStatus('connected');
        });

        newSocket.on('qr-update', (data) => {
            const connected = data.connectionStatus === 'connected';

            setIsWaitingQR(false);
            setQrCode(data.qrData?.image || null);
            setIsConnected(connected);
            onConnectionChange?.(connected);

            if (connected) {
                setQrCode(null);
            }
        });

        newSocket.on('disconnect', () => {
            console.log('Socket desconectado');
            setSocketStatus('disconnected');
        });

        newSocket.on('connect_error', (error) => {
            console.error('Error de conexión socket:', error);
            setSocketStatus('disconnected');
        });

        return () => {
            newSocket.disconnect();
            socketRef.current = null;
        };
    }, [onConnectionChange]);


    const handleResetSession = async () => {
        const confirmReset = await confirm({ message: '¿Estás seguro de que deseas reiniciar la sesión de WhatsApp?' });
        if (!confirmReset) return;

        setQrCode(null);
        setIsConnected(false);
        onConnectionChange?.(false);
        setIsWaitingQR(true);

        // Resetear sesión
        const resetResult = await resetSession();

        if (!resetResult.success) {
            showToast.error(resetResult.message || 'Error al reiniciar la sesión');
            setIsWaitingQR(false);
            return;
        }

        // Solicitar nuevo QR
        const qrResult = await requestQR();
        if (!qrResult.success) {
            showToast.error(qrResult.message || 'Error al solicitar código QR');
            setIsWaitingQR(false);
        }
    }

    const isLoading = isRequesting || isWaitingQR;

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

                    {isConnected && (
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={handleResetSession}
                            disabled={isLoading || socketStatus !== 'connected'}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader size="sm" color="border-gray-600" />
                                    <span>Reiniciando...</span>
                                </div>
                            ) : (
                                'Reiniciar Sesión'
                            )}
                        </Button>

                    )}
                </div>

                {/** Cuando se muestra el QR por socket*/}
                {!isConnected && qrCode && socketStatus !== 'disconnected' && (
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

                {/** mientras carga el QR INICIAL */}
                {!isConnected && !qrCode && !isLoading && socketStatus === 'connected' && (
                    <div className="p-4 flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-yellow-800">
                            Esperando código QR
                        </p>
                        <p className="text-xs text-yellow-700 mt-1">
                            El código QR se está generando. Esto puede tardar unos segundos...
                        </p>
                    </div>
                )}

                {/** Si no hay conexión al socket */}
                {socketStatus === 'disconnected' && (
                    <div className="p-4 flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-red-800">
                            No hay conexión con el servidor de WhatsApp
                        </p>
                        <p className="text-xs text-red-600">
                            Verifica que el servicio de WhatsApp esté activo o recarga la página.
                        </p>
                    </div>
                )}

                {/* Mensaje de conexión exitosa */}
                {isConnected && (
                    <div className="p-4 flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-green-800">
                            WhatsApp conectado correctamente
                        </p>
                        <p className="text-xs text-green-600">
                            Tu cuenta está vinculada y lista para enviar mensajes.
                        </p>
                    </div>
                )}
            </FormSection>
            <ConfirmDialog />
        </div>
    );
}