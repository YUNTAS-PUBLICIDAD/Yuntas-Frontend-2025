'use client';
import React, { useState } from 'react';
import ContenidoBlog from './ContenidoBlog';
import ImagenesSection from './ImagenesSection';
import ProductoSeoSection from './ProductoSeoSection';
import VideoSection from './VideoSection';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';
import { BlogInput } from "@/types/admin/blog";
import { useBlogs } from "@/hooks/useBlog";
interface Props {
  openModal: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}
const BLOG_INICIAL:BlogInput={
  titulo: "",
  subtitulo: "",
  categorias: [],
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
  product: 0,
  beneficios: [],
  bloques: [],
}
const AddBlogModal = ({ openModal, onClose, onSuccess }: Props) => {
    
    const {createBlog,isLoading,error}=useBlogs();
    const [blog, setBlog] = useState<BlogInput>(BLOG_INICIAL)
    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await createBlog(blog);
        if (success) {
          console.log('Blog creado',blog)
            alert("Blog creado correctamente");
            onSuccess?.(); 
            onClose();
            setBlog(BLOG_INICIAL);
        } else {
        alert("Error al crear el blog");
        }
    };
    const handleCancel=()=>{
      onClose();
      setBlog(BLOG_INICIAL);
    }
    return (
      <Modal   size="lg" title="Agregar nuevo blog" isOpen={openModal} onClose={onClose}>
      <form onSubmit={handleCreate} className="space-y-6 overflow-y-auto h-[70vh]">
        {error && <p className="text-red-600">{error}</p>}
        
        <ProductoSeoSection blog={blog} setBlog={setBlog} />
        <ImagenesSection blog={blog} setBlog={setBlog} />
        <VideoSection blog={blog} setBlog={setBlog} />
        <ContenidoBlog blog={blog} setBlog={setBlog} />

        <div className="grid grid-cols-2 gap-10 mt-8 p-4 border-t">
          <Button 
            type="submit" 
            variant="tertiary" 
            className="flex-1">
            {isLoading ? <Loader /> : 'Crear Blog'}
          </Button>

          <Button 
            type="button" 
            onClick={handleCancel} 
            variant="primary" 
            className="flex-1">
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBlogModal;