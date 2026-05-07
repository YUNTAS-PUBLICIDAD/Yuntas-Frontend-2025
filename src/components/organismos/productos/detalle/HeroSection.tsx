import HeroPage from '@/components/molecules/HeroSection';

interface HeroSectionProps {
	productName: string;
	backgroundImage: string;
	imageTitle: string;
	imageAlt: string;
}

const HeroSection = ({ productName, backgroundImage, imageTitle, imageAlt }: HeroSectionProps) => {
	return (
		<HeroPage url={backgroundImage} text={productName} position='medio' imageAlt={imageAlt} imageTitle={imageTitle} />
	);
};

export default HeroSection;