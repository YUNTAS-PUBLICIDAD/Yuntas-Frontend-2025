'use client';

import HeroSection from "@/components/organisms/productos/detalle/HeroSection";
import heroBackground from "@/assets/productos/detalle/productoDetalle.jpg";
import EspecificacionesSection from "@/components/organisms/productos/detalle/EspecificacionesSection";
import especificacionProducto from "@/assets/productos/detalle/especificacionProducto.jpg";

import { useParams } from "next/navigation";

const productData = {
  name: "LETREROS NEÓN LED",
  heroImage: heroBackground.src,
  specImage: especificacionProducto.src,
  specs: [
    "Iluminación LED de bajo consumo.",
    "Amplia gama de colores personalizados.",
    "Material PVC flexible y resistente."
  ]
};

export default function ProductoDetallePage() {
  const params = useParams<{ id: string }>();
  console.log("id", params.id);

  const product = productData;

  return (
    <main>
      <HeroSection productName={product.name} backgroundImage={product.heroImage} />
      <EspecificacionesSection
        specs={product.specs}
        imageSrc={product.specImage} />
    </main>
  );
}
