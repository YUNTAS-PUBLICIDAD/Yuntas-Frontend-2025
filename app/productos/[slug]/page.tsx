import { ProductClient } from "./ProductClient";

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

export default function Page() {
  return <ProductClient />;
}