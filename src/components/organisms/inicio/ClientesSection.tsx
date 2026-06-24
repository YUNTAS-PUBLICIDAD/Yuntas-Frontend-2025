"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// ─── Mueve esto a /data/inicio/clientesData.ts cuando quieras ────────────────
const clientesData = [
  { id: 1, nombre: "Banco de la Nación", initials: "BN", color: "#C8102E" },
  { id: 2, nombre: "Jockey Plaza",       initials: "JP", color: "#1A1A1A" },
  { id: 3, nombre: "Mall del Sur",       initials: "MS", color: "#0057A8" },
  { id: 4, nombre: "L&K",               initials: "LK", color: "#0A7DBF" },
  { id: 5, nombre: "Crisol",            initials: "CR", color: "#F5A800" },
  { id: 6, nombre: "Coffee Shop",       initials: "CS", color: "#6B3A2A" },
  { id: 7, nombre: "Good Vibes",        initials: "GV", color: "#9333EA" },
  { id: 8, nombre: "Tu Marca",          initials: "TM", color: "#0ea5b7" },
];

// ─── Mueve esto a /data/inicio/reviewsData.ts cuando quieras ─────────────────
const reviewsData = [
  {
    name: "Breitner Alcántara", initials: "BA", color: "#0ea5b7",
    rating: 5, time: "Hace 2 meses",
    text: 'Le compramos un diseño gamer a mi hermanito y quedó encantado. La iluminación es buena y los colores intensos. El envío fue rápido y coordinamos todo por WhatsApp.',
  },
  {
    name: "Hannah Bernal", initials: "HB", color: "#9333EA",
    rating: 5, time: "Hace 2 meses",
    text: 'Pedí un cartel de "Abierto" y otro con el logo de mi tienda. Llegó todo súper bien embalado y la instalación fue facilísima. Muy buen servicio, volvería a pedir.',
  },
  {
    name: "Francesco Cortez", initials: "FC", color: "#C8102E",
    rating: 5, time: "Hace 3 meses",
    text: 'El neón llegó exacto para el cumple y quedó bien chévere. Lo del control remoto para bajar la luz es un golazo. La caja vino con un golpe pero el neón estaba intacto.',
  },
];

const statsData = [
  { value: "+50",  label: "Marcas atendidas"     },
  { value: "4.9★", label: "Satisfacción promedio" },
  { value: "100%", label: "Proyectos entregados"  },
  { value: "+3",   label: "Años de experiencia"   },
];

// ─── Componente ───────────────────────────────────────────────────────────────
const ClientesSection: React.FC = () => {
  return (
    <section className="w-full bg-white">

      {/* ── HEADER BAR — idéntico a ProjectsCarousel y TestimonialsSection ── */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#0a1a3a]"   />
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

      {/* ── DIVIDER — idéntico a ProjectsCarousel ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6DE1E3]/60 to-transparent my-6" />

      {/* ── CONTENIDO ── */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 pb-16 flex flex-col gap-12">

        {/* 1 · STATS — gradiente del header para coherencia visual */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className="
                flex flex-col items-center justify-center gap-1
                rounded-3xl py-7 px-4
                bg-gradient-to-br from-[#0a1a3a] via-[#0f2c5c] to-[#20838f]
              "
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

        {/* Micro divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6DE1E3]/30 to-transparent" />

        {/* 2 · CARRUSEL DE LOGOS — Autoplay continuo, mismo módulo que TestimonialsSwiper */}
        <div className="flex flex-col items-center gap-5">
          <p className="text-xs font-bold tracking-[0.28em] text-slate-400 uppercase">
            Empresas que confían en nosotros
          </p>

          {/* Fade lateral con mask — no necesita JS extra */}
          <div
            className="w-full"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
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
                1280: { slidesPerView: 6 },
              }}
            >
              {/* Duplicamos para que el loop no deje huecos */}
              {[...clientesData, ...clientesData].map((cliente, idx) => (
                <SwiperSlide key={`${cliente.id}-${idx}`}>
                  <div
                    className="
                      group flex flex-col items-center justify-center gap-3
                      bg-white border border-slate-200 rounded-2xl px-4 py-5
                      shadow-sm hover:shadow-md hover:-translate-y-1
                      hover:border-[#6DE1E3]/40
                      transition-all duration-300 cursor-default
                    "
                  >
                    {/*
                      Cuando tengas logos reales reemplaza este div por:
                      <Image src={cliente.src} alt={cliente.nombre} width={80} height={40}
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                    */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-base tracking-tight"
                      style={{ backgroundColor: cliente.color }}
                    >
                      {cliente.initials}
                    </div>
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-[#23C1DE] transition-colors duration-300 text-center leading-tight">
                      {cliente.nombre}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Micro divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6DE1E3]/30 to-transparent" />

        {/* 3 · RESEÑAS GOOGLE — misma anatomía que RecentProductsCard */}
        <div className="flex flex-col items-center gap-8">

          {/* Puntaje agregado */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-black text-5xl text-slate-900 leading-none">4.9</span>
              <span className="text-slate-400 font-semibold text-lg">/5</span>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="text-[#F5A800] text-xl tracking-widest">★★★★★</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                +47 reseñas verificadas en Google
              </span>
            </div>
          </div>

          {/* Tarjetas — rounded-3xl, border-slate-200, shadow-sm igual a RecentProductsCard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {reviewsData.map((review) => (
              <article
                key={review.name}
                className="
                  group
                  bg-white rounded-3xl border border-slate-200
                  overflow-hidden shadow-sm
                  transition-all duration-300
                  hover:shadow-xl hover:-translate-y-1
                  p-6 flex flex-col gap-4
                "
              >
                {/* Cabecera */}
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
                  {/* Google G */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-none"
                    style={{
                      background:
                        "conic-gradient(from -45deg, #EA4335 25%, #FBBC05 25% 50%, #34A853 50% 75%, #4285F4 75%)",
                    }}
                  >
                    G
                  </div>
                </div>

                {/* Estrellas */}
                <span className="text-[#F5A800] text-base tracking-widest">
                  {"★".repeat(review.rating)}
                </span>

                {/* Texto */}
                <p className="text-slate-600 text-sm leading-relaxed flex-1">
                  "{review.text}"
                </p>

                {/* Footer — usa #23C1DE igual que RecentProductsCard */}
                <div className="flex items-center gap-1.5 pt-3 border-t border-slate-100">
                  <svg
                    className="w-3.5 h-3.5 text-[#23C1DE]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[10px] font-semibold text-[#23C1DE] uppercase tracking-wider">
                    Reseña verificada
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientesSection;
