'use client'
import { useState } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Pagination from '@/components/molecules/Pagination';
import data from "@/data/admin/seguimientoData";
import { BlogData } from "@/data/blog/blogData";
import { StaticImageData } from "next/image";
import BlogImageCarousel from "@/components/molecules/admin/blog/BlogImageCarousel";
import BlogForm from "@/components/organisms/admin/BlogForm";
import Modal from "@/components/atoms/Modal";
import { useBlogForm } from "@/hooks/admin/useBlogForm";
import { exportExcel } from "@/utils/Export/exportExcel";
import { exportToPDF } from "@/utils/Export/ExportPDF";
import { exportCSV } from "@/utils/Export/ExportCVS";
import { Blog } from "@/types/blog";
const columns = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "PRODUCTO" },
    { key: "descripcion", label: "SUBTITULO" },
    {
        key: "galeria", label: "IMAGEN",
        render: (item: StaticImageData[]) => <BlogImageCarousel item={item} />,
    },
    {
        key: "fecha", label: "FECHA"
    }
]

export default function Page() {
    const [blogPaginado, setBlogPaginado] = useState<Blog[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const blogForm = useBlogForm(selectedBlog || undefined, modalMode);

    const onAdd = () => {
        setModalMode("create");
        setSelectedBlog(null);
        blogForm.resetForm();
        setShowModal(true);
    };

    const onEdit = (id: string | number) => {
        const blog = blogPaginado.find(b => b.id === id);
        if (blog) {
            setModalMode("edit");
            setSelectedBlog(blog);
            setShowModal(true);
        }
    };

    const onDelete = (id: string | number) => {
        if (confirm("¿Estás seguro de que deseas eliminar este blog?")) {
            // Aquí iría la llamada a la API para eliminar
            console.log("Eliminando blog con ID:", id);
            // Actualizar lista después de eliminar
            const updatedBlogs = blogPaginado.filter(b => b.id !== id);
            setBlogPaginado(updatedBlogs);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Aquí iría la llamada a la API para crear/actualizar
            console.log("Enviando formulario:", blogForm.formData);
            
            // Simular envío exitoso
            setTimeout(() => {
                alert(`Blog ${modalMode === "create" ? "creado" : "actualizado"} exitosamente`);
                setShowModal(false);
                blogForm.resetForm();
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Error:", error);
            alert("Error al guardar el blog");
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        blogForm.resetForm();
        setSelectedBlog(null);
    };

    const topButtons = [
        { label: "Exportar CSV", onClick: () => exportCSV(blogPaginado) },
        { label: "Exportar Excel", onClick: () => exportExcel(blogPaginado) },
        { label: "Exportar PDF", onClick: () => exportToPDF(blogPaginado) },
        { label: "Imprimir", onClick: () => exportToPDF(blogPaginado) },
    ];

    return (
        <div>
            <ActionButtonGroup buttons={topButtons} className="mb-4 mt-4" />

            <AdminTable
                minRows={10}
                columns={columns}
                data={blogPaginado}
                onDelete={onDelete}
                onEdit={onEdit}
            />

            <ActionButtonGroup
                buttons={[{ label: "Añadir Blog", onClick: onAdd, variant: "tertiary" }]}
                className="mt-4"
            />

            <div className="col-span-full flex justify-center order-3 my-6">
                <Pagination pageSize={2} items={BlogData} setProductosPaginados={setBlogPaginado} />
            </div>

            {/* Modal para crear/editar blog */}
            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title={modalMode === "create" ? "Crear Nuevo Blog" : "Editar Blog"}
                size="lg"
            >
                <BlogForm
                    formData={blogForm.formData}
                    previewSecundarias={blogForm.previewSecundarias}
                    onInputChange={blogForm.handleInputChange}
                    onBeneficioChange={blogForm.handleBeneficioChange}
                    onImageChange={blogForm.handleImageChange}
                    onImageAltChange={blogForm.handleImageAltChange}
                    onSecondaryImageChange={blogForm.handleSecondaryImageChange}
                    onBeneficiosChange={blogForm.handleBeneficiosChange}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCloseModal}
                    isLoading={isLoading}
                    mode={modalMode}
                    productos={[
                        { id: "1", nombre: "Producto 1" },
                        { id: "2", nombre: "Producto 2" },
                    ]}
                />
            </Modal>
        </div>
    );
}