"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TestimonialCard from "@/components/molecules/inicio/TestimonialCard";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";
import { testimonialsData } from "@/data/inicio/testimonialsData";
import testimonialsBg from "@/assets/inicio/testimonialbackground.webp";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialsSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="w-full bg-white py-0 px-0">
     
      <div className="w-full bg-[#18BFE3] py-4 md:py-6 px-4 md:px-16">
        <Text variant="caption" className="text-white font-bold text-xl md:text-4xl">
          <span className="italic font-semibold">TU OPINIÓN ES</span> IMPORTANTE<br />PARA NOSOTROS
        </Text>
      </div>

      <div className="relative w-full flex flex-col items-center justify-center px-2 md:px-8 py-6 md:py-8 mb-8">
       
        <div 
          className="w-full rounded-2xl md:rounded-3xl overflow-visible relative flex items-center justify-center mt-8 md:mt-20 pb-20 md:pb-24" 
          style={{ 
            backgroundImage: `url(${testimonialsBg.src})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'bottom', 
            backgroundRepeat: 'no-repeat', 
            
            minHeight: '500px' 
          }}
        >
          
          <div className="absolute inset-0 bg-black/10 rounded-3xl" />

          
          <div className="relative w-full max-w-[1400px] py-6 md:py-10 z-10 px-2 md:px-4">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30} 
              slidesPerView={1} 
              pagination={{ clickable: true, dynamicBullets: true }} 
              autoplay={{ delay: 3500, disableOnInteraction: false }} 
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1, // Móvil 
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2, // Tablet
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3, // Escritorio
                  spaceBetween: 40,
                },
              }}
              className="mySwiper !pb-12 md:!pb-14" 
            >
              {testimonialsData.map((t, idx) => (
                <SwiperSlide key={idx} className="flex justify-center pt-8 md:pt-12">
                  
                  <div className="flex justify-center w-full">
                    <TestimonialCard {...t} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

         
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex justify-center z-20 w-full px-4 md:px-6">
            <Button 
              variant="primary" 
              size="lg" 
              className="px-8 md:px-16 py-3 md:py-4 text-base md:text-xl rounded-full shadow-xl font-bold tracking-wide w-full md:w-auto max-w-md md:max-w-none"
              onClick={() => router.push('/contacto')}
            >
              ¡COTIZA AHORA!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;