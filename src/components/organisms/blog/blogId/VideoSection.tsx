import React from 'react'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import { Blog } from '@/types/admin/blog'
type VideoSectionProps={
    data:Blog
}
// utils/getYoutubeEmbed.ts
export const getYoutubeEmbed = (url?: string  | null) => {
  if (!url) return "";

  // youtu.be/ID
  if (url.includes("youtu.be/")) {
    return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
  }

  // watch?v=ID
  if (url.includes("watch?v=")) {
    return `https://www.youtube.com/embed/${url.split("watch?v=")[1]}`;
  }

  // shorts/ID
  if (url.includes("/shorts/")) {
    return `https://www.youtube.com/embed/${url.split("/shorts/")[1]}`;
  }

  // ya es embed
  if (url.includes("/embed/")) return url;

  return "";
};

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