import React from 'react'
import { StaticImageData } from 'next/image'
import Text from '@/components/atoms/Text'
import Img from '@/components/atoms/Img'
type ProductoCardProps = {
  img: StaticImageData,
  nombre: string,
  descripcion:string
}
const BlogCard = ({img,nombre,descripcion}:ProductoCardProps) => {
  return (
    <article className="w-[400px] bg-white rounded-3xl shadow-xl cursor-pointer hover:scale-105 transition duration-300" >
        <Img src={img}  variant='blogCard' />
        <div className='grid py-3 px-4  '>
            <Text className='  font-bold '>{nombre}</Text>
            <Text className=' line-clamp-2'>{descripcion}</Text>
        </div>
    </article>
  )
}

export default BlogCard