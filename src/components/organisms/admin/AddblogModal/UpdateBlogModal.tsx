'use client';

import React, { useEffect, useState } from 'react';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';

import ProductoSeoSection from './ProductoSeoSection';
import ImagenesSection from './ImagenesSection';
import VideoSection from './VideoSection';
import ContenidoBlog from './ContenidoBlog';
import { Blog } from '@/types/blog';
import {  BlogInput } from '@/types/admin/blog';
import { uptadeBlogAction } from '@/actions/blogActions';
import { buildBlogFormData } from '@/utils/blogFormData';
import { mapBlogToInput } from '@/utils/blog/mapBlogToInput';

interface Props {
  openModal: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  blog: Blog; 
}
const BLOG_INICIAL:BlogInput={
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
}
const UpdateBlogModal = ({ openModal, onClose, onSuccess, blog}: Props) => {
  const [form, setForm] = useState<BlogInput>(BLOG_INICIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 convertir Blog → BlogInput
  useEffect(() => {
    setForm(mapBlogToInput(blog));
  }, [blog]);

  if (!form) return null; // evita errores de undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = buildBlogFormData(form);


      const result = await uptadeBlogAction(blog.id,formData);

      if (!result.success) {
        setError(result.message ?? "Error al actualizar");
        return;
      }

      onSuccess?.();
      onClose();
    } catch {
      setError("Error inesperado");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title="Actualizar blog" size="lg" isOpen={openModal} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6 h-[70vh] overflow-y-auto">

        {error && <p className="text-red-600">{error}</p>}

        <ProductoSeoSection blog={form} setBlog={setForm} />
        <ImagenesSection blog={form} setBlog={setForm} />
        <VideoSection blog={form} setBlog={setForm} />
        <ContenidoBlog blog={form} setBlog={setForm} />

        <div className="flex gap-3 pt-4 border-t">
          <Button type="submit" variant="success" disabled={isSubmitting}>
            {isSubmitting ? <Loader /> : "Actualizar"}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateBlogModal;
