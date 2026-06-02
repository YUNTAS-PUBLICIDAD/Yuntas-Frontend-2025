"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';

export const FloatingWhatsApp = () => {
  const pathname = usePathname();
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = "Hola Yuntas, quisiera más información sobre sus servicios.";

  if (!phoneNumber || pathname?.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-7 left-4 z-[100]">
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-[#20bd5a] hover:scale-105 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] active:scale-95 transition-all duration-300"
        aria-label="Chat en WhatsApp"
      >
        <FaWhatsapp size={35} className="text-white" />
      </Link>
    </div>
  );
};