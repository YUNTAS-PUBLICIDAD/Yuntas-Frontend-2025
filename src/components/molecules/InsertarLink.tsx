import React, { useState } from "react";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";

type LinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (url: string) => void;
};

const InsertarLink = ({ isOpen, onClose, onConfirm }: LinkModalProps) => {
  const [url, setUrl] = useState("");

  const handleConfirm = () => {
    if (!url.trim()) return;
    onConfirm(url);
    setUrl("");
    onClose();
  };

  return (
    <Modal size="sm" title="Insertar enlace" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <input
          type="url"
          placeholder="https://ejemplo.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-3">
          <Button variant="primary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button  variant="tertiary" type="button" onClick={handleConfirm}>
            Insertar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InsertarLink;
