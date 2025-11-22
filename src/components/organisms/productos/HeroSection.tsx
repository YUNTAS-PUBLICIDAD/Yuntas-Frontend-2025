import heroBackground from "@/assets/productos/heroBackground.png";
import HeroPage from '@/components/molecules/HeroPage';
const HeroSection = () => {
  return (
    <HeroPage url={heroBackground} text='Productos' position='medio'/>
  );
};

export default HeroSection;
