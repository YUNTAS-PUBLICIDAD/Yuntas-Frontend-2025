'use client';

import { useEffect, useState } from "react";
import { useContactos } from "@/hooks/useContactos";
import { Contacto } from "@/types/admin/contacto";

import AdminTable from "@/components/organisms/admin/AdminTable";
import Loader from "@/components/atoms/Loader";
import ViewContactoModal from "@/components/organisms/admin/ModalActions/ViewContactoModal";


const columns = [
  { key: "id", label: "ID" },
  { 
    key: "full_name", 
    label: "CLIENTE", 
    render: (_: unknown, row: Contacto) => (
      <div className="flex flex-col">
        <span className="font-semibold text-[#203565] dark:text-white">
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

  useEffect(() => {
    getContactos(20); 
  }, [getContactos]);

  
  const handleView = (contacto: Contacto) => {
    setSelectedContacto(contacto);
    setOpenViewModal(true);
  };

  return (
    <div>
      
      <h1 className="text-2xl font-bold text-[#203565] dark:text-white mb-6">
        Solicitudes de Contacto
      </h1>

      
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
            data={contactos}
            
            onEdit={handleView} 
            
            
          />
      )}
      
    </div>
  );
}