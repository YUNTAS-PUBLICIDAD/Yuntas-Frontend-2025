import React from 'react';
import { Contacto } from "@/types/admin/contacto";
import PrimaryButton from "@/components/atoms/PrimaryButton";

interface Props {
  contacto: Contacto;
  isOpen: boolean;
  onClose: () => void;
}

const ViewContactoModal: React.FC<Props> = ({ contacto, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#141A3F] rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#203565] p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            Detalle de Solicitud #{contacto.id}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-300 transition">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
            
          {/* Fila 1: Datos Personales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-[#0D1030] p-4 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Cliente</p>
                <p className="text-lg font-semibold text-[#203565] dark:text-white">
                    {contacto.first_name} {contacto.last_name}
                </p>
            </div>
            <div className="bg-gray-50 dark:bg-[#0D1030] p-4 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Fecha de Envío</p>
                <p className="text-lg font-semibold text-[#203565] dark:text-white">
                    {new Date(contacto.created_at).toLocaleDateString()} <span className="text-sm font-normal">{new Date(contacto.created_at).toLocaleTimeString()}</span>
                </p>
            </div>
          </div>

          {/* Fila 2: Contacto y Ubicación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Teléfono</p>
                <p className="text-base text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 pb-2">
                    {contacto.phone}
                </p>
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Distrito</p>
                <p className="text-base text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 pb-2">
                    {contacto.district || "No especificado"}
                </p>
            </div>
          </div>

          {/* Asunto */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Asunto / Detalle</p>
            <p className="text-base font-medium text-[#203565] dark:text-blue-300">
                {contacto.request_detail}
            </p>
          </div>

          {/* Mensaje */}
          <div className="bg-gray-50 dark:bg-[#0D1030] p-5 rounded-xl border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-2">Mensaje del Cliente</p>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {contacto.message}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <PrimaryButton onClick={onClose}>Cerrar</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ViewContactoModal;