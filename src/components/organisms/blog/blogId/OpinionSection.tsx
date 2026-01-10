import React from "react";
import { BlogView } from "@/types/admin/blog";
import Banner from "@/components/atoms/Banner";
import Text from "@/components/atoms/Text";
import Img from "@/components/atoms/Img";
import OpinionCard from "@/components/molecules/blog/OpinionCard";
import { getImg } from "@/utils/getImg";
import { Blog } from "@/types/admin/blog";
type Props = {
  data: Blog;
};

const OpinionSection = ({ data }: Props) => {
  // 🔹 Imagen de fondo
  const backgroundImage =
    "main_image" in data && data.main_image?.url
      ? getImg(data.main_image.url)
      : "";

  // 🔹 Texto de opinión
  const opinionText =
    "paragraphs" in data && Array.isArray(data.paragraphs)
      ? data.paragraphs[1] ?? ""
      : "opinion" in data
      ? data.opinion ?? ""
      : "";

  // 🔹 Imagen principal
  const imageUrl =
    "gallery" in data && data.gallery?.length > 2
      ? getImg(data.gallery[2]?.url)
      : "main_image" in data && data.main_image?.url
      ? getImg(data.main_image.url)
      : "";

  if (!opinionText) return null;

  return (
    <section>
      <Banner className="uppercase" size="small">
        <Text
          variant="banner"
          className="font-bold text-white px-4 md:px-20 mr-auto"
        >
          opinión de nuestro cliente
        </Text>
      </Banner>

      <div className="relative min-h-[500px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0 bg-[#00031E]" />

        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}

        <div className="relative z-10 w-full h-full flex px-4 py-8 md:px-8 md:py-12">
          <div className="relative z-20 w-full top-20 md:max-w-md md:ml-8 lg:ml-16 md:top-1/2 md:left-40">
            <OpinionCard description={opinionText} />
          </div>

          {imageUrl && (
            <div
              className="absolute -translate-y-1/2 right-5 top-20
                         md:top-1/2 md:left-1/2 md:-translate-x-1/4 md:right-auto
                         w-[400px] h-[280px]
                         md:w-[800px] md:h-[500px] z-0"
            >
              <Img
                src={imageUrl}
                classname="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OpinionSection;
