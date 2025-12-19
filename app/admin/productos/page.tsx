'use client'

import { useState } from "react";
// Componentes UI
import AdminTable, { TableAction } from "@/components/organisms/admin/Products/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import PaginationServer from '@/components/molecules/PaginationServer';
import Modal from "@/components/atoms/Modal";
import EditProductForm from "@/components/molecules/admin/products/EditProductForm"; 

// El Formulario (Organismo)
import AddProductForm from "@/components/molecules/admin/products/AddProductForm";

// Hooks
// Usamos el hook que formatea los datos (useAdminProducts)
import { useAdminProducts } from "@/hooks/ui/admin/products/useAdminProducts"; 


const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "NOMBRE" },   
    { key: "seccion", label: "SECCIÓN" }, 
    { key: "precio", label: "PRECIO" },   
];

export default function ProductosPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProductId, setEditingProductId] = useState<number | null>(null);

    const { 
        products,      
        loading,       
        error,         
        reload,        
        handleDelete   
    } = useAdminProducts();

    const onAddProduct = () => setIsAddModalOpen(true);
    
    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        reload(); 
    };

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
        { label: "EXPORTAR A CSV", onClick: () => {} },
        { label: "EXPORTAR A EXCEL", onClick: () => {} },
        { label: "EXPORTAR A PDF", onClick: () => {} },
        { label: "IMPRIMIR", onClick: () => {} },
    ];

    if (loading && products.length === 0) {
        return <div className="p-10 text-center animate-pulse">Cargando productos...</div>;
    }

    return (
        <div className="animate-fade-in p-4">
            <div className="flex gap-4 flex-wrap mb-4">
                <ActionButtonGroup buttons={[{ label: "Añadir Producto", onClick: onAddProduct, variant: "tertiary" }]} />
                <ActionButtonGroup buttons={[{ label: "Envio de Email", onClick: () => {}, variant: "danger" }]} />
                <ActionButtonGroup buttons={[{ label: "Envio de Whatsapp", onClick: () => {}, variant: "success" }]} />
            </div>
            
            <ActionButtonGroup buttons={exportButtons} className="mb-4" />

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {/* TABLA */}
            <AdminTable
                columns={columns}
                data={products} 
                minRows={5}     
                actions={tableActions} 
            />

             
            {/* <div className="flex justify-center my-6">
                <PaginationServer ... />
            </div> 
            */}

            {/* MODAL DE AÑADIR */}
            <Modal 
                isOpen={isAddModalOpen} 
                onClose={handleCloseModal} 
                title="Ingresar Datos" 
                size="lg"
            >
                <div className="max-h-[75vh] overflow-y-auto p-1 pr-2 custom-scrollbar">
                    <AddProductForm onClose={handleCloseModal} />
                </div>
                
            </Modal>
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
                                // reload(); // Si tienes el reload del hook useAdminProducts
                            }} 
                        />
                    )}
                </div>
            </Modal>
        </div>
    )
}