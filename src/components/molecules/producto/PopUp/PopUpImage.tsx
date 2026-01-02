import Image, { StaticImageData } from "next/image";

interface PopupImageProps {
  src: string | StaticImageData;
}

const PopupImage: React.FC<PopupImageProps> = ({ src }) => (
  <div className="w-full sm:w-[60%] relative">
    <div className="w-full h-[250px] sm:h-full relative sm:pt-2 sm:pb-2 sm:pl-2 sm:pr-[1px]">
      <div className="w-full h-full clip-vase overflow-hidden rounded-2xl relative">
        <Image
          src={src}
          alt="Popup"
          className="w-full h-full object-cover object-center"
          sizes="(max-width: 640px) 100vw, 50vw"
          width={600}
          height={400}
        />
        <div className="absolute inset-0 bg-black/10 sm:bg-transparent"></div>
      </div>
    </div>
  </div>
);

export default PopupImage;
