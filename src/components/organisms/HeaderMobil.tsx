'use client';
import { useEffect, useState } from 'react';
import { IoMenu, IoClose } from "react-icons/io5";
import NavMenuMobil from "../molecules/header/NavMenuMobil";
import { usePathname } from "next/navigation";
import UserSection from '../molecules/header/UserSection';
import ContactoMobil from '../molecules/header/ContactoMobil';
import SwitchMode from '@/components/molecules/admin/SwitchMode';
import useAuth from '@/hooks/useAuth';
import { getToken } from '@/utils/token';
import { getRole } from '@/utils/role';
import { LuLamp } from 'react-icons/lu';

const HeaderMobil = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith('/admin');

  useEffect(() => {
    const checkAuth = () => {
      // Verifica si hay token y rol para determinar si es admin
      setIsAdmin(Boolean(getToken() && getRole()));
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    checkAuth();
    handleScroll();

    window.addEventListener('auth-change', checkAuth);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('auth-change', checkAuth);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
     document.body.style.overflow = "hidden" ;
    }else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto";
    }
  }, [open])

  const headerBg = isScrolled ? "bg-white text-[#04061a] shadow-md dark:bg-[#04061a]" : "bg-transparent text-white shadow-none";

  const adminBg = isAdminPath && !isScrolled ? "dark:bg-[#203565]" : "";

  const iconColor = isAdminPath ? "text-[#04061a]" : isScrolled ? "text-[#04061a]" : "text-white";

  return (
    <>
      {/* ───────────── HEADER ───────────── */}
      <header
        className={`
          md:hidden fixed top-0 left-0 right-0 z-50
          px-6 h-16 flex justify-between items-center
          transition-all duration-300
          ${open ? "opacity-0 pointer-events-none" : "opacity-100"}
          ${headerBg}
          ${adminBg}
          dark:text-white dark:shadow-none
        `}
      >
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="text-3xl transition-colors"
        >
          {/* <IoMenu className={`${isScrolled ? "text-[#04061a]" : "text-white"} dark:text-white`} /> */}
          <IoMenu className={`${iconColor} dark:text-white`}/>
        </button>

        {/* ICONO USER / ADMIN */}
        <UserSection size='lg'/>
      </header>

      {/* ───────────── OVERLAY ───────────── */}
      <div
        className={`
          fixed inset-0 z-[150] bg-black/40
          transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)}
      />

      {/* ───────────── DRAWER ───────────── */}
      <div
        className={`
          md:hidden fixed inset-0 z-[200] flex flex-col
         transform transition-transform duration-300 ease-in-out
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
            absolute top-4 right-4 z-50 text-4xl font-bold
            text-[#04061a] dark:text-white
            transition-colors
          "
        >
          ×
        </button>

        <nav className="pt-16 px-6 flex-1 overflow-y-auto">
        <NavMenuMobil onClose={() => setOpen(false)} />

          <hr className="my-6 border-[#04061a]/30 dark:border-white" />

          {/* Dark Mode Switch */}
          {isAdmin && (
            <>
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
            </>
          )}

          {/* Contacto */}
          <div className="flex gap-3 justify-start">
            <ContactoMobil compact />
          </div>

          <hr className="my-6 border-[#04061a]/30 dark:border-white" />

          {/* ───────────── SECCIÓN DE USUARIO/LOGIN ───────────── */}
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-bold">BIENVENIDO</p>
              <p className="text-xs opacity-60">
                {isAdmin ? "Administrador" : "Cliente"}
              </p>
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
              {isAdmin ? "Cerrar Sesión" : "Iniciar Sesión"}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default HeaderMobil;
