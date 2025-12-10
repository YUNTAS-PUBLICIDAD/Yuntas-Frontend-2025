
import React, { useState, useEffect } from 'react';
import { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface BlogImageCarouselProps {
  item: StaticImageData[];  
}

const BlogImageCarousel: React.FC<BlogImageCarouselProps> = ({ item }) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const totalSlides = item.length;

  useEffect(() => {
    if (swiperInstance) swiperInstance.update();
  }, [item, swiperInstance]);

  if (totalSlides <= 1) {
    return (
      <img
        src={item[0].src}
        alt="Imagen"
        className="w-full max-w-[120px] h-20 object-cover rounded-lg shadow-md"
      />
    );
  }

  return (
    <Swiper
      onSwiper={setSwiperInstance}
      modules={[Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      loop={totalSlides >= 3}
      rewind={totalSlides === 2}
      speed={800}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      className="w-full max-w-[120px] h-20 rounded-lg shadow-md"
    >
      {item.map((image, index) => (
        <SwiperSlide key={`slide-${index}`}>
          <img
            src={image.src}
            alt={`Slide ${index}`}
            className="w-full h-20 object-cover rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BlogImageCarousel;
