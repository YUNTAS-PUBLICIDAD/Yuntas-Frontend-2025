'use client';

import React, { useEffect, useState } from 'react';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';

import ProductoSeoSection from './ProductoSeoSection';
import ImagenesSection from './ImagenesSection';
import VideoSection from './VideoSection';
import ContenidoBlog from './ContenidoBlog';
import { Blog, BlogInput } from '@/types/admin/blog';
import { mapBlogToInput } from '@/utils/blog/mapBlogToInput'; // Asegúrate de tener este archivo
import { useBlogs } from '@/hooks/useBlog';
import { showToast } from '@/utils/showToast';
interface Props {
  openModal: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  blog: Blog; 
}

// 1. Inicialización Correcta
const BLOG_INICIAL: BlogInput = {
  titulo: "",
  subtitulo: "",
  contenido: "",
  url_video: "",
  categorias: [], // Array de IDs
  etiqueta: {
    meta_titulo: "",
    meta_descripcion: "",
  },
  
  product: null, // CAMBIO: null en lugar de 0
  
  imagen_principal: null,
  imagen_principal_alt: "",
  imagenes: [],
  imagenes_alts: [],
  parrafos: [],
  beneficios: [],
  bloques: [],
};

const UpdateBlogModal = ({ openModal, onClose, blog, onSuccess }: Props) => {
  const [form, setForm] = useState<BlogInput>(BLOG_INICIAL);
  const { updateBlog, isLoading, error } = useBlogs();

  useEffect(() => {
    if (openModal && blog) {
      // 2. Aquí ocurre la magia: Transformamos la Entidad (BD) al Input (Formulario)
      setForm(mapBlogToInput(blog));
    } else {
      // Opcional: limpiar form al cerrar
      // setForm(BLOG_INICIAL); 
    }
  }, [openModal, blog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando formulario:", form);
    
    const success = await updateBlog(blog.id, form);
    if (success) {
      showToast.success("Blog actualizado correctamente");
      onSuccess?.(); 
      onClose();
    } else {
      // El error ya se muestra en la UI gracias a {error}
    }
  };

  return (
    <Modal title="Actualizar blog" size="lg" isOpen={openModal} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6 h-[70vh] overflow-y-auto p-1">

        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
            </div>
        )}

        {/* Pasamos 'form' y 'setForm' que coinciden con los tipos esperados */}
        <ProductoSeoSection blog={form} setBlog={setForm} />
        <ImagenesSection blog={form} setBlog={setForm} />
        <VideoSection blog={form} setBlog={setForm} />
        <ContenidoBlog blog={form} setBlog={setForm} />

        <div className="flex gap-3 pt-4 border-t mt-4 bg-white sticky bottom-0 z-10">
          <Button type="submit" variant="tertiary" className="flex-1">
            {isLoading ? <Loader /> : "Actualizar Cambios"}
          </Button>
          <Button type="button" variant="primary" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateBlogModal;