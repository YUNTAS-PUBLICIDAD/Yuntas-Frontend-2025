'use client'

import { useState, useEffect } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import PaginationServer from '@/components/molecules/PaginationServer';
import Modal from "@/components/atoms/Modal";
import ProductForm from "@/components/molecules/admin/ProductoForm";
import { useProductos } from "@/hooks/useProductos";
import { Producto, ProductoInput } from "@/types/admin/producto";

const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "NOMBRE" },
    { key: "seccion", label: "SECCIÓN" },
    { key: "precio", label: "PRECIO" },
];

export default function ProductosPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
    const perPage = 6;

    const {
        productos,
        meta,
        links,
        isLoading,
        error,
        getProductos,
        goToNextPage,
        goToPrevPage,
        createProducto,
        updateProducto,
        deleteProducto,
    } = useProductos();

     useEffect(() => {
        getProductos(perPage);
    }, [getProductos]);

    const onAddProduct = () => {
        setModalMode("create");
        setSelectedProducto(null);
        setIsModalOpen(true);
    };

    const onSendEmail = () => {
        // enviar email
    }

    const onSendWhatsapp = () => {
        // enviar whatsapp
    }

    const onExportCSV = () => {
        // exportar a CSV
    }

    const onExportExcel = () => {
        // exportar a Excel
    }

    const onExportPDF = () => {
        // exportar a PDF
    }

    const onPrint = () => {
        // imprimir
    }

    const onDelete = async (id: string | number) => {
        const confirmed = window.confirm("¿Estás seguro de eliminar este producto?");
        if (confirmed) {
            const success = await deleteProducto(id);
            if (success) {
                getProductos(perPage);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProducto(null);
    };

    const onEdit = (id: string | number) => {
        const productoLocal = productos.find(p => p.id === Number(id));
        
        if (productoLocal) {
            setSelectedProducto(productoLocal);
            setModalMode("edit");
            setIsModalOpen(true);
        }
    };

    const handleSubmit = async (productoData: ProductoInput) => {
        let success = false;

        if (modalMode === "create") {
            success = await createProducto(productoData);
        } else if (selectedProducto) {
            success = await updateProducto(selectedProducto.id, productoData);
        }

        if (success) {
            handleCloseModal();
            getProductos(perPage);
        }
    };


    const exportButtons = [
        { label: "EXPORTAR A CSV", onClick: onExportCSV },
        { label: "EXPORTAR A EXCEL", onClick: onExportExcel },
        { label: "EXPORTAR A PDF", onClick: onExportPDF },
        { label: "IMPRIMIR", onClick: onPrint },
    ];


    return (
        <div>
            <div className="flex gap-4">
                <ActionButtonGroup buttons={[{ label: "Añadir Producto", onClick: onAddProduct, variant: "tertiary" }]} className="mb-2" />
                <ActionButtonGroup buttons={[{ label: "Envio de Email", onClick: onSendEmail, variant: "danger" }]} className="mb-2" />
                <ActionButtonGroup buttons={[{ label: "Envio de Whatsapp", onClick: onSendWhatsapp, variant: "success" }]} className="mb-2" />
            </div>
            <ActionButtonGroup buttons={exportButtons} className="mb-4 mt-4" />

            {error && (
                <div>
                    {error}
                </div>
            )}

            <AdminTable
                columns={columns}
                data={productos}
                minRows={perPage}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            {meta && links && (
                <div className="flex justify-center my-6">
                    <PaginationServer
                        meta={meta}
                        links={links}
                        onPrevPage={goToPrevPage}
                        onNextPage={goToNextPage}
                        isLoading={isLoading}
                    />
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={modalMode === "create" ? "AÑADIR PRODUCTO" : "EDITAR PRODUCTO"}
                size="lg"
            >
                <ProductForm
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                    isLoading={isLoading}
                    initialData={selectedProducto}
                    mode={modalMode}
                />
            </Modal>

        </div>
    )
}
