'use client';

import { useEffect, useState } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Modal from "@/components/atoms/Modal";
import AddUserForm from "@/components/molecules/admin/AddUserForm";
import EditUserForm from "@/components/organisms/admin/EditUserForm";

import { UserData, NewUserData } from "@/types/admin";

// Utils de exportación
import { exportCSV } from "@/utils/Export/ExportCVS";
import { exportExcel } from "@/utils/Export/exportExcel";
import { exportTablePDF } from "@/utils/Export/exportTablePDF";

// Columnas
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

  // 🔹 Cargar usuarios desde backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No hay token en localStorage");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`Error ${res.status}`);

        const response = await res.json();
        console.log("RESPUESTA API:", response);

        setUsers(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("ERROR FETCH USERS:", error);
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

  // 🔹 Eliminar usuario
  const onDelete = async (user: UserData) => {
    if (!confirm(`¿Estás seguro de eliminar al usuario ${user.name}?`)) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token en localStorage");

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

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const response = await res.json();
      console.log("Usuario eliminado:", response);

      setUsers(prev => prev.filter(u => u.id !== user.id));
    } catch (error) {
      console.error("ERROR DELETE USER:", error);
      alert("No se pudo eliminar el usuario. Intenta de nuevo.");
    }
  };

  // 🔹 Abrir modal editar
  const onEdit = (user: UserData) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // 🔹 Guardar cambios del usuario
  const onEditUserSave = async (updatedUser: UserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token en localStorage");

      const payload = {
        name: updatedUser.name,
        email: updatedUser.email,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const response = await res.json();
      console.log("Usuario actualizado:", response);

      setUsers(prev =>
        prev.map(u => (u.id === updatedUser.id ? response.data : u))
      );
    } catch (error) {
      console.error("ERROR UPDATE USER:", error);
    }
  };

  // 🔹 Agregar usuario
  const onAddUser = () => setIsAddModalOpen(true);
  const onAddUserSubmit = async (userData: NewUserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token en localStorage");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const response = await res.json();
      console.log("Usuario agregado:", response);

      setUsers(prev => [...prev, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("ERROR ADD USER:", error);
      alert("No se pudo agregar el usuario");
    }
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

  if (loading) {
    return <p className="text-center mt-10">Cargando usuarios...</p>;
  }

  return (
    <div>
      <ActionButtonGroup buttons={exportButtons} className="mb-4 mt-4" />

      <AdminTable
        columns={columns}
        data={users}
        minRows={5}
        onDelete={onDelete}
        onEdit={onEdit}
      />

      <ActionButtonGroup
        buttons={[{ label: "Agregar Usuario", onClick: onAddUser, variant: "tertiary" }]}
        className="mt-4"
      />

      {/* Modal agregar */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="INGRESAR USUARIO"
      >
        <AddUserForm
          onSubmit={onAddUserSubmit} // ✅ ahora compatible con NewUserData
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <EditUserForm
        isOpen={isEditModalOpen}
        onClose={onEditUserClose}
        user={selectedUser}
        onSave={onEditUserSave}
      />
    </div>
  );
}
