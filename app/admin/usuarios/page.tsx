'use client';

import { useState, useEffect } from "react";
import AdminTable from "@/components/organisms/admin/AdminTable";
import ActionButtonGroup from "@/components/molecules/admin/ActionButtonGroup";
import Modal from "@/components/atoms/Modal";
import { showToast } from "@/utils/showToast";
import UserForm from "@/components/molecules/admin/users/UserForm";
import { useUsers } from "@/hooks/useUsers";
import { useConfirm } from "@/hooks/useConfirm";
import { exportCSV } from "@/utils/Export/ExportCVS";
import { exportExcel } from "@/utils/Export/exportExcel";
import { exportTablePDF } from "@/utils/Export/exportTablePDF";
import { User, UserInput } from "@/types/admin/user";
import Pagination from "@/components/molecules/Pagination";
import ExportDropdown from "@/components/molecules/admin/ExportDropdown";
import { PrinterIcon, PlusIcon } from "@/components/atoms/icons";
import { Download, FileDown, FileSpreadsheet, FileText } from "lucide-react";
import { getRole } from "@/utils/role";
import { useRouter } from "next/navigation";

const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "NOMBRE" },
    { key: "email", label: "EMAIL" },
    { key: "role_name", label: "ROL" },
    { key: "created_at", label: "FECHA" }
];

export default function UsuariosPage() {
    const router = useRouter();
    const [datosPaginados, setDatosPaginados] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { confirm, ConfirmDialog } = useConfirm();
    const { users, getUsers, createUser, updateUser, deleteUser, isLoading, error } = useUsers();

    useEffect(() => {
        const role = getRole();

        if (role !== "admin") {
            router.replace("/admin");
            return;
        }

        getUsers();
    }, []);
    const handleCreateUsuario = async (formData: UserInput) => {
        const result = await createUser(formData);
        if (result.success) {
            handleCloseModal();
            await getUsers();
            showToast.success("Usuario creado");
        } else {
            showToast.error(result.message || "Error al crear el usuario");
        }
    };

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
            showToast.success("Usuario actualizado");
        } else {
            showToast.error(result.message || "Error al actualizar el usuario");
        }
    };

    const handleDeleteUsuario = async (usuario: User) => {
        const confirmDelete = await confirm({ message: "¿Estás seguro de que deseas eliminar este usuario?" });
        if (!confirmDelete) return;

        const result = await deleteUser(usuario.id!);
        if (result.success) {
            await getUsers();
            showToast.success("Usuario eliminado");
        } else {
            showToast.error(result.message || "Error al eliminar el usuario");
        }
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const exportOptions = [
        { label: "Exportar a CSV", onClick: () => exportCSV(users, "usuarios"), icon: <FileText className="h-4 w-4" /> },
        { label: "Exportar a Excel", onClick: () => exportExcel(users, "usuarios"), icon: <FileSpreadsheet className="h-4 w-4" /> },
        { label: "Exportar a PDF", onClick: () => exportTablePDF(users, "Reporte de Usuarios", columns, "download"), icon: <FileDown className="h-4 w-4" /> },
    ];

    const role = getRole();

    if (role !== "admin") {
        return null;
    }

    return (
        <div className="p-2 md:p-4">
            {/* BOTONES */}
            <section className="mb-5 rounded-[1.75rem] border border-[#D8E7F3] bg-white/90 p-5 shadow-[0_18px_40px_rgba(13,16,48,0.06)] backdrop-blur dark:border-white/10 dark:bg-[#1C2347]/90">
                <div className="space-y-1 flex-1 my-2">
                    <h2 className="text-3xl font-bold tracking-tight text-[#0D1030] dark:text-white/90 md:text-4xl">Acciones de usuarios</h2>
                    <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-white/80 md:text-base">Agrega usuarios, genera e imprime reportes rápidamente.</p>
                </div>

                <div className="flex flex-wrap gap-3 no-print">
                    {/* EXPORTAR */}
                    <div className="flex-1 min-w-[140px]">
                        <ExportDropdown
                            className="w-full h-[40px]"
                            icon={<Download className="h-4 w-4" />}
                            options={exportOptions}
                        />
                    </div>

                    {/* IMPRIMIR */}
                    <div className="flex-1 min-w-[140px]">
                        <ActionButtonGroup
                            buttons={[
                                {
                                    label: "IMPRIMIR",
                                    onClick: () =>
                                        exportTablePDF(users, "Reporte de Usuarios", columns, "print"),
                                    variant: "primary",
                                    className: "w-full h-[40px]",
                                    icon: <PrinterIcon />,
                                },
                            ]}
                        />
                    </div>

                    {/* AGREGAR */}
                    <div className="flex-1 min-w-[140px]">
                        <ActionButtonGroup
                            buttons={[
                                {
                                    label: "AGREGAR USUARIO",
                                    onClick: () => setIsModalOpen(true),
                                    variant: "tertiary",
                                    className: "w-full h-[40px]",
                                    icon: <PlusIcon />,
                                },
                            ]}
                        />
                    </div>
                </div>
            </section>


            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}
            <div className="mb-4 flex flex-col border-b border-[#E5EEF6] pb-4 px-5 dark:border-white/10 lg:flex-col lg:items-baseline lg:justify-between">
                <h3 className="mt-1 mb-1 text-xl lg:text-3xl font-bold text-[#0D1030] dark:text-white/90">GESTIÓN DE USUARIOS</h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-white/80 md:text-base">Administra usuarios del sistema y controla roles.</p>
            </div>

            <AdminTable
                columns={columns}
                data={datosPaginados}
                minRows={5}
                onEdit={handleEditClick}
                onDelete={handleDeleteUsuario}
                isLoading={isLoading && users.length === 0}
                emptyMessage="No se encontraron usuarios"
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
            <ConfirmDialog />
        </div>
    );
}
