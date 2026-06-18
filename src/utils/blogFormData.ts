import { BlogInput } from "@/types/admin/blog";

export function buildBlogFormData(data: BlogInput): FormData {
	const formData = new FormData();

	formData.append("title", data.title);
	formData.append("slug", data.slug);
	formData.append("hero_title", data.hero_title);
	formData.append("cover_subtitle", data.cover_subtitle);
	formData.append("meta_title", data.meta_title);
	formData.append("meta_description", data.meta_description);

	formData.append("description", data.description);
	formData.append("testimonial", data.testimonial);
	formData.append("product_id", data.product_id);
	
	if (data.video_url) formData.append("video_url", data.video_url);
	
	// imagen principal
	if (data.main_image instanceof File) {
		formData.append("main_image", data.main_image);
		formData.append("main_image_title", data.main_image_title || "");
		formData.append("main_image_alt", data.main_image_alt || "");
	} else if (typeof data.main_image === "string") {
		formData.append("main_image_title", data.main_image_title || "");
		formData.append("main_image_alt", data.main_image_alt || "");
	}

	// galeria
	let galleryIndex = 0;
	data.gallery.forEach((item) => {
		if (item.image instanceof File) {
			formData.append(`gallery[${galleryIndex}][slot]`, item.slot);
			formData.append(`gallery[${galleryIndex}][image]`, item.image);
			formData.append(`gallery[${galleryIndex}][title]`, item.title || "");
			formData.append(`gallery[${galleryIndex}][alt]`, item.alt || "");
			galleryIndex++;
		} else if (typeof item.image === "string") {
			formData.append(`gallery_title[${item.slot}]`, item.title || "");
			formData.append(`gallery_alt[${item.slot}]`, item.alt || "");
		}
	});

	data.benefits
		.filter((benefit) => benefit.trim() !== "")
		.forEach((benefit, index) => {
			formData.append(`benefits[${index}]`, benefit);
		});

	// keywords
	const cleanKeywords = data.keywords.filter(k => k.trim() !== "").join(", ");
	if (cleanKeywords) formData.append("keywords", cleanKeywords);

	return formData;
}