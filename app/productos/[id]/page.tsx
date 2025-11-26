'use client';

import HeroSection from "@/components/organisms/productos/detalle/HeroSection";
import ListaDetalleSection from "@/components/organisms/productos/detalle/ListaDetalleSection";
import InformacionSection from "@/components/organisms/productos/detalle/InformacionSection";
import CotizaSection from "@/components/organisms/productos/detalle/CotizaSection";
import heroBackground from "@/assets/productos/detalle/productoDetalle.jpg";
import especificacionProducto from "@/assets/productos/detalle/especificacionProducto.jpg";
import beneficioProducto from "@/assets/productos/detalle/beneficioProducto.jpg";

import { useParams } from "next/navigation";

const productData = {
	name: "LETREROS NEÓN LED",
	heroImage: heroBackground.src,
	specImage: especificacionProducto.src,
	benefImage: beneficioProducto.src,
	specs: [
		"Iluminación LED de bajo consumo.",
		"Amplia gama de colores personalizados.",
		"Material PVC flexible y resistente."
	],
	benef: [
		"Aporta estilo y personalidad al negocio.",
		"Ideales para destacar mensajes o productos.",
		"Crea atmosferas visuales unicas.",
		"Bajo consumo electrico."
	],
	info: "Los Letreros Neón LED combinan tecnología moderna con un diseño atractivo y personalizable. Son ideales para dar personalidad a espacios comerciales, destacar frases, logos o crear ambientes visuales únicos. Ofrecen el efecto del neón clásico, pero con menor consumo, mayor seguridad y durabilidad. Fáciles de instalar en interiores, funcionan conectados a corriente eléctrica y se adaptan al estilo de cada marca, transmitiendo una estética creativa, moderna o acogedora según lo que se quiera comunicar."
};

export default function ProductoDetallePage() {
	const params = useParams<{ id: string }>();
	console.log("id", params.id);

	const product = productData;

	return (
		<main>
			<HeroSection productName={product.name} backgroundImage={product.heroImage} />
			<ListaDetalleSection
				text="ESPECIFICACIONES"
				listItems={product.specs}
				imageSrc={product.specImage} />
			<InformacionSection info={product.info} />
			<ListaDetalleSection
				text="BENEFICIOS"
				listItems={product.benef}
				imageSrc={product.benefImage}
				reverse={true}
			/>
			<CotizaSection/>
			
		</main>
	);
}
