import React from 'react'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import { BlogView } from '@/types/admin/blog'
import { getYoutubeEmbed } from '@/types/getYoutubeEmbed'
import Link from 'next/link'
type VideoSectionProps={
    data:BlogView
}

const VideoSection = ({data}:VideoSectionProps) => {
    const videoSrc = getYoutubeEmbed(data.video_url)
  return (
    <section className='text-center p-4  md:p-20 flex flex-col gap-5'>
        <Text variant='h2' className='font-bold'>Mira Nuestro Video</Text>
        <Text variant='body'>Descubre más detalles sobre nuestros productos y servicios</Text>
        <iframe  
            className="w-full h-[300px] md:h-[700px] rounded-2xl"
            src={videoSrc || ""}
            title="YouTube video"
            allowFullScreen>
        </iframe>
        <Link href="/contacto" className="text-blue-500 hover:underline">
          <Button  className='w-full uppercase md:w-[344px] rounded-3xl text-white mx-auto bg-[#23C1DE]'
          size='md'>cotiza ahora</Button>
        </Link>
    </section>
  )
}

export default VideoSection