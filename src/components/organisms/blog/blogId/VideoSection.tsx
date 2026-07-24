import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import { getYoutubeEmbed } from '@/types/getYoutubeEmbed'
import Link from 'next/link'
import { MdPlayArrow, MdArrowForward } from 'react-icons/md'

type VideoSectionProps = {
	videoUrl: string;
	subtitleVideo?: string | null;
	descriptionVideo?: string | null;
	videoSubtitle?: string | null;
	videoDescription?: string | null;
};

const VideoSection = ({ 
	videoUrl, 
	subtitleVideo, 
	descriptionVideo,
	videoSubtitle,
	videoDescription
}: VideoSectionProps) => {
	const videoSrc = getYoutubeEmbed(videoUrl)
	const activeSubtitle = subtitleVideo || videoSubtitle
	const activeDescription = descriptionVideo || videoDescription
	
	return (
		<section className='relative w-full py-6 md:py-10 bg-[#E2F6F6] overflow-hidden'>
			{/* Elementos decorativos */}
			<div className="absolute top-10 left-0 w-96 h-96 bg-[#23C1DE]/8 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
			<div className="absolute bottom-20 right-0 w-96 h-96 bg-[#203565]/6 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

			<div className='container mx-auto px-4 md:px-6 lg:px-8 relative z-10'>
				<div className="flex items-center gap-4 mb-6 md:mb-8">
					<div className="w-14 h-14 rounded-2xl bg-[#203565] flex items-center justify-center shadow-md">
						<MdPlayArrow className="text-3xl text-[#23C1DE]" />
					</div>
					<div>
						<Text variant="h2" color="text-[#203565]" className="font-bold">VIDEO DESTACADO</Text>
					</div>
				</div>
				
				{/* HEADER */}
				{(activeSubtitle || activeDescription) && (
					<div className='flex flex-col gap-4 mb-8 md:mb-12 text-center max-w-4xl mx-auto'>
						{activeSubtitle && (
							<span className='text-3xl md:text-4xl lg:text-5xl font-black text-[#23C1DE] leading-tight'>
								{activeSubtitle}
							</span>
						)}

						{activeDescription && (
							<p className='text-[#203565] text-base md:text-lg leading-relaxed'>
								{activeDescription}
							</p>
						)}
					</div>
				)}

				{/* VIDEO CONTAINER */}
				<div className='flex flex-col gap-8 items-center'>
					<div className='w-full max-w-7xl group'>
						{/* Glow effect */}
						<iframe
							className="w-full aspect-video rounded-3xl"
							src={videoSrc || ""}
							title="YouTube video"
							allowFullScreen
							loading="lazy"
						>
						</iframe>
					</div>

					{/* CTA SECTION */}
					<div className='flex flex-col gap-4 items-center'>
						<p className='text-center text-[#203565] text-base md:text-lg font-bold'>
							¿Interesado en nuestros servicios?
						</p>
						<Link href="/contacto" className="group">
							<Button 
								variant='tertiary'
								className='uppercase md:w-auto rounded-2xl'
								size='lg'
							>
								<span>Cotiza Ahora </span>
								<MdArrowForward className="text-xl group-hover:translate-x-1 inline-block transition-transform" />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default VideoSection