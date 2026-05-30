'use client'

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Modal from "@/components/atoms/Modal";
import { showToast } from "@/utils/showToast";
import { useConfirm } from "@/hooks/useConfirm";
import ProductForm from "@/components/molecules/admin/products/ProductoForm";
import { useProductos } from "@/hooks/useProductos";
import { useDeploy } from "@/hooks/useDeploy";
import { Producto, ProductoInput } from "@/types/admin/producto";
import { useProductExporter } from "@/hooks/useProductExporter";
import SendEmailForm from "@/components/molecules/admin/products/SendEmailForm";
import WhatsappFormWithTabs from "@/components/molecules/admin/products/WhatsappFormWithTabs";
import Pagination from "@/components/molecules/Pagination";
import ExportDropdown from "@/components/molecules/admin/ExportDropdown";
import SearchBar from "@/components/molecules/admin/SearchBar";
import { PlusIcon, MailIcon, WhatsappIcon, RocketIcon, PrinterIcon } from "@/components/atoms/icons";
import { Download, FileDown, FileSpreadsheet, FileText } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NOMBRE" },
  { key: "category_name", label: "SECCIÓN" },
  { key: "price", label: "PRECIO" },
];

export default function ProductosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const { productos, getProductos, createProducto, updateProducto, deleteProducto, isLoading, error } = useProductos();

  // Estados para búsqueda y paginación
  const [datosPaginados, setDatosPaginados] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const { exportToExcel, exportToCSV, exportToPDF, printTable } = useProductExporter();
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [whatsappInitialTab, setWhatsappInitialTab] = useState<string>("conexion");
  const { confirm, ConfirmDialog } = useConfirm();
  const { isLoading: isDeploying, triggerDeploy } = useDeploy();
  const [formCloseHandler, setFormCloseHandler] = useState<null | (() => Promise<void>)>(null)

  useEffect(() => {
    getProductos(200);
  }, [getProductos]);

  useEffect(() => {
    setProductosFiltrados(productos);
    // Extraer categorías únicas
    const uniqueCategories = Array.from(
      new Set(productos.map(p => p.category_name).filter(Boolean))
    ).sort() as string[];
    setCategories(uniqueCategories);
  }, [productos]);

  useEffect(() => {
    const modalParam = searchParams.get('modal');
    const tabParam = searchParams.get('tab');

    if (modalParam === 'whatsapp') {
      if (tabParam) {
        setWhatsappInitialTab(tabParam);
      } else {
        setWhatsappInitialTab("conexion");
      }
      setIsWhatsappModalOpen(true);
      router.replace('/admin/productos', { scroll: false });
    }
  }, [searchParams, router]);

  const handleCreateProducto = async (formData: ProductoInput) => {
    const result = await createProducto(formData);
    if (result.success) {
      handleCloseModal();
      await getProductos(200);
      showToast.success("Producto creado");
      setTimeout(() => {
        showToast.info("Recuerda publicar los cambios para que se reflejen en la web", { duration: 3000 });
      }, 100);
    } else {
      showToast.error(result.message || "Error al crear el producto");
    }
  }

  const handleEditClick = (producto: Producto) => {
    setSelectedProduct(producto);
    setIsAddEditModalOpen(true);
  };

  const handleEditProducto = async (formData: ProductoInput) => {
    if (!selectedProduct) return;

    const result = await updateProducto(selectedProduct.id!, formData);
    if (result.success) {
      handleCloseModal();
      await getProductos(200);
      showToast.success("Producto actualizado");
      setTimeout(() => {
        showToast.info("Recuerda publicar los cambios para que se reflejen en la web", { duration: 3000 });
      }, 100);
    } else {
      showToast.error(result.message || "Error al actualizar el producto");
    }
  }

  const handleDeleteProducto = async (producto: Producto) => {
    const confirmDelete = await confirm({ message: "¿Estás seguro de que deseas eliminar este producto?" });
    if (!confirmDelete) return;
    const result = await deleteProducto(producto.id!);
    if (result.success) {
      await getProductos(200);
      showToast.success("Producto eliminado");
      setTimeout(() => {
        showToast.info("Recuerda publicar los cambios para que se reflejen en la web", { duration: 3000 });
      }, 100);
    } else {
      showToast.error(result.message || "Error al eliminar el producto");
    }
  };

  const handleTriggerDeploy = async () => {
    const confirmDeploy = await confirm({ message: "¿Estás seguro de que deseas publicar los cambios?" });
    if (!confirmDeploy) return;
    const result = await triggerDeploy();
    if (result.success) {
      showToast.success(result.message || "Despliegue iniciado");
    } else {
      showToast.error(result.message || "Error al iniciar el despliegue");
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsAddEditModalOpen(false);
    setFormCloseHandler(null);
  };

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category) {
      // Filtrar los productos actuales por categoría
      const filtered = productos.filter(p => p.category_name === category);
      setProductosFiltrados(filtered);
    } else {
      // Mostrar todos los productos
      setProductosFiltrados(productos);
    }
  };

  return (
    <div className="p-2 md:p-4">
      <section className="mb-5 rounded-[1.75rem] border border-[#D8E7F3] bg-white/90 p-5 shadow-[0_18px_40px_rgba(13,16,48,0.06)] backdrop-blur dark:border-white/10 dark:bg-[#1C2347]/90">
      <div className="space-y-1 flex-1 my-2">
                <h2 className="text-3xl font-bold tracking-tight text-[#0D1030] dark:text-white/90 md:text-4xl">Gestión de productos</h2>
                <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-white/80 md:text-base">Agrega productos, envía por email o Whatsapp, genera e imprime reportes rápidamente.</p>
            </div>
      {/* ───────── BLOQUE DE BOTONES DE ACCIÓN ───────── */}
      <div className="flex flex-col md:flex-row gap-2 mb-2">
        <div className="flex-1">
          <ActionButtonGroup
            buttons={[{
              label: "Añadir Producto",
              onClick: () => setIsAddEditModalOpen(true),
              variant: "tertiary",
              className: "w-full",
              icon: <PlusIcon />,
            }]}
            />
        </div>
        <div className="flex-1">
          <ActionButtonGroup
            buttons={[{
              label: "Envio de Email",
              onClick: () => setIsEmailModalOpen(true),
              variant: "danger",
              className: "w-full",
              icon: <MailIcon />,
            }]}
            />
        </div>
        <div className="flex-1">
          <ActionButtonGroup
            buttons={[{
              label: "Envio de Whatsapp",
              onClick: () => setIsWhatsappModalOpen(true),
              variant: "success",
              className: "w-full",
              icon: <WhatsappIcon />,
            }]}
            />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1">
          <ActionButtonGroup
            buttons={[{
              label: "Publicar Cambios",
              onClick: () => handleTriggerDeploy(),
              variant: "info",
              className: "w-full",
              isLoading: isDeploying,
              icon: <RocketIcon />,
            }]}
          />
        </div>
        <div className="flex-1">
          <ActionButtonGroup
            buttons={[{
              label: "IMPRIMIR",
              onClick: () => printTable(productos),
              variant: "primary",
              className: "w-full",
              icon: <PrinterIcon />,
            }]}
          />
        </div>
        <div className="flex-1">
          <ExportDropdown
            className="w-full"
            label="EXPORTAR"
            icon={<Download className="h-4 w-4" />}
            options={[
              { label: "Exportar a CSV", onClick: () => exportToCSV(productos), icon: <FileText className="h-4 w-4" /> },
              { label: "Exportar a Excel", onClick: () => exportToExcel(productos), icon: <FileSpreadsheet className="h-4 w-4" /> },
              { label: "Exportar a PDF", onClick: () => exportToPDF(productos), icon: <FileDown className="h-4 w-4" /> },
            ]}
          />
        </div>
      </div>
      </section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {/* ───────── BUSCADOR Y CONTADOR ───────── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="w-full md:flex-1 md:max-w-3xl">
          <SearchBar
            items={productos}
            onSearch={setProductosFiltrados}
            placeholder="Buscar por ID, nombre o sección..."
            searchKeys={['id', 'name', 'category_name']}
            getDisplayValue={(item) => `${item.id} - ${item.name}`}
          />
        </div>

        <div className="w-full md:w-auto px-4 py-2 bg-[#E8F4F8] dark:bg-[#1C2347] border-2 border-[#203565] dark:border-white/10 rounded-full text-center">
          <span className="text-[#203565] dark:text-white font-semibold text-sm whitespace-nowrap uppercase">
            {productosFiltrados.length} REGISTROS ENCONTRADOS
          </span>
        </div>
      </div>

      {/* ───────── CONTENIDO PRINCIPAL (TABLA O VACÍO) ───────── */}
      <>
        <div className="mb-4 flex flex-col gap-2 border-b border-[#E5EEF6] pb-4 dark:border-white/10 lg:flex-row lg:items-center lg:justify-between">
          <div>
                    <h3 className="mt-1 mb-1 text-xl lg:text-3xl font-bold text-[#0D1030] dark:text-white/90">
                        LISTA DE PRODUCTOS
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-white/80 md:text-base">Visualiza y actualiza los productos registrados.</p>
                </div>
          <div className="flex w-full flex-col gap-2 lg:w-auto lg:items-end">
            <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-white/50 lg:text-right">
              Filtrar por sección
            </label>
            <select
              className="w-full rounded-xl border border-[#D8E7F3] bg-white px-3 py-2 text-sm font-medium text-[#0D1030] outline-none transition focus:border-[#23C1DE] dark:border-white/10 dark:bg-[#111936] dark:text-white lg:min-w-[220px] lg:w-auto"
              value={selectedCategory}
              onChange={handleCategoryFilter}
            >
              <option value="">Todas las secciones</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLA DE DATOS */}
        <AdminTable
          columns={columns}
          data={datosPaginados}
          minRows={5}
          onEdit={handleEditClick}
          onDelete={handleDeleteProducto}
          isLoading={isLoading && productos.length === 0}
          emptyMessage="No se encontraron productos"
          onResetSearch={() => setProductosFiltrados(productos)}
          resetSearchText="Ver todos los productos"
        />

        {/* PAGINACIÓN */}
        {!isLoading && productosFiltrados.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              pageSize={10}
              items={productosFiltrados}
              setProductosPaginados={setDatosPaginados}
            />
          </div>
        )}
      </>

      {/* ───────── MODALES ───────── */}
      <Modal
        isOpen={isAddEditModalOpen}
        onClose={async () => {
          if (formCloseHandler) {
            await formCloseHandler();
          } else {
            handleCloseModal();
          }
        }}
        title={!selectedProduct ? "Añadir Producto" : "Editar Producto"}
        size="lg"
      >
        <ProductForm
          onSubmit={!selectedProduct ? handleCreateProducto : handleEditProducto}
          onCancel={handleCloseModal}
          confirm={confirm}
          initialData={selectedProduct}
          isLoading={isLoading}
          registerCloseHandler={(fn) => setFormCloseHandler(() => fn)}
        />
      </Modal>

      <Modal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="Envio de Emails"
        size="lg"
      >
        <SendEmailForm
          products={productos}
          onClose={() => setIsEmailModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isWhatsappModalOpen}
        onClose={() => setIsWhatsappModalOpen(false)}
        title="Envio de Whatsapp"
        size="lg"
      >
        <WhatsappFormWithTabs
          products={productos}
          onClose={() => setIsWhatsappModalOpen(false)}
          initialTab={whatsappInitialTab}
        />
      </Modal>

      <ConfirmDialog />
    </div>
  )
}