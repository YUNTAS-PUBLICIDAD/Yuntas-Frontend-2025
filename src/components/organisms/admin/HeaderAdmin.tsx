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
      className={`hidden lg:flex sticky top-0 w-full z-50 items-center px-8 xl:px-10 2xl:px-16 h-24
        transition-all duration-500 ${className} bg-white/95 backdrop-blur-md shadow-md dark:bg-[#141A3F]/95 dark:shadow-none`}
    >
      {/* Nav links  */}
      <div className="flex min-w-0 flex-1 items-center justify-start pr-3 xl:pr-6">
        <NavMenuAdmin scrolled={scrolled} />
      </div>

     
      <div className="ml-auto flex items-center gap-x-4 xl:gap-x-6"> 

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