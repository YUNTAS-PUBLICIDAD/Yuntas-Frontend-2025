import { BlogData } from "@/data/blog/blogData";
import { Blog } from "@/types/blog";
import ClientPage from "./ClientPage";

export default async function Page() {

 const response = await BlogData();
  const blogs :Blog[] = response.data?.data ?? [];

  return <ClientPage blogs={blogs} />;
}
