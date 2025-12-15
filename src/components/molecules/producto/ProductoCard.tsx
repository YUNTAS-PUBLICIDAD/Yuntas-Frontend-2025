import React from 'react'
import Text from '@/components/atoms/Text'
import { StaticImageData } from 'next/image'
import Link from 'next/link'
import Img from '@/components/atoms/Img'
type ProductoCardProps = {
  img: string,
  nombre: string,
  href?: string,
}

const ProductoCard = ({ img, nombre, href }: ProductoCardProps) => {
  return (
    // Tarjeta con ancho completo responsive y overflow-hidden para contener la imagen
    <Link href={href || '#'} className="w-full max-w-[700px] mx-auto bg-white rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
      
      {/* mb-4 agrega margen inferior para separar la imagen del texto */}
      <div className="w-full aspect-[16/10] flex items-center justify-center mb-4">
        <Img src={"http://localhost:8000" + img} classname='w-full h-full object-cover' variant='productoCard' />
      </div>
      {/* textp a al izquierda*/}
      
      <div className="py-6 px-6 text-left">
        <Text className='font-bold text-lg uppercase tracking-wide'>{nombre}</Text>
      </div>
    </Link>
  )
}

export default ProductoCard
