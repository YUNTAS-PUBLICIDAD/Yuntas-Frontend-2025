'use client';

import { useState } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Modal from "@/components/atoms/Modal";
import AddUserForm from "@/components/molecules/admin/AddUserForm";
import EditUserForm from "@/components/organisms/admin/EditUserForm";
import data from "@/data/admin/usuariosData";

// 🔹 Utils de exportación
import { exportCSV } from "@/utils/Export/ExportCVS";
import { exportExcel } from "@/utils/Export/exportExcel";
import { exportTablePDF } from "@/utils/Export/exportTablePDF";

interface UserData {
  id: number;
  nombre: string;
  email: string;
}

// 🔹 Columnas
const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "NOMBRE" },
  { key: "email", label: "EMAIL" },
];

export default function UsuariosPage() {

  // 🔹 Estados
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // 🔹 Exportaciones (NOMBRES DIFERENCIADOS)
  const onExportCSV = () => exportCSV(data, "usuarios");
  const onExportExcel = () => exportExcel(data, "usuarios");
  const onExportPDF = () =>
    exportTablePDF(data, "Reporte de Usuarios", columns);
  const onPrint = () =>
    exportTablePDF(data, "Reporte de Usuarios", columns);

  // 🔹 Eliminar
  const onDelete = (id: string | number) => {
    console.log("Eliminar:", id);
  };

  // 🔹 Editar
  const onEdit = (id: string | number) => {
    const user = data.find(u => u.id === id);
    if (user) {
      setSelectedUser(user);
      setIsEditModalOpen(true);
    }
  };

  // 🔹 Agregar
  const onAddUser = () => setIsAddModalOpen(true);

  const onAddUserSubmit = (userData: any) => {
    console.log("Usuario agregado:", userData);
    setIsAddModalOpen(false);
  };

  const onEditUserClose = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const exportButtons = [
    { label: "EXPORTAR CSV", onClick: onExportCSV },
    { label: "EXPORTAR EXCEL", onClick: onExportExcel },
    { label: "EXPORTAR PDF", onClick: onExportPDF },
    { label: "IMPRIMIR", onClick: onPrint },
  ];

  return (
    <div>
      {/* Exportación */}
      <ActionButtonGroup buttons={exportButtons} className="mb-4 mt-4" />

      {/* Tabla */}
      <AdminTable
        columns={columns}
        data={data}
        minRows={5}
        onDelete={onDelete}
        onEdit={onEdit}
      />

      {/* Agregar usuario */}
      <ActionButtonGroup
        buttons={[
          { label: "Agregar Usuario", onClick: onAddUser, variant: "tertiary" }
        ]}
        className="mt-4"
      />

      {/* Modal agregar */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="INGRESAR USUARIO"
      >
        <AddUserForm
          onSubmit={onAddUserSubmit}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Modal editar */}
      <EditUserForm
        isOpen={isEditModalOpen}
        onClose={onEditUserClose}
        user={selectedUser}
      />
    </div>
  );
}
