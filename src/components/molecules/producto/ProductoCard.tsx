import React from 'react'
import Text from '@/components/atoms/Text'
import Link from 'next/link'
import Img from '@/components/atoms/Img'
type ProductoCardProps = {
  imgUrl: string,
  imgTitle: string,
  imgAlt: string,
  nombre: string,
  href?: string,
}

const ProductoCard = ({ imgUrl, imgTitle, imgAlt, nombre, href }: ProductoCardProps) => {
  return (
    // Tarjeta con ancho completo responsive y overflow-hidden para contener la imagen
    <Link href={href || '#'} className="group w-full max-w-[700px] mx-auto bg-white rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      
      {/* mb-4 agrega margen inferior para separar la imagen del texto */}
      <div className="w-full aspect-[16/10] flex items-center justify-center mb-4 overflow-hidden">
        <Img src={imgUrl} title={imgTitle} alt={imgAlt} classname='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' variant='productoCard' />
      </div>
      {/* textp a al izquierda*/}
      
      <div className="py-6 px-6 text-left">
        <Text className='font-bold text-lg uppercase tracking-wide'>{nombre}</Text>
      </div>
    </Link>
  )
}

export default ProductoCard
