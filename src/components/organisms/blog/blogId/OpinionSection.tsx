import React from "react";
import { Blog } from "@/types/admin/blog";
import Banner from "@/components/atoms/Banner";
import Text from "@/components/atoms/Text";
import Img from "@/components/atoms/Img";
import OpinionCard from "@/components/molecules/blog/OpinionCard";
import { BASE_URL } from "@/config";
import { getImg } from '@/utils/getImg'

type OpinionSectionProps = {
  data: Blog;
};

const OpinionSection = ({ data }: OpinionSectionProps) => {

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

          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${getImg(data.main_image?.url)})` }}
          />
        

        <div className="relative z-10 w-full h-full flex px-4 py-8 md:px-8 md:py-12">
          <div className="relative z-20 w-full top-20 md:max-w-md md:ml-8 lg:ml-16 md:top-1/2 md:left-40">
            <OpinionCard description={data.paragraphs?.[1] ?? ""} />
          </div>

            <div
              className="absolute -translate-y-1/2 right-5 top-20
                         md:top-1/2 md:left-1/2 md:-translate-x-1/4 md:right-auto
                         w-[400px] h-[280px]
                         md:w-[800px] md:h-[500px] z-0"
            >
              <Img
                src={ getImg(data.gallery[2]?.url) || ""}
                classname="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
            </div>
        </div>
      </div>
    </section>
  );
};

export default OpinionSection;
