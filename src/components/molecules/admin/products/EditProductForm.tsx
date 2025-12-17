'use client';

import { useEditProduct } from "@/hooks/ui/admin/products/useEditProduct"; 
import InputText from "@/components/atoms/InputText";
import Button from "@/components/atoms/Button";

const ImageCard = ({ 
    title, subtitle, icon, colorClass, 
    file, existingUrl, 
    onFileChange, onAltChange, altValue 
}: any) => {
    return (
        <div className={`border rounded-xl p-4 flex flex-col gap-2 ${colorClass} h-full`}>
            <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{icon}</span>
                <h4 className="font-bold text-sm text-gray-700">{title}</h4>
            </div>
            
            {existingUrl && !file ? (
                <div className="flex flex-col items-center gap-2 mt-2">
                    <img src={existingUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow-sm bg-white" />
                    <span className="text-xs text-center text-gray-500 px-2">{subtitle}</span>
                    <button 
                        className="bg-red-100 text-red-500 text-xs px-3 py-1 rounded-full font-bold hover:bg-red-200 transition"
                        onClick={() => alert("Función eliminar pendiente en backend")} 
                    >
                        Eliminar
                    </button>
                </div>
            ) : (
                <>
                    <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
                    <div className="flex items-center gap-2">
                        <label className="cursor-pointer bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2 px-3 rounded-lg shadow-sm transition-all">
                            Seleccionar archivo
                            <input type="file" className="hidden" onChange={(e) => onFileChange(e.target.files?.[0])} />
                        </label>
                        <span className="text-xs text-gray-400 italic">
                            {file ? file.name.substring(0, 15) + "..." : "Ningún...ionado"}
                        </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">Máx 2 MB.</p>
                    <input 
                        type="text" placeholder="Texto ALT para SEO" 
                        className="w-full text-xs p-2 border border-gray-200 rounded mt-1 bg-white"
                        value={altValue}
                        onChange={(e) => onAltChange(e.target.value)}
                    />
                </>
            )}
        </div>
    );
};

interface Props {
    productId: number;
    onClose: () => void;
}

export default function EditProductForm({ productId, onClose }: Props) {
    const { 
        formData, existingImages, isLoadingData, isSaving, 
        handleChange, handleListChange, removeListItem, addListItem, 
        handleFileChange, handleAltChange, handleSubmit 
    } = useEditProduct(productId, onClose);

    if (isLoadingData) return <div className="p-10 text-center">Cargando datos...</div>;

    return (
        <div className="flex flex-col gap-6 p-1">
            <div className="bg-[#F0F9FF] border border-blue-100 p-4 rounded-xl">
                <h3 className="text-blue-700 font-bold mb-4 text-sm">Datos para Dashboard (Gestión Interna)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500">Nombre</label>
                        <InputText name="name" value={formData.name} onChange={handleChange} className="bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500">Sección</label>
                        <InputText name="category" value={formData.category} onChange={handleChange} className="bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-blue-500">Precio</label>
                        <InputText name="price" value={formData.price} onChange={handleChange} className="bg-white" />
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                         <label className="text-xs text-blue-500">Link/URL</label>
                         <InputText name="slug" value={formData.slug} onChange={handleChange} className="bg-white" />
                    </div>
                </div>
            </div>

            <div className="bg-[#F0FDF4] border border-green-100 p-4 rounded-xl">
                 <h3 className="text-green-700 font-bold mb-4 text-sm">Datos para Página de Producto</h3>
                 <div className="flex flex-col gap-4">
                    <InputText name="heroTitle" value={formData.heroTitle} onChange={handleChange} className="bg-white" />
                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 text-sm h-24 resize-none" />
                 </div>
            </div>

            <div className="bg-[#FAF5FF] border border-purple-100 p-4 rounded-xl">
                <h3 className="text-purple-700 font-bold mb-2 text-sm">Especificaciones</h3>
                {formData.specifications.map((spec, index) => (
                    <div key={index} className="flex gap-2 mb-2 items-center">
                        <InputText 
                            value={spec} 
                            onChange={(e) => handleListChange('specifications', index, e.target.value)}
                            className="bg-white flex-1"
                        />
                        <button onClick={() => removeListItem('specifications', index)} className="text-red-400 hover:text-red-600 font-bold px-2">✕</button>
                    </div>
                ))}
                <button onClick={() => addListItem('specifications')} className="text-purple-500 text-xs">+ Agregar especificación</button>
            </div>

            <div>
                <h3 className="font-bold text-gray-800 mb-2">Imágenes del Producto</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                     <ImageCard 
                        title="Imagen Hero" 
                        subtitle="Banner Principal"
                        existingUrl={existingImages.hero} 
                        file={formData.images.hero}       
                        onFileChange={(f: File) => handleFileChange('hero', f)}
                        colorClass="border-green-200 bg-green-50"
                     />
                     <ImageCard 
                        title="Imagen Especificaciones" 
                        subtitle="Lado Izquierdo"
                        existingUrl={existingImages.specs}
                        file={formData.images.specs}
                        onFileChange={(f: File) => handleFileChange('specs', f)}
                        colorClass="border-purple-200 bg-purple-50"
                     />
                     <ImageCard 
                        title="Imagen Beneficios" 
                        subtitle="Lado Derecho"
                        existingUrl={existingImages.benefits}
                        file={formData.images.benefits}
                        onFileChange={(f: File) => handleFileChange('benefits', f)}
                        colorClass="border-orange-200 bg-orange-50"
                     />
                </div>
                
                <div className="w-1/3">
                    <ImageCard 
                        title="Imagen Lista Productos" 
                        existingUrl={existingImages.list}
                        file={formData.images.list}
                        onFileChange={(f: File) => handleFileChange('list', f)}
                        colorClass="border-blue-200 bg-blue-50"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button onClick={onClose} className="bg-gray-400 text-white">Cancelar</Button>
                <Button onClick={handleSubmit} className="bg-blue-600 text-white">
                    {isSaving ? "Guardando..." : "Actualizar Producto"}
                </Button>
            </div>
        </div>
    );
}