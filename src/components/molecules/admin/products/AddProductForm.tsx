'use client';

import { useAddProduct } from "@/hooks/ui/admin/products/useAddProduct";
import InputText from "@/components/atoms/InputText"; // Asumo que tienes estos átomos
import Button from "@/components/atoms/Button";

// Componente auxiliar para subir imagen (Tarjeta con borde punteado/sólido)
const ImageUploadCard = ({ 
    title, 
    subtitle, 
    required = false, 
    icon, 
    colorClass = "border-blue-200 bg-blue-50",
    onChange 
}: any) => (
    <div className={`border rounded-xl p-4 flex flex-col gap-2 ${colorClass}`}>
        <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{icon}</span>
            <h4 className={`font-bold text-sm ${required ? 'text-blue-600' : 'text-gray-700'}`}>
                {title} {required && '*'}
            </h4>
        </div>
        <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
        
        <div className="flex items-center gap-2">
            <label className="cursor-pointer bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2 px-3 rounded-lg shadow-sm transition-all">
                Seleccionar archivo
                <input type="file" className="hidden" onChange={(e) => onChange(e.target.files?.[0] || null)} />
            </label>
            <span className="text-xs text-gray-400 italic">Ningún archivo seleccionado</span>
        </div>
        
        <p className="text-[10px] text-gray-400 mt-1">Cada imagen debe pesar menos de 2 MB.</p>
        <input type="text" placeholder="Texto ALT para SEO" className="w-full text-xs p-2 border border-gray-200 rounded mt-1" />
    </div>
);

interface Props {
    onClose: () => void;
}

export default function AddProductForm({ onClose }: Props) {
   const { 
        formData, 
        handleChange, 
        handleListChange, 
        addListItem, 
        removeListItem, 
        handleFileChange, 
        handleSubmit, 
        isSaving 
    } = useAddProduct(onClose);
    return (
        <div className="flex flex-col gap-6 p-1">
            <h2 className="text-xl font-bold text-[#0D1030] border-b pb-2">Ingresar Datos</h2>

            {/* SECCIÓN 1: DATOS GESTIÓN INTERNA */}
            <div className="bg-[#F0F9FF] border border-blue-100 p-4 rounded-xl">
                <h3 className="text-blue-700 font-bold mb-4 text-sm">Datos para Dashboard (Gestión Interna)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500">Nombre del Producto (Aparece en tabla)</label>
                        <InputText name="name" value={formData.name} onChange={handleChange} className="bg-white" />
                        <span className="text-[10px] text-gray-400">Máx. 255 caracteres.</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500">Sección/Categoría (Aparece en tabla)</label>
                        <InputText name="category" placeholder="ej: Letreros LED..." value={formData.category} onChange={handleChange} className="bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-blue-500">Precio (Aparece en tabla)</label>
                        <InputText name="price" placeholder="ej: $500.00" value={formData.price} onChange={handleChange} className="bg-white" />
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                         <label className="text-xs text-blue-500">Link/URL</label>
                         <InputText name="slug" placeholder="letreros-neon-led" value={formData.slug} onChange={handleChange} className="bg-white" />
                         <span className="text-[10px] text-gray-400">Solo minúsculas y guiones.</span>
                    </div>

                    {/* SEO */}
                    <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-xs text-blue-500">Meta Título (SEO)</label>
                        <InputText name="metaTitle" placeholder="Título para SEO del producto" value={formData.metaTitle} onChange={handleChange} className="bg-white" />
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-xs text-blue-500">Meta Descripción (SEO)</label>
                        <textarea 
                            name="metaDescription" 
                            className="w-full p-3 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-blue-300 outline-none h-20 resize-none"
                            placeholder="Descripción breve del producto para SEO..."
                            value={formData.metaDescription}
                            onChange={handleChange}
                        />
                    </div>
                     <div className="flex flex-col gap-1 md:col-span-2 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                        <label className="text-xs text-blue-600 font-bold mb-1">Keywords (SEO)</label>
                        
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
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        
                        <button 
                            onClick={() => addListItem('keywords')} 
                            className="text-blue-500 text-xs font-bold hover:underline text-left mt-1 flex items-center gap-1"
                        >
                            + Agregar keyword
                        </button>
                        <p className="text-[10px] text-gray-400 mt-1">Palabras clave relevantes para buscadores.</p>
                    </div>
                </div>
            </div>

            {/* SECCIÓN 2: DATOS FRONTEND */}
            <div className="bg-[#F0FDF4] border border-green-100 p-4 rounded-xl">
                 <h3 className="text-green-700 font-bold mb-4 text-sm">Datos para Página de Producto (Frontend)</h3>
                 
                 <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-green-600">Título Hero (Aparece sobre la imagen principal)</label>
                        <InputText name="heroTitle" placeholder="ej: Letreros Neón LED" value={formData.heroTitle} onChange={handleChange} className="bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-green-600">Descripción (Sección "Información")</label>
                        <textarea 
                            name="description" 
                            className="w-full p-3 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-green-200 outline-none h-24 resize-none"
                            placeholder="Describe el producto, sus usos y características principales..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                         <span className="text-[10px] text-gray-400">Descripción detallada. 300-600 palabras.</span>
                    </div>
                 </div>
            </div>

            {/* SECCIÓN 3: ESPECIFICACIONES Y BENEFICIOS */}
            <div className="grid grid-cols-1 gap-4">
                {/* Especificaciones (Morado) */}
                <div className="bg-[#FAF5FF] border border-purple-100 p-4 rounded-xl">
                    <h3 className="text-purple-700 font-bold mb-2 text-sm">Especificaciones (Checkmarks en el producto)</h3>
                    {formData.specifications.map((spec, index) => (
                        <div key={index} className="mb-2">
                            <InputText 
                                value={spec} 
                                onChange={(e) => handleListChange('specifications', index, e.target.value)}
                                placeholder="ej: Materiales duraderos"
                                className="bg-white"
                            />
                        </div>
                    ))}
                    <button onClick={() => addListItem('specifications')} className="text-purple-500 text-xs hover:underline">+ Agregar especificación</button>
                </div>

                {/* Beneficios (Naranja) */}
                <div className="bg-[#FFF7ED] border border-orange-100 p-4 rounded-xl">
                    <h3 className="text-orange-700 font-bold mb-2 text-sm">Beneficios (Lista en el producto)</h3>
                    {formData.benefits.map((benefit, index) => (
                        <div key={index} className="mb-2">
                            <InputText 
                                value={benefit} 
                                onChange={(e) => handleListChange('benefits', index, e.target.value)}
                                placeholder="ej: Iluminación con colores vibrantes"
                                className="bg-white"
                            />
                        </div>
                    ))}
                    <button onClick={() => addListItem('benefits')} className="text-orange-500 text-xs hover:underline">+ Agregar beneficio</button>
                </div>
            </div>

            {/* SECCIÓN 4: IMÁGENES */}
            <div>
                <h3 className="font-bold text-gray-800 mb-2">Imágenes del Producto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ImageUploadCard 
                        title="Imagen para Lista de Productos" 
                        required 
                        subtitle='Aparece en "Nuestros Productos"'
                        colorClass="border-blue-200 bg-blue-50"
                        onChange={(f: File) => handleFileChange('list', f)}
                    />
                    <ImageUploadCard 
                        title="Imagen Hero del Producto" 
                        icon="🎯"
                        subtitle="Banner superior principal"
                        colorClass="border-green-200 bg-green-50"
                        onChange={(f: File) => handleFileChange('hero', f)}
                    />
                    <ImageUploadCard 
                        title="Imagen para Especificaciones" 
                        icon="📝"
                        subtitle="Lado izquierdo de la página"
                        colorClass="border-purple-200 bg-purple-50"
                        onChange={(f: File) => handleFileChange('specs', f)}
                    />
                    <ImageUploadCard 
                        title="Imagen para Beneficios" 
                        icon="🎁"
                        subtitle="Lado derecho de la página"
                        colorClass="border-orange-200 bg-orange-50"
                        onChange={(f: File) => handleFileChange('benefits', f)}
                    />
                     <ImageUploadCard 
                        title="Imagen para Popups" 
                        icon="💬"
                        subtitle="Popups de registro clientes"
                        colorClass="border-yellow-200 bg-yellow-50"
                        onChange={(f: File) => handleFileChange('popups', f)}
                    />
                </div>
            </div>

            {/* BOTONES FINALES */}
            <div className="flex justify-end gap-3 pt-4 border-t mt-2">
                <Button onClick={onClose} className="bg-gray-400 text-white border-none hover:bg-gray-500">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} className="bg-blue-600 text-white border-none hover:bg-blue-700">
                    {isSaving ? "Guardando..." : "Crear Producto"}
                </Button>
            </div>
        </div>
    );
}