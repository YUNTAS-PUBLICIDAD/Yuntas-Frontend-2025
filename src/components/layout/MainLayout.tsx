import React from 'react'; // Asegúrate de tener React si es necesario
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import HeaderMobil from "../organisms/HeaderMobil";

import { FloatingWhatsApp } from "@/components/atoms/FloatingWhatsApp";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <HeaderMobil />

      <main className="flex-1">
        {children}
      </main>

      <FloatingWhatsApp />

      <Footer />
    </div>
  );
}