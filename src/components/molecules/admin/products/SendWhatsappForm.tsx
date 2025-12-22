import React from 'react';
import { useSendWhatsapp } from '@/hooks/ui/admin/products/useSendWhatsapp';

interface Props {
    products: any[];
    onClose: () => void;
}

const SendWhatsappForm: React.FC<Props> = ({ products, onClose }) => {
    const { 
        selectedProductId, setSelectedProductId,
        mainImage, setMainImage,
        paragraph, setParagraph,
        handleSubmit, isSending
    } = useSendWhatsapp(onClose);

    return (
        <div className="flex flex-col gap-6 p-4">
            {/* SELECTOR DE PRODUCTO */}
            <div>
                <select 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                >
                    <option value="">-- Elige un producto --</option>
                    {products.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                </select>
                {products.length === 0 && <p className="text-xs text-gray-400 mt-1">Cargando productos...</p>}
            </div>

            {/* SECCIÓN WHATSAPP (VERDE) */}
            <div className="border border-green-200 rounded-xl bg-green-50/30 p-6 shadow-sm">
                
                {/* Encabezado Verde */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        1
                    </div>
                    <h3 className="text-green-800 font-bold text-lg">Sección Whatsapp</h3>
                </div>

                {/* IMAGEN PRINCIPAL */}
                <div className="mb-6">
                    <label className="block text-gray-500 text-sm mb-1">Imagen Principal</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative h-40">
                        <input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => setMainImage(e.target.files?.[0] || null)}
                            accept="image/*"
                        />
                        {mainImage ? (
                            <span className="text-green-600 font-medium text-center">{mainImage.name}</span>
                        ) : (
                            <>
                                <span className="text-gray-400 text-3xl mb-2">🖼️</span>
                                <span className="text-gray-500 text-sm">Subir imagen</span>
                            </>
                        )}
                    </div>
                </div>

                {/* PÁRRAFO */}
                <div>
                    <label className="block text-gray-500 text-sm mb-1">Párrafo</label>
                    <textarea 
                        rows={4}
                        placeholder="Escribe el párrafo aquí"
                        className="w-full border border-gray-200 bg-gray-50 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-400 resize-none"
                        value={paragraph}
                        onChange={(e) => setParagraph(e.target.value)}
                    />
                </div>
            </div>

            {/* BOTÓN DE GUARDAR PLANTILLA (VERDE) */}
            <div className="pt-2">
                <button 
                    onClick={handleSubmit} 
                    disabled={isSending}
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-bold shadow-md transition-all"
                >
                    {isSending ? 'Guardando...' : 'Guardar plantilla'}
                </button>
            </div>
        </div>
    );
};

export default SendWhatsappForm;