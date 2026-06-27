import Image, { StaticImageData } from "next/image";

interface PopupImageProps {
  src: string | StaticImageData;
  title?: string;
  alt: string;
  priority?: boolean;
}

const PopupImage: React.FC<PopupImageProps> = ({ src, title, alt, priority }) => (
  // <div className="w-full sm:w-[60%] relative">
  //   <div className="w-full h-[250px] sm:h-full relative sm:pt-2 sm:pb-2 sm:pl-2 sm:pr-[1px]">
  //     <div className="w-full h-full clip-vase overflow-hidden rounded-2xl relative">
  <div className="w-full h-full relative">
        <Image
          src={src}
          title={title || alt}
          fill
          alt={alt}
          placeholder={typeof src === "string" ? "empty" : "blur"}
          loading="lazy"
          // className="w-full h-full object-cover object-center"
          priority={priority}
          className="object-cover"
          // sizes="(max-width: 640px) 100vw, 50vw"
          // width={600}
          // height={400}
        />

  </div>
);

export default PopupImage;
