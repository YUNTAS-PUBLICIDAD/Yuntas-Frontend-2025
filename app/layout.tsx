import MainLayout from "@/components/layout/MainLayout";
import "@/styles/globals.css";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

export const metadata: Metadata = {
  metadataBase: new URL("https://yuntaspublicidad.com"),
  title: {
    default: "Yuntas Publicidad - Productos Publicitarios en Lima, Perú",
    template: "%s | Yuntas Publicidad",
  },
  description:
    "Empresa líder en productos publicitarios personalizados en Lima, Perú. Letras corpóreas, pantallas LED, señalización y más.",
  keywords: [
    "yuntas publicidad",
    "productos publicitarios Lima",
    "letras corpóreas Perú",
    "pantallas LED",
    "señalización publicitaria",
  ],
  authors: [{ name: "Yuntas Publicidad" }],
  creator: "Yuntas Publicidad",
  publisher: "Yuntas Publicidad",
  icons: {
    icon: {
      url: "/favicon.ico"},
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://yuntaspublicidad.com",
    siteName: "Yuntas Publicidad",
    title: "Yuntas Publicidad - Productos Publicitarios en Lima, Perú",
    description:
      "Empresa líder en productos publicitarios personalizados en Lima, Perú.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Yuntas Publicidad",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://yuntaspublicidad.com",
  },
  verification: {
    google: "MDSNKTrlAObt-GvUOEpxGnSJfRCFk7fgBlyOKmFi-T8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        {/*<MainLayout>{children}</MainLayout>*/}
        {children}
        <Toaster containerStyle={{
          inset: 0
        }} toastOptions={
          {
            style: {
              marginTop: '16px',
              marginRight: '16px'
            }
          }
        }/>
      </body>
    </html>
  );
}