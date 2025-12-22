import React from 'react'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import { Blog } from '@/types/admin/blog'
import { getYoutubeEmbed } from '@/types/getYoutubeEmbed'
type VideoSectionProps={
    data:Blog
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
        <Button  className='w-full md:w-[344px] rounded-3xl text-white mx-auto bg-[#23C1DE]'
        size='md'>!cotiza ahora¡</Button>
    </section>
  )
}

export default VideoSection