import React from 'react'
import { StaticImageData } from 'next/image'
import Text from '@/components/atoms/Text'
import Img from '@/components/atoms/Img'

type BlogCardProps = {
  img: string,
  nombre: string,
  descripcion: string
}

const BlogCard = ({ img, nombre, descripcion }: BlogCardProps) => {
  return (
    <article className="w-full h-full max-w-[400px]  mx-auto bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className='relative w-full max-h-[280px] aspect-[4/3] overflow-hidden'>
        <img 
          src={img} 
          className='w-full h-full   object-cover'
        />
      </div>
      <div className='px-2  sm:px-5 sm:py-2 sm:pb-5 '>
        <Text variant='subtitle' className=' font-bold line-clamp uppercase  '>{nombre} </Text>
        <Text variant='small' className='text-gray-600 line-clamp-3 '>{descripcion}</Text>
      </div>
    </article>
  )
}

export default BlogCard