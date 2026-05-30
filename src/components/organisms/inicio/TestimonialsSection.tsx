"use client";

import Button from "@/components/atoms/Button";
import TestimonialCard from "@/components/molecules/inicio/TestimonialCard";
import { imagenes } from "@/data/imagenes";
import { testimonialsData } from "@/data/inicio/testimonialsData";
import { useRouter } from "next/navigation";
import React from "react";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import TestimonialsSwiper from "./TestimonialsSwiper";

const TestimonialsSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="w-full bg-white">

      {/*HEADER*/}
      {/*<div className="w-full bg-[#20838f] flex flex-col items-start justify-center px-6 md:px-12 lg:px-20 py-3 md:py-4 border-b-2 border-white">*/}

      {/* HEADER */}
      <div className="relative w-full overflow-hidden">

        {/* Fondo SOLO del header */}
        <div className="absolute inset-0 bg-[#0a1a3a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#6DE1E3]/10 via-transparent to-[#22c55e]/10" />

        <div className="relative flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-3 md:py-4 border-b border-white/5 backdrop-blur-sm">

          <div className="text-left mb-2 sm:mb-0">
            {/* Contenido */}
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase">
              TU OPINIÓN
            </h2>
            <p className="text-white text-sm md:text-base font-bold italic uppercase tracking-wide">
              GUÍA NUESTRAS DECISIONES !
            </p>
          </div>
        </div>
      </div>

      {/*
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#6DE1E3]/70 to-transparent my-6"></div>*/}

      {/*SECTION*/}
      <div className="w-full flex flex-col items-center justify-center px-4 md:px-12 py-16">

        {/* WRAPPER PADRE */}

        <div className="relative w-full max-w-[1400px]">

          {/*CONTENEDOR CON BLUR */}
          <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden">
            {/*Fondo blur*/}
            <div className="absolute inset-0" style={
              {
                backgroundImage: `url(${imagenes.inicio.testimonio.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }
            } />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/*Contenido*/}
            <div className="relative py-16 z-10 px-4">

              {/* SWIPER AISLADO */}
              <TestimonialsSwiper />
            </div>
          </div>

          {/*BOTON FLOTANTE*/}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex justify-center z-20 w-full px-4">
            <Button
              variant="primary"
              size="lg"
              className="px-12 md:px-20 py-4 md:py-5 text-xl md:text-2xl rounded-2xl bg-gradient-to-r from-[#6DE1E3] via-[#3ECAD0] to-[#0ea5b7] shadow-[0_10px_30px_rgba(109,225,227,0.35)] hover:shadow-[0_15px_40px_rgba(109,255,227,0.5)] font-black tracking-widest uppercase hover:scale-110 active:scale-95 transition-all duration-300"
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
