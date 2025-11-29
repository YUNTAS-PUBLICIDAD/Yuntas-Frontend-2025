'use client'

import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Pagination from '@/components/molecules/Pagination';
import data from "@/data/admin/productosData";

const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "NOMBRE" },
    { key: "seccion", label: "SECCIÓN" },
    { key: "precio", label: "PRECIO" },
];

export default function productosPage() {

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
            <AdminTable
                columns={columns}
                data={data}
                actions={[
                    { type: "delete", onClick: onDelete },
                    { type: "edit", onClick: onEdit }
                ]}
            />
            <div className="col-span-full  flex justify-center order-3 my-6">
                <Pagination pageSize={6} items={data} setProductosPaginados={() => { }} />
            </div>

        </div>
    )
}
