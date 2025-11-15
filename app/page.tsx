import HeroSection from "@/components/organisms/inicio/HeroSection";
import InnovacionSection from "@/components/organisms/inicio/InnovacionSection";
import ProjectsCarousel from "@/components/organisms/inicio/ProjectsCarousel";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <InnovacionSection/>
      <ProjectsCarousel />
    </main>
  );
}
