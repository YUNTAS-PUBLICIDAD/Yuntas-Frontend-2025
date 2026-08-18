"use client"

import React, { useEffect, useState } from 'react'
import Text from '@/components/atoms/Text'
import Link from 'next/link'
import Img from '@/components/atoms/Img'
import { FiImage } from 'react-icons/fi'
type ProductoCardProps = {
  imgUrl: string,
  imgTitle: string,
  imgAlt: string,
  nombre: string,
  href?: string,
}

const ProductoCard = ({ imgUrl, imgTitle, imgAlt, nombre, href }: ProductoCardProps) => {
  const [hasImageError, setHasImageError] = useState(false)
  const showImage = Boolean(imgUrl) && !hasImageError

  useEffect(() => {
    setHasImageError(false)
  }, [imgUrl])

  return (
    // Tarjeta con ancho completo responsive y overflow-hidden para contener la imagen
    <Link href={href || '#'} className="group w-full max-w-[700px] mx-auto bg-white rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      
      {/* mb-4 agrega margen inferior para separar la imagen del texto */}
      <div className="w-full aspect-[16/10] flex items-center justify-center mb-4 overflow-hidden">
        {showImage ? (
          <Img
            src={imgUrl}
            title={imgTitle}
            alt={imgAlt}
            classname='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
            variant='productoCard'
            priority={false}
            quality={80}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 text-slate-400 transition-transform duration-700 group-hover:scale-105">
            <div className="rounded-full bg-white/80 p-4 shadow-sm">
              <FiImage className="text-4xl" aria-hidden="true" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Imagen no disponible</p>
              <p className="mt-1 text-xs text-slate-400">{nombre}</p>
            </div>
          </div>
        )}
      </div>
      {/* textp a al izquierda*/}
      
      <div className="py-6 px-6 text-left">
        <Text className='font-bold !text-xl uppercase tracking-wide group-hover:text-[#18879B] transition-colors'>{nombre}</Text>
      </div>
    </Link>
  )
}

export default ProductoCard
