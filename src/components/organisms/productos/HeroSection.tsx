import HeroPage from '@/components/molecules/HeroPage';
import { imagenes } from "@/data/imagenes";
const HeroSection = () => {
  return (
    <HeroPage url={imagenes.productos.hero.src} text='Productos' position='medio'/>
  );
};

export default HeroSection;
