import MainLayout from "@/components/layout/MainLayout";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>Yuntas Publicidad</title>
        <link rel="icon" href="/icon.svg" />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
