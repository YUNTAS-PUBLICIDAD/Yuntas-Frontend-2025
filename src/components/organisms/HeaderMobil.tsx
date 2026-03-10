'use client';
import { useEffect, useState } from 'react';
import { IoMenu, IoClose } from "react-icons/io5";
import Link from 'next/link';
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

  return (
    <>
      {/* ───────────── HEADER ───────────── */}
      <header
        className={`
          md:hidden fixed top-0 left-0 right-0 z-50
          px-6 py-4 flex justify-between items-center
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
          <IoMenu className={`${isScrolled ? "text-[#04061a]" : "text-white"} dark:text-white`} />
        </button>

        {/* ICONO USER / ADMIN */}
        <UserSection size='md'/>
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
          <NavMenuMobil size="md" variant="mobile" />

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

          {/* ───────────── WHATSAPP BUTTON ───────────── */}
          <div className="absolute bottom-6 right-6">
            <Link
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Yuntas, quisiera más información sobre sus servicios.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-24 h-24 bg-[#25D366] rounded-full shadow-2xl hover:bg-[#20bd5a] transition-colors duration-300"
              aria-label="Chat en WhatsApp"
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-white relative"
              >
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default HeaderMobil;