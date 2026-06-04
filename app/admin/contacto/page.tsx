'use client';

import { useEffect, useState } from "react";
import { useContactos } from "@/hooks/useContactos";
import { Contacto } from "@/types/admin/contacto";

import AdminTable from "@/components/organisms/admin/AdminTable";
import ViewContactoModal from "@/components/organisms/admin/ModalActions/ViewContactoModal";
import SearchBar from "@/components/molecules/admin/SearchBar";

const columns = [
  { key: "id", label: "ID" },
  {
    key: "full_name",
    label: "CLIENTE",
    render: (_: unknown, row: Contacto) => (
      <div className="flex flex-col">
        <span className="font-semibold text-[#203565] dark:text-[#E8F4F8]">
          {row.first_name} {row.last_name}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-300">{row.phone}</span>
      </div>
    )
  },
  { key: "district", label: "DISTRITO" },
  { key: "request_detail", label: "ASUNTO" },
  {
    key: "created_at",
    label: "FECHA",
    render: (_: unknown, row: Contacto) => new Date(row.created_at).toLocaleDateString()
  },
];

export default function ContactoPage() {

  const {
    contactos,
    error,
    isLoading,
    getContactos
  } = useContactos();


  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedContacto, setSelectedContacto] = useState<Contacto | null>(null);
  const [tableData, setTableData] = useState<Contacto[]>([]);
  const [paginatedData, setPaginatedData] = useState<Contacto[]>([]);

  useEffect(() => {
    getContactos(20);
  }, [getContactos]);

  useEffect(() => {
    setTableData(contactos);
    setPaginatedData(contactos);
  }, [contactos]);


  const handleView = (contacto: Contacto) => {
    setSelectedContacto(contacto);
    setOpenViewModal(true);
  };

  const handleResetSearch = () => {
    setPaginatedData(tableData);
  };

  return (
    <div>
      <section className="mb-5 rounded-[1.75rem] border border-[#D8E7F3] bg-white/90 p-5 shadow-[0_18px_40px_rgba(13,16,48,0.06)] dark:border-white/10 dark:bg-[#1C2347]/90">

      {/* Filtro de búsqueda */}
        <div className="space-y-1 flex-1 my-2 mb-5">
          <h2 className="text-3xl font-bold tracking-tight text-[#0D1030] dark:text-white/90 md:text-4xl mb-2">Buscar contactos</h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-white/80 md:text-base">Busca contactos por nombre, distrito o asunto.</p>
        </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Buscador */}
        <div className="w-full md:flex-1">
          <SearchBar
            items={tableData}
            onSearch={setPaginatedData}
            placeholder="Buscar por nombre, distrito o asunto..."
            searchKeys={['first_name', 'last_name', 'district', 'request_detail', 'phone']}
            getDisplayValue={(item) => `${item.first_name} ${item.last_name}`}
          />
        </div>

        {/* Registros encontrados */}
        <div className="w-full md:w-auto px-4 py-2 bg-[#E8F4F8] dark:bg-[#1C2347] border-2 border-[#203565] dark:border-white/10 rounded-full text-center">
          <span className="text-[#203565] dark:text-white font-semibold text-sm whitespace-nowrap">
            {paginatedData.length} REGISTROS ENCONTRADOS
          </span>
        </div>

      </div>
      {selectedContacto && (
        <ViewContactoModal
        contacto={selectedContacto}
        isOpen={openViewModal}
        onClose={() => setOpenViewModal(false)}
        />
      )}


      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">Error:</span> {error}
        </div>
      )}
      </section>

      <div className="mb-4 flex flex-col border-b border-[#E5EEF6] pb-4 px-5 dark:border-white/10 lg:flex-col lg:items-baseline lg:justify-between">
        <h3 className="mt-1 mb-2 text-3xl font-bold tracking-tight text-[#0D1030] dark:text-white/90 md:text-4xl">Lista de contacto</h3>
        <p className="text-sm leading-6 text-slate-500 dark:text-white/80 md:text-base">Visualiza a detalle los contactos de los clientes</p>
      </div>

      <AdminTable
        minRows={10}
        columns={columns}
        data={paginatedData}
        onEdit={handleView}
        isLoading={isLoading && contactos.length === 0}
        emptyMessage="No se encontraron contactos"
        onResetSearch={handleResetSearch}
        resetSearchText="Ver todos los contactos"
      />

    </div>
  );
}