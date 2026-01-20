'use client';

import React from 'react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';

interface ConfirmProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'success' | 'primary';
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
  return (
    <Modal size="md" title={title} isOpen={isOpen} onClose={onCancel}>
      <div className='flex flex-col gap-5'>
        <p className="text-center text-gray-700">{message}</p>
        <div className="flex justify-center items-center gap-4">
          <Button onClick={onConfirm} variant="primary">
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