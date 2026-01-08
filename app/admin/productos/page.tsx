'use client'

import { useEffect, useState } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Modal from "@/components/atoms/Modal";

import ProductForm from "@/components/molecules/admin/products/ProductoForm";

import { useProductos } from "@/hooks/useProductos";
import { Producto, ProductoInput } from "@/types/admin/producto";
import { useProductExporter } from "@/hooks/useProductExporter";
import SendEmailForm from "@/components/molecules/admin/products/SendEmailForm";
import SendWhatsappForm from "@/components/molecules/admin/products/SendWhatsappForm";
import Pagination from "@/components/molecules/Pagination";

const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "NOMBRE" },         
    { key: "seccion", label: "SECCIÓN" },       
    { key: "precio", label: "PRECIO" },         
];

export default function ProductosPage() {
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const { productos, getProductos, createProducto, updateProducto, deleteProducto, isLoading, error } = useProductos();
    const [datosPaginados, setDatosPaginados] = useState<Producto[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const { exportToExcel, exportToCSV, exportToPDF, printTable } = useProductExporter();
    const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);

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

    const handleEditClick = (producto: Producto) => {
        setSelectedProduct(producto);
        setIsAddEditModalOpen(true);
    };

    const handleEditProducto = async (formData: ProductoInput) => {
        if (!selectedProduct) return;
        
        const result = await updateProducto(selectedProduct.id!, formData);
        if (result.success) {
            handleCloseModal();
            await getProductos(200);
            alert("Producto actualizado");
        } else {
            alert(result.message);
        }
    }

    const handleDeleteProducto = async (producto: Producto) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (!confirmDelete) return;
        const result = await deleteProducto(producto.id!);
        if (result.success) {
            await getProductos(200);
            alert("Producto eliminado");
        } else {
            alert(result.message);
        }
    }; 

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setIsAddEditModalOpen(false);
    };
    
    const exportButtons = [
        {
            label: "EXPORTAR A CSV",
            onClick: () => exportToCSV(productos),
            backgraund: "#5bc5c7"
        },
        {
            label: "EXPORTAR A EXCEL",
            onClick: () => exportToExcel(productos),
            backgraund: "#5bc5c7"
        },
        {
            label: "EXPORTAR A PDF",
            onClick: () => exportToPDF(productos),
            backgraund: "#5bc5c7"
        },
        {
            label: "IMPRIMIR",
            onClick: printTable,
            backgraund: "#5bc5c7"
        },
    ]; 

    if (isLoading && productos.length === 0) {
        return <div className="p-10 text-center animate-pulse">Cargando productos...</div>;
    }

    return (
        <div className="p-4">
            <div className="flex gap-2 flex-wrap mb-4">
                <ActionButtonGroup buttons={[{
                    label: "Añadir Producto",
                    onClick: () => setIsAddEditModalOpen(true),
                    variant: "tertiary"
                }]} />

                <ActionButtonGroup buttons={[{
                    label: "Envio de Email",
                    onClick: () => setIsEmailModalOpen(true),
                    variant: "danger"
                }]} />

                <ActionButtonGroup buttons={[{
                    label: "Envio de Whatsapp",
                    onClick: () => setIsWhatsappModalOpen(true),
                    variant: "success"
                }]} />
            </div>

            <div className="mb-4 no-print">
                <ActionButtonGroup buttons={exportButtons} />
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {/* TABLA */}
            <AdminTable
                columns={columns}
                data={datosPaginados}
                minRows={5}
                onEdit={handleEditClick}
                onDelete={handleDeleteProducto}
            />

            <div className="flex justify-center mt-4">
                <Pagination
                    pageSize={10}
                    items={productos}
                    setProductosPaginados={setDatosPaginados}
                />
            </div>

            {/* MODAL DE AÑADIR Y EDITAR */}
            <Modal
                isOpen={isAddEditModalOpen}
                onClose={handleCloseModal}
                title={!selectedProduct ? "Añadir Producto" : "Editar Producto"}
                size="lg"
            >
                <ProductForm
                    onSubmit={!selectedProduct ? handleCreateProducto : handleEditProducto}
                    onCancel={handleCloseModal}
                    initialData={selectedProduct}
                    isLoading={isLoading}
                />
            </Modal>
            <Modal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                title="Envio de Emails"
                size="lg"
            >
                <div className="max-h-[75vh] overflow-y-auto p-1 pr-2 custom-scrollbar">
                    <SendEmailForm
                        email_productos={productos}
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
                        products={productos}
                        onClose={() => setIsWhatsappModalOpen(false)}
                    />
                </div>
            </Modal>
        </div>
    )
}