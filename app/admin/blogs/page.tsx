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
import { useProductos } from "@/hooks/useProductos";
import SearchBar from "@/components/molecules/SearchBar";

// Icono para el estado vacío
const SearchXIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
        <path d="m13.5 8.5-5 5"></path>
        <path d="m8.5 8.5 5 5"></path>
    </svg>
);

const columns = [
    { key: "id", label: "ID" },
    { key: "product_name", label: "PRODUCTO" },
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
    const { productos, getProductos } = useProductos();

    // --- ESTADOS NUEVOS ---
    const [blogsFiltrados, setBlogsFiltrados] = useState<Blog[]>([]);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [datosPaginados, setDatosPaginados] = useState<Blog[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    const { confirm, ConfirmDialog } = useConfirm();

    useEffect(() => {
        getBlogs(200);
        getProductos(200);
    }, [getBlogs, getProductos]);

    useEffect(() => {
        setBlogsFiltrados(blogs);
    }, [blogs]);


    const exportOptions = useMemo(
        () => [
            { label: "Exportar a CSV", onClick: () => exportCSV(blogsFiltrados) },
            { label: "Exportar a Excel", onClick: () => exportExcel(blogsFiltrados) },
            { label: "Exportar a PDF", onClick: () => exportToPDF(blogsFiltrados) },
        ],
        [blogsFiltrados]
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

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

                {/* GRUPO DE BOTONES */}
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto shrink-0">
                    <div className="w-full md:w-auto">
                        <ActionButtonGroup
                            buttons={[{
                                label: "Añadir Blog",
                                onClick: () => setIsAddEditModalOpen(true),
                                className: "w-full md:w-auto px-6 h-[42px] text-sm font-semibold"
                            }]}
                        />
                    </div>

                    <div className="w-full md:w-auto">
                        <ExportDropdown
                            label="Exportar"
                            options={exportOptions}
                            className="w-full md:w-auto h-[42px]"
                            buttonClassName="w-full md:w-auto px-6 h-[42px] text-sm font-semibold"
                        />
                    </div>
                </div>

                {/*  BUSCADOR  */}
                <div className="w-full md:flex-1">
                    <SearchBar
                        items={blogs}
                        onSearch={setBlogsFiltrados}
                        placeholder="Buscar por título o producto..."
                        searchKeys={['id', 'title', 'product_name']}
                        getDisplayValue={(item) => `${item.id} - ${item.title}`}
                    />
                </div>

                {/* CONTADOR  */}
                <div className="w-full md:w-auto">
                    <div className="w-full md:min-w-[240px] px-4 py-2 bg-[#E8F4F8] border-2 border-[#203565] rounded-full text-center">
                        <span className="text-[#203565] font-semibold text-sm whitespace-nowrap">
                            {blogsFiltrados.length} REGISTROS ENCONTRADOS
                        </span>
                    </div>
                </div>

            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {/* TABLA O MENSAJE VACÍO */}
            {blogsFiltrados.length > 0 ? (
                <>
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
                            items={blogsFiltrados}
                            setProductosPaginados={setDatosPaginados}
                        />
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg mt-4">
                    <SearchXIcon />
                    <h3 className="text-lg font-medium text-gray-900">No se encontraron blogs</h3>
                    <p className="text-gray-500 text-sm mt-1 text-center max-w-sm">
                        No hay resultados para tu búsqueda. Intenta con otro título, producto o revisa la ortografía.
                    </p>
                    <button
                        onClick={() => setBlogsFiltrados(blogs)}
                        className="mt-4 text-sm text-[#203565] font-semibold hover:underline"
                    >
                        Ver todos los blogs
                    </button>
                </div>
            )}

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
                    productos={productos}
                />
            </Modal>
            <ConfirmDialog />
        </div>
    );
}   