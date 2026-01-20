'use client'
import HeroSection from "@/components/organisms/inicio/HeroSection";
import InnovacionSection from "@/components/organisms/inicio/InnovacionSection";
import ProjectsCarousel from "@/components/organisms/inicio/ProjectsCarousel";
import TestimonialsSection from "@/components/organisms/inicio/TestimonialsSection";
import imagenPopup from "@/assets/inicio/Popup/yuleLove.webp";
import Popup from "@/components/molecules/Popup";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <InnovacionSection />
      <ProjectsCarousel />
      <TestimonialsSection />
      <Popup
        imgSrc={imagenPopup.src}
        title="¡Un detalle que cambia todo!"
        buttonText="Empieza a brillar"
        sourceId={1} // source id para "Inicio"
      />
    </main>
  );
}
