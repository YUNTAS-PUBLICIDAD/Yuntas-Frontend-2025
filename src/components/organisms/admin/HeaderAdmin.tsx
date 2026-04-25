"use client";

import UserSection from "@/components/molecules/header/UserSection";
import { useScroll } from "@/hooks/useScroll";
import NavMenuAdmin from "./NavMenuAdmin";
import SwitchMode from "@/components/molecules/admin/SwitchMode";

type HeaderProps = {
  className?: string;
};

export default function HeaderAdmin({ className = "" }: HeaderProps) {
  const scrolled = useScroll(80);

  return (
    <header
      className={`hidden md:flex sticky top-0 w-full z-50 items-center justify-between px-16 h-24
        transition-all duration-500 ${className} bg-white/95 backdrop-blur-md shadow-md dark:bg-[#141A3F]/95 dark:shadow-none`}
    >
      {/* Nav links  */}
      <div className="flex items-center gap-x-6 xl:gap-x-10">
        <NavMenuAdmin scrolled={scrolled} />
      </div>

     
      <div className="flex items-center gap-x-6"> 

        {/* Switch */}
        <div className="rounded-full border-2 border-gray-300 dark:border-white/30 p-0.5">
          <SwitchMode />
        </div>

        {/* Texto + avatar */}
        <div className="flex items-center gap-3"> 
          <div className="text-right hidden xl:block">
            <p className="text-xs text-[#5A6B93] dark:text-white/60 leading-none">
              Bienvenido
            </p>
            <p className="text-sm font-semibold text-[#203565] dark:text-white">
              Administrador
            </p>
          </div>
          <UserSection size="lg" />
        </div>

      </div>
    </header>
  );
}