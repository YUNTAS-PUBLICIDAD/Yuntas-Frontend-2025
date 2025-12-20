import React from 'react'
import { Blog } from '@/types/admin/blog'
import Text from '@/components/atoms/Text'
import Banner from '@/components/atoms/Banner'
import Img from '@/components/atoms/Img'
import { getImg } from '@/utils/getImg'

type DescripcionSectionProps = {
  data: Blog
}

const DescripcionSection = ({ data }: DescripcionSectionProps) => {
  return (
    <section className="flex flex-col gap-20 py-20">
      
      <Text
        variant="banner"
        className="font-bold text-center text-3xl uppercase"
      >
        {data.meta_title}
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2">
        
        <Banner
          color="bg-[#E2F6F6]"
          className="h-auto p-4 font-normal md:text-2xl md:px-20 word-spacing-[4px] leading-relaxed"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: data.paragraphs?.[0] ?? "",
            }}
          />
        </Banner>

        <Img
          src={getImg(data.gallery?.[0]?.url)}
          classname=""
        />
      </div>
    </section>
  )
}

export default DescripcionSection
