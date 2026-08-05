import HeroSection from "@/components/organisms/inicio/HeroSection";
import InnovacionSection from "@/components/organisms/inicio/InnovacionSection";
import ProjectsCarousel from "@/components/organisms/inicio/ProjectsCarousel";
import ClientesSection from "@/components/organisms/inicio/ClientesSection";

import DynamicPopup from "@/components/molecules/DynamicPopup";

import RecentProductsSection from "@/components/organisms/inicio/RecentProductsSection";
import { imagenes } from "@/data/imagenes";
import { sourceData } from "@/data/popup/sourceData";

export const metadata = {
  title: "Yuntas Publicidad | Especialistas en diseñar tu espacio",
  description: "Convertimos ideas en experiencias reales. Especialistas en letreros neón, barras de píxel, pantallas publicitarias y más en Lima, Perú.",
  keywords: [
    "publicidad exterior",
    "diseño de espacios",
    "letreros neón",
    "barras de pixel",
    "Yuntas Publicidad",
    "Lima Perú"
  ],
  alternates: {
    canonical: "https://yuntaspublicidad.com",
  },
  openGraph: {
    title: "Yuntas Publicidad | Especialistas en diseñar tu espacio",
    description: "Convertimos ideas en experiencias reales. Conoce nuestros proyectos de publicidad exterior y diseño de espacios.",
    url: "https://yuntaspublicidad.com",
    siteName: "Yuntas Publicidad",
    images: [
      {
        url: imagenes.inicio.hero.src,
        width: 1200,
        height: 630,
        alt: "Hero Yuntas Publicidad",
      },
    ],
    type: "website",
    locale: "es_PE",
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <RecentProductsSection />
      <InnovacionSection />
      <ProjectsCarousel />
      <ClientesSection />

      {/* DynamicPopup ahora es autosuficiente: pide sus propios datos en el navegador */}
      <DynamicPopup
        page="inicio"
        sourceId={sourceData.INICIO}
        fallback={{
          desktopImgSrc: imagenes.inicio.popup.src,
          textImgSrc: "",
          mobileImgSrc: imagenes.inicio.popup.src,
          imgAlt: imagenes.inicio.popup.alt,
          title: "¡Un detalle que cambia todo!",
          buttonText: "Empieza a brillar",
          buttonColor: "#7C29E3",
          delay: 5000,
        }}
      />
    </main>
  );
}