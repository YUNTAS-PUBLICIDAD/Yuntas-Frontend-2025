"use client";

import Link from "next/link";
import Logo from "@/components/atoms/Logo";
import NavMenu from "@/components/molecules/header/NavMenu";
import UserSection from "@/components/molecules/header/UserSection";
import { useScroll } from "@/hooks/useScroll";
import NavMenuAdmin from "./NavMenuAdmin";

type HeaderProps = {
  className?: string;
};

export default function HeaderAdmin({ className = "" }: HeaderProps) {
  const scrolled = useScroll(80);
  return (
    <>
      <header
        className={`hidden md:flex fixed  top-0 lef-0 w-full z-50 items-center justify-between px-16 h-24
          transition-all duration-500 ${className} bg-white/95 backdrop-blur-md shadow-md dark:bg-[#141A3F]/95 dark:shadow-none"`}
      >
        {/*<div className="flex flex-col items-center shrink-0">*/}

          <Link href="/" className="shrink-0" aria-label="Ir a la página de inicio">
            <Logo src="/logo.svg" size="xl" alt="Yuntas Publicidad"/>
          </Link>
        {/*</div>*/}

        <div className="flex items-center gap-x-6 xl:gap-x-10">
          {/*<NavMenu size="lg" scrolled={scrolled}/>*/}
          <NavMenuAdmin scrolled={scrolled} />
          <UserSection size="lg"  />
        </div>
      </header>
    </>
  );
}
