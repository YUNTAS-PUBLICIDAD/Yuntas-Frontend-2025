"use client";

import UserSection from "@/components/molecules/header/UserSection";
import { useScroll } from "@/hooks/useScroll";
import NavMenuAdmin from "./NavMenuAdmin";

type HeaderProps = {
  className?: string;
};

export default function HeaderAdmin({ className = "" }: HeaderProps) {
  const scrolled = useScroll(80);
  return (
    <header
      className={`hidden md:flex sticky top-0 w-full z-50 items-center justify-end px-16 h-24
        transition-all duration-500 ${className} bg-white/95 backdrop-blur-md shadow-md dark:bg-[#141A3F]/95 dark:shadow-none`}
    >
      <div className="flex items-center gap-x-6 xl:gap-x-10">
        <NavMenuAdmin scrolled={scrolled} />
        <UserSection size="lg" />
      </div>
    </header>
  );
}