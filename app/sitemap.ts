import { getBlogsService } from '@/services/blogService';
import { getProductosService } from '@/services/productosService';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yuntaspublicidad.com'

  let productos: any[] = [];
  let blogs: any[] = [];

  try {
    const [productosResult, blogsResult] = await Promise.all([
      getProductosService(200).catch((err) => {
        console.warn('⚠️ [Sitemap] Error al conectar con la API de productos:', err.message || err);
        return { success: false, data: [] };
      }),
      getBlogsService(200).catch((err) => {
        console.warn('⚠️ [Sitemap] Error al conectar con la API de blogs:', err.message || err);
        return { success: false, data: [] };
      })
    ]);

    if (productosResult.success && productosResult.data) {
      productos = productosResult.data;
    } else {
      console.warn('⚠️ [Sitemap] Petición de productos no exitosa:', productosResult.message || 'Sin mensaje');
    }

    if (blogsResult.success && blogsResult.data) {
      blogs = blogsResult.data;
    } else {
      console.warn('⚠️ [Sitemap] Petición de blogs no exitosa:', blogsResult.message || 'Sin mensaje');
    }
  } catch (error: any) {
    console.error('❌ [Sitemap] Error general al generar rutas dinámicas:', error.message || error);
  }


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
    {
      url: `${baseUrl}/reclamaciones`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/politicas-de-privacidad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terminos-y-condiciones`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
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
