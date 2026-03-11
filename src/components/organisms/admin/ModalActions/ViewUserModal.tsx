import React from 'react';
import { User } from "@/types/admin/user";
import PrimaryButton from "@/components/atoms/PrimaryButton";

interface Props {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (user: User) => void;
}

const ViewUserModal: React.FC<Props> = ({ user, isOpen, onClose, onEdit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#141A3F] rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#203565] p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            Detalle de Usuario #{user.id}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-300 transition">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
            
          {/* Fila 1: Nombre e Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-[#0D1030] p-4 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Nombre</p>
                <p className="text-lg font-semibold text-[#203565] dark:text-white">
                    {user.name}
                </p>
            </div>
            <div className="bg-gray-50 dark:bg-[#0D1030] p-4 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Email</p>
                <p className="text-lg font-semibold text-[#203565] dark:text-white">
                    {user.email}
                </p>
            </div>
          </div>

          {/* Fila 2: Rol y Fecha de Creación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Rol</p>
                <p className="text-base text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 pb-2">
                    {user.role?.name || "No asignado"}
                </p>
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Fecha de Creación</p>
                <p className="text-base text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 pb-2">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : "No disponible"}
                </p>
            </div>
          </div>

          {/* ID */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">ID</p>
            <p className="text-base font-medium text-[#203565] dark:text-blue-300">
                {user.id}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          {/* {onEdit && (
            <button
              onClick={() => {
                onEdit(user);
                onClose();
              }}
              className="px-4 py-2 bg-[#203565] text-white rounded-lg hover:bg-[#1a2845] transition"
            >
              Editar
            </button>
          )} */}
          <PrimaryButton onClick={onClose}>Cerrar</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
