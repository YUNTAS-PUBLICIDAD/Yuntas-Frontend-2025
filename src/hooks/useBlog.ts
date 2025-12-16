
'use client'
import { useState,useCallback } from "react"
import { BlogInput } from "@/types/admin/blog"
import { UptadeBlogAction } from "@/actions/blogActions"
const useBLog=()=>{
    const [blog,setBlog]=useState<BlogInput>()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const updateBlog= useCallback(async (id: number | string,blog: BlogInput): Promise<boolean> => {
            setIsLoading(true);
            setError(null);
            const formData = buildProductoFormData(productoData);
            const result = await updateProductoAction(id, formData);
            if (!result.success) {
                setError(result.message || 'Error desconocido');
            }
    
            setIsLoading(false);
            return result.success;
        }, []);
    
}