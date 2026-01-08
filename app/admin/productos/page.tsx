'use client'

import { useEffect, useState } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Modal from "@/components/atoms/Modal";

import EditProductForm from "@/components/molecules/admin/products/EditProductForm";
import ProductForm from "@/components/molecules/admin/products/ProductoForm";

import { useProductos } from "@/hooks/useProductos";
import { Producto, ProductoInput } from "@/types/admin/producto";
import { useProductExporter } from "@/hooks/useProductExporter";
import SendEmailForm from "@/components/molecules/admin/products/SendEmailForm";
import SendWhatsappForm from "@/components/molecules/admin/products/SendWhatsappForm";

const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "NOMBRE" },
    { key: "category_name", label: "SECCIÓN" },
    { key: "price", label: "PRECIO" },
];

export default function ProductosPage() {
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    //const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    //const [editingProductId, setEditingProductId] = useState<number | null>(null);
    //const { exportToExcel, exportToCSV, exportToPDF, printTable } = useProductExporter();
    //const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    //const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);

    const { productos, getProductos, createProducto, updateProducto, isLoading, error } = useProductos();
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

    useEffect(() => {
        getProductos(200);
    }, [getProductos]);

    const handleCreateProducto = async (formData: ProductoInput) => {
        const result = await createProducto(formData);
        if (result.success) {
            handleCloseModal();
            await getProductos(200);
            alert("Producto creado");
        } else {
            alert(result.message);
        }
    }

    /* const handleEditProducto = async (formData: ProductoInput) => {
        if (!selectedProduct) return;
        const success = await updateProducto(selectedProduct.id!, formData);
        if (success) {
            handleCloseModal();
            await getProductos(200);
            alert("Producto actualizado");
        } else {
            alert(error);
            setSelectedProduct(null);
        }
    }

    const handleDeleteProducto = async (producto: Producto) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (!confirmDelete) return;
        const success = await deleteProducto(producto.id!);
        if (success) {
            await getProductos(200);
            alert("Producto eliminado");
        } else {
            alert("Error al eliminar el producto");
        }
    }; */

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setIsAddEditModalOpen(false);
    };
    /*
    const tableActions: TableAction[] = [
        {
            type: "edit",
            label: "Editar",
            onClick: (id) => {
                setEditingProductId(Number(id));
                setIsEditModalOpen(true);
            }
        },
        {
            type: "delete",
            label: "Eliminar",
            onClick: (id) => handleDelete(Number(id))
        }

    ];

    const exportButtons = [
        {
            label: "EXPORTAR A CSV",
            onClick: () => exportToCSV(products),
            backgraund: "#5bc5c7"
        },
        {
            label: "EXPORTAR A EXCEL",
            onClick: () => exportToExcel(products),
            backgraund: "#5bc5c7"
        },
        {
            label: "EXPORTAR A PDF",
            onClick: () => exportToPDF(products),
            backgraund: "#5bc5c7"
        },
        {
            label: "IMPRIMIR",
            onClick: printTable,
            backgraund: "#5bc5c7"
        },
    ];

    if (loading && products.length === 0) {
        return <div className="p-10 text-center animate-pulse">Cargando productos...</div>;
    }*/

    return (
        <div className="animate-fade-in p-4">
            <div className="flex gap-4 flex-wrap mb-4">
                <ActionButtonGroup buttons={[{
                    label: "Añadir Producto",
                    onClick: () => setIsAddEditModalOpen(true),
                    variant: "tertiary"
                }]} />

                <ActionButtonGroup buttons={[{
                    label: "Envio de Email",
                    //onClick: () => etIsEmailModalOpen(true),
                    variant: "danger"
                }]} />

                <ActionButtonGroup buttons={[{
                    label: "Envio de Whatsapp",
                    //onClick: () => setIsWhatsappModalOpen(true),
                    variant: "success"
                }]} />
            </div>

            <div className="mb-4 no-print">
                {/* <ActionButtonGroup buttons={exportButtons} /> */}
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {/* TABLA */}
            <AdminTable
                columns={columns}
                data={productos}
                minRows={5}
            />

            {/* MODAL DE AÑADIR Y EDITAR */}
            <Modal
                isOpen={isAddEditModalOpen}
                onClose={handleCloseModal}
                title={!selectedProduct ? "Añadir Producto" : "Editar Producto"}
                size="lg"
            >
                <ProductForm
                    onSubmit={handleCreateProducto}
                    onCancel={handleCloseModal}
                    initialData={selectedProduct}
                    isLoading={isLoading}
                />

            </Modal>
            {/*
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Editar Datos"
                size="lg"
            >
                <div className="max-h-[75vh] overflow-y-auto p-1 pr-2 custom-scrollbar">
                    {editingProductId && (
                        <EditProductForm
                            productId={editingProductId}
                            onClose={() => {
                                setIsEditModalOpen(false);
                                setEditingProductId(null);
                            }}
                        />
                    )}
                </div>
            </Modal> */}
            {/* <Modal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                title="Envio de Emails"
                size="lg"
            >
                <div className="max-h-[75vh] overflow-y-auto p-1 pr-2 custom-scrollbar">
                    <SendEmailForm
                        email_productos={products}
                        onClose={() => setIsEmailModalOpen(false)}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={isWhatsappModalOpen}
                onClose={() => setIsWhatsappModalOpen(false)}
                title="Envio de Whatsapp"
                size="lg"
            >
                <div className="max-h-[75vh] overflow-y-auto p-1 pr-2 custom-scrollbar">
                    <SendWhatsappForm
                        products={products}
                        onClose={() => setIsWhatsappModalOpen(false)}
                    />
                </div>
            </Modal> */}
        </div>
    )
}