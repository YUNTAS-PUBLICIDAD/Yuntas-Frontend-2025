import { Blog } from "@/types/admin/blog";
import Text from "@/components/atoms/Text";
import Img from "@/components/atoms/Img";
import InfoCard from "@/components/molecules/InfoCard";

const BeneficiosSection = ({ blog }: { blog: Blog }) => {
	const imgDesc = blog?.gallery.filter(e => e.slot === "Benefits")[0];
	const imgUrl = imgDesc?.url || blog?.main_image?.url || "";
	const imgAlt = imgDesc?.alt || blog?.main_image?.alt || blog?.title;
	const imgTitle = imgDesc?.title || blog?.main_image?.title || blog?.title;

	return (
		<section className="flex flex-col gap-20 px-5 pb-10">
			<Text variant="subtitle" className="text-center font-medium">
				{blog.cover_subtitle}
			</Text>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<Img
					src={imgUrl}
					alt={imgAlt}
					title={imgTitle}
					classname="w-full h-full object-cover rounded-lg"
				/>

				<div className="flex flex-col gap-10 justify-center">
					<Text variant="caption" className="uppercase font-medium">
						Beneficios Clave
					</Text>

					{blog.benefits && blog.benefits.map((e, i) => (
						<InfoCard key={i} text={e} />
					))}
				</div>
			</div>
		</section>
	);
};

export default BeneficiosSection;
