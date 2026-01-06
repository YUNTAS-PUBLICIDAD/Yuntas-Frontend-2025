import React from "react";
import { BlogView } from "@/types/admin/blog";
import Text from "@/components/atoms/Text";
import Banner from "@/components/atoms/Banner";
import Img from "@/components/atoms/Img";
import { getImg } from "@/utils/getImg";

type Props = {
  data: BlogView;
};

const DescripcionSection = ({ data }: Props) => {
  // 🔹 Título: backend usa meta_title, estático usa title
  const title =
    "meta_title" in data && data.meta_title
      ? data.meta_title
      : data.title;

  // 🔹 Texto principal
  const content =
    "paragraphs" in data && data.paragraphs?.length
      ? data.paragraphs[0]
      : "content" in data && data.content
      ? data.content
      : "";

  // 🔹 Imagen principal
  const imageUrl =
    "gallery" in data && data.gallery?.length
      ? getImg(data.gallery[0]?.url)
      : "main_image" in data
      ? getImg(data.main_image?.url)
      : "";

  return (
    <section className="flex flex-col gap-20 py-20">
      <Text
        variant="banner"
        className="font-bold text-center text-3xl uppercase"
      >
        {title}
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <Banner
          color="bg-[#E2F6F6]"
          className="h-auto p-4 font-normal md:text-2xl md:px-20 word-spacing-[4px] leading-relaxed"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </Banner>

        {imageUrl && (
          <Img
            src={imageUrl}
            classname=""
          />
        )}
      </div>
    </section>
  );
};

export default DescripcionSection;
