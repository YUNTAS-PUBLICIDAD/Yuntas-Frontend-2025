import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import { getYoutubeEmbed } from '@/types/getYoutubeEmbed'
import Link from 'next/link'
import { MdPlayArrow, MdArrowForward } from 'react-icons/md'

type VideoSectionProps = {
	videoUrl: string;
};

const VideoSection = ({ videoUrl }: VideoSectionProps) => {
	const videoSrc = getYoutubeEmbed(videoUrl)
	
	return (
		<section className='relative w-full py-20 md:py-32 bg-gradient-to-br from-[#F8FBFC] via-white to-[#E8F4F8] overflow-hidden'>
			{/* Elementos decorativos */}
			<div className="absolute top-10 left-0 w-96 h-96 bg-[#23C1DE]/8 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
			<div className="absolute bottom-20 right-0 w-96 h-96 bg-[#203565]/6 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

			<div className='container mx-auto px-4 md:px-6 lg:px-8 relative z-10'>
				{/* HEADER */}
				<div className='flex flex-col gap-6 mb-12 md:mb-16 text-center max-w-2xl mx-auto'>
					<div className="flex items-center justify-center gap-3">
						<div className="relative">
							<div className="absolute inset-0 bg-[#23C1DE]/20 rounded-2xl blur-lg" />
							<div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#23C1DE] to-[#18879B] flex items-center justify-center shadow-lg">
								<MdPlayArrow className="text-2xl text-white" />
							</div>
						</div>
						<div>
							<span className="text-xs uppercase tracking-[0.2em] text-[#23C1DE] font-bold block">Contenido Multimedia</span>
							<span className="text-xs uppercase tracking-[0.2em] text-[#203565] font-bold">Video Destacado</span>
						</div>
					</div>

					<h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-[#203565] leading-tight'>
						Mira Nuestro Video
					</h2>

					<p className='text-[#00031E]/70 text-base md:text-lg leading-relaxed'>
						Descubre más detalles sobre nuestros productos y servicios. Conoce cómo podemos ayudarte a alcanzar tus objetivos.
					</p>

					<div className="h-1 w-20 bg-gradient-to-r from-[#23C1DE] to-transparent rounded-full mx-auto" />
				</div>

				{/* VIDEO CONTAINER */}
				<div className='flex flex-col gap-8 items-center'>
					<div className='w-full max-w-5xl group'>
						{/* Glow effect */}
						<div className="absolute -inset-2 bg-gradient-to-r from-[#23C1DE] to-[#18879B] rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />

						<div className='relative rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-shadow duration-300 border-2 border-[#23C1DE]/20 group-hover:border-[#23C1DE]/50 transition-colors duration-300'>
							<iframe
								className="w-full aspect-video"
								src={videoSrc || ""}
								title="YouTube video"
								allowFullScreen
								loading="lazy"
							>
							</iframe>
						</div>
					</div>

					{/* CTA SECTION */}
					<div className='flex flex-col gap-4 items-center'>
						<p className='text-center text-[#00031E]/60 text-sm md:text-base'>
							¿Interesado en nuestros servicios?
						</p>
						<Link href="/contacto" className="group">
							<Button 
								className='uppercase md:w-auto rounded-2xl text-white font-bold px-8 py-4 bg-gradient-to-r from-[#00031E] to-[#203565] hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3'
								size='lg'
							>
								<span>Cotiza Ahora</span>
								<MdArrowForward className="text-xl group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default VideoSection