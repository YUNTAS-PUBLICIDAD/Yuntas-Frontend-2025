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
import SearchBar from "@/components/molecules/SearchBar";
import { SearchXIcon, PlusIcon, MailIcon, WhatsappIcon, RocketIcon, PrinterIcon } from "@/components/atoms/icons";

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
  const [datosPaginados, setDatosPaginados] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const { exportToExcel, exportToCSV, exportToPDF, printTable } = useProductExporter();
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [whatsappInitialTab, setWhatsappInitialTab] = useState<string>("conexion");
  const { confirm, ConfirmDialog } = useConfirm();
  const { isLoading: isDeploying, triggerDeploy } = useDeploy();

  useEffect(() => {
    getProductos(200);
  }, [getProductos]);

  useEffect(() => {
    setProductosFiltrados(productos);
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

      // Limpia la URL para que si recarga la página no se vuelva a abrir solo
      router.replace('/admin/productos', { scroll: false });
    }
  }, [searchParams]);

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
  };

  return (
    <div className="p-2 md:p-4">
      {/* {isLoading && productos.length === 0 ? (
        <div className="p-10 text-center animate-pulse">Cargando productos...</div>
      ) : productos.length === 0 ? (
        <div className="p-10 text-center">No se encontraron productos.</div>
      ) : ( */}
        {/* <> */}

          {/* ───────── BOTONES SUPERIORES ───────── */}
          <div className="flex flex-col md:flex-row gap-2 mb-4">

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

          {/* ───────── BOTONES INFERIORES ───────── */}
          <div className="flex flex-col md:flex-row gap-2 mb-4">

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
                options={[
                  { label: "Exportar a CSV", onClick: () => exportToCSV(productos) },
                  { label: "Exportar a Excel", onClick: () => exportToExcel(productos) },
                  { label: "Exportar a PDF", onClick: () => exportToPDF(productos) },
                ]}
              />
            </div>

          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}
          {/* BUSCADOR */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">

            {/* Buscador */}
            <div className="w-full md:flex-1 md:max-w-3xl">
              <SearchBar
                items={productos}
                onSearch={setProductosFiltrados}
                placeholder="Buscar por ID, nombre o sección..."
                searchKeys={['id', 'name', 'category_name']}
                getDisplayValue={(item) => `${item.id} - ${item.name}`}
              />
            </div>

            {/* Registros encontrados */}
            <div className="w-full md:w-auto px-4 py-2 bg-[#E8F4F8] border-2 border-[#203565] rounded-full text-center">
              <span className="text-[#203565] font-semibold">
                {productosFiltrados.length} REGISTROS ENCONTRADOS
              </span>
            </div>

          </div>

          {
            isLoading && productos.length === 0 ? (
              <div className="p-10 text-center animate-pulse">
                Cargando productos...
              </div>
            ): productosFiltrados.length === 0 ? (
              <div className="p-10 text-center dark:text-gray-300">
                No se encontraron productos.
              </div>
            ): 
            (<>
            
            {/* TABLA */}
            <AdminTable
              columns={columns}
              data={datosPaginados}
              minRows={5}
              onEdit={handleEditClick}
              onDelete={handleDeleteProducto}
            />
            </>
            )
          }


          <div className="flex justify-center mt-4">
            <Pagination
              pageSize={10}
              items={productosFiltrados}
              setProductosPaginados={setDatosPaginados}
            />
          </div>

          {/* MODAL DE AÑADIR Y EDITAR */}
          <Modal
            isOpen={isAddEditModalOpen}
            onClose={handleCloseModal}
            title={!selectedProduct ? "Añadir Producto" : "Editar Producto"}
            size="lg"
          >
            <ProductForm
              onSubmit={!selectedProduct ? handleCreateProducto : handleEditProducto}
              onCancel={handleCloseModal}
              initialData={selectedProduct}
              isLoading={isLoading}
            />
          </Modal>
          <ConfirmDialog />

          {/* MODAL PARA CAMPAÑA A TRAVES DE EMAIL */}
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
        {/* </> */}
      {/* )} */}
    </div>
  )
}