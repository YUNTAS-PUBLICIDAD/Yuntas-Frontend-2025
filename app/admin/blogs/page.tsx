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
import SearchBar from "@/components/molecules/admin/SearchBar";
import { Download, FileDown, FileSpreadsheet, FileText, Plus, Rocket } from "lucide-react";
import { useDeploy } from "@/hooks/useDeploy";
import { getPermissions } from "@/utils/permission";

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

    const [blogsFiltrados, setBlogsFiltrados] = useState<Blog[]>([]);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [datosPaginados, setDatosPaginados] = useState<Blog[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    const { confirm, ConfirmDialog } = useConfirm();
    // DEPLOY
    const { isLoading: isDeploying, triggerDeploy } = useDeploy();

    useEffect(() => {
        getBlogs(200);
        getProductos(200);
    }, [getBlogs, getProductos]);

    useEffect(() => {
        setBlogsFiltrados(blogs);
    }, [blogs]);

    const totalRecords = blogsFiltrados.length;

    const exportOptions = useMemo(
        () => [
            { label: "Exportar a CSV", onClick: () => exportCSV(blogsFiltrados), icon: <FileText className="h-4 w-4" /> },
            { label: "Exportar a Excel", onClick: () => exportExcel(blogsFiltrados), icon: <FileSpreadsheet className="h-4 w-4" /> },
            { label: "Exportar a PDF", onClick: () => exportToPDF(blogsFiltrados), icon: <FileDown className="h-4 w-4" /> },
        ],
        [blogsFiltrados]
    );

    const handleCreateBlog = async (formData: BlogInput) => {
        const result = await createBlog(formData);
        if (result.success) {
            handleCloseModal();
            await getBlogs(200);
            showToast.success("Blog creado");
            setTimeout(() => {
                showToast.info(
                    "Recuerda publicar los cambios para que se reflejen en la web",
                    {
                        duration: 3000
                    }
                );
            }, 100)
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
            setTimeout(() => {
                showToast.info(
                    "Recuerda publicar los cambios para que se reflejen en la web",
                    {
                        duration: 3000
                    }
                );
            }, 100);
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
            setTimeout(() => {
                showToast.info(
                    "Recuerda publicar los cambios para que se reflejen en la web",
                    {
                        duration: 3000
                    }
                );
            }, 100);
        } else {
            showToast.error(result.message || "Error al eliminar el blog");
        }
    };

    const handleTriggerDeploy = async () => {
        const confirmDeploy = await confirm({
            message: "¿Estás seguro de que deseas publicar los cambios?"
        });

        if (!confirmDeploy) return;

        const result = await triggerDeploy();

        if (result.success) {
            showToast.success(result.message || "Despliegue iniciado");
        } else {
            showToast.error(result.message || "Error al iniciar el despliegue");
        }
    }

    const handleCloseModal = () => {
        setSelectedBlog(null);
        setIsAddEditModalOpen(false);
    };

    const permissions = getPermissions();

    const canCreate = permissions.includes("blogs.crear");

    return (
        <div className="relative p-2 md:p-4 text-[#0D1030] dark:text-white transition-colors duration-300">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(35,193,222,0.18),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(32,53,101,0.16),_transparent_36%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(109,225,227,0.18),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(41,50,150,0.18),_transparent_36%)]" />

            {/* CABECERA */}
            <section className="mb-5 rounded-[1.75rem] border border-[#D8E7F3] bg-white/90 p-5 shadow-[0_18px_40px_rgba(13,16,48,0.06)] backdrop-blur dark:border-white/10 dark:bg-[#1C2347]/90">
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="space-y-1 flex-1">
                        <h2 className="text-3xl font-bold tracking-tight text-[#0D1030] dark:text-white/90 md:text-4xl">
                            Gestión de Contenido
                        </h2>
                        <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-white/80 md:text-base">
                            Administra los blogs del sitio, edita contenidos y visualiza las publicaciones.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        {canCreate && (
                            <ActionButtonGroup
                                buttons={[{
                                    label: "Añadir Blog",
                                    onClick: () => setIsAddEditModalOpen(true),
                                    icon: <Plus className="h-4 w-4" />,
                                    variant: "primary",
                                    className: "w-full sm:w-auto"
                                }]}
                            />)}

                        <ActionButtonGroup buttons={[{
                            label: "Publicar Cambios",
                            onClick: handleTriggerDeploy,
                            icon: <Rocket className="h-4 w-4" />,
                            variant: "info",
                            className: "w-full sm:w-auto",
                            isLoading: isDeploying
                        }]} />
                        <ExportDropdown
                            label="Exportar"
                            icon={<Download className="h-4 w-4" />}
                            options={exportOptions}
                            buttonClassName="w-full sm:w-auto px-6 h-[46px] rounded-xl shadow-sm"
                        />
                    </div>
                </div>
            </section>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {/* BUSCADOR Y MÉTRICAS */}
            <section className="mb-5 rounded-[1.75rem] border border-[#D8E7F3] bg-white/95 p-4 shadow-[0_14px_32px_rgba(13,16,48,0.05)] dark:border-white/10 dark:bg-[#1C2347]/95 md:p-5">
                <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
                    <div className="w-full min-0 2xl:flex-1">
                        <SearchBar
                            items={blogs}
                            onSearch={setBlogsFiltrados}
                            placeholder="Buscar por título o producto..."
                            searchKeys={['id', 'title', 'product_name']}
                            getDisplayValue={(item) => `${item.id} - ${item.title}`}
                        />
                    </div>

                    <div className="grid w-full gap-3 sm:grid-cols-1 2xl:w-[240px] 2xl:flex-none">
                        <div className="w-full min-w-0 rounded-2xl border border-[#E5EEF6] bg-[#F8FBFE] px-3 py-3 text-center dark:border-white/10 dark:bg-white/5 sm:px-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">Resultados</p>
                            <p className="mt-1 text-xl font-black leading-none text-[#203565] dark:text-white sm:text-2xl">
                                {totalRecords}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="mb-4 flex flex-col border-b border-[#E5EEF6] pb-4 px-5 dark:border-white/10 lg:flex-col lg:items-baseline lg:justify-between">
                <h3 className="mt-1 mb-1 text-xl lg:text-3xl font-bold text-[#0D1030] dark:text-white/90">GESTIÓN DE BLOGS</h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-white/80 md:text-base">Administra publicaciones y actualiza contenido.</p>
            </div>

            <AdminTable
                minRows={10}
                columns={columns}
                data={datosPaginados}
                onEdit={handleEditClick}
                editPermission="blogs.editar"
                onDelete={handleDeleteBlog}
                deletePermission="blogs.eliminar"
                isLoading={isLoading && blogs.length === 0}
                emptyMessage="No se encontraron blogs"
                onResetSearch={() => setBlogsFiltrados(blogs)}
                resetSearchText="Ver todos los blogs"
            />

            {!isLoading && blogsFiltrados.length > 0 && (
                <div className="mt-5 flex justify-center">
                    <Pagination
                        pageSize={10}
                        items={blogsFiltrados}
                        setProductosPaginados={setDatosPaginados}
                    />
                </div>
            )}

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
