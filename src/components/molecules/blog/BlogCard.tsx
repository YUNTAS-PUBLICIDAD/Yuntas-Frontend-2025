import React from 'react'
import { StaticImageData } from 'next/image'
import Text from '@/components/atoms/Text'
import Img from '@/components/atoms/Img'

type BlogCardProps = {
  img: StaticImageData,
  nombre: string,
  descripcion: string
}

const BlogCard = ({ img, nombre, descripcion }: BlogCardProps) => {
  return (
    <article className="w-full max-w-[400px] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Imagen con aspect ratio fijo */}
      <div className='relative w-full aspect-[4/3] overflow-hidden'>
        <Img 
          src={img} 
          variant='blogCard'
          classname='w-full h-full object-cover'
        />
      </div>

      {/* Contenido con padding consistente */}
      <div className='p-4 sm:p-5 space-y-2'>
        <Text 
          variant='subtitle' 
          className='font-bold line-clamp-2 min-h-[3.5rem]'
        >
          {nombre}
        </Text>
        <Text 
          variant='body' 
          className='text-gray-600 line-clamp-3'
        >
          {descripcion}
        </Text>
      </div>
    </article>
  )
}

export default BlogCard