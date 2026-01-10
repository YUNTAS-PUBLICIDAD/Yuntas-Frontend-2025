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
    <Link href={href || '#'} className="block w-full h-full max-w-[400px] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className='relative w-full aspect-[4/3] overflow-hidden'>
        <img 
          src={img} 
          alt={nombre}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='px-4 py-4'>
        <Text variant='subtitle' className='font-bold uppercase line-clamp-1'>{nombre}</Text>
        <Text variant='small' className='text-gray-600 line-clamp-3'>{descripcion}</Text>
      </div>
    </Link>
  )
}

export default BlogCard