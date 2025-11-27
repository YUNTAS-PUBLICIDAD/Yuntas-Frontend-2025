import HeroPage from '@/components/molecules/HeroPage';

const HeroSection = ({ productName, backgroundImage } : { productName: string, backgroundImage: string }) => {
  return (
    <HeroPage url={backgroundImage} text={productName} position='medio'/>

  );
};

export default HeroSection;
