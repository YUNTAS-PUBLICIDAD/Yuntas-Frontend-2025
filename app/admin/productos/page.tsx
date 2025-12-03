'use client'

import { useState, useEffect } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import PaginationServer from '@/components/molecules/PaginationServer';
import { useProductos } from "@/hooks/useProductos";
import { ProductoInput } from "@/types/admin/producto";

const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "NOMBRE" },
    { key: "seccion", label: "SECCIÓN" },
    { key: "precio", label: "PRECIO" },
];

export default function productosPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;
    const {
        productos,
        meta,
        isLoading,
        error,
        getProductos,
        createProducto,
        deleteProducto
    } = useProductos();

    useEffect(() => {
        getProductos(currentPage, perPage);
    }, [currentPage, getProductos]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const onAddProduct = () => {
        // añadir un producto
    }

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

    const onDelete = (id: string | number) => {
        // para eliminar datos
    };

    const onEdit = (id: string | number) => {
        // para editar datos
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

        </div>
    )
}
