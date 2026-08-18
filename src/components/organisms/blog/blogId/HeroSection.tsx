'use client'

import React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Img from '@/components/atoms/Img'

interface HeroSectionProps {
  url: string
  imageAlt: string
  imageTitle: string
  text: string
  position?: string
}

const HeroSection = ({ url, imageAlt, imageTitle, text }: HeroSectionProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* FONDO CON IMAGEN Y OVERLAY */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {/* Imagen de Fondo */}
        {url && (
          <div className="absolute inset-0">
            <Img
              src={url}
              alt={imageAlt}
              title={imageTitle}
              classname="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00031E]/95 via-brand-blue/70 to-transparent" />

        {/* Elementos Decorativos - Círculos de fondo */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#23C1DE]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#23C1DE]/10 rounded-full blur-3xl pointer-events-none" />

        {/* CONTENIDO */}
        <div className="relative h-full flex flex-col justify-between px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-white/80 text-sm md:text-base">
            <Link 
              href="/blog"
              className="hover:text-[#23C1DE] transition-colors duration-300 font-medium"
            >
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#23C1DE] font-semibold truncate max-w-xs md:max-w-md">
              {text}
            </span>
          </div>

          {/* TÍTULO Y CONTENIDO PRINCIPAL */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit">
              <div className="w-3 h-3 rounded-full bg-[#23C1DE] animate-pulse" />
              <span className="text-[#23C1DE] text-xs md:text-sm font-bold uppercase tracking-[0.15em]">
                Artículo Destacado
              </span>
            </div>

            {/* Título Principal */}
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight md:leading-tight lg:leading-tight tracking-tight">
                {text}
              </h1>
            </div>

            {/* Línea decorativa */}
            <div className="flex items-center gap-4">
              <div className="h-1 w-16 bg-gradient-to-r from-[#23C1DE] to-transparent rounded-full" />
              <p className="text-white/70 text-sm md:text-base">
                Descubre información valiosa y consejos prácticos
              </p>
            </div>
          </div>

          {/* SCROLL INDICATOR - Solo en desktop */}
          <div className="hidden md:flex flex-col items-center gap-2 animate-bounce">
            <p className="text-white/50 text-xs uppercase tracking-wider font-semibold">Desplázate</p>
            <svg className="w-5 h-5 text-[#23C1DE]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* LÍNEA DIVISORIA CON PATRÓN */}
      <div className="h-1 bg-gradient-to-r from-brand-blue via-[#23C1DE] to-brand-blue" />
    </div>
  )
}

export default HeroSection