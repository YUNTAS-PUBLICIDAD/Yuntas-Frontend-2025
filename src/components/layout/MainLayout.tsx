import React from 'react';
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import HeaderMobil from "../organisms/HeaderMobil";
import dynamic from 'next/dynamic';

const ChatbotWidget = dynamic(() => import("@/components/organisms/ChatbotWidget"), { ssr: false });

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <HeaderMobil />

      <main className="flex-1">
        {children}
      </main>

      <ChatbotWidget />

      <Footer />
    </div>
  );
}
