import NegocioSection from "@/components/organisms/nosotros/NegociosSection";
import NosotrosSection from "@/components/organisms/nosotros/NosotrosSection";
import ValoresCorportativos from "@/components/organisms/nosotros/ValoresCorporativos";
import VisionMision from "@/components/organisms/nosotros/VisionMision";

export default function NosotrosPage() {
  return (
    <main>
      <NosotrosSection />
      <NegocioSection />
      <VisionMision />
      <ValoresCorportativos />
    </main>
  );
}
