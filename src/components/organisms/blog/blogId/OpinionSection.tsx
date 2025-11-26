import React from 'react'
import { Blog } from '@/types/blog'
import Banner from '@/components/atoms/Banner'
import Text from '@/components/atoms/Text'
import Img from '@/components/atoms/Img'
import OpinionCard from '@/components/molecules/blog/OpinionCard'

type OpinionSectionProps = {
  data: Blog
}

const OpinionSection = ({ data }: OpinionSectionProps) => {
  return (
    <section>
      <Banner className="uppercase" size="small">
        <Text variant="banner" className="font-bold text-white px-20 mr-auto">
          opinion de nuestro cliente
        </Text>
      </Banner>
      <div className="relative min-h-[650px] flex items-center">
        <div className="absolute inset-0 bg-[#00031E]"></div>

        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${data.img.src})`,
          }}
        ></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
          <OpinionCard
            author={data.testimonio.autor}
            quote={data.testimonio.titulo}
            description={data.testimonio.comentario}
          />
          <div className="flex justify-center">
            <Img
              src={data.img}
              classname="w-full max-w-[650px] h-[380px] object-cover rounded-xl shadow-lg"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default OpinionSection
