import React from 'react'
import Image from 'next/image'

const ImgVariant = {
    normal: "",
    blogCard: "w-[400px] h-[300px] rounded-tr-3xl rounded-tl-3xl",
    productoCard: "w-[450px] h-[330px] rounded-tr-xl rounded-tl-xl",
}

type ImgProps = {
    src: string,
    variant?: "blogCard" | "productoCard" | "normal",
    classname?: string,
    alt?: string,
    title?: string,
    priority?: boolean,
    quality?: number,
    sizes?: string;
    onError?: React.ReactEventHandler<HTMLImageElement>
}

const Img = ({ 
    src, 
    alt = "", 
    title = "", 
    variant = 'normal', 
    classname,
    priority = false,
    quality = 75,
    sizes,
    onError
}: ImgProps) => {
    return (
        <Image 
            alt={alt} 
            src={src} 
            title={title}
            width={variant === "blogCard" ? 400 : variant === "productoCard" ? 450 : 800}
            height={variant === "blogCard" ? 300 : variant === "productoCard" ? 330 : 600}
            className={`${classname} ${ImgVariant[variant]} object-cover`}
            priority={priority}
            quality={quality}
            sizes={sizes}
            onError={onError}
        />
    )
}

export default Img