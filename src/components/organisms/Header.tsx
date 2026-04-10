"use client";

import Link from "next/link";
import Logo from "@/components/atoms/Logo";
import NavMenu from "@/components/molecules/header/NavMenu";
import UserSection from "@/components/molecules/header/UserSection";

export default function Header() {
  return (
    <>
      <header
        className={`hidden lg:flex sticky top-0 z-50 items-center justify-between px-16 py-5 h-24
          transition-all duration-300 bg-white shadow-md`}
      >
        {/*<div className="flex flex-col items-center shrink-0">*/}

          <Link href="/" className="shrink-0" aria-label="Ir a la página de inicio">
            <Logo src="/logo.svg" size="xl" alt="Yuntas Publicidad" />
          </Link>
        {/*</div>*/}

        <div className="flex items-center gap-x-6 xl:gap-x-10">
          <NavMenu size="lg" />
          <UserSection size="lg"  />
        </div>
      </header>
    </>
  );
}
