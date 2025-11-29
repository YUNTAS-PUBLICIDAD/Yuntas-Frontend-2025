import React from 'react'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import heroBackground from "@/assets/inicio/heroBackground.webp"
const HeroSection = () => {
  return (
<section 
  className='bg-cover bg-center bg-no-repeat w-full h-screen md:flex py-10 items-center flex-col justify-center'
  style={{ backgroundImage: `url(${heroBackground.src})` }}
>       
        <Heading className='text-center '>Yuntas <br/>Producciones</Heading>
        <Text variant='subtitle' className='text-white text-center font'>Te da la bienvenida</Text>
    </section>
  )
}

export default HeroSection