import React, { useState } from "react";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";
import { Producto } from "@/types/admin/producto";

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productos: Producto[];
  onSelect: (producto: Producto) => void;
};

const InsertarProducto = ({
  isOpen,
  onClose,
  productos,
  onSelect,
}: ProductModalProps) => {
  const [selectedId, setSelectedId] = useState<string>("");

  const handleConfirm = () => {
    const producto = productos.find((p) => String(p.id) === selectedId);
    if (producto) {
      onSelect(producto);
      setSelectedId(""); 
    }
  };
  return (
    <Modal size="md" title="Insertar Producto en el texto" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 py-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Selecciona un producto de la lista:
          </label>
          
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">-- Selecciona un producto --</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
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

export default InsertarProducto;