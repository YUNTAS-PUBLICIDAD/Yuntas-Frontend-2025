'use client'

import { useState } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Pagination from '@/components/molecules/Pagination';
import BlogImageCarousel from "@/components/molecules/admin/blog/BlogImageCarousel";
import { exportExcel } from "@/utils/Export/exportExcel";
import { exportToPDF } from "@/utils/Export/ExportPDF";
import { exportCSV } from "@/utils/Export/ExportCVS";
import AddBlogModal from "@/components/organisms/admin/AddblogModal/AddBlogModal";
import UpdateBlogModal from "@/components/organisms/admin/AddblogModal/UpdateBlogModal";
import { Blog } from "@/types/blog";

const columns = [
  { key: "id", label: "ID" },
  { key: "title", label: "PRODUCTO" },
  { key: "cover_subtitle", label: "SUBTITULO" },
  {
    key: "gallery",
    label: "IMAGEN",
    render: (_,row) => (
    <BlogImageCarousel item={row.gallery} />
  )
  },
  { key: "created_at", label: "FECHA" },
];

type Props = {
  blogs: Blog[];
};

export default function ClientPage({ blogs }: Props) {
  const [blogPaginado, setBlogPaginado] = useState<Blog[]>(blogs);

  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal,setUpdateModal]=useState(false);
  const topButtons = [
    { label: "Publicar", onClick: () => setOpenModal(true) },
    { label: "Exportar CSV", onClick: () => exportCSV(blogPaginado) },
    { label: "Exportar Excel", onClick: () => exportExcel(blogPaginado) },
    { label: "Exportar PDF", onClick: () => exportToPDF(blogPaginado) },
    { label: "Imprimir", onClick: () => exportToPDF(blogPaginado) },
  ];
  const handleDelete=()=>{

  }
  return (
    <div>
      <UpdateBlogModal
        blog={blogPaginado[0]}
        openModal={openUpdateModal}
        onClose={() => setUpdateModal(false)}
      />
      <AddBlogModal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
      />
      <ActionButtonGroup buttons={topButtons} className="mb-4 mt-4" />
      
      <AdminTable
        minRows={10}
        columns={columns}
        data={blogPaginado}
        onEdit={() => setUpdateModal(true)}
        onDelete={handleDelete}
      />

      <div className="flex justify-center my-6">
        <Pagination
          pageSize={10}
          items={blogs}
          setProductosPaginados={setBlogPaginado}
        />
      </div>
    </div>
  );
}
