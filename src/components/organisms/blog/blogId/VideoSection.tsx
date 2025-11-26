import React from 'react'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
const VideoSection = () => {
  return (
    <section className='text-center p-20 flex flex-col gap-10'>
        <Text variant='banner' className='font-bold'>Mira Nuestro Video</Text>
        <Text>Descubre más detalles sobre nuestros productos y servicios</Text>
        <iframe  
            className="w-full h-[700px] rounded-2xl"
            src="https://www.youtube.com/embed/QIb2ZcuUtkQ "
            title="YouTube video"
            allowFullScreen>
        </iframe>
        <Button  className='w-full md:w-[344px] rounded-3xl text-white mx-auto bg-[#23C1DE]'
        size='md'>!cotiza ahora¡</Button>
    </section>
  )
}

export default VideoSection