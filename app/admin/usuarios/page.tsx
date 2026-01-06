'use client';

import { useState, useEffect } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Modal from "@/components/atoms/Modal";
import AddUserForm from "@/components/molecules/admin/AddUserForm";
import EditUserForm from "@/components/organisms/admin/EditUserForm";

import { UserData, NewUserData } from "@/types/admin";
import { exportCSV } from "@/utils/Export/ExportCVS";
import { exportExcel } from "@/utils/Export/exportExcel";
import { exportTablePDF } from "@/utils/Export/exportTablePDF";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NOMBRE" },
  { key: "email", label: "EMAIL" },
];

export default function UsuariosPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // 🔹 Cargar usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) throw new Error("No hay token");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();
        setUsers(json.data.data ?? []);
      } catch (e) {
        console.error(e);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔹 Exportaciones
  const onExportCSV = () => exportCSV(users, "usuarios");
  const onExportExcel = () => exportExcel(users, "usuarios");
  const onExportPDF = () => exportTablePDF(users, "Reporte de Usuarios", columns);
  const onPrint = () => exportTablePDF(users, "Reporte de Usuarios", columns);

  // 🔹 Eliminar
  const onDelete = async (user: UserData) => {
    if (!confirm(`¿Eliminar a ${user.name}?`)) return;

    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${user.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error();
      setUsers(prev => prev.filter(u => u.id !== user.id));
    } catch (e) {
      alert("No se pudo eliminar");
    }
  };

  // 🔹 Editar
  const onEdit = (user: UserData) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const onEditUserSave = async (updated: UserData) => {
    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${updated.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: updated.name,
            email: updated.email,
          }),
        }
      );

      const json = await res.json();
      setUsers(prev =>
        prev.map(u => (u.id === updated.id ? json.data : u))
      );
    } catch (e) {
      console.error(e);
    }
  };

  // 🔹 Agregar
  const onAddUserSubmit = async (data: NewUserData) => {
    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const json = await res.json();
      setUsers(prev => [...prev, json.data]);
      setIsAddModalOpen(false);
    } catch {
      alert("Error al agregar usuario");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Cargando usuarios...</p>;
  }

  return (
    <div>
      <ActionButtonGroup
        buttons={[
          { label: "CSV", onClick: onExportCSV },
          { label: "EXCEL", onClick: onExportExcel },
          { label: "PDF", onClick: onExportPDF },
          { label: "IMPRIMIR", onClick: onPrint },
        ]}
        className="mb-4 mt-4"
      />

      <AdminTable
        columns={columns}
        data={users}
        minRows={5}
        onDelete={onDelete}
        onEdit={onEdit}
      />

      <ActionButtonGroup
        buttons={[{ label: "Agregar Usuario", onClick: () => setIsAddModalOpen(true), variant: "tertiary" }]}
        className="mt-4"
      />

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="INGRESAR USUARIO">
        <AddUserForm onSubmit={onAddUserSubmit} onCancel={() => setIsAddModalOpen(false)} />
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
