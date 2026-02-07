import { imagenes } from "@/data/imagenes";
import HeroPage from '@/components/molecules/HeroPage';
const HeroSection = () => {
  return (
    <HeroPage url={imagenes.blogs.hero.src} imageTitle={imagenes.blogs.hero.title} imageAlt={imagenes.blogs.hero.alt} text='Blog' position='medio'/>
  );
};

export default HeroSection;
