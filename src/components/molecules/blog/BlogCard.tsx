import React from 'react'
import { StaticImageData } from 'next/image'
import Text from '@/components/atoms/Text'
import Link from 'next/link'

type BlogCardProps = {
  img: string,
  nombre: string,
  descripcion: string
  href?: string,
}

const BlogCard = ({ img, nombre, descripcion, href }: BlogCardProps) => {
  return (
    <div className="group block w-full h-full max-w-[420px] mx-auto bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
      {/* Imagen con zoom effect */}
      <div className='relative w-full aspect-[16/10] overflow-hidden'>
        <img
          src={img}
          alt={nombre}
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Contenido */}
      <div className='p-6 flex flex-col h-full'>
        <div className="flex-grow">
          <Text variant='small' color="gray" className='font-bold uppercase tracking-wider mb-2 opacity-70'>{nombre}</Text>
          <Text variant='subtitle' className='font-extrabold text-[#203565] line-clamp-2 leading-tight mb-3 group-hover:text-[#23C1DE] transition-colors'>
            {descripcion}
          </Text>
        </div>

        <div className="flex items-center text-[#23C1DE] font-bold text-sm mt-4">
          <span className="mr-2 uppercase tracking-tighter">Leer más</span>
          <svg
            className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default BlogCard