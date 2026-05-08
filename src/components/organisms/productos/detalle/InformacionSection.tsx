import Text from "@/components/atoms/Text";
import { MdInfoOutline } from "react-icons/md";

export default function InformacionSection({ info }: { info: string }) {
	return (
		<section className="w-full py-16 md:py-24 bg-[#E2F6F6]">
			<div className="container mx-auto px-4 md:px-8">
				<div className="flex items-center gap-4 mb-10 md:mb-14">
					<div className="w-14 h-14 rounded-2xl bg-[#203565] flex items-center justify-center shadow-md">
						<MdInfoOutline className="text-3xl text-white" />
					</div>
					<div>
						<span className="text-sm uppercase tracking-[0.25em] text-[#203565] font-bold">Detalles</span>
						<Text variant="h2" color="text-[#203565]" className="font-bold">INFORMACIÓN</Text>
					</div>
				</div>

				<div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg">
					<Text variant="caption" color="text-[#00031E]" className="text-justify font-normal leading-relaxed">
						<div dangerouslySetInnerHTML={{ __html: info }} />
					</Text>
				</div>
			</div>
		</section>
	);
}