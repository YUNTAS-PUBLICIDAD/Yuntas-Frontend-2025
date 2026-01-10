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


const getToken = () => {
    if (typeof window === 'undefined') return null;

    let token = localStorage.getItem("token") || localStorage.getItem("auth_token");
    
    if (!token) {
        const match = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
        if (match) {
            token = match.split('=')[1];
        }
    }

    if (!token) return null;
    
    // Limpia comillas si existen por si acaso
    return token.replace(/"/g, '');
};

export default function UsuariosPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // Cargar usuarios al iniciar
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getToken();
        
        if (!token) {
            console.error("⛔ No hay token disponible (ni en Storage ni en Cookies)");
            setLoading(false);
            return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
            if (res.status === 401) {
                console.error("⛔ Error 401: Token inválido o expirado.");
            }
            throw new Error(`Error ${res.status}`);
        }

        const json = await res.json();
       
        setUsers(Array.isArray(json.data) ? json.data : json.data?.data || []);
      } catch (e) {
        console.error("Error cargando usuarios:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  //  Funciones de Exportación
  const onExportCSV = () => exportCSV(users, "usuarios");
  const onExportExcel = () => exportExcel(users, "usuarios");
  const onExportPDF = () => exportTablePDF(users, "Reporte de Usuarios", columns);
  const onPrint = () => exportTablePDF(users, "Reporte de Usuarios", columns);

  // Eliminar Usuario
  const onDelete = async (user: UserData) => {
    if (!confirm(`¿Estás seguro de eliminar a ${user.name}?`)) return;

    try {
      const token = getToken();
      if (!token) {
          alert("Error de autenticación: No hay token");
          return;
      }

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

      if (!res.ok) throw new Error("Error al eliminar");
      
      // Actualizar estado local eliminando el usuario
      setUsers(prev => prev.filter(u => u.id !== user.id));
      alert("Usuario eliminado correctamente");

    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar el usuario");
    }
  };

  // Abrir Modal de Edición
  const onEdit = (user: UserData) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Guardar Edición de Usuario
  const onEditUserSave = async (updated: UserData) => {
    try {
      const token = getToken();
      if (!token) {
          alert("Error de autenticación");
          return;
      }

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

      if (!res.ok) {
        throw new Error("Error al actualizar");
      }

      const json = await res.json();
      const updatedData = json.data || json;

      // Actualizar lista local
      setUsers(prev =>
        prev.map(u => (u.id === updated.id ? updatedData : u))
      );
      
      setIsEditModalOpen(false);
      alert("Usuario actualizado correctamente");

    } catch (e) {
      console.error(e);
      alert("Error al actualizar usuario");
    }
  };

  //  Agregar Nuevo Usuario
  const onAddUserSubmit = async (data: NewUserData) => {
    try {
      const token = getToken();
      
      if (!token) {
          alert("No estás autenticado. Cierra sesión e ingresa de nuevo.");
          return;
      }

     
      const payload = {
        ...data,
        password_confirmation: data.password 
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          const message = errorData?.message || `Error del servidor: ${res.status}`;
          throw new Error(message);
      }

      const json = await res.json();
      const newUser = json.data || json;

      // Agregar a la lista local
      setUsers(prev => [newUser, ...prev]); 
      setIsAddModalOpen(false);
      alert("Usuario creado correctamente");

    } catch (error: any) {
      console.error("Error al crear usuario:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Cargando usuarios...</p>;
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