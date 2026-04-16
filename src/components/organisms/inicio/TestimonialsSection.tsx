"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TestimonialCard from "@/components/molecules/inicio/TestimonialCard";
import Button from "@/components/atoms/Button";
import { testimonialsData } from "@/data/inicio/testimonialsData";
import { imagenes } from "@/data/imagenes";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './TestimonialsSection.css';

const TestimonialsSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="w-full bg-white">

      {/*HEADER*/}
      <div className="w-full bg-[#20838f] flex flex-col items-start justify-center px-6 md:px-12 lg:px-20 py-3 md:py-4 border-b-2 border-white">
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase">
          TU OPINIÓN
        </h2>
        <p className="text-white text-sm md:text-base font-bold italic uppercase tracking-wide">
          GUÍA NUESTRAS DECISIONES !
        </p>
      </div>


      <div className="w-full h-6 bg-[#afe3e3]"></div>

      {/*SECTION*/}
      <div className="w-full flex flex-col items-center justify-center px-4 md:px-12 py-16">

        {/* WRAPPER PADRE */}

        <div className="relative w-full max-w-[1400px]">

         {/*CONTENEDOR CON BLUR */}
         <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden">
           {/*Fondo blur*/}
          <div className="absolute inset-0 scale-110 blur-xl" style={
            {
              backgroundImage: `url(${imagenes.inicio.testimonio.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }
          }/>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/*Contenido*/}
          <div className="relative py-16 z-10 px-4">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
              }}
              className="testimonials-swiper !pb-20"
            >
              {testimonialsData.map((t, idx) => (
                <SwiperSlide key={idx} className="!h-auto flex pt-12 px-2 pb-4">
                  <div className="flex justify-center w-full h-full">
                    <TestimonialCard {...t} image={t.image} className="h-full" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/*BOTON FLOTANTE*/}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex justify-center z-20 w-full px-4">
            <Button
              variant="primary"
              size="lg"
              className="px-12 md:px-20 py-4 md:py-5 text-xl md:text-2xl rounded-2xl shadow-[0_10px_30px_rgba(35,193,222,0.4)] font-black tracking-widest uppercase hover:scale-110 active:scale-95 transition-all"
              onClick={() => router.push('/contacto')}
            >
              COTIZAR AHORA
            </Button>
          </div>
          </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
