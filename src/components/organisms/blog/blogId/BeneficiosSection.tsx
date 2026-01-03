import React from "react";
import { Blog } from "@/types/admin/blog";
import Text from "@/components/atoms/Text";
import Img from "@/components/atoms/Img";
import InfoCard from "@/components/molecules/InfoCard";
import { BASE_URL } from "@/config";
import { getImg } from "@/utils/getImg";
type BeneficiosSectionProps = {
  data: Blog;
};

const BeneficiosSection = ({ data }: BeneficiosSectionProps) => {
  
  return (
    <section className="flex flex-col gap-20 px-5 pb-10">
      <Text variant="subtitle" className="text-center font-medium">
        {data.meta_description}
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Img
          src={getImg(data.gallery?.[1]?.url)}
          alt={data.gallery?.[2]?.alt || ""}
          classname=""
        />

        <div className="flex flex-col gap-10 justify-center">
          <Text variant="caption" className="uppercase font-medium">
            Beneficios Clave
          </Text>

          {data.benefits.map((e, i) => (
            <InfoCard key={i} text={e} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeneficiosSection;
