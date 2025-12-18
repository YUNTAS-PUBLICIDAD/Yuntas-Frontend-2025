'use client';

import HeroSection from "@/components/organisms/productos/detalle/HeroSection";
import ListaDetalleSection from "@/components/organisms/productos/detalle/ListaDetalleSection";
import InformacionSection from "@/components/organisms/productos/detalle/InformacionSection";
import CotizaSection from "@/components/organisms/productos/detalle/CotizaSection";
import { useParams } from "next/navigation";
import { useProductos } from '@/hooks/useProductos'
import { useEffect } from "react";

export default function ProductoDetallePage() {
	const params = useParams<{ slug: string }>();
	const { producto, getProductoBySlug } = useProductos();

	useEffect(() => {
		if (params.slug) {
			getProductoBySlug(params.slug);
		}
	}, []);

	return (
		<main>
			<HeroSection productName={producto?.name || ""} backgroundImage={producto?.gallery[0].url || ""} />
			<ListaDetalleSection
				text="ESPECIFICACIONES"
				listItems={producto?.specifications || []}
				imageSrc={producto?.gallery[1].url || ""} />
			<InformacionSection info={producto?.description || ""} />
			<ListaDetalleSection
				text="BENEFICIOS"
				listItems={producto?.benefits || []}
				imageSrc={producto?.gallery[2].url || ""}
				reverse={true}
			/>
			<CotizaSection />

		</main>
	);
}
