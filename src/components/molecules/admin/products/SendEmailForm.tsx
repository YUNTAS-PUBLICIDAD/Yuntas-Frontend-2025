import React from 'react';
import { useSendEmail } from '@/hooks/ui/admin/products/useSendEmail';

interface Props {
    products: any[]; 
    onClose: () => void;
}

const SendEmailForm: React.FC<Props> = ({ products, onClose }) => {
    const { 
        selectedProductId, setSelectedProductId, 
        sections, handleTextChange, handleFileChange, 
        handleSubmit, isSending 
    } = useSendEmail(onClose);

    return (
        <div className="flex flex-col gap-6 p-4">
            {/* SELECTOR DE PRODUCTO */}
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Selecciona un producto</label>
                <select 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                >
                    <option value="">-- Elige un producto --</option>
                    {products.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                </select>
            </div>

            {sections.map((section, index) => (
                <div key={index} className="border border-red-100 rounded-xl bg-red-50/30 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                            {index + 1}
                        </div>
                        <h3 className="text-red-700 font-bold text-lg">Sección Email {index + 1}</h3>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm mb-1">Imagen Principal</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative">
                            <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => handleFileChange(index, 'mainImage', e.target.files?.[0] || null)}
                                accept="image/*"
                            />
                            {section.mainImage ? (
                                <span className="text-green-600 font-medium">{section.mainImage.name}</span>
                            ) : (
                                <>
                                    <span className="text-gray-400 text-2xl mb-2">🖼️</span>
                                    <span className="text-gray-500 text-sm">Subir imagen</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* IMÁGENES SECUNDARIAS (Grid de 2) */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-500 text-sm mb-1">Imagen Secundaria 1</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 relative h-32">
                                <input 
                                    type="file" 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => handleFileChange(index, 'secondaryImage1', e.target.files?.[0] || null)}
                                    accept="image/*"
                                />
                                {section.secondaryImage1 ? (
                                    <span className="text-green-600 text-xs text-center truncate w-full">{section.secondaryImage1.name}</span>
                                ) : (
                                    <span className="text-gray-500 text-xs text-center">Subir imagen</span>
                                )}
                            </div>
                        </div>
                        {/* Secundaria 2 */}
                        <div>
                            <label className="block text-gray-500 text-sm mb-1">Imagen Secundaria 2</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 relative h-32">
                                <input 
                                    type="file" 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => handleFileChange(index, 'secondaryImage2', e.target.files?.[0] || null)}
                                    accept="image/*"
                                />
                                {section.secondaryImage2 ? (
                                    <span className="text-green-600 text-xs text-center truncate w-full">{section.secondaryImage2.name}</span>
                                ) : (
                                    <span className="text-gray-500 text-xs text-center">Subir imagen</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* TÍTULO */}
                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm mb-1">Título</label>
                        <input 
                            type="text" 
                            placeholder="Escribe el título aquí"
                            className="w-full border border-gray-200 bg-gray-50 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                            value={section.title}
                            onChange={(e) => handleTextChange(index, 'title', e.target.value)}
                        />
                    </div>

                    {/* PÁRRAFO */}
                    <div>
                        <label className="block text-gray-500 text-sm mb-1">Párrafo {index + 1}</label>
                        <textarea 
                            rows={3}
                            placeholder="Escribe el párrafo aquí"
                            className="w-full border border-gray-200 bg-gray-50 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none"
                            value={section.paragraph}
                            onChange={(e) => handleTextChange(index, 'paragraph', e.target.value)}
                        />
                    </div>
                </div>
            ))}

            {/* BOTÓN DE ENVIAR */}
            <div className="flex justify-end gap-3 pt-4 border-t">
                <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    Cancelar
                </button>
                <button 
                    onClick={handleSubmit} 
                    disabled={isSending}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium"
                >
                    {isSending ? 'Enviando...' : 'Enviar Campaña'}
                </button>
            </div>
        </div>
    );
};

export default SendEmailForm;