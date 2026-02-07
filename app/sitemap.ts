import { MetadataRoute } from 'next'
import { getProductosService } from '@/services/productosService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yuntaspublicidad.com'

  const productosResult = await getProductosService(200)
  const productos = productosResult.success && productosResult.data ? productosResult.data : []

  // Rutas estáticas
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/productos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Rutas dinámicas de productos
  const productosRoutes = productos.map((producto) => ({
    url: `${baseUrl}/productos/${producto.slug}`,
    lastModified: new Date(producto.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...productosRoutes]
}