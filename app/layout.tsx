import MainLayout from "@/components/layout/MainLayout";
import "@/styles/globals.css";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { SettingsProvider } from "@/providers/SettingsProvider";
import PageTracker from "@/components/PageTracker";

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
  /*
  icons: {
    icon: [
      { url: "/favicon-96x96.png?v=20260430", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg?v=20260430", type: "image/svg+xml" },
      { url: "/favicon.ico?v=20260430" },
    ],
    apple: "/apple-touch-icon.png?v=20260430",
    shortcut: "/favicon.ico?v=20260430",
    other: [{ rel: "manifest", url: "/site.webmanifest?v=20260430" }],
  },*/
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t==='dark')}catch(_){}`,
          }}
        />
        
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8H8WESQK5W"
          strategy="beforeInteractive"
        />
        <Script
          id="google-analytics"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8H8WESQK5W');
            `,
          }}
        />
        <link rel="icon" type="image/png" href="/favicon-96x96.png?v=20260430" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=20260430" />
        <link rel="shortcut icon" href="/favicon.ico?v=20260430" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=20260430" />
        <meta name="apple-mobile-web-app-title" content="Yuntas" />
        <link rel="manifest" href="/site.webmanifest?v=20260430" />
      </head>
      <body>
        <PageTracker />
        <SettingsProvider>
          {/*<MainLayout>{children}</MainLayout>*/}
          {children}
        </SettingsProvider>
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
