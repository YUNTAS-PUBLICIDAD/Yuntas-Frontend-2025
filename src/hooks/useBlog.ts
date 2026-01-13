'use client';

import { useState, useCallback } from "react";
import { Blog, BlogInput } from "@/types/admin/blog";
import { PaginationMeta, PaginationLinks } from "@/types/admin/blog";
import {
  getBlogsService,
  createBlogService,
  updateBlogService,
  deleteBlogService,
  getBlogBySlugService
} from "@/services/blogService";
import { buildBlogFormData } from "@/utils/blogFormData";

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [links, setLinks] = useState<PaginationLinks | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPerPage, setCurrentPerPage] = useState(6);

  const hasNextPage = Boolean(links?.next);
  const hasPrevPage = Boolean(links?.prev);

  // Cambio del valor por defecto de 1 a 10 para traer más blogs
  const getBlogs = useCallback(async (perPage = 10) => {
    setIsLoading(true);
    setError(null);
    setCurrentPerPage(perPage);

    const result = await getBlogsService(perPage);
    
    if (result.success && result.data) {
      setBlogs(result.data.data ?? []);
      setMeta(result.meta ?? null);
      setLinks(result.links ?? null);
    } else {
      setError(result.message ?? 'Error desconocido');
    }

    setIsLoading(false);
  }, []);

  const goToPage = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);

    const result = await getBlogsService(currentPerPage, url);

    if (result.success && result.data) {
      setBlogs(result.data.data ?? []);
      setMeta(result.meta ?? null);
      setLinks(result.links ?? null);
    } else {
      setError(result.message ?? 'Error desconocido');
    }

    setIsLoading(false);
  }, [currentPerPage]);

  const goToNextPage = () => links?.next && goToPage(links.next);
  const goToPrevPage = () => links?.prev && goToPage(links.prev);

  // Conseguir blog por su slug
  const getBlogBySlug = async (slug: string) => {
     setIsLoading(true);
     setError(null);

      const result = await getBlogBySlugService(slug);

      if (result.success && result.data) {
         setBlog(result.data ?? null);
         setIsLoading(false);
         return result.data;
       }

     setError(result.message ?? 'Error desconocido');
     setIsLoading(false);
     return null;
   }

  const createBlog = async (data: BlogInput) => {
    // Verificar que hay 3 beneficios escritos
    const beneficiosValidos = data.beneficios?.filter(b => b && b.trim() !== "") || [];

    if (beneficiosValidos.length < 3) {
      const msg = "⚠️ Por favor, completa los 3 beneficios obligatorios antes de guardar.";
      alert(msg);   
      setError(msg); 
      return false;
    }

    // Si pasa la validación, procedemos a guardar
    setIsLoading(true);
    setError(null);
    console.log("📤 DATOS ORIGINALES:", data);
  
    const formData = buildBlogFormData(data);
  
    console.log("📦 FORMDATA CONSTRUIDO:");


    const result = await createBlogService(formData);
    
    console.log("📥 RESPUESTA:", result);

    if (!result.success) setError(result.message ?? 'Error desconocido');
    setIsLoading(false);
    return result.success;
  };


  const updateBlog = async (id: number, data: BlogInput) => {
    
    const beneficiosValidos = data.beneficios?.filter(b => b && b.trim() !== "") || [];

    if (beneficiosValidos.length < 3) {
      const msg = "⚠️  Debes mantener los 3 beneficios obligatorios.";
      alert(msg);
      setError(msg);
      return false; 
    }

    
    setIsLoading(true);
    setError(null);

    const result = await updateBlogService(id, buildBlogFormData(data));

    if (!result.success) setError(result.message ?? 'Error desconocido');
    setIsLoading(false);
    return result.success;
  };

  const deleteBlog = async (id: number) => {
    setIsLoading(true);
    setError(null);

    const result = await deleteBlogService(id);

    if (!result.success) setError(result.message ?? 'Error desconocido');
    setIsLoading(false);
    return result.success;
  };

  return {
    blogs,
    blog,
    meta,
    links,
    isLoading,
    error,
    hasNextPage,
    hasPrevPage,
    getBlogs,
    goToNextPage,
    goToPrevPage,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog
  };
}