'use client'
import HeroSection from "@/components/organisms/inicio/HeroSection";
import InnovacionSection from "@/components/organisms/inicio/InnovacionSection";
import ProjectsCarousel from "@/components/organisms/inicio/ProjectsCarousel";
import TestimonialsSection from "@/components/organisms/inicio/TestimonialsSection";
import InicioPopup from "@/components/organisms/inicio/popupInicial/InicioPopup";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <InnovacionSection />
      <ProjectsCarousel />
      <TestimonialsSection />
      <InicioPopup delay={5000} />
    </main>
  );
}
