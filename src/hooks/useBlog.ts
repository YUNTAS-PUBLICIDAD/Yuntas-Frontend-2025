'use client';

import { useState, useCallback } from "react";
import { Blog, BlogInput, BlogServiceResponse } from "@/types/admin/blog";
import {
	getBlogsService,
	createBlogService,
	updateBlogService,
	deleteBlogService,
	getBlogBySlugService
} from "@/services/blogService";

interface UseBlogsReturn {
	blogs: Blog[];
	blog: Blog | null;
	isLoading: boolean;
	error: string | null;
	getBlogs: (perPage?: number) => Promise<void>;
	getBlogBySlug: (slug: string) => Promise<void>;
	createBlog: (producto: BlogInput) => Promise<BlogServiceResponse<Blog>>;
	updateBlog: (id: number | string, Blog: BlogInput) => Promise<BlogServiceResponse<Blog>>;
	deleteBlog: (id: number | string) => Promise<BlogServiceResponse>;
	clearError: () => void;
	clearBlog: () => void;
}

export function useBlogs(): UseBlogsReturn {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [blog, setBlog] = useState<Blog | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const clearError = () => setError(null);
    const clearBlog = () => setBlog(null);

	const getBlogs = useCallback(async (perPage = 10) => {
		setIsLoading(true);
		setError(null);

		const result = await getBlogsService(perPage);

		if (result.success && result.data) {
			setBlogs(result.data);
		} else {
			setError(result.message || 'Error desconocido');
		}

		setIsLoading(false);
	}, []);

	const getBlogBySlug =  useCallback(async (slug: string): Promise<void> => {
		setIsLoading(true);
		setError(null);

		const result = await getBlogBySlugService(slug);

		if (result.success && result.data) {
			setBlog(result.data);
			setIsLoading(false);
		} else {
            setError(result.message || 'Error desconocido');
            setIsLoading(false);
        }
	}, []);

	const createBlog =  useCallback(async (data: BlogInput): Promise<BlogServiceResponse<Blog>> => {
		setIsLoading(true);
		setError(null);

		const result = await createBlogService(data);

		setIsLoading(false);
		return result;
	}, []);


	const updateBlog = useCallback(async (id: number | string, data: BlogInput): Promise<BlogServiceResponse<Blog>> => {
		setIsLoading(true);
		setError(null);

		const result = await updateBlogService(id, data);

		setIsLoading(false);
		return result;
	}, []);

	const deleteBlog = useCallback(async (id: number | string): Promise<BlogServiceResponse> => {
		setIsLoading(true);
		setError(null);

		const result = await deleteBlogService(id);

		setIsLoading(false);
		return result;
	}, []);

	return {
		blogs,
		blog,
		isLoading,
		error,
		getBlogs,
		getBlogBySlug,
		createBlog,
		updateBlog,
		deleteBlog,
		clearError,
		clearBlog,
	};
}