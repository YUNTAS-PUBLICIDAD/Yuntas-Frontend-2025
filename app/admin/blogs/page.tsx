'use client';

import { useEffect, useMemo, useState } from "react";
import { useBlogs } from "@/hooks/useBlog";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import BlogImageCarousel from "@/components/molecules/admin/blog/BlogImageCarousel";
import ExportDropdown from "@/components/molecules/admin/ExportDropdown";
import { exportExcel } from "@/utils/Export/exportExcel";
import { exportToPDF } from "@/utils/Export/ExportPDF";
import { exportCSV } from "@/utils/Export/ExportCVS";
import { Blog, BlogInput } from "@/types/admin/blog";
import { useConfirm } from "@/hooks/useConfirm";
import { showToast } from "@/utils/showToast";
import Pagination from "@/components/molecules/Pagination";
import Modal from "@/components/atoms/Modal";
import BlogForm from "@/components/molecules/blog/BlogForm";

const columns = [
    { key: "id", label: "ID" },
    { key: "product", label: "PRODUCTO" },
    { key: "title", label: "TITULO" },
    {
        key: "gallery",
        label: "IMAGEN",
        render: (_: unknown, row: Blog) => (
            <BlogImageCarousel item={row.gallery} />
        )
    },
    { key: "created_at", label: "FECHA" },
];

export default function Blogspage() {
    const { blogs, getBlogs, createBlog, updateBlog, deleteBlog, error, isLoading } = useBlogs();
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [datosPaginados, setDatosPaginados] = useState<Blog[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    const { confirm, ConfirmDialog } = useConfirm();

    useEffect(() => {
        getBlogs(200);
    }, [getBlogs]);

    const exportOptions = useMemo(
        () => [
            { label: "Exportar a CSV", onClick: () => exportCSV(blogs) },
            { label: "Exportar a Excel", onClick: () => exportExcel(blogs) },
            { label: "Exportar a PDF", onClick: () => exportToPDF(blogs) },
        ],
        [blogs]
    );

    const handleCreateBlog = async (formData: BlogInput) => {
        const result = await createBlog(formData);
        if (result.success) {
            handleCloseModal();
            await getBlogs(200);
            showToast.success("Blog creado");
        } else {
            showToast.error(result.message || "Error al crear el blog");
        }
    }

    const handleEditClick = (blog: Blog) => {
        setSelectedBlog(blog);
        setIsAddEditModalOpen(true);
    };

    const handleEditBlog = async (formData: BlogInput) => {
        if (!selectedBlog) return;

        const result = await updateBlog(selectedBlog.id!, formData);
        if (result.success) {
            handleCloseModal();
            await getBlogs(200);
            showToast.success("Blog actualizado");
        } else {
            showToast.error(result.message || "Error al actualizar el blog");
        }
    }

    const handleDeleteBlog = async (blog: Blog) => {
        const confirmDelete = await confirm({ message: "¿Estás seguro de que deseas eliminar este blog?" });
        if (!confirmDelete) return;
        const result = await deleteBlog(blog.id!);
        if (result.success) {
            await getBlogs(200);
            showToast.success("Blog eliminado");
        } else {
            showToast.error(result.message || "Error al eliminar el blog");
        }
    };

    const handleCloseModal = () => {
        setSelectedBlog(null);
        setIsAddEditModalOpen(false);
    };

    if (isLoading && blogs.length === 0) {
        return <div className="p-10 text-center animate-pulse">Cargando blogs...</div>;
    }

    return (
        <div>
            {/* BOTONES */}
            <div className="flex flex-row flex-wrap gap-2 mb-4">
                <ActionButtonGroup className="flex-auto"
                    buttons={[{
                        label: "Añadir Blog",
                        onClick: () => setIsAddEditModalOpen(true),
                        className: "w-full",
                    }]} />
            </div>
            <div className="flex flex-wrap gap-3 mb-4 no-print max-w-5xl mx-auto">
                <div className="flex-1 min-w-[120px]">
                    <ExportDropdown
                        label="Exportar"
                        options={exportOptions}
                        className="w-full h-[40px]"
                    />
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {/* TABLA */}
            <AdminTable
                minRows={10}
                columns={columns}
                data={datosPaginados}
                onEdit={handleEditClick}
                onDelete={handleDeleteBlog}
            />

            <div className="flex justify-center mt-4">
                <Pagination
                    pageSize={10}
                    items={blogs}
                    setProductosPaginados={setDatosPaginados}
                />
            </div>

            {/* MODAL DE AÑADIR Y EDITAR */}
            <Modal
                isOpen={isAddEditModalOpen}
                onClose={handleCloseModal}
                title={!selectedBlog ? "Añadir Blog" : "Editar Blog"}
                size="lg"
            >
                <BlogForm
                    onSubmit={!selectedBlog ? handleCreateBlog : handleEditBlog}
                    onCancel={handleCloseModal}
                    initialData={selectedBlog}
                    isLoading={isLoading}
                />
            </Modal>
            <ConfirmDialog />
        </div>
    );
}
