import React from 'react'
import { StaticImageData } from 'next/image'
import ProductoCard from '../molecules/producto/ProductoCard'
const ImgVariant={
    blogCard:"w-[400px] h-[300px] rounded-tr-3xl rounded-tl-3xl",
    productoCard:"w-[450px] h-[330px] rounded-tr-xl rounded-tl-xl",
}
type ImgProps={
    src:StaticImageData,
    variant:"blogCard"|"productoCard"
}
const Img = ({src, variant}:ImgProps) => {
  return (
    <img src={src.src} className={` ${ImgVariant[variant]}`}/>
  )
}

export default Img