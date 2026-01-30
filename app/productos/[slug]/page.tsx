import { ProductClient } from "./ProductClient";
import { getProductoBySlugService } from "@/services/productosService";
import { Metadata } from "next";
import { Producto } from "@/types/admin/producto";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const result = await getProductoBySlugService(params.slug);

  if (!result.success || !result.data) {
    return {
      title: "Producto no encontrado - Yuntas Publicidad",
    };
  }

  const producto: Producto = result.data;
  const title = producto.meta_title || `${producto.name} - Yuntas Publicidad`;
  const description = producto.meta_description || producto.description.substring(0, 160);
  const keywords = producto.keywords?.join(", ") || "";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: producto.gallery.map(img => ({ url: img.url, alt: img.alt || producto.name })),
    },
  };
}

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      console.error("❌ Error: NEXT_PUBLIC_API_URL no definida");
      return [];
    }

    const res = await fetch(`${apiUrl}/productos?per_page=100`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const payload = await res.json();

    let productos: any[] = [];

    if (Array.isArray(payload)) {
      productos = payload;
    }

    else if (Array.isArray(payload.data)) {
      productos = payload.data;
    }

    else if (payload.data && Array.isArray(payload.data.data)) {
      productos = payload.data.data;
    }

    if (!Array.isArray(productos)) {
      console.error("⚠️ La API respondió, pero no encontré un array de productos. Estructura recibida:", JSON.stringify(payload).substring(0, 200));
      return [];
    }

    return productos.map((producto: any) => ({
      slug: producto.slug,
    }));

  } catch (error) {
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const result = await getProductoBySlugService(params.slug);

  return <ProductClient initialProduct={result.success ? result.data || null : null} />;
}