
'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useBlogs } from "@/hooks/useBlog";
import AdminTable from "@/components/organisms/admin/AdminTable";

import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";

import PaginationServer from "@/components/molecules/PaginationServer";


import BlogImageCarousel from "@/components/molecules/admin/blog/BlogImageCarousel";
import AddBlogModal from "@/components/organisms/admin/ModalActions/AddBlogModal";
import UpdateBlogModal from "@/components/organisms/admin/ModalActions/UpdateBlogModal";
import ConfirmarEleminar from "@/components/molecules/admin/blog/ConfirmarEliminar";
import ExportDropdown from "@/components/molecules/admin/ExportDropdown";

import { exportExcel } from "@/utils/Export/exportExcel";
import { exportToPDF } from "@/utils/Export/ExportPDF";
import { exportCSV } from "@/utils/Export/ExportCVS";
import { Blog } from "@/types/admin/blog";

const columns = [
  { key: "id", label: "ID" },
  { key: "product", label: "PRODUCTO", render: (_: unknown, row: Blog) => row.product?.name || "null" },
  { key: "meta_title", label: "SUBTÍTULO" },
  {
    key: "gallery",
    label: "IMAGEN",
    render: (_: unknown, row: Blog) => (
      <BlogImageCarousel item={row.gallery} />
    )
  },
  { key: "created_at", label: "FECHA", render: (_: unknown, row: Blog) => new Date(row.created_at).toLocaleDateString() },
];
export default function Blogspage() {
  const { blogs, error, meta, links, isLoading, getBlogs, goToNextPage, goToPrevPage, } = useBlogs();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [blogSelected, setBlogSelected] = useState<Blog | null>(null);

  const router = useRouter();

  useEffect(() => {
    getBlogs(10); // carga inicial
  }, [getBlogs]);


  const exportOptions = useMemo(() => [
    { label: "Exportar a CSV", onClick: () => exportCSV(blogs) },
    { label: "Exportar a Excel", onClick: () => exportExcel(blogs) },
    { label: "Exportar a PDF", onClick: () => exportToPDF(blogs) },
  ], [blogs]);

  const exportButtonsDesktop = useMemo(() => [
    { label: "Exportar CSV", onClick: () => exportCSV(blogs) },
    { label: "Exportar Excel", onClick: () => exportExcel(blogs) },
    { label: "Exportar PDF", onClick: () => exportToPDF(blogs) },
  ], [blogs]);
  const handleEdit = (blog: Blog) => {
    setBlogSelected(blog);
    setOpenUpdateModal(true);
    router.refresh();
  };

  const handleDelete = (blog: Blog) => {
    setBlogSelected(blog);
    setOpenDeleteModal(true);
    router.refresh();
  };
  console.log(blogs)
  return (
    <div>
      {blogSelected && (
        <ConfirmarEleminar
          Blog={blogSelected}
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onSuccess={() => getBlogs(10)}
        />
      )}

      {blogSelected && (
        <UpdateBlogModal
          blog={blogSelected}
          openModal={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
          onSuccess={() => getBlogs(10)}
        />
      )}

      <AddBlogModal
        openModal={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSuccess={() => getBlogs(10)}
      />

      <div className="flex flex-row flex-wrap gap-2 mb-4 items-center">
        {/* Botón Publicar siempre visible */}
        <div className="w-auto">
          <ActionButtonGroup buttons={[{ label: "Publicar", onClick: () => setOpenAddModal(true), className: "w-auto md:w-[151px]" }]} />
        </div>

        {/* Desktop: Botones de exportación separados */}
        <div className="hidden md:block">
          <ActionButtonGroup buttons={exportButtonsDesktop} />
        </div>

        {/* Móvil: Dropdown de exportación */}
        <div className="md:hidden w-auto">
          <ExportDropdown options={exportOptions} className="w-auto" />
        </div>
      </div>
      {error && (
        <div>
          {error}
        </div>
      )}

      <AdminTable
        minRows={10}
        columns={columns}
        data={blogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {meta && (
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
    </div>
  );
}