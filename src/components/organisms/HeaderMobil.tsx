'use client';

import { useEffect, useState } from 'react';
import { IoMenu, IoClose } from "react-icons/io5";
import Link from 'next/link';
import NavMenuMobil from "../molecules/header/NavMenuMobil";
import UserSection from '../molecules/header/UserSection';
import ContactoMobil from '../molecules/header/ContactoMobil';
import SwitchMode from '@/components/molecules/admin/SwitchMode';
import useAuth from '@/hooks/useAuth';

const HeaderMobil = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout, user } = useAuth();

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
      {/* ───────────── HEADER ───────────── */}
      <header
        className={`
          md:hidden fixed top-0 left-0 right-0 z-50
          px-6 py-4 flex justify-between items-center
          transition-all duration-300
          ${open ? "hidden" : ""}
          bg-white text-[#04061a] shadow-md
          dark:bg-transparent dark:text-white dark:shadow-none
        `}
      >
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="text-3xl transition-colors"
        >
          <IoMenu className="text-[#04061a] dark:text-white" />
        </button>

        {/* Solo mostrar avatar si está autenticado */}
        {user && <UserSection size="md" />}
      </header>

      {/* ───────────── OVERLAY ───────────── */}
      <div
        className={`
          fixed inset-0 z-30 bg-black/40
          transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)}
      />

      {/* ───────────── DRAWER ───────────── */}
      <div
        className={`
          md:hidden fixed inset-0 z-40 flex flex-col
          transform transition-transform duration-500 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}

          bg-white text-[#04061a]
          dark:bg-gradient-to-b
          dark:from-[#04061a] dark:via-[#05051a] dark:to-[#0b0b1f]
          dark:text-white
        `}
      >
        {/* Botón Cerrar */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          className="
            absolute top-4 right-4 text-3xl
            text-[#04061a] hover:text-red-700
            dark:text-white
            transition-colors
          "
        >
          <IoClose />
        </button>

        <nav className="pt-16 px-6 flex-1 overflow-y-auto">
          <NavMenuMobil size="md" variant="mobile" />

          <hr className="my-6 border-[#04061a]/30 dark:border-white" />

          {/* Dark Mode Switch */}
          <div className="flex items-center justify-between">
            <p className="uppercase tracking-wider text-sm font-bold">
              Dark Mode
            </p>
            <SwitchMode
              showIcons={false}
              lightBgColor="#00031E"
              darkBgColor="#23C1DE"
              lightHandleColor="#ffffff"
              darkHandleColor="#00031E"
            />
          </div>

          <hr className="my-6 border-[#04061a]/30 dark:border-white" />

          {/* Contacto */}
          <div className="flex gap-3 justify-start">
            <ContactoMobil compact />
          </div>

          <hr className="my-6 border-[#04061a]/30 dark:border-white" />

          {/* ───────────── SECCIÓN DE USUARIO/LOGIN ───────────── */}
          {user ? (
            // SI ESTÁ AUTENTICADO - Mostrar info y botón logout
            <>
              <div className="flex items-center gap-3">
                <UserSection size="md" />
                <div>
                  <p className="text-sm font-bold">BIENVENIDO</p>
                  <p className="text-xs opacity-60">{user.name}</p>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleLogout}
                  className="
                    bg-cyan-400 text-white
                    px-6 py-2 rounded
                    font-semibold text-sm uppercase tracking-wider
                    hover:bg-cyan-500 transition-colors
                  "
                >
                  Cerrar Sesión
                </button>
              </div>
            </>
          ) : (
            // SI NO ESTÁ AUTENTICADO - Mostrar botón de login
            <Link 
              href="/login" 
              onClick={() => setOpen(false)}
              className="
                block w-full text-center
                bg-cyan-400 text-white
                px-6 py-2 rounded
                font-semibold text-sm uppercase tracking-wider
                hover:bg-cyan-500 transition-colors
              "
            >
              Iniciar Sesión
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default HeaderMobil;