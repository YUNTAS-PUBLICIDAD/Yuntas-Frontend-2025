import React from 'react'
import { imagenes } from "@/data/imagenes";

const HeroSection = () => {
  return (
    <section
      className='absolute inset-0 bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${imagenes.login.hero.src})` }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-transparent" />

      {imagenes.login.hero.alt && (
        <img src={imagenes.login.hero.src} alt={imagenes.login.hero.alt} className="sr-only" />
      )}
    </section>
  )
}

export default HeroSection