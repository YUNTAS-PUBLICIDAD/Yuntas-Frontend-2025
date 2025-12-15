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
type BlogImage = {
  url: string;
  alt?: string | null;
};

type Blog = {
  id: number;
  title: string;
  meta_title: string;
  gallery: BlogImage[];
  created_at: string;
};

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

  const topButtons = [
    { label: "Publicar", onClick: () => setOpenModal(true) },
    { label: "Exportar CSV", onClick: () => exportCSV(blogPaginado) },
    { label: "Exportar Excel", onClick: () => exportExcel(blogPaginado) },
    { label: "Exportar PDF", onClick: () => exportToPDF(blogPaginado) },
    { label: "Imprimir", onClick: () => exportToPDF(blogPaginado) },
  ];

  return (
    <div>
      <AddBlogModal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
      />

      <ActionButtonGroup buttons={topButtons} className="mb-4 mt-4" />

      <AdminTable
        minRows={10}
        columns={columns}
        data={blogPaginado}
        actions={[
          { type: "delete", onClick: () => {} },
          { type: "edit", onClick: () => {} },
        ]}
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
