"use client";

import Logo from "@/components/atoms/Logo";
import NavMenu from "@/components/molecules/header/NavMenu";
import UserSection from "@/components/molecules/header/UserSection";
import { IoMenu, IoClose } from "react-icons/io5";
import ContactBlock from "../molecules/footer/ContactBlock";
import NavMenuMobil from "../molecules/header/NavMenuMobil";
export default function Header() {
  

  return (
    <>
      <header
        className={`hidden md:flex sticky top-0 z-50 items-center px-16 py-5 h-24 
          transition-all duration-300 bg-white shadow-md`}>

        <div className="flex flex-col items-center w-56">
          <Logo src="/logo.svg" size="xl" alt="Yuntas Publicidad" />
        </div>

        <div className="flex items-center gap-x-14 ml-auto">
          <NavMenu size="lg" />
          <UserSection size="lg"  />
        </div>
      </header>
    </>
  );
}
