'use client'

import { useState, useEffect } from "react";
// Componentes UI
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import PaginationServer from '@/components/molecules/PaginationServer';
import Modal from "@/components/atoms/Modal";

// El Formulario
import AddProductForm from "@/components/molecules/admin/products/AddProductForm";

// Hooks
import { useProductos } from "@/hooks/useProductos";

const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "NOMBRE" },
    { key: "seccion", label: "SECCIÓN" },
    { key: "precio", label: "PRECIO" },
];

export default function ProductosPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const {
        productos,
        meta,
        isLoading,
        error,
        getProductos,
        deleteProducto
    } = useProductos();

    useEffect(() => {
        getProductos(currentPage, perPage);
    }, [currentPage, getProductos]);

    const handlePageChange = (page: number) => setCurrentPage(page);
    const onAddProduct = () => setIsAddModalOpen(true);
    const handleCloseModal = () => setIsAddModalOpen(false);

    // Funciones placeholder...
    const onDelete = (id: string | number) => console.log("Delete", id);
    const onEdit = (id: string | number) => console.log("Edit", id);
    // ... otros handlers (email, exportar, etc) ...

    return (
        <div className="animate-fade-in p-4">
            {/* Botones Superiores */}
            <div className="flex gap-4 flex-wrap mb-4">
                <ActionButtonGroup buttons={[{ label: "Añadir Producto", onClick: onAddProduct, variant: "tertiary" }]} />
                <ActionButtonGroup buttons={[{ label: "Envio de Email", onClick: () => {}, variant: "danger" }]} />
                <ActionButtonGroup buttons={[{ label: "Envio de Whatsapp", onClick: () => {}, variant: "success" }]} />
            </div>
            
            <ActionButtonGroup buttons={[
                { label: "EXPORTAR A CSV", onClick: () => {} },
                { label: "EXPORTAR A EXCEL", onClick: () => {} },
                { label: "EXPORTAR A PDF", onClick: () => {} },
                { label: "IMPRIMIR", onClick: () => {} },
            ]} className="mb-4" />

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <AdminTable
                columns={columns}
                data={productos}
                minRows={perPage}
                actions={[
                    { type: "delete", onClick: onDelete },
                    { type: "edit", onClick: onEdit }
                ]}
            />

            {meta && (
                <div className="flex justify-center my-6">
                    <PaginationServer 
                        meta={meta} 
                        onPageChange={handlePageChange}
                        isLoading={isLoading}
                    />
                </div>
            )}

            {/* --- MODAL AJUSTADO CON SCROLL --- */}
            <Modal 
                isOpen={isAddModalOpen} 
                onClose={handleCloseModal} 
                title="Ingresar Datos" // Título fijo arriba
                size="lg"             // Ancho grande para 2 columnas
            >
               
                <div className="max-h-[75vh] overflow-y-auto p-1 pr-2 custom-scrollbar">
                    <AddProductForm onClose={handleCloseModal} />
                </div>
            </Modal>
        </div>
    )
}