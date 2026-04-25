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
      
{/* Filtro de búsqueda */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">

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
  <div className="w-full md:w-auto px-4 py-2 bg-[#E8F4F8] border-2 border-[#203565] rounded-full text-center">
    <span className="text-[#203565] font-semibold">
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