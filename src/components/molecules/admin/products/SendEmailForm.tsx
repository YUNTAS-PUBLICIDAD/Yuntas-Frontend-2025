import React from "react";
import { useSendEmail } from "@/hooks/ui/admin/products/useSendEmail";

interface Props {
    email_productos?: any[];
    onClose: () => void;
}

const SendEmailForm: React.FC<Props> = ({
    email_productos = [],
    onClose,
}) => {
    const {
        selectedProductId,
        setSelectedProductId,
        sections,
        handleTextChange,
        handleFileChange,
        handleSaveTemplate,
        handleActivateCampaign,
        isSending,
    } = useSendEmail(onClose, email_productos);

    return (
        <div className="flex flex-col gap-6 p-4">
            {/* SELECTOR DE PRODUCTO */}
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Selecciona un producto
                </label>

                <select
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                >
                    <option value="">-- Elige un producto --</option>

                    {email_productos.length === 0 ? (
                        <option disabled>Cargando productos...</option>
                    ) : (
                        email_productos.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nombre}
                            </option>
                        ))
                    )}
                </select>
            </div>

            {/* SECCIONES */}
            {sections.map((section, index) => (
                <div
                    key={index}
                    className="border border-red-100 rounded-xl bg-red-50/30 p-4 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                            {index + 1}
                        </div>
                        <h3 className="text-red-700 font-bold text-lg">
                            Sección Email {index + 1}
                        </h3>
                    </div>

                    {/* IMAGEN PRINCIPAL */}
                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm mb-1">
                            Imagen Principal
                        </label>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-6 flex items-center justify-center relative h-48 overflow-hidden">
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                accept="image/*"
                                onChange={(e) =>
                                    handleFileChange(
                                        index,
                                        "mainImage",
                                        e.target.files?.[0] || null
                                    )
                                }
                            />

                            {section.mainImagePreview ? (
                                <img
                                    src={section.mainImagePreview}
                                    alt="Preview"
                                    className="absolute inset-0 w-full h-full object-contain p-2"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">
                                    Subir imagen
                                </span>
                            )}
                        </div>
                    </div>

                    {/* IMÁGENES SECUNDARIAS */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {(["secondaryImage1", "secondaryImage2"] as const).map(
                            (field, i) => (
                                <div key={field}>
                                    <label className="block text-gray-500 text-sm mb-1">
                                        Imagen Secundaria {i + 1}
                                    </label>

                                    <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-2 relative h-32 overflow-hidden">
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            accept="image/*"
                                            onChange={(e) =>
                                                handleFileChange(
                                                    index,
                                                    field,
                                                    e.target.files?.[0] || null
                                                )
                                            }
                                        />

                                        {field === "secondaryImage1"
                                            ? section.secondaryImage1Preview && (
                                                  <img
                                                      src={
                                                          section.secondaryImage1Preview
                                                      }
                                                      className="absolute inset-0 w-full h-full object-contain p-1"
                                                  />
                                              )
                                            : section.secondaryImage2Preview && (
                                                  <img
                                                      src={
                                                          section.secondaryImage2Preview
                                                      }
                                                      className="absolute inset-0 w-full h-full object-contain p-1"
                                                  />
                                              )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* TEXTO */}
                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm mb-1">
                            Título
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 text-sm"
                            value={section.title}
                            onChange={(e) =>
                                handleTextChange(index, "title", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-gray-500 text-sm mb-1">
                            Párrafo
                        </label>
                        <textarea
                            rows={3}
                            className="w-full border rounded px-3 py-2 text-sm"
                            value={section.paragraph}
                            onChange={(e) =>
                                handleTextChange(
                                    index,
                                    "paragraph",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>
            ))}

            {/* BOTONES */}
            <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    Cancelar
                </button>

                <button
                    onClick={handleSaveTemplate}
                    disabled={isSending}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
                >
                    {isSending ? "Guardando..." : "Guardar Plantilla"}
                </button>

                <button
                    onClick={handleActivateCampaign}
                    disabled={isSending}
                    className="px-6 py-2 bg-red-700 text-white rounded-lg disabled:opacity-50"
                >
                    {isSending ? "Enviando..." : "Activar campaña"}
                </button>
            </div>
        </div>
    );
};

export default SendEmailForm;
