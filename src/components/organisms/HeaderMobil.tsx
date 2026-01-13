'use client';

import { useEffect, useState } from 'react';
import { IoMenu, IoClose } from "react-icons/io5";
import NavMenuMobil from "../molecules/header/NavMenuMobil";
import UserSection from '../molecules/header/UserSection';
import ContactoMobil from '../molecules/header/ContactoMobil';
import SwitchMode from '@/components/molecules/admin/SwitchMode';
import useAuth from '@/hooks/useAuth';

const HeaderMobil = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  return (
    <>
      <header
        className={`md:hidden fixed top-0 left-0 right-0 z-50 px-6 py-4 
        flex justify-between items-center transition-all duration-300
        ${open ? "hidden" : ""} 
        ${isScrolled ? "bg-white shadow-md" : "bg-transparent shadow-none"}`}
      >
        <button
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          className="text-3xl text-gray-700"
        >
          <IoMenu className={!isScrolled ? "text-white" : "text-blue-900"} />
        </button>

        <UserSection
          size="md"
          color={!isScrolled ? "bg-white" : "bg-blue-900"}
        />
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 text-white flex flex-col
        transform transition-transform duration-500 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: 'linear-gradient(180deg,#04061a 0%, #05051a 40%, #0b0b1f 100%)' }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          className="absolute top-4 right-4 text-3xl text-white hover:text-red-700 transition-all"
        >
          <IoClose />
        </button>

        <nav className="pt-16 px-6 flex-1 overflow-y-auto">
          <NavMenuMobil size="md" variant="mobile" />

          <hr className="my-6 border-white" />

          <div className="flex items-center justify-between">
            <p className="uppercase tracking-wider text-sm text-white font-semibold">
              Dark Mode
            </p>
            <SwitchMode onToggle={() => null} />
          </div>

          <hr className="my-6 border-white" />

          <div className="flex gap-3 justify-start">
            <ContactoMobil compact />
          </div>

          <hr className="my-6 border-white" />

          <div className="flex items-center gap-3">
            <UserSection size="md" color="bg-transparent" />
            <div>
              <p className="text-sm font-semibold">BIENVENIDO</p>
              <p className="text-xs opacity-60">Administrador</p>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleLogout}
              className="bg-cyan-400 text-[#04061a] px-6 py-2 rounded font-semibold text-sm uppercase tracking-wider"
            >
              Cerrar Sesión
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default HeaderMobil;