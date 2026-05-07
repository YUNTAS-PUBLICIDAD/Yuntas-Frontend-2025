import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

export default function CotizaSection() {
	return (
		<section className="w-full relative overflow-hidden">
			<div className="relative bg-gradient-to-r from-[#203565] via-[#1a2d5a] to-[#0f2048] py-20 md:py-28 px-4 md:px-8">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(35,193,222,0.2),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(35,193,222,0.15),transparent_30%)]" />
				
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#23C1DE]/50 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#23C1DE]/50 to-transparent" />

				<div className="container mx-auto relative z-10">
					<div className="flex flex-col items-center text-center">
						<Text variant="h2" color="text-white" className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
							¿Encontraste lo que buscabas?
						</Text>
						
						<p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-8">
							Cotiza ahora y lleva tu marca al siguiente nivel. Te respondemos en el menor tiempo posible.
						</p>

						<Link href="/contacto">
							<Button 
								variant="secondary" 
								size="lg" 
								icon={<MdArrowForward className="text-xl" />}
								className="w-full sm:w-auto"
							>
								COTIZAR AHORA
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}