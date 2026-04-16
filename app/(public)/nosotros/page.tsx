import NegocioSection from "@/components/organisms/nosotros/NegociosSection";
import HeroSection from "@/components/organisms/nosotros/HeroSection";
import ValoresCorportativos from "@/components/organisms/nosotros/ValoresCorporativos";
import VisionMision from "@/components/organisms/nosotros/VisionMision";

export default function NosotrosPage() {
  return (
    <main>
      <HeroSection />
      <NegocioSection />
      <VisionMision />
      <ValoresCorportativos />
    </main>
  );
}
