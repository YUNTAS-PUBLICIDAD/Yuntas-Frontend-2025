import React from 'react'
import Logo from '@/components/atoms/Logo';
import { HiShieldCheck, HiUsers, HiLockClosed } from 'react-icons/hi';

const HeroSection: React.FC = () => {
  return (
    <section className="relative isolate w-full h-full flex items-center justify-center overflow-hidden bg-[#061530] text-white">
      {/* Fondo */}
      <div className="absolute inset-0 z-0 bg-[#061530]" />

      {/* Gradientes */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(35,193,222,0.20),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(13,78,124,0.16),transparent_28%)]" />

      {/* Burbujas */}
      <div className="pointer-events-none absolute -top-16 -right-12 z-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(109,225,227,0.45),rgba(109,225,227,0.22)_35%,transparent_60%)] blur-2xl mix-blend-screen opacity-90" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 z-0 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(13,78,124,0.36),rgba(13,78,124,0.18)_35%,transparent_62%)] blur-2xl mix-blend-screen opacity-90" />

      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-8 px-6 py-12 lg:py-24">
        <div className="flex flex-col items-center gap-4">
          <Logo size="2xl" src="/icon.svg" alt="Yuntas Publicidad" />
          <div className="h-1 w-10 rounded bg-[#23C1DE]" />
          <p className="mt-4 max-w-md text-center text-base md:text-lg leading-relaxed text-white/85">Plataforma exclusiva para personal autorizado</p>
        </div>

        <div className="mt-10 hidden w-full max-w-2xl grid-cols-3 gap-0.5 px-0 text-white/85 md:grid lg:mt-12 lg:gap-1">
          <div className="flex min-w-0 flex-col items-center gap-2.5 text-center">
            <HiShieldCheck className="text-[24px] lg:text-[30px] xl:text-[34px] text-white/95" />
            <span className="text-[11px] md:text-xs lg:text-sm xl:text-base font-medium leading-tight">Acceso seguro</span>
          </div>

          <div className="flex min-w-0 flex-col items-center gap-2.5 text-center">
            <HiUsers className="text-[24px] lg:text-[30px] xl:text-[34px] text-white/95" />
            <span className="text-[11px] md:text-xs lg:text-sm xl:text-base font-medium leading-tight">Áreas autorizadas</span>
          </div>

          <div className="flex min-w-0 flex-col items-center gap-2.5 text-center">
            <HiLockClosed className="text-[24px] lg:text-[30px] xl:text-[34px] text-white/95" />
            <span className="text-[11px] md:text-xs lg:text-sm xl:text-base font-medium leading-tight">Información protegida</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection