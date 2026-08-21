"use client";

import React from 'react';
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import HeaderMobil from "../organisms/HeaderMobil";
import dynamic from 'next/dynamic';
import { HeaderStyleProvider } from "@/context/HeaderStyleContext";

const ChatbotWidget = dynamic(() => import("@/components/organisms/ChatbotWidget"), { ssr: false });
const FloatingWhatsApp = dynamic(() => import("@/components/atoms/FloatingWhatsApp").then(mod => mod.FloatingWhatsApp), { ssr: false });

export default function MainLayout({
  children,
  solidHeader = false,
}: {
  children: React.ReactNode;
  /** Fuerza el header a su estilo "scrolled" (fondo sólido) desde el inicio. Útil en páginas sin hero, como 404. */
  solidHeader?: boolean;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HeaderStyleProvider initialForceSolid={solidHeader}>
      <div className="flex flex-col min-h-screen relative">
        <Header />
        <HeaderMobil />

        <main className="flex-1">
          {children}
        </main>

        {mounted && (
          <>
            <FloatingWhatsApp />
            <ChatbotWidget />
          </>
        )}

        <Footer />
      </div>
    </HeaderStyleProvider>
  );
}
