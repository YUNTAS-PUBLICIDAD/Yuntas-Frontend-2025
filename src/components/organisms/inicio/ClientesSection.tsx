"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Yuntas+Producciones/@-12.0256654,-76.9420072,17z/data=!4m18!1m9!3m8!1s0x9105c97c8934a213:0x7f6ccb249e86b5e6!2sYuntas+Producciones!8m2!3d-12.0256654!4d-76.9420072!9m1!1b1!16s%2Fg%2F11gzs412yn!3m7!1s0x9105c97c8934a213:0x7f6ccb249e86b5e6!8m2!3d-12.0256654!4d-76.9420072!9m1!1b1!16s%2Fg%2F11gzs412yn?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D";

const clientesData = [
  {
    id: 1,
    nombre: "Banco de la Nación",
    src: "/images/clientes/banco-nacion.webp",
    bgColor: "bg-white",
    imgClass: "object-contain",
    grayscaleCard: false,
  },
  {
    id: 2,
    nombre: "Jockey Plaza",
    src: "/images/clientes/jockey-plaza.webp",
    bgColor: "bg-[#1A1A1A]",
    imgClass: "object-contain",
    grayscaleCard: false,
  },
  {
    id: 3,
    nombre: "Mall del Sur",
    src: "/images/clientes/mall-del-sur.webp",
    bgColor: "bg-white",
    imgClass: "object-contain",
    grayscaleCard: false,
  },
  {
    id: 4,
    nombre: "LYK",
    src: "/images/clientes/lyk.webp",
    bgColor: "bg-white",
    imgClass: "object-contain",
    grayscaleCard: false,
  },
  {
    id: 5,
    nombre: "Crisol",
    src: "/images/clientes/crisol.webp",
    bgColor: "bg-[#ffbf03]",
    imgClass: "object-cover",
    grayscaleCard: true,
  },
];

const reviewsData = [
  {
    name: "Gabo Sánchez",
    initials: "GS",
    color: "#1a73e8",
    rating: 5,
    time: "Hace un año",
    text: "Quedé realmente impresionado con la calidad y el impacto visual de las pantallas LED de Yuntas Producciones. Desde el primer contacto, el equipo mostró profesionalismo y atención al detalle, asegurándose de que el producto cumpliera con todas mis expectativas. La nitidez de la imagen y el brillo de la pantalla hicieron que mi evento destacara como nunca antes. Sin duda, volveré a confiar en ellos para futuros proyectos. ¡100% recomendados!",
    url: "https://maps.app.goo.gl/GrNEvVoMdYw2Mv4V8",
  },
  {
    name: "Abigayl Figueroa",
    initials: "AF",
    color: "#0ea5b7",
    rating: 5,
    time: "Hace un año",
    text: "Desde el primer contacto, su equipo fue súper amable y atento, resolviendo todas mis dudas y ayudándome a elegir el Panel PVC perfecto para mi espacio. La calidad del producto superó mis expectativas, con un acabado impecable y fácil instalación. ¡Definitivamente los recomiendo!",
    url: "https://maps.app.goo.gl/hiCx36aBAqAAnhGM7",
  },
  {
    name: "Luis D Aguilar Saldarriaga",
    initials: "HB",
    color: "#9333EA",
    rating: 5,
    time: "Hace un año",
    text: '¡Estoy muy contento con Yuntas! Tienen una gran variedad de productos LED de excelente calidad y a precios súper competitivos. Además, su atención al cliente es de 10, siempre dispuestos a ayudar y responder todas las dudas. Definitivamente seguiré confiando en ellos para mis compras. ¡Recomendadísimos!',
    url: "https://maps.app.goo.gl/oscBifu3hxTfA1xT8",
  },
];

const statsData = [
  { value: "+50",  label: "Marcas atendidas"     },
  { value: "4.9★", label: "Satisfacción promedio" },
  { value: "100%", label: "Proyectos entregados"  },
  { value: "+3",   label: "Años de experiencia"   },
];

const ClientesSection: React.FC = () => {
  return (
    <section className="w-full bg-white">

      {/* HEADER */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#0a1a3a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#6DE1E3]/10 via-transparent to-[#22c55e]/10" />
        <div className="relative flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-3 md:py-4 border-b border-white/10">
          <div className="text-left mb-2 sm:mb-0">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase">
              NUESTROS CLIENTES
            </h2>
            <p className="text-white text-xs md:text-sm lg:text-base font-bold italic uppercase tracking-wider">
              MARCAS QUE YA BRILLAN CON NOSOTROS
            </p>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6DE1E3]/60 to-transparent my-6" />

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 pb-16 flex flex-col gap-12">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 rounded-3xl py-7 px-4
                bg-gradient-to-br from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]"
            >
              <span className="text-[#6DE1E3] font-black text-3xl md:text-4xl leading-none tracking-tight">
                {stat.value}
              </span>
              <span className="text-white/70 text-xs font-semibold uppercase tracking-widest text-center mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6DE1E3]/30 to-transparent" />

        {/* CARRUSEL DE LOGOS */}
        <div className="flex flex-col items-center gap-5">
          <p className="text-xs font-bold tracking-[0.28em] text-slate-400 uppercase">
            Empresas que confían en nosotros
          </p>
          <div
            className="w-full"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              loop
              speed={3500}
              autoplay={{ delay: 0, disableOnInteraction: false }}
              allowTouchMove={false}
              breakpoints={{
                0:    { slidesPerView: 2 },
                480:  { slidesPerView: 3 },
                768:  { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
            >
              {[...clientesData, ...clientesData].map((cliente, idx) => (
                <SwiperSlide key={`${cliente.id}-${idx}`}>
                  <div className={[
                    "group relative overflow-hidden rounded-2xl border border-slate-200",
                    "shadow-sm hover:shadow-md hover:-translate-y-1",
                    "hover:border-[#6DE1E3]/40 transition-all duration-300 cursor-default aspect-[16/9]",
                    cliente.bgColor,
                    cliente.grayscaleCard ? "grayscale opacity-70 hover:grayscale-0 hover:opacity-100" : "",
                  ].join(" ")}>
                    <Image
                      src={cliente.src}
                      alt={`Logo ${cliente.nombre}`}
                      fill
                      className={[
                        cliente.imgClass,
                        "p-4 transition-all duration-300",
                        !cliente.grayscaleCard
                          ? "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                          : "",
                      ].join(" ")}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6DE1E3]/30 to-transparent" />

        {/* RESEÑAS */}
        <div className="flex flex-col items-center gap-8">

          {/* Puntaje + botón "Ver en Google" */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="font-black text-5xl text-slate-900 leading-none">4.9</span>
                <span className="text-slate-400 font-semibold text-lg">/5</span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#F5A800] text-xl tracking-widest">★★★★★</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  +47 reseñas en Google
                </span>
              </div>
            </div>

            {/* CTA → abre el perfil de Google Maps en nueva pestaña */}
            <Link
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2.5
                border border-slate-200 rounded-full
                px-5 py-2.5
                text-sm font-semibold text-slate-700
                hover:border-[#23C1DE] hover:text-[#23C1DE]
                transition-all duration-200
              "
            >
              {/* Google G */}
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-none"
                style={{ background: "conic-gradient(from -45deg, #EA4335 25%, #FBBC05 25% 50%, #34A853 50% 75%, #4285F4 75%)" }}
              >
                G
              </span>
              Ver todas las reseñas
              <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </Link>
          </div>

          {/* Tarjetas — cada una es un enlace a Google Maps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {reviewsData.map((review) => (
              <Link
                key={review.name}
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <article
                  className="
                    group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                    hover:border-[#23C1DE]/30
                    p-6 flex flex-col gap-4 h-full cursor-pointer
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-none"
                      style={{ backgroundColor: review.color }}
                    >
                      {review.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-sm leading-tight">{review.name}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{review.time}</p>
                    </div>
                    {/* Google G badge */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-none"
                      style={{ background: "conic-gradient(from -45deg, #EA4335 25%, #FBBC05 25% 50%, #34A853 50% 75%, #4285F4 75%)" }}
                    >
                      G
                    </div>
                  </div>

                  <span className="text-[#F5A800] text-base tracking-widest">
                    {"★".repeat(review.rating)}
                  </span>

                  <p className="text-slate-600 text-sm leading-relaxed flex-1">
                    "{review.text}"
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[#23C1DE]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[10px] font-semibold text-[#23C1DE] uppercase tracking-wider">
                        Reseña verificada
                      </span>
                    </div>
                    {/* Icono "abrir" que aparece en hover */}
                    <svg
                      className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#23C1DE] transition-colors duration-200"
                      fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </div>
                </article>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientesSection;