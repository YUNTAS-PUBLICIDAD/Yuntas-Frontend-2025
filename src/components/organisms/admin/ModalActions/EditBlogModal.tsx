
'use client';

import React, { useEffect, useState } from 'react';
// Componentes átomo del proyecto
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';
// Secciones del formulario (lógica separada en componentes)
import ProductoSeoSection from './ProductoSeoSection';
import ImagenesSection from './ImagenesSection';
import VideoSection from './VideoSection';
import ContenidoBlog from './ContenidoBlog';
// Tipos del proyecto
import { Blog, BlogInput } from '@/types/admin/blog';
// Utilidad para mapear Blog a BlogInput
import { mapBlogToInput } from '@/utils/blog/mapBlogToInput';
// Hook del proyecto para operaciones de blog
import { useBlogs } from '@/hooks/useBlog';

// Props del componente - compatible con la página de blogs
interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  blogToEdit: Blog;
  onSuccess?: () => void;
}

// Estado inicial del formulario
const BLOG_INICIAL: BlogInput = {
  titulo: "",
  subtitulo: "",
  contenido: "",
  url_video: "",
  etiqueta: {
    meta_titulo: "",
    meta_descripcion: "",
  },
  imagen_principal: null,
  imagen_principal_alt: "",
  imagenes: [],
  imagenes_alts: [],
  parrafos: [],
  beneficios: [],
  bloques: [],
};

/**
 * Componente EditBlogModal
 * Modal para editar un blog existente usando las secciones reutilizables del proyecto
 */
const EditBlogModal = ({ isOpen, setIsOpen, blogToEdit, onSuccess }: Props) => {
  // Estado del formulario
  const [form, setForm] = useState<BlogInput>(BLOG_INICIAL);
  
  // Hook del proyecto para operaciones CRUD de blogs
  const { updateBlog, isLoading, error } = useBlogs();

  // Cargar datos del blog cuando se abre el modal
  useEffect(() => {
    if (isOpen && blogToEdit) {
      // Usar utilidad del proyecto para mapear datos
      setForm(mapBlogToInput(blogToEdit));
    }
  }, [isOpen, blogToEdit]);

  // Handler para cerrar el modal
  const handleClose = () => {
    setIsOpen(false);
  };

  // Handler para enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Usar el hook del proyecto para actualizar
    const success = await updateBlog(blogToEdit.id, form);
    
    if (success) {
      alert("Blog actualizado correctamente");
      onSuccess?.();
      handleClose();
    } else {
      alert("Error al actualizar el blog");
    }
  };

  return (
    <Modal 
      title="Editar Blog" 
      size="lg" 
      isOpen={isOpen} 
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit} className="space-y-6 h-[70vh] overflow-y-auto">
        
        {/* Mensaje de error del hook */}
        {error && <p className="text-red-600">{error}</p>}

        {/* Sección: Producto y SEO - componente reutilizable */}
        <ProductoSeoSection blog={form} setBlog={setForm} />
        
        {/* Sección: Imágenes - componente reutilizable */}
        <ImagenesSection blog={form} setBlog={setForm} />
        
        {/* Sección: Video - componente reutilizable */}
        <VideoSection blog={form} setBlog={setForm} />
        
        {/* Sección: Contenido del blog - componente reutilizable */}
        <ContenidoBlog blog={form} setBlog={setForm} />

        {/* Botones de acción - usando componentes Button del proyecto */}
        <div className="grid grid-cols-2 gap-10 mt-8 p-4 border-t">
          <Button 
            type="submit" 
            variant="tertiary" 
            className="flex-1"
          >
            {isLoading ? <Loader /> : "Actualizar Blog"}
          </Button>

          <Button 
            type="button" 
            variant="primary" 
            onClick={handleClose}
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBlogModal;
