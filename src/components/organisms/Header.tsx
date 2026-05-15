"use client";

import Link from "next/link";
import Logo from "@/components/atoms/Logo";
import UserSection from "@/components/molecules/header/UserSection";
import { useScroll } from "@/hooks/useScroll";
import NavMenuDesktop from "../molecules/header/NavMenuDesktop";
import { useBrandLogo } from "@/hooks/useBrandLogo";

export default function Header() {
  const scrolled = useScroll(80);
  const { logoLight, logoDark, companyName } = useBrandLogo();
  return (
    <>
      <header
        className={`hidden lg:flex fixed  top-0 lef-0 w-full z-50 items-center justify-between px-16 h-24
          transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-lg shadow-lg": "bg-transparent"}`}
      >
        {/*<div className="flex flex-col items-center shrink-0">*/}

          <Link href="/" className="shrink-0" aria-label="Ir a la página de inicio">
            <Logo src={scrolled ? logoLight : logoDark} size="xl" alt={companyName} />
          </Link>
        {/*</div>*/}

        <div className="flex items-center gap-x-6 xl:gap-x-10">
          {/*<NavMenu size="lg" scrolled={scrolled}/>*/}
          <NavMenuDesktop scrolled={scrolled} />
          <UserSection size="lg"  />
        </div>
      </header>
    </>
  );
}
