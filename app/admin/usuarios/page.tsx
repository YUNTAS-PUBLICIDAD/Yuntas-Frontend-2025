'use client';

import { useState, useEffect } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Modal from "@/components/atoms/Modal";
import UserForm from "@/components/molecules/admin/users/UserForm";
import { useUsers } from "@/hooks/useUsers";

import { exportCSV } from "@/utils/Export/ExportCVS";
import { exportExcel } from "@/utils/Export/exportExcel";
import { exportTablePDF } from "@/utils/Export/exportTablePDF";
import { User, UserInput } from "@/types/admin/user";
import Pagination from "@/components/molecules/Pagination";
import ExportDropdown from "@/components/molecules/admin/ExportDropdown";

const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "NOMBRE" },
    { key: "email", label: "EMAIL" },
    { key: "role_name", label: "ROL" },
    { key: "created_at", label: "FECHA" }
];

export default function UsuariosPage() {
    const [datosPaginados, setDatosPaginados] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const { users, getUsers, createUser, updateUser, deleteUser, isLoading, error } = useUsers();

    useEffect(() => {
        getUsers();
    }, []);

    const handleCreateUsuario = async (formData: UserInput) => {
        const result = await createUser(formData);
        if (result.success) {
            handleCloseModal();
            await getUsers();
            alert("Usuario creado");
        } else {
            alert(result.message);
        }
    }

    const handleEditClick = (usuario: User) => {
        setSelectedUser(usuario);
        setIsModalOpen(true);
    };

    const handleEditUsuario = async (formData: UserInput) => {
        if (!selectedUser) return;

        const result = await updateUser(selectedUser.id!, formData);
        if (result.success) {
            handleCloseModal();
            await getUsers();
            alert("Usuario actualizado");
        } else {
            alert(result.message);
        }
    }

    const handleDeleteUsuario = async (usuario: User) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (!confirmDelete) return;
        const result = await deleteUser(usuario.id!);
        if (result.success) {
            await getUsers();
            alert("Usuario eliminado");
        } else {
            alert(result.message);
        }
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const exportOptions = [
        { label: "Exportar a CSV", onClick: () => exportCSV(users, "usuarios") },
        { label: "Exportar a Excel", onClick: () => exportExcel(users, "usuarios") },
        { label: "Exportar a PDF", onClick: () => exportTablePDF(users, "Reporte de Usuarios", columns, "download") },
    ];

    if (isLoading && users.length === 0) {
        return <div className="p-10 text-center animate-pulse">Cargando usuarios...</div>;
    }

    return (
        <div className="p-2 md:p-4">
            {/* Botones de Imprimir y Exportar */}
            <div className="flex flex-wrap gap-2 mb-4 no-print">
                <ExportDropdown options={exportOptions} />
                <ActionButtonGroup buttons={[{
                    label: "IMPRIMIR",
                    onClick: () => exportTablePDF(users, "Reporte de Usuarios", columns, "print"),
                    variant: "primary"
                }]} />
                <ActionButtonGroup buttons={[{
                    label: "AGREGAR USUARIO",
                    onClick: () => setIsModalOpen(true),
                    variant: "tertiary"
                }]} />
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            <AdminTable
                columns={columns}
                data={datosPaginados}
                minRows={5}
                onEdit={handleEditClick}
                onDelete={handleDeleteUsuario}
            />

            <div className="flex justify-center mt-4">
                <Pagination
                    pageSize={10}
                    items={users}
                    setProductosPaginados={setDatosPaginados}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={!selectedUser ? "Añadir Usuario" : "Editar Usuario"}
            >
                <UserForm
                    onSubmit={!selectedUser ? handleCreateUsuario : handleEditUsuario}
                    onCancel={handleCloseModal}
                    isLoading={isLoading}
                    initialData={selectedUser}
                />
            </Modal>
        </div>
    );
}