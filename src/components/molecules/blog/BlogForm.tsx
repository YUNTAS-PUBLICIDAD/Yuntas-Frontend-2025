'use client';

import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Loader from "@/components/atoms/Loader";
import InputAdmin from "@/components/atoms/InputAdmin";
import SelectForm from "@/components/atoms/SelectForm";
import TextareaAdmin from "@/components/atoms/TextAreaAdmin";
import FormSection from "@/components/molecules/admin/FormSection";
import InputListDinamica from "@/components/molecules/admin/InputListDinamica";
import ImageUpload from "@/components/molecules/admin/ImageUpload";
import LinkableTextarea from "@/components/molecules/blog/LinkableTextarea";
import { Blog, BlogInput } from "@/types/admin/blog";
import { showToast } from '@/utils/showToast'
import { Producto } from "@/types/admin/producto";

interface BlogFormProps {
    onSubmit: (data: BlogInput) => void;
    onCancel: () => void;
    isLoading?: boolean;
    initialData?: Blog | null;
    productos: Producto[];
}

const defaultFormData: BlogInput = {
    title: "",
    slug: "",
    hero_title: "",
    cover_subtitle: "",
    video_url: "",
    video_subtitle: "",
    video_description: "",

    meta_title: "",
    meta_description: "",   
    keywords: [],

    main_image: null,
    main_image_title: "",
    main_image_alt: "",
    gallery: [],

    description: "",
    testimonial: "",
    benefits: [],

    product_id: "",
};

const GALLERY_SLOTS = [
    {
        value: 'Hero',
        label: 'Hero (Imagen principal grande)',
        size: '1920 x 800 px',
        desc: 'Formato horizontal panorámico.'
    },
    {
        value: 'Desc',
        label: 'Introducción',
        size: '1000 x 1000 px',
        desc: 'Formato cuadrado o vertical (4:5).'
    },
    {
        value: 'Benefits',
        label: 'Beneficios',
        size: '1000 x 1000 px',
        desc: 'Formato cuadrado o vertical (4:5).'
    },
    {
        value: 'Testimonial',
        label: 'Testimonio',
        size: '800 x 800 px',
        desc: 'Formato cuadrado.'
    },
] as const;

type FormErrors = Partial<Record<keyof BlogInput, string>>;
type GallerySlot = typeof GALLERY_SLOTS[number]["value"];

export default function BlogForm({ onSubmit, onCancel, isLoading = false, initialData = null, productos }: BlogFormProps) {
    const [formData, setFormData] = useState<BlogInput>(defaultFormData);
    const [galleryPreviews, setGalleryPreviews] = useState<Map<string, string>>(new Map());
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = () => {
      const newErrors: FormErrors = {};

      if (!formData.title.trim()) {
       newErrors.title = "El titulo es obligatorio";
      }

      if (!formData.slug.trim()) {
       newErrors.slug = "El slug es obligatorio" ;
      }

      if (!formData.cover_subtitle.trim()) {
       newErrors.cover_subtitle = "El subtitulo es obligatorio";
      }

      if (!formData.product_id) {
       newErrors.product_id = "Debe seleccionar un producto" 
      }

      if (!formData.description.trim()) {
       newErrors.description = "La descripción es obligatoria" ;
      }

      if (!formData.testimonial.trim()) {
       newErrors.testimonial = "El testimonio es obligatorio" ;
      }

      if (!formData.meta_title.trim()) {
       newErrors.meta_title = "El meta título es obligatorio" ;
      }

      if (!formData.meta_description.trim()) {
       newErrors.meta_description = "La meta description es obligatoria" ;
      }

      if (formData.benefits.length !== 3) {
       newErrors.benefits = "Debe haber exactamente 3 beneficios";
      }else if (formData.benefits.some(b => !b.trim())){
        newErrors.benefits = "Los beneficios no pueden estar vacíos";
      }

      if (!formData.main_image) {
        newErrors.main_image = "La imagen principal es obligatoria";
      }

      const missingSlots = GALLERY_SLOTS.filter(({value}) => !formData.gallery.some(item => item.slot === value));

      if (missingSlots.length > 0) {
       newErrors.gallery = "Todas las imágenes de la galería son obligatorias";
      }
    const emptyImages = formData.gallery.filter(
    item => !item.image || (typeof item.image === "string" && item.image.trim() === "")
);

if (emptyImages.length > 0) {
 newErrors.gallery = "Todas las imágenes deben contener un archivo válido";
}

if (formData.video_url) {
  try {
  const url = new URL(formData.video_url) 
  if (!["http:", "https:"].includes(url.protocol)) {
   newErrors.video_url = "URL inválida" ;
  }
  } catch (error) {
   newErrors.video_url = "URL inválida" 
  }

}
      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
    }

    // Cargar datos iniciales para editar
    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                slug: initialData.slug,
                hero_title: initialData.hero_title,
                cover_subtitle: initialData.cover_subtitle,
                video_url: initialData.video_url || "",
                video_subtitle: initialData.video_subtitle || "",
                video_description: initialData.video_description || "",

                meta_title: initialData.meta_title,
                meta_description: initialData.meta_description,
                keywords: initialData.keywords || [],

                main_image: initialData.main_image?.url || null,
                main_image_title: initialData.main_image?.title || "",
                main_image_alt: initialData.main_image?.alt || "",

                gallery: initialData.gallery?.map(img => ({
                    slot: img.slot,
                    image: img.url,
                    title: img.title || "",
                    alt: img.alt || "",
                })) || [],

                description: initialData.description,
                testimonial: initialData.testimonial,
                benefits: initialData.benefits.length > 0 ? initialData.benefits : [""],

                product_id: initialData.product?.id ? String(initialData.product.id) : "",
            });
        }
    }, [initialData]);
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "slug") {
            // permitir solo minusculas, numeros y guiones
            const regex = /^[a-z0-9-]*$/;
            if (!regex.test(value)) return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => {
          const copy = {...prev};
          delete copy[name as keyof BlogInput];
          return copy;
        })
    };

    const handleAddGalleryImage = (file: File, slot: string) => {
     setErrors(prev => {
      const copy = {...prev};
      delete copy.gallery;
      return copy;
     })   
      
      setFormData(prev => {
            const existing = prev.gallery.find(item => item.slot === slot); // buscar si ya hay una imagen en ese slot
            const filteredGallery = prev.gallery.filter(item => item.slot !== slot); // se elimna imagen existente de ese slot si hay
            return {
                ...prev,
                gallery: [
                    ...filteredGallery,
                    {
                        slot: slot as GallerySlot,
                        image: file,
                        title: existing?.title || "", // conservar title y alt si ya existen
                        alt: existing?.alt || "",
                    }
                ]
            }
        });

        if (file instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGalleryPreviews(prev => {
                    const newMap = new Map(prev);
                    newMap.set(slot, reader.result as string);
                    return newMap;
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveGalleryImage = (slot: string) => { // se busca por slot para elimnar
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.map(item =>
                item.slot === slot ? { ...item, image: "" } : item
            )
        }));

        setGalleryPreviews(prev => { // se elimina el preview tambien
            const newMap = new Map(prev);
            newMap.delete(slot);
            return newMap;
        });
    };

    const handleUpdateGalleryTitle = (slot: string, newTitle: string) => { // busca por slot para actualizar title
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.map(item =>
                item.slot === slot ? { ...item, title: newTitle } : item
            )
        }));
    };

    const handleUpdateGalleryAlt = (slot: string, newAlt: string) => { // busca por slot para actualizar alt
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.map(item =>
                item.slot === slot ? { ...item, alt: newAlt } : item
            )
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
         showToast.warning("Revisa los campos del formulario");
         return;
        }

        // imagen principal obligatoria
        if (!formData.main_image) {
            showToast.warning("La imagen principal es requerida");
            return;
        }

        onSubmit(formData);
    };

    const updateField = (field: keyof BlogInput, value: string) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));

  setErrors(prev => {
    const copy = { ...prev };
    delete copy[field];
    return copy;
  });
};

    return (
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto">

            {/* Informacion */}
            <FormSection title="Información Principal">
                <div className="flex gap-4 flex-col md:flex-row">
                    <InputAdmin
                        label="Link/URL"
                        name="slug"
                        value={formData.slug || ""}
                        onChange={handleInputChange}
                        placeholder="ej: letreros-neon-led-guia-completa"
                        helperText="Solo palabras en minúscula separadas por guiones. Sin espacios ni tildes. Máx. 160 caracteres."
                        maxLength={160}
                        error={errors.slug}
                        required
                    />

                    <SelectForm
                        label="Producto Relacionado"
                        name="product_id"
                        value={formData.product_id || ""}
                        onChange={handleInputChange}
                        options={productos}
                        error={errors.product_id}
                        required
                    />
                </div>

                <InputAdmin
                    label="Título"
                    name="hero_title"
                    value={formData.hero_title || ""}
                    onChange={handleInputChange}
                    placeholder="Ej: Letreros Neón LED: Guía Completa"
                    helperText="Máx. 150 caracteres (letras, números y espacios)."
                    maxLength={150}
                    required
                />

                <div className="flex gap-4 flex-col md:flex-row">
                    <InputAdmin
                        label="Subtitulo"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleInputChange}
                        placeholder="Ej. Letreros Neón LED: Guía Completa"
                        helperText="Máx. 150 caracteres (letras, números y espacios)."
                        maxLength={150}
                        error={errors.title}
                        required
                    />
                </div>

                <LinkableTextarea
                    label="Introducción del Blog"
                    name="description"
                    value={formData.description || ""}
                    onValueChange={(value) => updateField("description", value)}
                    placeholder="Los pisos LED se han convertido en una herramienta ..."
                    helperText="Desarrollo completo del blog."
                    rows={6}
                    required
                    productos={productos}
                    error={errors.description}
                />

                <LinkableTextarea
                    label="Testimonio"
                    name="testimonial"
                    value={formData.testimonial || ""}
                    onValueChange={(value) => updateField("testimonial", value)}
                    placeholder="Ej: “Gracias a Yuntas, nuestro negocio ha ganado una visibilidad increíble...”"
                    helperText="Desarrollo completo del testimonio."
                    rows={6}
                    required
                    productos={productos}
                    error={errors.testimonial}
                />

                <InputAdmin
                    label="Subtítulo del Video"
                    name="video_subtitle"
                    value={formData.video_subtitle || ""}
                    onChange={handleInputChange}
                    placeholder="Ej: Mira Nuestro Video"
                    helperText="Texto destacado que aparece sobre el video. Máx. 100 caracteres."
                    maxLength={100}
                    error={errors.video_subtitle}
                    disabled={!formData.video_url}
                />

                <TextareaAdmin
                label="Descripción del Video"
                name="video_description"
                value={formData.video_description || ""}
                onChange={handleInputChange}
                placeholder="Descubre más detalles sobre nuestros productos y servicios..."
                helperText="Texto que acompaña al video. Máx. 300 caracteres."
                maxLength={300}
                rows={3}
                error={errors.video_description}
                disabled={!formData.video_url}  
                />     

                                <InputAdmin
                    label="URL del Video (opcional)"
                    name="video_url"
                    value={formData.video_url || ""}
                    onChange={handleInputChange}
                    placeholder="Ej: https://www.youtube.com/watch?v=..."
                    helperText="Máx. 150 caracteres (letras, números y espacios)."
                    maxLength={150}
                    error={errors.video_url}
                /> 
            </FormSection>

            <FormSection title="SEO (Optimización para Buscadores)">
                <InputAdmin
                    label="Meta Título"
                    name="meta_title"
                    value={formData.meta_title || ""}
                    onChange={handleInputChange}
                    placeholder="Título para SEO del blog"
                    helperText="Máx. 70 caracteres (letras, números y espacios)."
                    maxLength={70}
                    required
                    error={errors.meta_title}
                />

                <TextareaAdmin
                    label="Meta Descripción"
                    name="meta_description"
                    value={formData.meta_description || ""}
                    onChange={handleInputChange}
                    placeholder="Descripción breve del blog para SEO…"
                    helperText="Máx. 160 caracteres (letras, números y espacios)."
                    maxLength={160}
                    rows={2}
                    required
                    error={errors.meta_description}
                />
                <InputListDinamica
                    label="Keywords"
                    items={formData.keywords}
                    onChange={
                        (keywords) =>
                        setFormData(prev => ({ ...prev, keywords }))}
                    placeholder="ej: letreros neón led"
                    addButtonText="+ Agregar keyword"
                    helperText="Palabras clave relevantes para que los buscadores encuentren el blog."
                    required
                />
            </FormSection>

            {/* Seccion beneficios */}
            <FormSection title="Beneficios (3 beneficios obligatorios)">
                <InputAdmin
                        label="Subtitulo beneficios"
                        name="cover_subtitle"
                        value={formData.cover_subtitle || ""}
                        onChange={handleInputChange}
                        placeholder="Ej: Descubre cómo los letreros de neón LED pueden..."
                        helperText="Máx. 150 caracteres (letras, números y espacios)."
                        maxLength={150}
                        error={errors.cover_subtitle}
                        required
                />

                <InputListDinamica
                    label="Beneficios"
                    items={formData.benefits}
                    onChange={
                      (benefits) =>{ setFormData(prev => ({ ...prev, benefits }));
                    setErrors(prev => {
                      const copy = {...prev};
                      delete copy.benefits;
                      return copy;
                    }) 
                    }
                  }
                    placeholder="Ej: Aumenta la visibilidad de tu negocio"
                    addButtonText="+ Agregar beneficio"
                    required
                    error={errors.benefits}
                />
            </FormSection>

            {/* Imagen Principal */}
            <FormSection title="Imagen Principal">
                <ImageUpload
                    label="Imagen Principal del Blog"
                    description="Aparece en la lista de blogs. Recomendado: 800 x 800 px (Cuadrado)."
                    titleValue={formData.main_image_title || ""}
                    altValue={formData.main_image_alt}
                    onTitleChange={(title) => setFormData(prev => ({ ...prev, main_image_title: title }))}
                    onAltChange={(alt) => setFormData(prev => ({ ...prev, main_image_alt: alt }))}
                    onFileChange={
                      (file) => { setFormData(prev => ({ ...prev, main_image: file }));
                   setErrors(prev => {
                    const copy = {...prev};
                    delete copy.main_image;
                    return copy;
                   }) 
                    }}
                    currentImage={
                        typeof formData.main_image === "string" && formData.main_image
                            ? formData.main_image
                            : null
                    }
                    required
                    error={errors.main_image}
                />
            </FormSection>

            { /* Galeria */}
            <FormSection title="Galería de Imágenes por Sección">
                <p className="text-gray-500 text-sm mb-4">
                    Asigna una imagen a cada sección de la página del blog.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {GALLERY_SLOTS.map(({ value, label, size, desc }) => {
                        const existingImage = formData.gallery.find(item => item.slot === value);

                        // se determinar la URL del preview
                        let imageUrl: string | null = null;
                        if (existingImage) {
                            if (typeof existingImage.image === 'string') {
                                // imagen existente
                                imageUrl = existingImage.image;
                            } else {
                                // imagen nueva (File)
                                imageUrl = galleryPreviews.get(value) || null;
                            }
                        }

                        return (
                            <ImageUpload
                                key={value}
                                label={`Imagen para ${label}`}
                                description={`Medida: ${size}. ${desc}`}
                                titleValue={existingImage?.title || ""}
                                altValue={existingImage?.alt || ""}
                                required
                                onTitleChange={(title) => {
                                    handleUpdateGalleryTitle(value, title);
                                }}
                                onAltChange={(alt) => {
                                    handleUpdateGalleryAlt(value, alt);
                                }}
                                onFileChange={(file) => {
                                    if (file) {
                                        handleAddGalleryImage(file, value);
                                    }
                                }}
                                currentImage={imageUrl}
                                onRemove={
                                    existingImage
                                        ? () => handleRemoveGalleryImage(value)
                                        : undefined
                                }
                                error={errors.gallery}
                            />
                        );
                    })}
                </div>
            </FormSection>

            {/* Botones de acción */}
            <div className="flex flex-col md:flex-row gap-4 sticky bottom-0 bg-white pt-4 pb-2 px-4 border-t border-gray-200 text-[#203565] dark:bg-[#141A3F]">
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="flex-1"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader size="sm" color="border-white" />
                            <span>Guardando...</span>
                        </div>
                    ) : (
                        initialData ? "Guardar Cambios" : "Añadir Blog"
                    )}
                </Button>
                <Button
                    type="button"
                    variant="tertiary"
                    size="md"
                    className="flex-1"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
}