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
import Pagination from "@/components/molecules/Pagination";
import ExportDropdown from "@/components/molecules/admin/ExportDropdown";
import SendWhatsappForm from "@/components/molecules/admin/products/SendWhatsappForm";

const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "NOMBRE" },
    { key: "category_name", label: "SECCIÓN" },
    { key: "price", label: "PRECIO" },
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

    const exportOptions = [
        { label: "Exportar a CSV", onClick: () => exportToCSV(productos) },
        { label: "Exportar a Excel", onClick: () => exportToExcel(productos) },
        { label: "Exportar a PDF", onClick: () => exportToPDF(productos) },
    ];

    const exportButtonsDesktop = [
        { label: "EXPORTAR A CSV", onClick: () => exportToCSV(productos) },
        { label: "EXPORTAR A EXCEL", onClick: () => exportToExcel(productos) },
        { label: "EXPORTAR A PDF", onClick: () => exportToPDF(productos) },
    ];

    if (isLoading && productos.length === 0) {
        return <div className="p-10 text-center animate-pulse">Cargando productos...</div>;
    }

    return (
        <div className="p-2 md:p-4">
            {/* Botones de acción principales */}
            {/* Botones de acción principales */}
            <div className="flex flex-row flex-wrap gap-2 mb-4">
                <ActionButtonGroup className="flex-auto" buttons={[{
                    label: "Añadir Producto",
                    onClick: () => setIsAddEditModalOpen(true),
                    variant: "tertiary",
                    className: "w-full"
                }]} />

                <ActionButtonGroup className="flex-auto" buttons={[{
                    label: "Envio de Email",
                    onClick: () => setIsEmailModalOpen(true),
                    variant: "danger",
                    className: "w-full"
                }]} />

                <ActionButtonGroup className="flex-auto" buttons={[{
                    label: "Envio de Whatsapp",
                    onClick: () => setIsWhatsappModalOpen(true),
                    variant: "success",
                    className: "w-full"
                }]} />
            </div>

            {/* Botones de Imprimir y Exportar */}
            <div className="flex flex-row flex-wrap gap-2 mb-4 no-print items-center">
                <ActionButtonGroup className="flex-auto" buttons={[{
                    label: "IMPRIMIR",
                    onClick: () => printTable(productos),
                    variant: "primary",
                    className: "w-full"
                }]} />

                {/* Desktop: Botones separados */}
                <div className="hidden md:block">
                    <ActionButtonGroup buttons={exportButtonsDesktop} />
                </div>

                {/* Móvil: Dropdown */}
                <div className="md:hidden flex-auto">
                    <ExportDropdown options={exportOptions} className="w-full" />
                </div>
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

            {/* MODAL PARA CAMPAÑA A TRAVES DE EMAIL */}
            <Modal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                title="Envio de Emails"
                size="lg"
            >
                <SendEmailForm
                    products={productos}
                    onClose={() => setIsEmailModalOpen(false)}
                />
            </Modal>

            <Modal
                isOpen={isWhatsappModalOpen}
                onClose={() => setIsWhatsappModalOpen(false)}
                title="Envio de Whatsapp"
                size="lg"
            >
                <SendWhatsappForm
                    products={productos}
                    onClose={() => setIsWhatsappModalOpen(false)}
                />
            </Modal>
        </div>
    )
}