'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { getImg } from '@/utils/getImg';

interface BlogImage {
  url: string;
  alt?: string | null;
}

interface BlogImageCarouselProps {
  item: BlogImage[];
}

const BlogImageCarousel: React.FC<BlogImageCarouselProps> = ({ item }) => {
  if (!item || item.length === 0) return null;


  if (item.length === 1) {
    return (
      <img
        src={getImg(item[0].url)}
        alt={item[0].alt ?? "Imagen"}
        className="w-full max-w-[120px] h-20 object-cover rounded-lg shadow-md"
      />
    );
  }

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      autoplay={{ delay: 2000 }}
      pagination={{ clickable: true }}
      className="w-full max-w-[120px] h-20"
    >
      {item.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={getImg(image.url)}
            alt={image.alt ?? `Imagen ${index + 1}`}
            className="w-full h-20 object-cover rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BlogImageCarousel;

