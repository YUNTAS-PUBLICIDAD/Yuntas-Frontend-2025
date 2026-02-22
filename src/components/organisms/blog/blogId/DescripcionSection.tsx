import React from "react";
import { Blog } from "@/types/admin/blog";
import Text from "@/components/atoms/Text";
import Banner from "@/components/atoms/Banner";
import Img from "@/components/atoms/Img";
import { renderLinkMarkers } from "@/utils/renderLinkMarkers";

const DescripcionSection = ({ blog }: { blog: Blog }) => {
	const imgDesc = blog.gallery.filter(e => e.slot === "Desc")[0];
	const imgUrl = imgDesc?.url || blog.main_image?.url || "";
	const imgAlt = imgDesc?.alt || blog.main_image?.alt || blog.title;
	const imgTitle = imgDesc?.title || blog.main_image?.title || blog.title;

	return (
		<section className="flex flex-col gap-20 py-20">
			<Text
				variant="banner"
				className="font-bold text-center text-3xl uppercase"
			>
				{blog.title}
			</Text>

			<div className="grid grid-cols-1 md:grid-cols-2">
				<Banner
					color="bg-[#E2F6F6]"
					className="h-auto p-4 font-normal md:text-2xl md:px-20 word-spacing-[4px] leading-relaxed"
				>
					<div>
						{renderLinkMarkers(blog.description || "")}
					</div>
				</Banner>

				<Img
					src={imgUrl}
					alt={imgAlt}
					title={imgTitle}
				/>
			</div>
		</section>
	);
};

export default DescripcionSection;
