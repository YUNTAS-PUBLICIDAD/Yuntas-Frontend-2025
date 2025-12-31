'use client';

import Modal from "@/components/atoms/Modal"; 
import InputText from "@/components/atoms/InputText";
import Button from "@/components/atoms/Button";
import Loader from "@/components/atoms/Loader";
import { useClientEdit } from "@/hooks/ui/admin/useClientEdit";
import { Lead } from "@/types/admin/lead";

interface EditClientFormProps {
    isOpen: boolean;
    onClose: () => void;
    client: Lead | null;
}

export default function EditClientForm({ isOpen, onClose, client }: EditClientFormProps) {
    // Consumimos la lógica del Hook
    const { 
        formData, 
        products, 
        handleChange, 
        handleSave, 
        isSaving 
    } = useClientEdit(client, onClose);

    if (!client) return null;

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="EDITAR CLIENTE"
            size="lg"
            className="bg-gradient-to-br from-[#5FA5D9] to-[#4B86B4] text-white"
        >
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    
                    {/* Nombre */}
                    <div className="flex flex-col gap-1">
                        <label className="ml-2 font-medium">Nombres</label>
                        <InputText 
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="bg-white border-none rounded-xl text-gray-800"
                        />
                    </div>

                    {/* Teléfono */}
                    <div className="flex flex-col gap-1">
                        <label className="ml-2 font-medium">Teléfono</label>
                        <InputText 
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="bg-white border-none rounded-xl text-gray-800"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="ml-2 font-medium">Gmail</label>
                        <InputText 
                            name="gmail"
                            value={formData.gmail}
                            onChange={handleChange}
                            className="bg-white border-none rounded-xl text-gray-800"
                        />
                    </div>

                    {/* PRODUCTO: Usamos Select en lugar de InputText */}
                    <div className="flex flex-col gap-1">
                        <label className="ml-2 font-medium">Producto</label>
                        <select
                            name="producto"
                            value={formData.producto}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-white text-gray-800 border-none focus:ring-2 focus:ring-blue-300 outline-none"
                        >
                            <option value="">Seleccione un producto...</option>
                            {products.map((prod) => (
                                <option key={prod.id} value={prod.id}>
                                    {prod.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha */}
                    <div className="flex flex-col gap-1">
                        <label className="ml-2 font-medium">Fecha (DD/MM/AAAA)</label>
                        <InputText 
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            placeholder="Ej: 25/01/2025"
                            className="bg-white border-none rounded-xl text-gray-800"
                        />
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-center gap-4 mt-4">
                    <Button 
                        onClick={handleSave} 
                        className="bg-[#8BE8E5] hover:bg-[#6FD6D3] text-[#0D1030] font-bold border-none"
                    >
                        {isSaving ? "Guardando..." : "Guardar cambios"}
                    </Button>
                    
                    <Button 
                        onClick={onClose} 
                        className="bg-[#9CA3AF] hover:bg-[#6B7280] text-white font-bold border-none"
                    >
                        Cancelar
                    </Button>
                </div>

                {isSaving && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-2xl z-10">
                        <Loader size="lg" color="border-white" />
                    </div>
                )}
            </form>
        </Modal>
    );
}