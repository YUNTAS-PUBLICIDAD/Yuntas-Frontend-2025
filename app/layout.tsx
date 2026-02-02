import MainLayout from "@/components/layout/MainLayout";
import "@/styles/globals.css";
import { Toaster } from 'react-hot-toast';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Yuntas Publicidad - Productos Publicitarios en Lima, Perú",
    template: "%s | Yuntas Publicidad"
  },
  description: "Empresa líder en productos publicitarios personalizados en Lima, Perú. Letras corpóreas, pantallas LED, señalización y más.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
