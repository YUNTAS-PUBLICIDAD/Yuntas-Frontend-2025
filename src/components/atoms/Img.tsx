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
    priority?: boolean,
    quality?: number
}

const Img = ({ 
    alt = "", 
    src, 
    variant = 'normal', 
    classname,
    priority = false,
    quality = 75
}: ImgProps) => {
    return (
        <Image 
            alt={alt} 
            src={src} 
            width={variant === "blogCard" ? 400 : variant === "productoCard" ? 450 : 800}
            height={variant === "blogCard" ? 300 : variant === "productoCard" ? 330 : 600}
            className={`${classname} ${ImgVariant[variant]} object-cover`}
            priority={priority}
            quality={quality}
        />
    )
}

export default Img