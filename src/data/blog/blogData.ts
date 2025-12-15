'use server'
import { getBlogsAction } from "@/actions/blogActions";
import { Blog } from "@/types/blog";


type BlogActionResponse<T> = {
  success: boolean;
  message?: string;
  data?: Blog[];           // 👈 Blog[]
};

export const BlogData = async (): Promise<BlogActionResponse<Blog[]>> => {
  return await getBlogsAction();
};