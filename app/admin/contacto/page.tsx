'use client';

import { useEffect, useState, useMemo } from "react";
import { useContactos } from "@/hooks/useContactos";
import { Contacto } from "@/types/admin/contacto";

import AdminTable from "@/components/organisms/admin/AdminTable";
import Loader from "@/components/atoms/Loader";
import ViewContactoModal from "@/components/organisms/admin/ModalActions/ViewContactoModal";
import { FaSearch } from "react-icons/fa";


const columns = [
  { key: "id", label: "ID" },
  { 
    key: "full_name", 
    label: "CLIENTE", 
    render: (_: unknown, row: Contacto) => (
      <div className="flex flex-col">
        <span className="font-semibold text-[#203565]">
          {row.first_name} {row.last_name}
        </span>
        <span className="text-xs text-gray-500">{row.phone}</span>
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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getContactos(20); 
  }, [getContactos]);

  // Filtrar contactos por término de búsqueda
  const filteredContactos = useMemo(() => {
    if (!searchTerm.trim()) return contactos;

    const term = searchTerm.toLowerCase().trim();
    
    return contactos.filter((contacto) => {
      const fullName = `${contacto.first_name} ${contacto.last_name}`.toLowerCase();
      const district = (contacto.district || "").toLowerCase();
      const asunto = (contacto.request_detail || "").toLowerCase();
      const phone = contacto.phone.toLowerCase();
      const fecha = new Date(contacto.created_at).toLocaleDateString().toLowerCase();

      return (
        fullName.includes(term) ||
        district.includes(term) ||
        asunto.includes(term) ||
        phone.includes(term) ||
        fecha.includes(term)
      );
    });
  }, [contactos, searchTerm]);

  
  const handleView = (contacto: Contacto) => {
    setSelectedContacto(contacto);
    setOpenViewModal(true);
  };

  return (
    <div>
      
      {/* Filtro de búsqueda */}
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, distrito, asunto o fecha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#203565] focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="px-4 py-2 bg-[#E8F4F8] border-2 border-[#203565] rounded-full ml-auto">
          <span className="text-[#203565] font-semibold">
            {filteredContactos.length} REGISTROS ENCONTRADOS
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

     
      {isLoading ? (
         <div className="flex justify-center py-20">
            <Loader size="lg" />
         </div>
      ) : (
          <AdminTable
            minRows={10}
            columns={columns}
            data={filteredContactos}
            
            onEdit={handleView} 
            
            
          />
      )}
      
    </div>
  );
}