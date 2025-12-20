'use client';

import React, { useEffect, useState } from 'react';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';

import ProductoSeoSection from './ProductoSeoSection';
import ImagenesSection from './ImagenesSection';
import VideoSection from './VideoSection';
import ContenidoBlog from './ContenidoBlog';
import { Blog } from '@/types/admin/blog';
import {  BlogInput } from '@/types/admin/blog';
import { mapBlogToInput } from '@/utils/blog/mapBlogToInput';
import { useRouter } from 'next/navigation';
import { useBlogs } from '@/hooks/useBlog';
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
const UpdateBlogModal = ({ openModal, onClose, blog, onSuccess }: Props) => {
  const [form, setForm] = useState<BlogInput>(BLOG_INICIAL);
  const {updateBlog,isLoading,error}=useBlogs();
  const router = useRouter();

  useEffect(() => {
  if (openModal && blog) {
    setForm(mapBlogToInput(blog));
  }
  }, [openModal, blog]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateBlog(blog.id,form);
    if (success) {
      alert("Blog actualizado correctamente");
      onSuccess?.(); 
      onClose();
    } else {
      alert("Error al actualizar el blog");
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
          <Button type="submit" variant="tertiary" >
            {isLoading ? <Loader /> : "Actualizar"}
          </Button>
          <Button type="button" variant="primary" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateBlogModal;
