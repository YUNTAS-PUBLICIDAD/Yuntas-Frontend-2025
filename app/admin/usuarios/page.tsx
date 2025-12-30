"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Modal from "@/components/atoms/Modal";
import AddUserForm from "@/components/molecules/admin/AddUserForm";
import EditUserForm, { UserData } from "@/components/organisms/admin/EditUserForm";

import { useUsers } from "@/hooks/useUsers";
import { exportCSV } from "@/utils/Export/ExportCVS";
import { exportExcel } from "@/utils/Export/exportExcel";
import { exportTablePDF } from "@/utils/Export/exportTablePDF";

const ROLE_LABELS: Record<number, string> = {
  1: "Admin",
  2: "Usuario",
};

const columns = [
  { key: "role", label: "ROL" },
  { key: "nombre", label: "NOMBRE" },
  { key: "email", label: "EMAIL" },
];

export default function UsuariosPage() {
  const {
    users,
    setUsers,      // 👈 IMPORTANTE: usamos el estado de aquí
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loading,
  } = useUsers();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const usersForTable = users.map(user => ({
    ...user,
    role: ROLE_LABELS[user.role_id] || "Desconocido",
  }));

  const onExportCSV = () => exportCSV(usersForTable, "usuarios");
  const onExportExcel = () => exportExcel(usersForTable, "usuarios");
  const onExportPDF = () =>
    exportTablePDF(usersForTable, "Reporte de Usuarios", columns);

  const onAddUser = () => setIsAddModalOpen(true);

  // ✅ AQUÍ ESTÁ LA CORRECCIÓN CLAVE
  const onAddUserSubmit = async (userData: any) => {
    const payload = {
      nombre: userData.nombre,
      email: userData.email,
      celular: userData.celular,
      password: userData.password,
      password_confirmation: userData.confirmPassword,
      role_id:
        userData.roles === "admin" || userData.roles === "1"
          ? 1
          : 2,
    };

    const newUser = await createUser(payload);

    if (newUser) {
      // 👇 Actualizamos la tabla inmediatamente
      setUsers(prev => [...prev, newUser]);

      // 👇 Cerramos modal
      setIsAddModalOpen(false);
    }
  };

  const onEdit = (user: UserData) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const onEditUserSave = async (user: UserData) => {
    const success = await updateUser(user.id, user);
    if (success) {
      setIsEditModalOpen(false);
      setSelectedUser(null);
      getUsers();
    }
  };

  const onDelete = async (user: UserData) => {
    if (confirm(`¿Estás seguro de eliminar a ${user.nombre}?`)) {
      await deleteUser(user.id);
      getUsers();
    }
  };

  return (
    <div>
      <ActionButtonGroup
        buttons={[
          { label: "EXPORTAR CSV", onClick: onExportCSV },
          { label: "EXPORTAR EXCEL", onClick: onExportExcel },
          { label: "EXPORTAR PDF", onClick: onExportPDF },
        ]}
        className="mb-4 mt-4"
      />

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <AdminTable
          columns={columns}
          data={usersForTable}
          minRows={5}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}

      <ActionButtonGroup
        buttons={[
          { label: "Agregar Usuario", onClick: onAddUser, variant: "tertiary" },
        ]}
        className="mt-4"
      />

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

      <EditUserForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={onEditUserSave}
      />
    </div>
  );
}
