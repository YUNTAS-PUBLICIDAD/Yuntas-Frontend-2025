import React from 'react'
import Text from '@/components/atoms/Text'
import { StaticImageData } from 'next/image'
import Img from '@/components/atoms/Img'
type ProductoCardProps = {
  img: StaticImageData,
  nombre: string
}

const ProductoCard = ({ img, nombre }: ProductoCardProps) => {
  return (
    <article className=" bg-white rounded-3xl shadow-xl cursor-pointer hover:scale-105 transition duration-300" >
      <Img src={img}  variant='productoCard' />
      <Text className='pt-3 pl-5 pb-8 font-bold'>{nombre}</Text>
    </article>
  )
}

export default ProductoCard
