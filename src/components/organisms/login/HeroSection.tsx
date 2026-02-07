import React from 'react'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import { imagenes } from "@/data/imagenes";
const HeroSection = () => {
  return (
<section 
  className='bg-cover bg-center bg-no-repeat w-full h-screen md:flex py-10 items-center flex-col justify-center'
  style={{ backgroundImage: `url(${imagenes.login.hero.src})` }}
>       {imagenes.login.hero.alt && <img src={imagenes.login.hero.src} alt={imagenes.login.hero.alt} title={imagenes.login.hero.title} className="sr-only" aria-hidden="false" />}
        <Heading className='text-center '>Yuntas <br/>Producciones</Heading>
        <Text variant='subtitle' className='text-white text-center font'>Te da la bienvenida</Text>
    </section>
  )
}

export default HeroSection