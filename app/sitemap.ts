import { getBlogsService } from '@/services/blogService';
import { getProductosService } from '@/services/productosService';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yuntaspublicidad.com'

  // const productosResult = await getProductosService(200)
  const [productosResult, blogsResult] = await Promise.all([
    getProductosService(200),
    getBlogsService(200)
  ]);
  const productos = productosResult.success && productosResult.data ? productosResult.data : []

  const blogs = blogsResult.success && blogsResult.data ? blogsResult.data : [];


  // Rutas estáticas
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/productos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Rutas dinámicas de productos
  // Productos
  const productosRoutes: MetadataRoute.Sitemap = productos.map((producto) => {
    const date = new Date(producto.created_at);

    return {
      url: `${baseUrl}/productos/${producto.slug}`,
      lastModified: isNaN(date.getTime()) ? new Date() : date,
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  })

  // Blogs
  const blogsRoutes: MetadataRoute.Sitemap = blogs.map((blog) => {
    const date = new Date(blog.created_at);

    return {
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: isNaN(date.getTime()) ? new Date() : date,
      changeFrequency: 'monthly',
      priority: 0.7,
    }
  });


  return [...routes, ...productosRoutes, ...blogsRoutes]
}
