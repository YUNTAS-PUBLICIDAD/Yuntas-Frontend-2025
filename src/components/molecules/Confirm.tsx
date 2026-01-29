'use client';

import React from 'react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';
import { IoWarningOutline } from 'react-icons/io5';
import { MdDangerous } from 'react-icons/md';

interface ConfirmProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning';
}

const Confirm: React.FC<ConfirmProps> = ({
  isOpen,
  title = 'Confirmación',
  message,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  variant = 'danger',
}) => {
  const isDanger = variant === 'danger';
  return (
    <Modal size="md" title={title} isOpen={isOpen} onClose={onCancel}>
      <div className='flex flex-col gap-5'>
        {isDanger && (
          <div className="flex items-center justify-center gap-3 bg-red-50 border-2 border-red-500 rounded-lg p-2">
            <MdDangerous className="text-red-600" size={32} />
            <div>
              <p className="text-red-900 font-bold text-sm">ACCIÓN CRÍTICA</p>
              <p className="text-red-700 text-xs">Esta acción no se puede deshacer</p>
            </div>
          </div>
        )}

        {!isDanger && (
          <div className="flex items-center justify-center gap-3 bg-yellow-50 border-2 border-yellow-500 rounded-lg p-2">
            <IoWarningOutline className="text-yellow-600" size={32} />
            <div>
              <p className="text-yellow-900 font-bold text-sm">ACCIÓN IMPORTANTE</p>
              <p className="text-yellow-700 text-xs">Esta acción requiere tu atención</p>
            </div>
          </div>
        )}

        <p className="text-center text-gray-700 font-medium">{message}</p>
        <div className="flex justify-center items-center gap-4">
          <Button onClick={onConfirm} variant="danger">
            {confirmText}
          </Button>
          <Button onClick={onCancel} variant="tertiary">
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;