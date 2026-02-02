import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>Yuntas Publicidad</title>
        <link rel="icon" href="/icon.svg" />
      </head>
      <body>
        <AuthProvider>
        <MainLayout>{children}</MainLayout>
        <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
