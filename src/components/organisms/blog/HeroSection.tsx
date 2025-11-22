import heroBackground from "@/assets/Blog/heroBackground.png";
import HeroPage from '@/components/molecules/HeroPage';
const HeroSection = () => {
  return (
    <HeroPage url={heroBackground} text='Blog' position='medio'/>
  );
};

export default HeroSection;
