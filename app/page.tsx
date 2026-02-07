'use client'
import HeroSection from "@/components/organisms/inicio/HeroSection";
import InnovacionSection from "@/components/organisms/inicio/InnovacionSection";
import ProjectsCarousel from "@/components/organisms/inicio/ProjectsCarousel";
import TestimonialsSection from "@/components/organisms/inicio/TestimonialsSection";
import Popup from "@/components/molecules/Popup";
import { sourceData } from "@/data/popup/sourceData";
import { imagenes } from "@/data/imagenes";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <InnovacionSection />
      <ProjectsCarousel />
      <TestimonialsSection />
      <Popup
        imgSrc={imagenes.inicio.popup.src}
        imgTitle={imagenes.inicio.popup.title}
        imgAlt={imagenes.inicio.popup.alt}
        title="¡Un detalle que cambia todo!"
        buttonText="Empieza a brillar"
        sourceId={sourceData.INICIO} // source id para "Inicio"
      />
    </main>
  );
}
