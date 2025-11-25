"use client";

import { useState } from "react";
import Logo from "@/components/atoms/Logo";
import NavMenu from "@/components/molecules/header/NavMenu";
import UserSection from "@/components/molecules/header/UserSection";
import { IoMenu, IoClose } from "react-icons/io5";
import ContactBlock from "../molecules/footer/ContactBlock";
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white items-center px-16 py-5 shadow h-24">
        <div className="flex flex-col items-center w-56">
          <Logo src="/logo.svg" size="xl" alt="Yuntas Publicidad" />
        </div>

        <div className="flex items-center gap-x-14 ml-auto">
          <NavMenu size="lg" />
          <UserSection size="lg" />
        </div>
      </header>

      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white px-6 py-4 shadow flex justify-between items-center">
          <button
            onClick={() => setOpen(!open)}
            className="text-3xl text-gray-700"
          >
            {open ? <IoClose /> : <IoMenu />}
          </button>

          <UserSection size="md" />
      </header>
      {open && (
        <div className="md:hidden z-40 fixed top-10 left-0 w-full h-svh bg-[#0B0B1F]  text-white shadow-lg py-6 px-3 pl-auto  ">
          <NavMenu size="md" variant="mobile" />
          <ContactBlock/>
        </div>
      )}
    </>
  );
}
