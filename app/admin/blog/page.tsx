'use client'
import { useState } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Pagination from '@/components/molecules/Pagination';
import data from "@/data/admin/seguimientoData";
import { BlogData } from "@/data/blog/blogData";
import { StaticImageData } from "next/image";
import BlogImageCarousel from "@/components/molecules/admin/blog/BlogImageCarousel";
const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "PRODUCTO" },
    { key: "descripcion", label: "SUBTITULO" },
    {
      key: "galeria",label: "IMAGEN",
       render: (item:StaticImageData[]) => <BlogImageCarousel item={item} />,
    },
    {
        key:"fecha",label:"FECHA"
    }

  ]
export default function Page() {
    const [blogPaginado, setBlogPaginado] = useState<typeof BlogData>([]);

    const onMensajes = () => {
        // para los mensajes
    };

    const onMedioSeguimiento = () => {
        // para el medio de seguimiento
    };

    const onMonitoreo = () => {
        // para el monitoreo
    };

    const onAdd = () => {
        // para añadir datos
    };

    const onDelete = (id: string | number) => {
        // para eliminar datos
    };

    const onEdit = (id: string | number) => {
        // para editar datos
    };

    const topButtons = [
        { label: "Publicar", onClick: onMensajes },
        { label: "Exportar CSV", onClick: onMensajes },
        { label: "Exportar Excel", onClick: onMedioSeguimiento },
        { label: "Exportar PDF", onClick: onMonitoreo },
        { label: "Imprimir", onClick: onMonitoreo },
    ];

    return (
        <div>
            <ActionButtonGroup buttons={topButtons}  className="mb-4 mt-4" />

            <AdminTable
                minRows={10}
                columns={columns}
                data={blogPaginado}
                actions={[
                    { type: "delete", onClick: onDelete },
                    { type: "edit", onClick: onEdit }
                ]}
            />

            <ActionButtonGroup
                buttons={[{ label: "Añadir Blog", onClick: onAdd, variant: "tertiary" }]}
                className="mt-4"
            />
            <div className="col-span-full  flex justify-center order-3 my-6">
                <Pagination pageSize={2} items={BlogData} setProductosPaginados={setBlogPaginado} />
            </div>
        </div>
    );
}