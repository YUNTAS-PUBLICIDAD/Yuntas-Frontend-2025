'use client';

import HeroSection from "@/components/organisms/productos/detalle/HeroSection";
import ListaDetalleSection from "@/components/organisms/productos/detalle/ListaDetalleSection";
import InformacionSection from "@/components/organisms/productos/detalle/InformacionSection";
import CotizaSection from "@/components/organisms/productos/detalle/CotizaSection";
import { useParams } from "next/navigation";
import { productosDetalleData } from "@/data/productos/detalle/productosDetalleData";

export default function ProductoDetallePage() {
	const params = useParams<{ id: string }>();
	console.log("id", params.id);

	const id = "letreros-neon-led";
	const product = productosDetalleData[id];

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
