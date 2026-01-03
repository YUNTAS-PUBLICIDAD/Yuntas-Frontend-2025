import Banner from "@/components/atoms/Banner"
import Text from "@/components/atoms/Text"
export default function InformacionSection({ info }: { info: string }) {
	return (
		<section className="w-full">
			<Banner color='bg-[#E2F6F6]' className='flex flex-col h-auto gap-4 md:gap-6 py-16 md:py-28 font-normal text-2xl '>
				<Text variant="h2" color="text-[#203565]" className="font-bold mb-6 md:mb-12">INFORMACIÓN</Text>
				<div className="max-w-5xl px-8 md:px-0">
					<Text variant="caption" color="text-[#00031E]" className="text-justify font-normal leading-relaxed">
						{info}
					</Text>
				</div>

			</Banner>
		</section>
	)
}
