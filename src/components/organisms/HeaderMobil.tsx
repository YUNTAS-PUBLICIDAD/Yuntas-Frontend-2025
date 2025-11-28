'use client'
import React from 'react'
import { useEffect,useState } from 'react';
import { IoMenu, IoClose } from "react-icons/io5";
import ContactBlock from "../molecules/footer/ContactBlock";
import NavMenuMobil from "../molecules/header/NavMenuMobil";
import UserSection from '../molecules/header/UserSection';
import ContactoMobil from '../molecules/header/ContactoMobil';
const HeaderMobil = () => {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
    <>
    <header
        className={` md:hidden fixed top-0 left-0 right-0 z-50 px-6 py-4 
                    flex justify-between items-center transition-all duration-300
                    ${open?"hidden":""} ${isScrolled ? "bg-white shadow-md" : "bg-transparent shadow-none"}`}>
        <button onClick={() => setOpen(!open)}
          className="text-3xl text-gray-700">
          {open ? <IoClose  /> : <IoMenu className={!isScrolled? "text-white":"text-blue-900"}/>}
        </button>
        <UserSection size="md" color={!isScrolled?"bg-white":"bg-blue-900"}fill={!isScrolled?"":"white"} />
      </header>

      <div className={`
          md:hidden fixed inset-0 bg-[#0B0B1F] z-40 text-white 
          transform transition-transform duration-500 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} `}>
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 left-6 text-4xl text-white hover:text-red-700 transition-all">
          <IoClose />
        </button>

        <div className="mt-32 ">
          <NavMenuMobil size="md" variant="mobile" />
          <div className="mt-20 ml-5">
            <ContactoMobil />
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderMobil