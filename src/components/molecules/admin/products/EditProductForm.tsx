import React from 'react';
import { useEditProduct } from '@/hooks/ui/admin/products/useEditProduct';
import InputText from "@/components/atoms/InputText";
import Button from "@/components/atoms/Button";

interface EditProductFormProps {
    productId: number | null;
    onClose: () => void;
}


const ImageUploadCard = ({ 
    title, 
    subtitle, 
    required = false, 
    icon, 
    colorClass = "border-blue-200 bg-blue-50",
    onChange,
    previewUrl,
    altValue,
    onAltChange
}: any) => (
    <div className={`border rounded-xl p-4 flex flex-col gap-2 ${colorClass} bg-white shadow-sm`}>
        <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{icon}</span>
            <h4 className={`font-bold text-sm ${required ? 'text-blue-600' : 'text-gray-700'}`}>
                {title} {required && '*'}
            </h4>
        </div>
        <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
        
      
        <div className="w-full h-32 bg-gray-100 rounded-lg mb-2 overflow-hidden flex items-center justify-center border border-gray-200 relative group">
            {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
            ) : (
                <span className="text-gray-400 text-xs">Sin imagen actual</span>
            )}
        </div>

        <div className="flex items-center gap-2">
            <label className="cursor-pointer bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2 px-3 rounded-lg shadow-sm transition-all w-full text-center">
                Seleccionar archivo (Reemplazar)
                <input type="file" className="hidden" accept="image/*" onChange={(e) => onChange(e.target.files?.[0] || null)} />
            </label>
        </div>
        
        <p className="text-[10px] text-gray-400 mt-1">Máximo 2 MB por imagen.</p>
        
       
        <input 
            type="text" 
            placeholder="Texto ALT para SEO" 
            className="w-full text-xs p-2 border border-gray-200 rounded mt-1 focus:ring-1 focus:ring-blue-300 outline-none" 
            value={altValue || ""}
            onChange={(e) => onAltChange(e.target.value)}
        />
    </div>
);

const EditProductForm: React.FC<EditProductFormProps> = ({ productId, onClose }) => {
    const {
        formData,
        existingImages, 
        handleChange,
        handleListChange,
        addListItem,
        removeListItem,
        handleFileChange,
        handleAltChange,
        handleSubmit,
        isSaving,
        isLoadingData
    } = useEditProduct(productId, onClose);

    if (isLoadingData) {
        return <div className="p-10 text-center text-gray-500">Cargando datos del producto...</div>;
    }

    return (
        <div className="space-y-6 p-2">
            <h2 className="text-xl font-bold text-[#0D1030] border-b pb-2">Editar Producto</h2>
        
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="text-blue-800 font-bold text-lg mb-4 flex items-center gap-2">
                    Datos para Dashboard (Gestión Interna)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                   
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Nombre del Producto</label>
                        <InputText name="name" value={formData.name} onChange={handleChange} className="bg-white" />
                        <p className="text-[10px] text-gray-400 mt-1">Máx. 255 caracteres.</p>
                    </div>

                   
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Sección/Categoría</label>
                        <InputText name="category" value={formData.category} onChange={handleChange} className="bg-white" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Precio</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 pl-6 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Link/URL (Slug)</label>
                        <InputText name="slug" value={formData.slug} onChange={handleChange} className="bg-white" />
                        <p className="text-[10px] text-gray-400 mt-1">Solo minúsculas y guiones.</p>
                    </div>
                </div>

                {/* SEO */}
                <div className="space-y-3 mt-4 pt-4 border-t border-blue-100">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Meta Título (SEO)</label>
                        <InputText name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="bg-white" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Meta Descripción (SEO)</label>
                        <textarea
                            rows={2}
                            name="metaDescription"
                            value={formData.metaDescription}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-blue-600 mb-1">Keywords (SEO)</label>
                        <div className="flex flex-col gap-1 md:col-span-2 bg-blue-100/50 p-3 rounded-xl border border-blue-200">
                            
                            {formData.keywords.map((kw, index) => (
                                <div key={index} className="flex gap-2 mb-2 items-center">
                                    <InputText
                                        value={kw}
                                        onChange={(e) => handleListChange('keywords', index, e.target.value)}
                                        placeholder="ej: letreros para negocio"
                                        className="bg-white flex-1"
                                    />
                                    <button 
                                        onClick={() => removeListItem('keywords', index)}
                                        className="text-red-400 hover:text-red-600 font-bold text-lg px-2"
                                        title="Eliminar keyword"
                                        type="button"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            
                            <button 
                                onClick={() => addListItem('keywords')} 
                                className="text-blue-600 text-xs font-bold hover:underline text-left mt-1 flex items-center gap-1 w-fit"
                                type="button"
                            >
                                + Agregar keyword
                            </button>
                            <p className="text-[10px] text-gray-500 mt-1">Palabras clave relevantes para buscadores.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="text-green-800 font-bold text-lg mb-4">
                    Datos para Página de Producto (Frontend)
                </h3>
                
                <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-600 mb-1">Título Hero <span className="text-green-600 font-normal">(Sobre imagen principal)</span></label>
                    <InputText name="heroTitle" value={formData.heroTitle} onChange={handleChange} className="bg-white" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Descripción <span className="text-green-600 font-normal">(Sección "Información")</span></label>
                    <textarea
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Especificaciones (Morado) */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                    <h3 className="text-purple-800 font-bold text-md mb-4 flex items-center gap-2">
                        📄 Especificaciones (Checkmarks)
                    </h3>
                    <div className="space-y-2">
                        {formData.specifications.map((item, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleListChange('specifications', index, e.target.value)}
                                    className="flex-1 border border-purple-200 rounded p-2 text-sm focus:outline-none focus:border-purple-400"
                                />
                                <button onClick={() => removeListItem('specifications', index)} className="text-red-400 hover:text-red-600 px-2 font-bold text-xl" type="button">
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => addListItem('specifications')} className="mt-3 text-purple-600 text-xs font-bold hover:underline" type="button">
                        + Agregar especificación
                    </button>
                </div>

                {/* Beneficios (Naranja) */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                    <h3 className="text-orange-800 font-bold text-md mb-4 flex items-center gap-2">
                        🎁 Beneficios (Lista derecha)
                    </h3>
                    <div className="space-y-2">
                        {formData.benefits.map((item, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleListChange('benefits', index, e.target.value)}
                                    className="flex-1 border border-orange-200 rounded p-2 text-sm focus:outline-none focus:border-orange-400"
                                />
                                <button onClick={() => removeListItem('benefits', index)} className="text-red-400 hover:text-red-600 px-2 font-bold text-xl" type="button">
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => addListItem('benefits')} className="mt-3 text-orange-600 text-xs font-bold hover:underline" type="button">
                        + Agregar beneficio
                    </button>
                </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-gray-800 font-bold text-lg mb-1">Imágenes del Producto</h3>
                <p className="text-sm text-gray-500 mb-6">Administra las imágenes específicas para cada sección.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* 1. Lista de Productos (Azul) */}
                    <div className="border border-blue-200 rounded-lg p-4 bg-white hover:shadow-md transition">
                        <h4 className="text-blue-600 font-bold text-sm mb-1 flex items-center gap-2">
                            📸 Imagen para Lista de Productos *
                        </h4>
                        <p className="text-[10px] text-gray-500 mb-3">Aparece en "Nuestros Productos". Obligatoria.</p>
                        {/* Preview */}
                        {(formData.images.list || existingImages.list) && (
                            <div className="mb-3 h-32 bg-gray-100 rounded flex items-center justify-center overflow-hidden border">
                                <img src={formData.images.list ? URL.createObjectURL(formData.images.list) : existingImages.list} className="h-full object-contain" alt="Preview" />
                            </div>
                        )}
                        <input type="file" id="img-list" className="hidden" accept="image/*" onChange={(e) => handleFileChange('list', e.target.files?.[0] || null)} />
                        <label htmlFor="img-list" className="block w-full text-center py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded cursor-pointer hover:bg-blue-100 transition">
                            {formData.images.list ? "Cambiar archivo" : "Seleccionar archivo"}
                        </label>
                        <input type="text" placeholder="Texto ALT para SEO" className="mt-3 w-full border border-gray-200 rounded p-1 text-xs"
                            value={formData.alts.list} onChange={(e) => handleAltChange('list', e.target.value)} />
                    </div>
                    {/* 2. Hero (Verde) */}
                    <div className="border border-green-200 rounded-lg p-4 bg-white hover:shadow-md transition">
                        <h4 className="text-green-600 font-bold text-sm mb-1 flex items-center gap-2">
                            🎯 Imagen Hero del Producto
                        </h4>
                        <p className="text-[10px] text-gray-500 mb-3">Banner principal superior.</p>
                        {(formData.images.hero || existingImages.hero) && (
                            <div className="mb-3 h-32 bg-gray-100 rounded flex items-center justify-center overflow-hidden border">
                                <img src={formData.images.hero ? URL.createObjectURL(formData.images.hero) : existingImages.hero} className="h-full object-contain" alt="Preview" />
                            </div>
                        )}
                        <input type="file" id="img-hero" className="hidden" accept="image/*" onChange={(e) => handleFileChange('hero', e.target.files?.[0] || null)} />
                        <label htmlFor="img-hero" className="block w-full text-center py-2 bg-green-50 text-green-600 text-xs font-bold rounded cursor-pointer hover:bg-green-100 transition">
                            Seleccionar archivo
                        </label>
                        <input type="text" placeholder="Texto ALT" className="mt-3 w-full border border-gray-200 rounded p-1 text-xs"
                            value={formData.alts.hero} onChange={(e) => handleAltChange('hero', e.target.value)} />
                    </div>
                    {/* 3. Especificaciones (Morado) */}
                    <div className="border border-purple-200 rounded-lg p-4 bg-white hover:shadow-md transition">
                        <h4 className="text-purple-600 font-bold text-sm mb-1 flex items-center gap-2">
                            📝 Imagen para Especificaciones
                        </h4>
                        <p className="text-[10px] text-gray-500 mb-3">Lado izquierdo de la página.</p>
                        {(formData.images.specs || existingImages.specs) && (
                            <div className="mb-3 h-32 bg-gray-100 rounded flex items-center justify-center overflow-hidden border">
                                <img src={formData.images.specs ? URL.createObjectURL(formData.images.specs) : existingImages.specs} className="h-full object-contain" alt="Preview" />
                            </div>
                        )}
                        <input type="file" id="img-specs" className="hidden" accept="image/*" onChange={(e) => handleFileChange('specs', e.target.files?.[0] || null)} />
                        <label htmlFor="img-specs" className="block w-full text-center py-2 bg-purple-50 text-purple-600 text-xs font-bold rounded cursor-pointer hover:bg-purple-100 transition">
                         Seleccionar archivo
                        </label>
                        <input type="text" placeholder="Texto ALT" className="mt-3 w-full border border-gray-200 rounded p-1 text-xs"
                            value={formData.alts.specs} onChange={(e) => handleAltChange('specs', e.target.value)} />
                    </div>
                    {/* 4. Beneficios (Naranja) */}
                    <div className="border border-orange-200 rounded-lg p-4 bg-white hover:shadow-md transition">
                        <h4 className="text-orange-600 font-bold text-sm mb-1 flex items-center gap-2">
                            🎁 Imagen para Beneficios
                        </h4>
                        <p className="text-[10px] text-gray-500 mb-3">Lado derecho de la página.</p>
                        {(formData.images.benefits || existingImages.benefits) && (
                            <div className="mb-3 h-32 bg-gray-100 rounded flex items-center justify-center overflow-hidden border">
                                <img src={formData.images.benefits ? URL.createObjectURL(formData.images.benefits) : existingImages.benefits} className="h-full object-contain" alt="Preview" />
                            </div>
                        )}
                        <input type="file" id="img-benefits" className="hidden" accept="image/*" onChange={(e) => handleFileChange('benefits', e.target.files?.[0] || null)} />
                        <label htmlFor="img-benefits" className="block w-full text-center py-2 bg-orange-50 text-orange-600 text-xs font-bold rounded cursor-pointer hover:bg-orange-100 transition">
                            Seleccionar archivo
                        </label>
                        <input type="text" placeholder="Texto ALT" className="mt-3 w-full border border-gray-200 rounded p-1 text-xs"
                            value={formData.alts.benefits} onChange={(e) => handleAltChange('benefits', e.target.value)} />
                    </div>
                </div>

                {/* Popups y Guía (Footer de Imágenes) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="border border-yellow-200 rounded-lg p-4 bg-white hover:shadow-md transition">
                         <h4 className="text-yellow-600 font-bold text-sm mb-1">💬 Imagen para Popups</h4>
                         <p className="text-[10px] text-gray-500 mb-2">Para registro de clientes.</p>
                         {(formData.images.popups || existingImages.popups) && (
                            <div className="mb-2 h-20 bg-gray-100 rounded flex items-center justify-center overflow-hidden border">
                                <img src={formData.images.popups ? URL.createObjectURL(formData.images.popups) : existingImages.popups} className="h-full object-contain" alt="Preview" />
                            </div>
                        )}
                         <input type="file" id="img-popups" className="hidden" accept="image/*" onChange={(e) => handleFileChange('popups', e.target.files?.[0] || null)} />
                         <label htmlFor="img-popups" className="block w-full text-center py-2 bg-yellow-50 text-yellow-600 text-xs font-bold rounded cursor-pointer hover:bg-yellow-100 transition">
                            Seleccionar archivo
                        </label>
                         <input type="text" placeholder="Texto ALT" className="mt-2 w-full border border-gray-200 rounded p-1 text-xs"
                            value={formData.alts.popups} onChange={(e) => handleAltChange('popups', e.target.value)} />
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-xs text-gray-700">
                        <h4 className="font-bold text-yellow-800 mb-2">💡 Estructura CORRECTA de imágenes:</h4>
                       <ul className="list-disc pl-4 space-y-1">
                            <li><b>Lista Productos:</b> Vista catálogo.</li>
                            <li><b>Hero:</b> Banner principal superior.</li>
                            <li><b>Especificaciones:</b> Acompaña características.</li>
                            <li><b>Beneficios:</b> Acompaña ventajas.</li>
                            <li><b>Popups:</b> Registro clientes.</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* BOTONES DE ACCIÓN */}

            <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white p-4 z-10 shadow-t">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                    disabled={isSaving}
                >
                    Cancelar
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold transition flex items-center gap-2"
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Guardando...
                        </>
                    ) : (
                        "Actualizar Producto"

                    )}

                </button>

            </div>
        </div>
    );
};

export default EditProductForm;