"use client"
import { testimonialsData } from "@/data/inicio/testimonialsData";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import TestimonialCard from "@/components/molecules/inicio/TestimonialCard";
import './TestimonialsSection.css';
const MAX_SLISES_PER_VIEW = 3;

export default function TestimonialsSwiper() {

  const shouldLoop = testimonialsData.length > MAX_SLISES_PER_VIEW;

  return (
    <Swiper modules={[Pagination, Autoplay]} spaceBetween={24} slidesPerView={1} pagination={{ clickable: true, dynamicBullets: false }} autoplay={{ delay: 5000, disableOnInteraction: false }} rewind={!shouldLoop} loop={shouldLoop} watchOverflow breakpoints={{
      640: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 32
      }
    }} className="testimonials-swiper !pb-20">
      {
        testimonialsData.map((testimonial, i) => (
          <SwiperSlide key={i} className="!h-auto flex pt-12 px-2 pb-4">
            <div className="flex justify-center w-full h-full">
              <TestimonialCard {...testimonial} image={testimonial.image} className="h-full" />
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}
