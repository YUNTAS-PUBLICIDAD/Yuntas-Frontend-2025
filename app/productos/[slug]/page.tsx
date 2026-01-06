import HeroSection from "@/components/organisms/productos/detalle/HeroSection";
import ListaDetalleSection from "@/components/organisms/productos/detalle/ListaDetalleSection";
import InformacionSection from "@/components/organisms/productos/detalle/InformacionSection";
import CotizaSection from "@/components/organisms/productos/detalle/CotizaSection";
import ProductoDetallePopup from "@/components/organisms/productos/detalle/ProductoDetallePopup";

import { productosDetalleData } from "@/data/productos/detalle/productosDetalleData";
import { notFound } from "next/navigation";

/**
 * ✅ OBLIGATORIO para output: 'export'
 * Aquí Next sabe qué páginas generar
 */
export function generateStaticParams() {
  return Object.keys(productosDetalleData).map(slug => ({
    slug,
  }));
}

export default function ProductoDetallePage({
  params,
}: {
  params: { slug: string };
}) {
  const producto = productosDetalleData[params.slug];

  if (!producto) {
    notFound();
  }

  return (
    <main>
      <HeroSection
        productName={producto.name}
        backgroundImage={producto.heroImage}
      />

      <ListaDetalleSection
        text="ESPECIFICACIONES"
        listItems={producto.specs}
        imageSrc={producto.specImage}
        imageAlt={`Especificaciones de ${producto.name}`}
      />

      <InformacionSection info={producto.info} />

      <ListaDetalleSection
        text="BENEFICIOS"
        listItems={producto.benef}
        imageSrc={producto.benefImage}
        imageAlt={`Beneficios de ${producto.name}`}
        reverse
      />

      <CotizaSection />

      <ProductoDetallePopup imgSrc={producto.heroImage} />
    </main>
  );
}
