import React from "react";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";

type Producto = {
  id: number;
  nombre: string;
  link: string;
};

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
  return (
    <Modal size="md" title="Seleccionar producto" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-3 max-h-[50vh] overflow-y-auto">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
          >
            <span>{producto.nombre}</span>
            <Button
              type="button"
              variant="tertiary"
              onClick={() => onSelect(producto)}
            >
              Insertar
            </Button>
          </div>
        ))}

        {productos.length === 0 && (
          <p className="text-gray-500 text-sm">
            No hay productos disponibles
          </p>
        )}
      </div>
    </Modal>
  );
};

export default InsertarProducto;
