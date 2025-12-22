'use client';

import { useState, useCallback } from "react";
import { Blog, BlogInput } from "@/types/admin/blog";
import { PaginationMeta, PaginationLinks } from "@/types/admin/blog";
import {
  getBlogsAction,
  createBlogAction,
  updateBlogAction,
  deleteBlogAction
} from "@/actions/blogActions";
import { buildBlogFormData } from "@/utils/blogFormData";
// NOTA: Importar datos de prueba locales para desarrollo
import { blogTestData } from "@/data/blog/blogData";

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

  const getBlogs = useCallback(async (perPage = 1) => {
    setIsLoading(true);
    setError(null);
    setCurrentPerPage(perPage);

    // MODIFICADO: Usar datos locales de prueba en lugar del API backend
    // TODO: Cambiar a getBlogsAction(perPage) cuando esté disponible el backend
    setBlogs(blogTestData as Blog[]);
    setMeta({ total: blogTestData.length, per_page: perPage, from: 1, to: blogTestData.length, current_page: 1, last_page: 1 });
    setLinks({ first: null, last: null, prev: null, next: null });

    setIsLoading(false);
  }, []);

  const goToPage = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);

    const result = await getBlogsAction(currentPerPage, url);

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

//   const getBlogBySlug = async (slug: string) => {
//     setIsLoading(true);
//     setError(null);

//     const result = await getBlogBySlugAction(slug);

//     if (result.success && result.data) {
//       setBlog(result.data);
//       setIsLoading(false);
//       return result.data;
//     }

//     setError(result.message ?? 'Error desconocido');
//     setIsLoading(false);
//     return null;
//   };

  const createBlog = async (data: BlogInput) => {
    setIsLoading(true);
    setError(null);

    const result = await createBlogAction(buildBlogFormData(data));

    if (!result.success) setError(result.message ?? 'Error desconocido');
    setIsLoading(false);
    return result.success;
  };

  const updateBlog = async (id: number, data: BlogInput) => {
    setIsLoading(true);
    setError(null);

    const result = await updateBlogAction(id, buildBlogFormData(data));

    if (!result.success) setError(result.message ?? 'Error desconocido');
    setIsLoading(false);
    return result.success;
  };

  const deleteBlog = async (id: number) => {
    setIsLoading(true);
    setError(null);

    const result = await deleteBlogAction(id);

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
    // getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog
  };
}
